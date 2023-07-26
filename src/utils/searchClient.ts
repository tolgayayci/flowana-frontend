import algoliasearch from "algoliasearch";

export const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_POLKADOT_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_POLKADOT_ALGOLIA_SEARCH_KEY as string
);