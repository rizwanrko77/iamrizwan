import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio - Mohd Rizwan",
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
              alt="Mohd Rizwan - portrait"
              className="bio-portrait"
              width={160}
              height={226}
              loading="lazy"
            />
            <div>
              <p className="page-header__kicker" style={{ marginBottom: '0.5rem', textTransform: 'none' }}>- I&apos;m</p>
              <h1 className="bio-tagline">
                Fathe<span className="accent-letter">r</span>,{' '}
                cogn<span className="accent-letter">iz</span>ant,{' '}
                <span className="accent-letter">w</span>onderer,{' '}
                &amp; <span className="accent-letter">a</span>{' '}
                fou<span className="accent-letter">n</span>der.
              </h1>
              <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', color: 'var(--ink-soft)', fontStyle: 'italic' }}>
                ...and this is my story.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Section 1: Who I am */}
        <FadeIn>
          <section className="bio-section">
            <h2>Who I am</h2>
            <p>My name is Mohd Rizwan.</p>
            <p>My father passed away when I was two and a half. My mother and my elder brother raised me. My mother passed away on January 1st, 2019. I had a loving mother, and I have a caring brother.</p>
            <p>I studied BSc Computer Science and left before finishing. The teaching wasn&apos;t real - cheating was quietly allowed, and I wasn&apos;t learning anything I could actually use. I got up from my seat one day and didn&apos;t go back.</p>
          </section>
        </FadeIn>

        {/* Section 2: The Networker */}
        <FadeIn>
          <section className="bio-section">
            <h2>The Networker</h2>
            <p>I started The Networker in early 2018, before COVID, as a sole proprietor. It was a recruitment business, and it was just me - working from my room, on my phone, reaching out to companies, placing candidates. It survived COVID, and after that, it actually took off. At my best I was making around 2.5 lakhs a month, alone, no team, no office. Clients stayed because I delivered faster and more directly than the vendors they were used to.</p>
            <p>I placed over 2,500 candidates through The Networker. That number is conservative, not rounded up.</p>
          </section>
        </FadeIn>

        {/* Section 3: RKOSPL */}
        <FadeIn>
          <section className="bio-section">
            <h2>RKO Services Private Limited</h2>
            <p>In 2023, off the back of The Networker, I took a leap of faith and registered <a href="https://rkospl.com" target="_blank" rel="noopener noreferrer">RKO Services Private Limited</a>, moved my contracts into a proper company, and set it up as the foundation for all my upcoming projects.</p>
          </section>
        </FadeIn>


        {/* Section 4: Humgrow */}
        <FadeIn>
          <section className="bio-section">
            <h2>Humgrow</h2>
            <p>I wanted to build something bigger - Humgrow, a super app for jobs and earnings. The idea was to let India&apos;s top companies post jobs, use it as an ATS and HRM, and let candidates apply for jobs or freelance work, all in one place and build an eco-system which helps companies and candidates to find each other at absolute no cost.</p>
            <p>I built the job portal, the ATS, the HRM, and the freelance marketplace at the same time, instead of one at a time. I hired a team before the product was ready, and signed clients before the team could deliver. We signed 20+ contracts with leading banks and NBFCs in a span of about 1 year, the terms were simple - we deliver and they pay, and we didn&apos;t deliver enough. I also rented an office before I needed one, and spent close to a third of everything I had on rent.</p>
            <p>At our peak we had 32 people, half interns and half full-time, mostly in recruitment and management. I gave people full freedom and no goals, expecting them to treat it like their own company. Most of them were confused about their role, i was not managing team or business as a good leader should do, i didn't train people, plan the finances or execute well enough. I hired too fast and too many, and kept ignoring the warning signs which i shouldn't have.</p>
            <p>By July 2025, I had no money left, not even enough to renew the domain. I told the team exactly what was happening and let them go. Then I shut Humgrow down myself.</p>
            <p>I kept RKOSPL alive, with <a href="https://malpaniassociates.com" target="_blank" rel="noopener noreferrer">Naman Malpani</a> helping me hold it together. My first company wasn&apos;t going to end as a complete failure.</p>
          </section>
        </FadeIn>

        {/* Section 5: Xapproach */}
        <FadeIn>
          <section className="bio-section">
            <h2>Xapproach</h2>
            <p>The idea of <a href="https://xapproach.com" target="_blank" rel="noopener noreferrer">Xapproach</a> is to solve for online education, specifically for the Indian market. The primary goal was to introduce a unique billing system - where an educator charges for their video lessons per minute. For example, an educator creates a paid lesson and rates it at ₹1 per minute. If a learner watches it for 15 minutes, they only pay for that duration. If they watch the full lesson, they pay for the full duration. If they stop watching, they stop paying.</p>
            <p>The MVP is already built but not publicly available. The project is currently paused due to legal and financial compliance requirements, and I&apos;m actively looking for someone who can help navigate these compliance challenges.</p>
            <p>If you think you can help with legal or financial compliance, I&apos;d love to talk - <a href="/contact">reach out here</a>.</p>
          </section>
        </FadeIn>

        {/* Section 6: Tharom */}
        <FadeIn>
          <section className="bio-section">
            <h2>Tharom</h2>
            <p>As of now i&apos;m building <a href="https://tharom.com" target="_blank" rel="noopener noreferrer">Tharom</a> - an AI infrastructure for organisations with knowledge bases of their own. The idea is to build an AI native eco-system which keeps expert humans in the loop to enable "knowledge owners" to empower their users learn from their knowledge with the capabilities of AI in a controlled and monitored way.</p>
            <p>Tharom is now live for early access - <a href="https://tharom.com" target="_blank" rel="noopener noreferrer">register here →</a></p>
          </section>
        </FadeIn>

        {/* Section 7: About me in a nutshell */}
        <FadeIn>
          <section className="bio-section">
            <h2>About me in a nutshell</h2>
            <p>
              Everything above is the reason I can be useful to a founder today. I&apos;ve built something from nothing, made almost every silly mistake there is to make in a startup, and shut it down myself which was heartbreaking, and then got up and started again to build something meaningful.
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--accent)',
              fontStyle: 'italic',
              marginTop: '1rem',
              lineHeight: 1.4
            }}>
              &ldquo;I know what a small mistake looks like before it becomes the one that ends the company - I&apos;ve lived on both sides of that line and learnt lessons the hard way.&rdquo;
            </p>
          </section>
        </FadeIn>

        {/* Contact CTA */}
        <FadeIn>
          <p className="quiet-invite">
            I truly appreciate and thank you for knowing my journey, if any of this resonates - <Link href="/contact">let&apos;s talk →</Link>
          </p>
        </FadeIn>
      </article>
    </PageLayout>
  );
}
