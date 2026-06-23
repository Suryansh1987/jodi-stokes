import { SiteHeader } from "@/components/section/shared/site-header";
import { Topbar } from "@/components/section/shared/topbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Topbar />
      <SiteHeader />
      {children}
    </>
  );
}
