import Link from "next/link";

import { BrandLogo } from "@/components/section/shared/brand-logo";
import { footerContent } from "@/lib/content/home";

const socialLinks = [
  // [PLACEHOLDER] Social URLs are temporary. [TODO] Replace with approved profile URLs.
  { href: "#", label: "Instagram", icon: <InstagramIcon /> },
  { href: "#", label: "TikTok", icon: <TikTokIcon /> },
  { href: "#", label: "YouTube", icon: <YouTubeIcon /> },
  { href: "#", label: "Spotify", icon: <SpotifyIcon /> },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" data-screen-label="Footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <BrandLogo className="foot-brand__logo" />
          <p>{footerContent.description}</p>
          <div className="socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <Link key={link.label} href={link.href} aria-label={link.label}>
                <span aria-hidden="true">{link.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {footerContent.linkGroups.map((group) => (
          <nav key={group.title} className="foot-col" aria-label={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={`${group.title}-${link.label}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="foot-base">
        <p>{footerContent.copyright}</p>
        {/* [PLACEHOLDER] Legal links are temporary. [TODO] Replace with real policy routes. */}
        <nav aria-label="Legal">
          {footerContent.legalLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4Z" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 6.7A5.4 5.4 0 0 1 16 4h-3v12.3a2.7 2.7 0 1 1-2.7-2.7c.27 0 .5 0 .77.1v-3.1a6 6 0 0 0-.77-.05A5.7 5.7 0 1 0 16 16.3V9.5a8.4 8.4 0 0 0 4.8 1.5V8a5.3 5.3 0 0 1-1.2-1.3Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.5 7.2a2.7 2.7 0 0 0-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 7.2 28 28 0 0 0 1 12a28 28 0 0 0 .5 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 23 12a28 28 0 0 0-.5-4.8Zm-12.8 7.7V9.1l5.7 2.9Z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.7 14.7a.64.64 0 0 1-.88.21c-2.4-1.47-5.42-1.8-8.98-1a.64.64 0 0 1-.28-1.25c3.9-.88 7.24-.5 9.93 1.15.3.19.4.59.21.89Zm1.25-2.8a.8.8 0 0 1-1.1.27c-2.74-1.69-6.92-2.18-10.17-1.2a.8.8 0 0 1-1-.54.8.8 0 0 1 .53-1c3.71-1.13 8.31-.58 11.46 1.36.38.23.5.73.28 1.1Zm.11-2.91c-3.29-1.95-8.71-2.13-11.85-1.18a.96.96 0 0 1-.56-1.84c3.6-1.1 9.59-.88 13.38 1.36a.96.96 0 0 1-.97 1.66Z" />
    </svg>
  );
}
