import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio — Mohd Rizwan",
  description: "I've built companies alone, placed 2,500+ people, scaled a startup to 32 and shut it down myself. Now building Tharom AI, solo. This is the whole story.",
};

export default function Bio() {
  return (
    <PageLayout>
      <article className="bio-article">
        {/* Header: Portrait + Tagline Side-by-Side */}
        <FadeIn>
          <div className="bio-header">
            <img
              src="/images/Rizwan-image.png"
              alt="Mohd Rizwan — portrait"
              className="bio-portrait"
              width={160}
              height={226}
              loading="lazy"
            />
            <h1 className="bio-tagline">
              Fathe<span className="accent-letter">r</span>,{' '}
              cogn<span className="accent-letter">iz</span>ant,{' '}
              <span className="accent-letter">w</span>onderer,{' '}
              &amp; <span className="accent-letter">a</span>{' '}
              fou<span className="accent-letter">n</span>der.
            </h1>
          </div>
        </FadeIn>

        {/* Section 1: Who I am */}
        <FadeIn>
          <section className="bio-section">
            <p className="bio-section__kicker">01 — Who I am</p>
            <h2>Who I am</h2>
            <p>My name is Mohd Rizwan. I&apos;m from Bijnor, India.</p>
            <p>My father passed away when I was two and a half. My mother and my elder brother raised me. My mother passed away on January 1st, 2019. I had a good mother, and I have a good brother.</p>
            <p>I studied BSc Computer Science and left before finishing. The teaching wasn&apos;t real — cheating was quietly allowed, and I wasn&apos;t learning anything I could actually use. I got up from my seat one day and didn&apos;t go back.</p>
          </section>
        </FadeIn>

        {/* Section 2: The Networker */}
        <FadeIn>
          <section className="bio-section">
            <p className="bio-section__kicker">02 — The Networker</p>
            <h2>The Networker</h2>
            <p>I started The Networker in 2018, before COVID, as a sole proprietor. It was a recruitment business, and it was just me — working from my room, on my phone, reaching out to companies, placing candidates. It survived COVID, and after that, it actually took off. At my best I was making around 2.5 lakhs a month, alone, no team, no office. Clients stayed because I delivered faster and more directly than the vendors they were used to.</p>
            <p>I placed over 2,500 candidates through The Networker. That number is conservative, not rounded up.</p>
          </section>
        </FadeIn>

        {/* Pull-quote */}
        <FadeIn>
          <blockquote className="pull-quote">
            &ldquo;I know what a small mistake looks like before it becomes the one that ends the company — because I&apos;ve lived on both sides of that line.&rdquo;
          </blockquote>
        </FadeIn>

        {/* Section 3: RKOSPL and Humgrow */}
        <FadeIn>
          <section className="bio-section">
            <p className="bio-section__kicker">03 — RKOSPL &amp; Humgrow</p>
            <h2>RKOSPL and Humgrow</h2>
            <p>In 2023, off the back of The Networker, I started RKO Services Private Limited and moved my contracts into it. I wanted to build something bigger — Humgrow, a super app for jobs and earnings. The idea was to let India&apos;s top companies post jobs, use it as an ATS and HRM, and let candidates apply for jobs or freelance work, all in one place.</p>
            <p>I built the job portal, the ATS, the HRM, and the freelance marketplace at the same time, instead of one at a time. I hired a team before the product was ready, and signed clients before the team could deliver. We signed 10+ contracts with leading banks and NBFCs in India — the terms were simple, we deliver and they pay, and we didn&apos;t deliver enough. I also rented an office before I needed one, and spent close to a third of everything I had on rent.</p>
            <p>At our peak we had 32 people, half interns and half full-time, mostly in recruitment and management. I gave people full freedom and no targets, expecting them to treat it like their own company. Most of them were there for the salary, not the outcome, and I didn&apos;t manage, train, or plan the finances well enough to change that. I hired too fast and too many, and kept ignoring the warning signs.</p>
            <p>By July 2025, I had no money left, not even enough to renew the domain. I told the team exactly what was happening and let them go. Then I shut Humgrow down myself.</p>
            <p>I kept RKOSPL alive, with <a href="https://malpaniassociates.com" target="_blank" rel="noopener noreferrer">Naman Malpani</a> helping me hold it together. My first company wasn&apos;t going to end as a complete failure.</p>
          </section>
        </FadeIn>

        {/* Section 4: What I'm doing now */}
        <FadeIn>
          <section className="bio-section">
            <p className="bio-section__kicker">04 — Now</p>
            <h2>What I&apos;m doing now</h2>
            <p>I&apos;m building <a href="https://tharom.com" target="_blank" rel="noopener noreferrer">Tharom AI</a> under RKOSPL — the next generation of AI-powered knowledge infrastructure. I&apos;m building alone, on purpose — the moment I bring someone in, I owe them something, and right now I want zero expectations on anyone but me.</p>
            <p>I&apos;m not repeating the Humgrow mistake. One product, one thing at a time, in the right order.</p>
            <p>Everything above is the reason I can be useful to a founder today. I&apos;ve built something from nothing, run it solo, made almost every mistake there is to make at scale, and shut it down myself when it was the right call. I know what a small mistake looks like before it becomes the one that ends the company — because I&apos;ve lived on both sides of that line.</p>
          </section>
        </FadeIn>
      </article>
    </PageLayout>
  );
}
