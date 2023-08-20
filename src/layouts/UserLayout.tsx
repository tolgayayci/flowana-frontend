import { ReactNode } from "react";
import Navbar from "@/modules/Navbar/Navbar";
import Footer from "@/modules/Footer/Footer";

interface Props {
  children: ReactNode;
}

export default function UserLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="scroll-smooth">{children}</main>
      <Footer />
    </>
  );
}
