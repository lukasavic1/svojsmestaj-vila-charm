import type { LocalizedString } from "@/types/locale";

const L = (sr: string, en: string, ru: string): LocalizedString => ({
  sr,
  en,
  ru,
});

export type FaqItem = {
  q: LocalizedString;
  a: LocalizedString;
};

export const faq: {
  heading: LocalizedString;
  lead: LocalizedString;
  items: FaqItem[];
} = {
  heading: L("Česta pitanja", "Frequently asked questions", "Частые вопросы"),
  lead: L(
    "Kratki odgovori pre nego što pošaljete upit — termini, kapacitet, pravila i bazen.",
    "Short answers before you send an inquiry — dates, capacity, house rules, and the pool.",
    "Короткие ответы перед заявкой — даты, вместимость, правила дома и бассейн."
  ),
  items: [
    {
      q: L(
        "Kada je prijava i odjava?",
        "When is check-in and check-out?",
        "Когда заезд и выезд?"
      ),
      a: L(
        "Prijava je od 12:00, odjava do 10:00. Raniji ulazak ili kasniji izlazak mogući su uz dogovor, ako termin dozvoli.",
        "Check-in is from 12:00, check-out by 10:00. Earlier arrival or later departure is possible by arrangement, if the calendar allows.",
        "Заезд с 12:00, выезд до 10:00. Более ранний въезд или поздний выезд возможны по договорённости, если позволяет календарь."
      ),
    },
    {
      q: L(
        "Koliko gostiju može da boravi?",
        "How many guests can stay?",
        "Сколько гостей может разместиться?"
      ),
      a: L(
        "Noćenje je do 10 gostiju. Tokom dana imanje može da primi do 30 osoba — pogodno za proslave i okupljanja uz prethodni dogovor.",
        "Overnight stays are for up to 10 guests. During the day the estate can host up to 30 people — suitable for celebrations and gatherings by prior arrangement.",
        "С ночёвкой — до 10 гостей. Днём имение принимает до 30 человек — подходит для праздников и встреч по предварительной договорённости."
      ),
    },
    {
      q: L(
        "Da li su ljubimci dobrodošli?",
        "Are pets welcome?",
        "Можно ли с питомцами?"
      ),
      a: L(
        "Da, Villa Charm je pet-friendly. Molimo vas da ljubimce držite pod nadzorom na imanju i da posle njih ostavite prostor urednim.",
        "Yes, Villa Charm is pet-friendly. Please keep pets supervised on the estate and leave the grounds as you found them.",
        "Да, в Villa Charm можно с питомцами. Просим присматривать за животными на территории и оставлять пространство в порядке."
      ),
    },
    {
      q: L(
        "Mogu li deca da borave bez roditelja?",
        "Can children stay without parents?",
        "Могут ли дети жить без родителей?"
      ),
      a: L(
        "Gosti mlađi od 25 godina ne mogu boraviti bez roditelja. Porodični boravci sa decom su, naravno, dobrodošli.",
        "Guests under 25 may not stay without their parents. Family stays with children are, of course, welcome.",
        "Гости младше 25 лет не могут проживать без родителей. Семейный отдых с детьми, разумеется, приветствуется."
      ),
    },
    {
      q: L(
        "Da li su proslave i muzika dozvoljeni?",
        "Are celebrations and music allowed?",
        "Разрешены ли праздники и музыка?"
      ),
      a: L(
        "Veća okupljanja i proslave su dozvoljeni uz dogovor. Glasna i živa muzika do 23:30. Pirotehnika i vatromet nisu dozvoljeni.",
        "Larger gatherings and celebrations are allowed by arrangement. Loud and live music until 23:30. Pyrotechnics and fireworks are not allowed.",
        "Большие встречи и праздники разрешены по договорённости. Громкая и живая музыка до 23:30. Пиротехника и фейерверки запрещены."
      ),
    },
    {
      q: L(
        "Da li je bazen grejan?",
        "Is the pool heated?",
        "Бассейн с подогревом?"
      ),
      a: L(
        "Da — grejani bazen 8×4 m, sa ležaljkama i prostorom za opuštanje. Tačan period grejanja dogovorite pri rezervaciji, u zavisnosti od sezone.",
        "Yes — a heated 8×4 m pool, with loungers and space to unwind. Confirm the heating period when you book, as it depends on the season.",
        "Да — подогреваемый бассейн 8×4 м, с шезлонгами и зоной отдыха. Период подогрева уточните при бронировании — он зависит от сезона."
      ),
    },
    {
      q: L(
        "Kako se rezerviše i koje su cene?",
        "How do I book, and what are the rates?",
        "Как забронировать и какие цены?"
      ),
      a: L(
        "Rezervacija ide direktno sa nama, bez posredničkih provizija. Cena je 250 € (pon–čet) i 450 € vikendom. Za potvrdu rezervacije potrebna je kapara od 100 €. Pošaljite termine — potvrdićemo dostupnost.",
        "You book directly with us, with no middleman fees. Rates are €250 (Mon–Thu) and €450 on weekends. A deposit of €100 is required to confirm the reservation. Send your dates and we’ll confirm availability.",
        "Бронирование напрямую с нами, без комиссий посредников. Цена 250 € (пн–чт) и 450 € на выходных. Для подтверждения бронирования требуется предоплата 100 €. Пришлите даты — подтвердим доступность."
      ),
    },
  ],
};
