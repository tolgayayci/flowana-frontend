import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-[200px]">
        Landing Page
      </h1>
    </div>
  );
}
