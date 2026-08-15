import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";

/*
 * Services page - "Time as a Service" for founders.
 * Three categories of offerings, no rate card, plain voice.
 * CTA channels: Cal.com meeting, email, contact form.
 */

const serviceCategories = [
  {
    title: "Idea & validation",
    services: [
      {
        title: "Startup idea discussion",
        description:
          "You have an idea, or half of one. We pull it apart - who it's really for, what already exists, and what the smallest honest test looks like. Sometimes the answer is \"build it.\" Sometimes it's \"don't.\"",
      },
      {
        title: "First-time founder consultation",
        description:
          "I've made most of the expensive mistakes already - hired too fast, rented too early, built four products at once. If it's your first company, an hour with someone who's lived through the failure modes can save you months.",
      },
      {
        title: "Content & positioning",
        description:
          "Before the words, the thinking behind them: who this is for, what it replaces, why anyone should care. Get that sentence right and the rest - site copy, launch posts, docs, emails - writes itself.",
      },
    ],
  },
  {
    title: "Building",
    services: [
      {
        title: "MVP & prototype development",
        description:
          "You've been describing the idea for months. The fastest way to find out if it works is to put a working version in front of real people. We scope the smallest version worth building, then I build it.",
      },
      {
        title: "Personal & business websites",
        description:
          "The site you've been meaning to fix, or never got around to making. Says clearly who you are and what you do, without the noise. Shipped quickly, so it stops sitting on your list.",
      },
      {
        title: "AI integrations & automation",
        description:
          "Usually there are one or two workflows that shouldn't need a human at all - support, content, data entry, internal search. I find those, wire them up, and make sure they hold up in daily use.",
      },
    ],
  },
  {
    title: "Improving what exists",
    services: [
      {
        title: "Product & UX review",
        description:
          "I use your product the way a stranger would and tell you where it breaks - the flows that confuse, the features that are missing, the ones nobody asked for. A short list of what to fix first, not a fifty-page report.",
      },
      {
        title: "Startup operations",
        description:
          "Processes people actually follow, tools that fit your size, training that turns hires into owners, and planning that catches small problems before they become the one that ends the company. I know what matters at your stage and what can wait.",
      },
      {
        title: "User feedback loop",
        description:
          "Most teams guess what users want instead of asking. I set up simple feedback loops - surveys, in-app prompts, usage patterns - so you hear directly from the people using your product. Short, actionable insights, not dashboards nobody checks.",
      },
    ],
  },
];

export default function Services() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <p className="page-header__kicker">- Services</p>
          <h1 className="page-header__title">
            My time as a service for founders.
          </h1>
          <p className="page-header__subtitle">
            I don&apos;t sell packages. I work with one founder at a time - I do
            it to support my bootstrapped startup, it&apos;s not something I do
            full time. Here&apos;s where my time usually goes.
          </p>
        </header>
      </FadeIn>

      {/* Service Categories */}
      {serviceCategories.map((category) => (
        <FadeIn key={category.title}>
          <section className="services-category">
            <h2 className="services-category__title">{category.title}</h2>
            <div className="services-grid">
              {category.services.map((service) => (
                <div key={service.title} className="service-card">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__body">{service.description}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      ))}

      {/* How This Works */}
      <FadeIn>
        <section className="services-how-it-works">
          <h2 className="services-category__title">How this works</h2>
          <p>
            No rate card, on purpose. Some of this is an hour of conversation;
            some is weeks of building. I work remotely, with founders anywhere.
            Tell me what you&apos;re building and where you&apos;re stuck - two
            or three sentences is enough.
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--accent)",
              fontStyle: "italic",
              marginTop: "var(--space-3)",
              lineHeight: 1.4,
            }}
          >
            The first conversation is just a conversation.
          </p>
        </section>
      </FadeIn>

      {/* CTA Channels */}
      <FadeIn>
        <section className="services-cta">
          <div className="services-cta__channels">
            <TrackedLink
              href="https://cal.com/meet-rizwan"
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta__link"
              eventName="services_cta_clicked"
              eventParams={{ method: "Cal.com" }}
            >
              Book a meeting
            </TrackedLink>
            <TrackedLink
              href="mailto:hello@iamrizwan.com?subject=Reaching%20out%20via%20iamrizwan.com&body=Hi%20Rizwan%2C%0A%0A"
              className="services-cta__link"
              eventName="services_cta_clicked"
              eventParams={{ method: "Email" }}
            >
              Send an email
            </TrackedLink>
            <Link href="/contact" className="services-cta__link">
              Fill the contact form
            </Link>
          </div>
        </section>
      </FadeIn>

    </PageLayout>
  );
}
