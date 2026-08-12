"use client";

import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx, txList } from "@/lib/i18n";

export function HostSection() {
  const { locale, ui } = useDemo();
  const host = property.host;
  const booking = property.booking;

  return (
    <section className="host-sec" aria-labelledby="host-naslov">
      <div className="wrap host-grid">
        <Reveal className="host-reveal" as="article">
          <div className="host-card">
            <div className="host-head">
              <div>
                <p className="host-kicker">{tx(host.heading, locale)}</p>
                <h2 id="host-naslov">{host.name}</h2>
              </div>
            </div>
            <div className="host-body">
              {txList(host.body, locale).map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="host-reveal" delay={80} as="article">
          <div className="booking-card">
            <p className="booking-card-kicker">{ui.nav.book}</p>
            <h3>{tx(booking.heading, locale)}</h3>
            <div className="booking-card-body">
              {txList(booking.body, locale).map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
