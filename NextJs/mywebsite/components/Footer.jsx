import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong className="footer-name">MyWebsite</strong>
          <p>© 2026 MyWebsite. All rights reserved.</p>
        </div>

        <nav className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}