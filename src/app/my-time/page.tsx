import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Time - Mohd Rizwan",
  description: "Check my availability and book a meeting.",
};

export default function MyTime() {
  return (
    <PageLayout>
      <FadeIn>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <iframe 
            src="https://time.iamrizwan.com/rizwan?view=week"
            style={{ width: '100%', maxWidth: '1024px', height: '800px', border: 0 }}
            loading="lazy" 
            title="My availability"
          ></iframe>
        </div>
      </FadeIn>
    </PageLayout>
  );
}
