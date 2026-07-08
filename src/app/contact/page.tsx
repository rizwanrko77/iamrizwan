import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact - Mohd Rizwan",
  description: "Get in touch with Mohd Rizwan. Best way is LinkedIn or email. If you're a founder building something interesting, I'm especially responsive.",
};

export default function Contact() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <span className="page-header__emoji">🤙</span>
          <h1 className="page-header__title">Contact</h1>
          <p className="page-header__subtitle">Here's how to reach me.</p>
        </header>
      </FadeIn>

      {/* Contact Content */}
      <FadeIn>
        <section className="contact-content">
          <p>
            The best way is LinkedIn → <a href="https://linkedin.com/in/rizwan-rko" target="_blank" rel="noopener noreferrer">Click here</a>
          </p>
          <p>
            Or email directly → <a href="mailto:hello@iamrizwan.com">Click here</a>
          </p>
          <p>
            If you're a founder building something interesting, or a team that needs someone who can do product thinking, research, designing, or actually ship - I'm especially responsive.
          </p>
          <p>
            Want to discuss? <a href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer">Book a meeting</a>
          </p>
        </section>
      </FadeIn>
    </PageLayout>
  );
}
