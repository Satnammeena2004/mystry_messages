import Navbar from "@/components/Navbar";
import VerifyYouself from "@/components/VerifyYouself";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <>
      <Navbar />
      <VerifyYouself />
      {children}
    </>
  );
}
