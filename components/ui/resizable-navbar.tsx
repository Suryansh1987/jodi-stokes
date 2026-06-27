"use client";

import { Equal, X } from "lucide-react";
import Link from "next/link";
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export type ResizableNavbarItem = {
  href: string;
  label: string;
};

type ResizableNavbarProps = {
  logo: ReactNode;
  items: ResizableNavbarItem[];
  desktopActions: ReactNode;
  mobileActions: ReactNode;
  mobileSocials?: ReactNode;
};

export function ResizableNavbar({
  logo,
  items,
  desktopActions,
  mobileActions,
  mobileSocials,
}: ResizableNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeMobileMenuFromLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMobileMenu();
    }
  };

  return (
    <header
      className="site-header"
      data-screen-label="Nav"
      data-scrolled={isScrolled}
    >
      <div
        className={cn(
          "site-header__bar",
          isScrolled && "site-header__bar--scrolled",
        )}
        data-state={isMobileMenuOpen ? "active" : "inactive"}
      >
        <div className="site-header__brand">{logo}</div>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          {desktopActions}

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls={menuId}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            {isMobileMenuOpen ? (
              <X size={20} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Equal size={20} strokeWidth={2.4} aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          id={menuId}
          className="mobile-nav"
          data-open={isMobileMenuOpen}
          aria-hidden={!isMobileMenuOpen}
          role="dialog"
          aria-label="Navigation menu"
          onClick={closeMobileMenuFromLink}
        >
          <nav aria-label="Mobile navigation">
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMobileMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {mobileActions}
          {mobileSocials}
        </div>
      </div>
    </header>
  );
}
