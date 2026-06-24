import { SiteHeader } from "@/components/section/shared/site-header";
import { SiteFooter } from "@/components/section/shared/site-footer";
import { Topbar } from "@/components/section/shared/topbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Topbar />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
