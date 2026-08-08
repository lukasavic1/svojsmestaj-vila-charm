"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  nightsBetween,
  rangeHasBookedNight,
} from "@/lib/calendar";
import type { Unit } from "@/types/property";
import {
  bookingFlowSteps,
  INITIAL_BOOKING_DRAFT,
  type BookingDraft,
  type BookingStep,
} from "./types";
import { clampGuests, unitCapacity } from "./lib/occupancy";

type BookingContextValue = {
  step: BookingStep;
  draft: BookingDraft;
  units: Unit[];
  flowSteps: BookingStep[];
  selectedUnit: Unit | null;
  nights: number;
  estimatedTotal: number | null;
  guestTotal: number;
  occupancyOk: boolean;
  datesOk: boolean;
  canContinue: boolean;
  successOpen: boolean;
  stepScrollNonce: number;
  goNext: () => void;
  goBack: () => void;
  goTo: (step: BookingStep) => void;
  selectUnit: (unitId: string) => void;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (adults: number, children: number) => void;
  setSpecialRequest: (value: string) => void;
  setGuestDetails: (details: {
    guestName?: string;
    guestEmail?: string;
    guestPhone?: string;
  }) => void;
  confirm: () => void;
  dismissSuccess: () => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function BookingProvider({
  units,
  initialUnitId = null,
  children,
}: {
  units: Unit[];
  initialUnitId?: string | null;
  children: ReactNode;
}) {
  const flowSteps = useMemo(() => bookingFlowSteps(units.length), [units.length]);
  const defaultUnitId =
    units.length === 1 ? units[0].id : initialUnitId && units.some((u) => u.id === initialUnitId)
      ? initialUnitId
      : null;
  const startStep: BookingStep =
    defaultUnitId || flowSteps[0] === "dates" ? "dates" : "unit";

  const [step, setStep] = useState<BookingStep>(startStep);
  const [successOpen, setSuccessOpen] = useState(false);
  const [stepScrollNonce, setStepScrollNonce] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(() => {
    if (!defaultUnitId) return INITIAL_BOOKING_DRAFT;
    return { ...INITIAL_BOOKING_DRAFT, unitId: defaultUnitId };
  });

  const selectedUnit =
    units.find((u) => u.id === draft.unitId) ?? (units.length === 1 ? units[0] : null);

  const nights =
    draft.checkIn && draft.checkOut
      ? nightsBetween(draft.checkIn, draft.checkOut)
      : 0;

  const estimatedTotal =
    selectedUnit && nights > 0
      ? selectedUnit.price.perNightEur * nights
      : null;

  const guestTotal = draft.adults + draft.children;

  const occupancyOk = selectedUnit
    ? guestTotal >= 1 && guestTotal <= unitCapacity(selectedUnit)
    : false;

  const datesOk = Boolean(
    draft.checkIn &&
      draft.checkOut &&
      nights > 0 &&
      selectedUnit &&
      !rangeHasBookedNight(
        selectedUnit.availability.booked,
        draft.checkIn!,
        draft.checkOut!
      )
  );

  const reviewOk =
    draft.guestName.trim().length > 1 &&
    emailOk(draft.guestEmail) &&
    draft.guestPhone.trim().length >= 6;

  const canContinue = useMemo(() => {
    switch (step) {
      case "unit":
        return Boolean(draft.unitId);
      case "dates":
        return datesOk;
      case "guests":
        return occupancyOk && draft.adults >= 1;
      case "review":
        return reviewOk && datesOk && occupancyOk;
      default:
        return false;
    }
  }, [step, draft.unitId, draft.adults, datesOk, occupancyOk, reviewOk]);

  const bumpStepScroll = useCallback(() => {
    setStepScrollNonce((n) => n + 1);
  }, []);

  const goNext = useCallback(() => {
    const idx = flowSteps.indexOf(step);
    if (idx >= 0 && idx < flowSteps.length - 1 && canContinue) {
      setStep(flowSteps[idx + 1]);
      bumpStepScroll();
    }
  }, [step, canContinue, bumpStepScroll, flowSteps]);

  const goBack = useCallback(() => {
    const idx = flowSteps.indexOf(step);
    if (idx > 0) {
      setStep(flowSteps[idx - 1]);
      bumpStepScroll();
    }
  }, [step, bumpStepScroll, flowSteps]);

  const goTo = useCallback(
    (next: BookingStep) => {
      setStep(next);
      bumpStepScroll();
    },
    [bumpStepScroll]
  );

  const selectUnit = useCallback(
    (unitId: string) => {
      setDraft((d) => {
        const unit = units.find((u) => u.id === unitId) ?? null;
        const capped = clampGuests(d.adults, d.children, unitCapacity(unit));
        return {
          ...d,
          unitId,
          checkIn: null,
          checkOut: null,
          adults: capped.adults,
          children: capped.children,
        };
      });
    },
    [units]
  );

  const setDates = useCallback(
    (checkIn: string | null, checkOut: string | null) => {
      setDraft((d) => ({ ...d, checkIn, checkOut }));
    },
    []
  );

  const setGuests = useCallback(
    (adults: number, children: number) => {
      setDraft((d) => {
        const unit = units.find((u) => u.id === d.unitId) ?? null;
        const capped = clampGuests(adults, children, unitCapacity(unit));
        return {
          ...d,
          adults: capped.adults,
          children: capped.children,
        };
      });
    },
    [units]
  );
  const setSpecialRequest = useCallback((value: string) => {
    setDraft((d) => ({ ...d, specialRequest: value }));
  }, []);

  const setGuestDetails = useCallback(
    (details: {
      guestName?: string;
      guestEmail?: string;
      guestPhone?: string;
    }) => {
      setDraft((d) => ({ ...d, ...details }));
    },
    []
  );

  const firstStep = flowSteps[0];

  const confirm = useCallback(() => {
    if (step !== "review" || !reviewOk || !datesOk || !occupancyOk) return;
    setSuccessOpen(true);
    const keepUnit =
      units.length === 1 ? units[0].id : defaultUnitId;
    setDraft({
      ...INITIAL_BOOKING_DRAFT,
      unitId: keepUnit,
    });
    setStep(firstStep);
  }, [
    step,
    reviewOk,
    datesOk,
    occupancyOk,
    units,
    defaultUnitId,
    firstStep,
  ]);

  const dismissSuccess = useCallback(() => {
    setSuccessOpen(false);
  }, []);

  const reset = useCallback(() => {
    setDraft({
      ...INITIAL_BOOKING_DRAFT,
      unitId: units.length === 1 ? units[0].id : null,
    });
    setStep(firstStep);
    setSuccessOpen(false);
  }, [units, firstStep]);

  const value = useMemo<BookingContextValue>(
    () => ({
      step,
      draft,
      units,
      flowSteps,
      selectedUnit,
      nights,
      estimatedTotal,
      guestTotal,
      occupancyOk,
      datesOk,
      canContinue,
      successOpen,
      stepScrollNonce,
      goNext,
      goBack,
      goTo,
      selectUnit,
      setDates,
      setGuests,
      setSpecialRequest,
      setGuestDetails,
      confirm,
      dismissSuccess,
      reset,
    }),
    [
      step,
      draft,
      units,
      flowSteps,
      selectedUnit,
      nights,
      estimatedTotal,
      guestTotal,
      occupancyOk,
      datesOk,
      canContinue,
      successOpen,
      stepScrollNonce,
      goNext,
      goBack,
      goTo,
      selectUnit,
      setDates,
      setGuests,
      setSpecialRequest,
      setGuestDetails,
      confirm,
      dismissSuccess,
      reset,
    ]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
