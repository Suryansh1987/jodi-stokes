import { ArrowRight, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/section/shared/brand-logo";
import { ResizableNavbar } from "@/components/ui/resizable-navbar";
import { mobileSocialLinks, navLinks } from "@/lib/content/home";

export function SiteHeader() {
  return (
    <ResizableNavbar
      logo={<BrandLogo />}
      items={navLinks}
      desktopActions={
        <>
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
        </>
      }
      mobileActions={
        <div className="mobile-nav__cta">
          <Link className="btn-primary" href="#coaching">
            Book a call
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </Link>
          <Link className="btn-ghost" href="#shop">
            Shop the store
          </Link>
        </div>
      }
      mobileSocials={
        <div className="mobile-nav__socials" aria-label="Social links">
          {mobileSocialLinks.map((link) => (
            <Link key={link.label} href={link.href} aria-label={link.label}>
              <span aria-hidden="true">{link.shortLabel}</span>
            </Link>
          ))}
        </div>
      }
    />
  );
}
