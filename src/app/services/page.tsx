import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Rizwan - Time-as-a-service",
  description:
    "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/services",
    siteName: "Rizwan",
    title: "Rizwan - Time-as-a-service",
    description:
      "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rizwan - Time-as-a-service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Time-as-a-service",
    description:
      "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
    images: ["/og-image.png"],
  },
};

/*
 * Services page — founder-targeted copy (short version).
 * Built to be read in under a minute.
 * Direct, founder-to-founder positioning, no rate card, single bottom CTA.
 */

export default function Services() {
  return (
    <PageLayout>
      {/* Page Header (HERO) - No CTA at hero as requested */}
      <FadeIn>
        <header className="page-header services-header">
          <p className="page-header__kicker">- My time-as-a-service</p>
          <h1 className="page-header__title">
            I find what&apos;s broken in your product before your users bother to tell you.
          </h1>
          <p className="page-header__subtitle">
            They won&apos;t tell you. They&apos;ll sign up, look around, and never come back. My core strength is enhancing product and user experience for products at any scale, diagnosing the friction points that kill retention before you call it a marketing problem.
          </p>
        </header>
      </FadeIn>

      {/* TARGETING — the part that makes a stranger think "that's me" */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">Are you one of these two?</h2>
          <div className="targeting-grid">
            <div className="targeting-card">
              <h3 className="targeting-card__heading">Pre-Product.</h3>
              <p className="targeting-card__body">
                Are you planning an MVP and worried you&apos;re over-engineering features nobody asked for? Do you need an honest outside perspective to pinpoint the core features that truly matter, design a frictionless first-time user experience, and make sure your v1 delivers value without the bloat?
              </p>
            </div>
            <div className="targeting-card">
              <h3 className="targeting-card__heading">Live Product.</h3>
              <p className="targeting-card__body">
                Whether you&apos;re on v1 or v10 of your product, do you feel users are struggling to get full value from it? Do you need to fix features that create friction, identify the missing pieces your users actually need, and unblock broken flows to elevate the entire experience and unlock higher retention?
              </p>
            </div>
          </div>
          <p className="targeting-disqualifier">
            Neither of those? I&apos;m probably not your guy.
          </p>
        </section>
      </FadeIn>

      {/* WHAT HAPPENS */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">What you&apos;re signing up for</h2>
          <div className="services-prose">
            <p>One conversation. That&apos;s the whole ask.</p>
            <p>
              You show me the product. I ask annoying questions. I tell you the two or three things I&apos;d fix first, in order.
            </p>
            <p>No deck. No proposal. No discovery phase.</p>
            <p>
              If we work together after that, good. If you take the notes and fix it yourself, also good.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* METHOD — keep as bullets, don't expand into prose */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">How I look at a product</h2>
          <ul className="method-list">
            <li className="method-item">
              <strong>User onboarding experience.</strong> How many steps before a new user gets anything good.
            </li>
            <li className="method-item">
              <strong>Promise vs. product.</strong> Your landing page makes a claim. I check if the product keeps it.
            </li>
            <li className="method-item">
              <strong>Building vs. fixing.</strong> Founders add features to avoid a broken path. I&apos;ll point at those.
            </li>
            <li className="method-item">
              <strong>What only you can see.</strong> The things you know that never made it into the interface.
            </li>
            <li className="method-item">
              <strong>What to ignore.</strong> Half of any feedback list is noise. I&apos;ll tell you which half.
            </li>
          </ul>
          <p className="method-closing">
            You get a short, ordered list. Ordered matters more than long.
          </p>
        </section>
      </FadeIn>

      {/* PROOF — links, not a story */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">Why me</h2>
          <div className="services-prose">
            <p>
              I&apos;ve lived on both sides of launch: building from scratch and making the hard mistakes so you don&apos;t have to. Judge for yourself through what I&apos;ve built, my story, and words from founders.
            </p>
            <div className="proof-links">
              <TrackedLink
                href="/company"
                className="proof-link"
                eventName="services_proof_clicked"
                eventParams={{ target: "company" }}
              >
                See what I&apos;ve built <span>→</span>
              </TrackedLink>
              <TrackedLink
                href="/bio"
                className="proof-link"
                eventName="services_proof_clicked"
                eventParams={{ target: "bio" }}
              >
                My story <span>→</span>
              </TrackedLink>
              <TrackedLink
                href="/reviews"
                className="proof-link"
                eventName="services_proof_clicked"
                eventParams={{ target: "reviews" }}
              >
                What founders say <span>→</span>
              </TrackedLink>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* FOLDED SERVICES */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">It sometimes turns into more</h2>
          <div className="services-prose">
            <p>
              MVPs, AI that removes work instead of adding a chatbot, feedback loops, operations, product management, etc. I do all of it.
            </p>
            <p>
              &ldquo;Product Experience&rdquo; (how it feels to a real user) is where I&apos;m sharpest. Easier to judge the rest once we know what&apos;s actually wrong.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* DISQUALIFIER */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">What I&apos;m not</h2>
          <div className="services-prose">
            <p>
              Not an agency or an employee. You won&apos;t be handed to anyone. I won&apos;t call your idea great just to get the build. If I work with you, I treat it like my own product.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* PRICING */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">No rate card, on purpose</h2>
          <div className="services-prose">
            <p>
              The most important step is understanding if I&apos;m the right person to solve your unique challenge and genuinely help you.
            </p>
            <p>
              If we both feel that I&apos;m the guy, we talk it out, aligning on fair value in exchange for the value I put in. You&apos;ll have complete clarity before any work begins.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* FINAL CTA — one button, everything else demoted */}
      <FadeIn>
        <section className="services-closing">
          <h2 className="services-closing__title">Start with the conversation</h2>
          <p className="services-closing__subtitle">
            Bring the product, the idea, or the half-finished thing you&apos;re embarrassed about. Especially that one.
          </p>
          <div className="services-cta-group">
            <TrackedLink
              href="https://cal.com/meet-rizwan"
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta__link services-cta__link--primary"
              eventName="services_cta_clicked"
              eventParams={{ location: "bottom", action: "book_time" }}
            >
              Schedule a meeting <span>→</span>
            </TrackedLink>
          </div>
          <p className="services-sublinks">
            Rather write first?{" "}
            <TrackedLink
              href="mailto:hello@iamrizwan.com?subject=Reaching%20out%20via%20iamrizwan.com&body=Hi%20Rizwan%2C%0A%0A"
              className="services-sublink"
              eventName="services_cta_clicked"
              eventParams={{ location: "bottom", action: "email" }}
            >
              Email
            </TrackedLink>
            {" · "}
            <TrackedLink
              href="/contact"
              className="services-sublink"
              eventName="services_cta_clicked"
              eventParams={{ location: "bottom", action: "contact_form" }}
            >
              Contact form
            </TrackedLink>
          </p>
        </section>
      </FadeIn>
    </PageLayout>
  );
}
