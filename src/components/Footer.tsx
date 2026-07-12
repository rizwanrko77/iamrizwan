import Link from 'next/link';
import FadeIn from './FadeIn';
import TrackedLink from './TrackedLink';

export default function Footer() {
  return (
    <FadeIn>
      <footer className="footer mt-8">
        <p className="footer__text">
          Connect with me ·{' '}
          <TrackedLink href="https://linkedin.com/in/rizwan-rko" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'LinkedIn' }}>LinkedIn</TrackedLink> ·{' '}
          <TrackedLink href="mailto:hello@iamrizwan.com" eventName="footer_clicked" eventParams={{ link: 'Email' }}>Email</TrackedLink> ·{' '}
          <TrackedLink href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'Cal.com' }}>Book a meeting</TrackedLink> ·{' '}
          <Link href="/my-time">My Time</Link>
        </p>
      </footer>
    </FadeIn>
  );
}
