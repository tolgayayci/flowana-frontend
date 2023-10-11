import { useProtocol } from "@/models/protocols/useProtocol";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { protocol, setProtocol } = useProtocol();
  const router = useRouter();

  useEffect(() => {
    router.push(`${protocol["protocol"]}/projects`);
  }, [router.asPath]);

  return (
    // <div>
    //   <h1 className="text-4xl font-bold text-center my-[200px]">
    //     Landing Page
    //   </h1>
    // </div>
    null
  );
}
