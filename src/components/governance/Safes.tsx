import Image from "next/image";
import Link from "next/link";

// Hooks
import useSafes from "@/models/governance/useSafes";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoData from "@/modules/NoData/NoData";

export default function Safes() {
  const { safes, isLoading } = useSafes();

  if (isLoading) {
    return (
      <ListLoader
        isLoading={isLoading}
        element={<CardHeader title="Safes" />}
      />
    );
  }

  if (!safes) {
    return <NoData element={<CardHeader title="Safes" />} message="" />;
  }

  return (
    <Layout>
      <CardHeader title="Safes" />
      <div className="max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {safes.gnosisSafes.map((safe) => (
            <li
              key={safe.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform border-2 border-sfblue-600"
            >
              <Link
                href={safe.tally_url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      src={"/compound-logo.png"}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-xs">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {safe.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        <span className="px-2 py-1 rounded-lg text-xxs sm:text-xs bg-green-200 text-green-800 border-2 border-green-500">
                          {safe.balance.totalUSDValue} USD
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
                    <div className="flex items-center space-x-2">
                      <span className="mr-2 font-semibold">Tokens</span>
                      <div className="isolate flex -space-x-2 overflow-hidden items-center">
                        {safe.balance.tokens.map((token) => (
                          <Link href={token.logoURI} key={token.address}>
                            <img
                              className="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white hover:scale-105"
                              src={token.logoURI || "/compound-logo.png"}
                              alt=""
                            />
                          </Link>
                        ))}
                      </div>
                      <span className="mr-2 font-semibold">Owners</span>
                      <div className="isolate flex -space-x-2 overflow-hidden items-center">
                        {safe.owners.map((owner) => (
                          <Link href={owner.tally_url} key={owner.address}>
                            <img
                              className="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white hover:scale-105"
                              src={owner.picture || "/compound-logo.png"}
                              alt=""
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
