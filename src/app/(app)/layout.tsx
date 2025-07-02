import Navbar from "@/components/Navbar";
import VerifyYouself from "@/components/VerifyYouself";

export default function Layout_app({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <VerifyYouself />
      {children}
    </>
  );
}
