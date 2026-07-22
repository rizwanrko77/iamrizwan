import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Time — Mohd Rizwan",
  description: "My current schedule, live. Grab my hours that works for a your business needs.",
};

export default function MyTime() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <p className="page-header__kicker">— Schedule</p>
          <h1 className="page-header__title">My availability</h1>
          <p className="page-header__subtitle">Grab my hours that works for a your business needs.</p>
        </header>
      </FadeIn>

      {/* Iframe Container */}
      <FadeIn>
        <div className="my-time-container">
          <iframe
            src="https://time.iamrizwan.com/rizwan?view=week"
            loading="lazy"
            title="Rizwan's weekly availability schedule"
          ></iframe>
        </div>
        <p className="my-time-fallback">
          If the availability calendar doesn&apos;t load, <a href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer">book directly →</a>
        </p>
      </FadeIn>
    </PageLayout>
  );
}
