import Link from 'next/link';
import FadeIn from './FadeIn';

export default function Footer() {
  return (
    <FadeIn>
      <footer className="footer mt-8">
        <p className="footer__text">
          Connect with me ·{' '}
          <a href="https://linkedin.com/in/rizwan-rko" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
          <a href="mailto:hello@iamrizwan.com">Email</a> ·{' '}
          <a href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer">Book a meeting</a> ·{' '}
          <Link href="/my-time">My Time</Link>
        </p>
      </footer>
    </FadeIn>
  );
}
