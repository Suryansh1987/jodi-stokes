"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { mobileSocialLinks, type NavLink } from "@/lib/content/home";

type MobileNavProps = {
  links: NavLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X size={20} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <Menu size={20} strokeWidth={2.4} aria-hidden="true" />
        )}
      </button>

      <div
        id={menuId}
        className="mobile-nav"
        data-open={isOpen}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav aria-label="Mobile navigation">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-nav__cta">
          <Link className="btn-primary" href="#coaching" onClick={closeMenu}>
            Book a call
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </Link>
          <Link className="btn-ghost" href="#shop" onClick={closeMenu}>
            Shop the store
          </Link>
        </div>

        <div className="mobile-nav__socials" aria-label="Social links">
          {mobileSocialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-label={link.label}
              onClick={closeMenu}
            >
              <span aria-hidden="true">{link.shortLabel}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
