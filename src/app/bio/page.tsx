import HomeLayout from "@/components/HomeLayout";
import FadeIn from "@/components/FadeIn";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bio - Mohd Rizwan",
  description: "Built startups alone, placed 2,500+ candidates. Built Humgrow, grew it to 32 people, shut it down myself in 2025. Now building XApproach, solo.",
};

export default function Bio() {
  return (
    <HomeLayout>
      {/* Section 1: Name Label + Tagline */}
      <FadeIn>
        <section className="section--sm" style={{ marginTop: 0 }}>
          <span className="page-header__emoji" style={{ marginTop: 0 }}>👋</span>
          <p className="hero-name" style={{ marginTop: '1rem' }}>I am</p>
          <h1 className="hero-tagline">
            <span>Fathe<span className="name-highlight">r</span>,</span>
            <span>organ<span className="name-highlight">iz</span>er,</span>
            <span><span className="name-highlight">w</span>onderer, &<br /> <span className="name-highlight">a</span> fou<span className="name-highlight">n</span>der.</span>
          </h1>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bio-text">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Who I am</h2>
          <p>My name is Mohd Rizwan. I'm from Bijnor, India.</p>
          <p>My father passed away when I was two and a half. My mother and my elder brother raised me. My mother passed away on January 1st, 2019. I had a good mother, and I have a good brother.</p>
          <p>I studied BSc Computer Science and left before finishing. The teaching wasn't real - cheating was quietly allowed, and I wasn't learning anything I could actually use. I got up from my seat one day and didn't go back.</p>

          <h2 className="mt-5" style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '3rem' }}>The Networker</h2>
          <p>I started The Networker in 2018, before COVID, as a sole proprietor. It was a recruitment business, and it was just me - working from my room, on my phone, reaching out to companies, placing candidates. It survived COVID, and after that, it actually took off. At my best I was making around 2.5 lakhs a month, alone, no team, no office. Clients stayed because I delivered faster and more directly than the vendors they were used to.</p>
          <p>I placed over 2,500 candidates through The Networker. That number is conservative, not rounded up.</p>

          <h2 className="mt-5" style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '3rem' }}>RKOSPL and Humgrow</h2>
          <p>In 2023, off the back of The Networker, I started RKO Services Private Limited and moved my contracts into it. I wanted to build something bigger - Humgrow, a super app for jobs and earnings. The idea was to let India's top companies post jobs, use it as an ATS and HRM, and let candidates apply for jobs or freelance work, all in one place.</p>
          <p>I built the job portal, the ATS, the HRM, and the freelance marketplace at the same time, instead of one at a time. I hired a team before the product was ready, and signed clients before the team could deliver. We signed 10+ contracts with leading banks and NBFCs in India - the terms were simple, we deliver and they pay, and we didn't deliver enough. I also rented an office before I needed one, and spent close to a third of everything I had on rent.</p>
          <p>At our peak we had 32 people, half interns and half full-time, mostly in recruitment and management. I gave people full freedom and no targets, expecting them to treat it like their own company. Most of them were there for the salary, not the outcome, and I didn't manage, train, or plan the finances well enough to change that. I hired too fast and too many, and kept ignoring the warning signs.</p>
          <p>By July 2025, I had no money left, not even enough to renew the domain. I told the team exactly what was happening and let them go. Then I shut Humgrow down myself.</p>
          <p>I kept RKOSPL alive, with <a href="https://malpaniassociates.com" target="_blank" rel="noopener noreferrer">Naman Malpani</a> helping me hold it together. My first company wasn't going to end as a complete failure.</p>

          <h2 className="mt-5" style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '3rem' }}>What I'm doing now</h2>
          <p>I'm building <a href="https://xapproach.com" target="_blank" rel="noopener noreferrer">XApproach</a> under RKOSPL - a learning platform powered by AI, controlled by experts. It's pre-user right now. I'm building it alone, on purpose - the moment I bring someone in, I owe them something, and right now I want zero expectations on anyone but me.</p>
          <p>I'm not repeating the Humgrow mistake. One product, one thing at a time, in the right order.</p>
          <p>Everything above is the reason I can be useful to a founder today. I've built something from nothing, run it solo, made almost every mistake there is to make at scale, and shut it down myself when it was the right call. I know what a small mistake looks like before it becomes the one that ends the company - because I've lived on both sides of that line.</p>
        </section>
      </FadeIn>
    </HomeLayout>
  );
}
