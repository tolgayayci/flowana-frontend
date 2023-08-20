import "@/styles/globals.css";
import type { AppProps } from "next/app";

import UserLayout from "@/layouts/UserLayout";

import { ProtocolStateProvider } from "@/context/ProtocolStateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProtocolStateProvider>
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    </ProtocolStateProvider>
  );
}
