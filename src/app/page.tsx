import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mohd Rizwan",
  description: "Are you running a company alone or with a small team? I help with product, building, validation, and GTM - one thing at a time.",
};

export default function Home() {
  return (
    <PageLayout>
      <FadeIn>
        <section className="section bio-text mt-3">
          <p>
            Are you running a company alone or with a small team?
          </p>
          <p>
            Most of your day gets eaten by things that aren't the actual work, and the product decisions that matter get
            made in the gaps, in a rush, between everything else.
          </p>
          <p>
            I can help with product design, building, validation, and GTM, or whatever else the startup needs that day.
            In return, I get to be near someone building something real, which is worth more to me than what you'd pay
            for it.
          </p>
          <p>If that's useful to you:</p>
          <p>
            <strong>Reach Out:</strong> <Link href="/contact">get in touch →</Link><br />
            <strong>About Me:</strong> <Link href="/bio">see my bio →</Link><br />
            <strong>My Work:</strong> <Link href="/projects">see projects I have built →</Link>
          </p>
        </section>
      </FadeIn>
    </PageLayout>
  );
}
