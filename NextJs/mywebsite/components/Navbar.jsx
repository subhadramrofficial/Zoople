"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
 
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo">
          My<span>Website</span>
        </Link>

        <nav>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}