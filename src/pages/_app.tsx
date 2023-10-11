import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";

import type { AppProps } from "next/app";
import Script from "next/script";

import UserLayout from "@/layouts/UserLayout";

import { ProtocolStateProvider } from "@/context/ProtocolStateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script id="inner-analytics" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <ProtocolStateProvider>
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      </ProtocolStateProvider>
    </>
  );
}
