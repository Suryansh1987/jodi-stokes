import { ArrowRight, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/section/shared/brand-logo";
import { MobileNav } from "@/components/section/shared/mobile-nav";
import { navLinks } from "@/lib/content/home";

export function SiteHeader() {
  return (
    <header className="site-header" data-screen-label="Nav">
      <BrandLogo />

      <nav className="site-header__nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="site-header__actions">
        {/* [PLACEHOLDER] Visual-only search until real search is wired. [TODO] Connect site search. */}
        <button className="icon-btn" type="button" aria-label="Search">
          <Search size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>

        {/* [PLACEHOLDER] Visual-only cart count. [TODO] Connect cart state and checkout. */}
        <button className="icon-btn" type="button" aria-label="Cart">
          <ShoppingBag size={16} strokeWidth={2.2} aria-hidden="true" />
          <span className="cart-bubble">3</span>
        </button>

        <Link className="btn-primary site-header__cta" href="#coaching">
          Book a call
          <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
        </Link>

        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}
