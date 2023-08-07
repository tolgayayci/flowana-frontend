import Head from "next/head";

import Info from "@/components/governance/Info";
import VotingPower from "@/components/governance/VotingPower";
import Proposals from "@/components/governance/Proposals";
import Safes from "@/components/governance/Safes";

export default function Governance() {
  return (
    <>
      <Head>
        <title>Governance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex flex-wrap space-y-8">
          <div className="w-full">
            <Info />
          </div>
          <div className="w-full">
            <VotingPower />
          </div>
          <div className="w-full">
            <Proposals />
          </div>
          <div className="w-full">
            <Safes />
          </div>
        </div>
      </section>
    </>
  );
}
