"use client";

import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/data/faq";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

export function FaqSection() {
  const { locale } = useDemo();

  return (
    <section className="vh-faq" id="faq" aria-labelledby="faq-title">
      <div className="vh-wrap vh-faq-inner">
        <Reveal className="vh-faq-head">
          <h2 id="faq-title" className="vh-faq-title">
            {tx(faq.heading, locale)}
          </h2>
          <p className="vh-faq-lead">{tx(faq.lead, locale)}</p>
        </Reveal>

        <div className="vh-faq-list">
          {faq.items.map((item, i) => (
            <details key={item.q.en} className="vh-faq-item">
              <summary>
                <span className="vh-faq-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="vh-faq-q">{tx(item.q, locale)}</span>
                <span className="vh-faq-toggle" aria-hidden="true" />
              </summary>
              <p>{tx(item.a, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
