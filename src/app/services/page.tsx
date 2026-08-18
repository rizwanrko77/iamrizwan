import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Services - Mohd Rizwan",
  description:
    "My time as a service for founders. Tell me what you're building and where you're stuck. Idea vetting, MVP building, product review, and startup consultation.",
};

/*
 * Services page - "Time as a Service" for founders.
 * Direct, founder-to-founder positioning, no rate cards.
 * Structured founder stuck-points, 'Why me' background, and direct CTAs.
 */

const stuckPoints = [
  {
    quote: '"I have an idea. Or half of one."',
    description:
      "We give it a quick or deep breakdown - who it's for, what exists, and whether to pursue it. If you're short on time, I can do the heavy lifting myself and tell you what I think. Sometimes the answer is build it. Sometimes it's don't.",
    tags: "Idea vetting · first-time founder consultation · positioning",
  },
  {
    quote: '"I\'ve been describing/thinking it for months. MVP still doesn\'t exist."',
    description:
      "We scope the smallest version worth building, then I build it - a product, a website, AI integrations, or automated workflows - to save you time and put the right version in front of real users to test actual demand.",
    tags: "MVP & prototypes · websites · AI integrations & automation",
  },
  {
    quote: '"It\'s live. But the product flow feels off."',
    description:
      "I use it the way a stranger would - finding flaws in your flows, proposing features that should be there, and cutting what shouldn't. I also build infused feedback loops into your product so you collect actionable, real-time user feedback tailored to your app's requirements.",
    tags: "Product & UX review · feature enhancements · infused feedback loops",
  },
];

export default function Services() {
  return (
    <PageLayout>
      {/* Page Header & Top CTA */}
      <FadeIn>
        <header className="page-header services-header">
          <p className="page-header__kicker">- Services</p>
          <h1 className="page-header__title">
            My time-as-a-service for founders.
          </h1>
          <p className="page-header__subtitle">
            Tell me what you&apos;re building and where you need help. A couple
            of sentences is plenty - I read everything myself and write back.
          </p>

          <div className="services-cta-group">
            <TrackedLink
              href="/contact"
              className="services-cta__link services-cta__link--primary"
              eventName="services_cta_clicked"
              eventParams={{ location: "hero", action: "send_message" }}
            >
              Send a message <span>→</span>
            </TrackedLink>
            <TrackedLink
              href="https://cal.com/meet-rizwan"
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta__link"
              eventName="services_cta_clicked"
              eventParams={{ location: "hero", action: "cal_meeting" }}
            >
              Book a meeting <span>→</span>
            </TrackedLink>
          </div>
        </header>
      </FadeIn>

      {/* Positioning / Availability Note */}
      <FadeIn>
        <div className="services-note">
          <p>
            One founder at a time, because I&apos;m building my own company
            alongside this. No packages, no rate card - some of this is an hour
            of conversation, some is weeks of building.
          </p>
        </div>
      </FadeIn>

      {/* Three Places Founders Get Stuck */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">
            Here is where I can help - and beyond.
          </h2>
          <div className="stuck-list">
            {stuckPoints.map((item, index) => (
              <div key={index} className="stuck-card">
                <h3 className="stuck-card__quote">{item.quote}</h3>
                <p className="stuck-card__body">{item.description}</p>
                <div className="stuck-card__tags">{item.tags}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Why Me */}
      <FadeIn>
        <section className="services-section">
          <h2 className="services-section__title">Why me.</h2>
          <div className="why-me-content">
            <p>
              I have been a solo founder since 2019, scaled 1, failed 1, and
              built many products for myself and fellow founders. I have seen
              both sides of startup hustles and am aware of the things that can
              make or break the first versions of a startup or a product.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Closing Section & Bottom CTAs */}
      <FadeIn>
        <section className="services-closing">
          <p className="services-closing__tagline">
            The first conversation is just a conversation. Remote, founders
            anywhere.
          </p>
          <div className="services-cta-group">
            <TrackedLink
              href="/contact"
              className="services-cta__link services-cta__link--primary"
              eventName="services_cta_clicked"
              eventParams={{ location: "bottom", action: "send_message" }}
            >
              Send a message <span>→</span>
            </TrackedLink>
            <TrackedLink
              href="https://cal.com/meet-rizwan"
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta__link"
              eventName="services_cta_clicked"
              eventParams={{ location: "bottom", action: "cal_meeting" }}
            >
              Book a meeting <span>→</span>
            </TrackedLink>
          </div>
        </section>
      </FadeIn>
    </PageLayout>
  );
}
