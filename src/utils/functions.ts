export const formatDistanceToNow = (dateString: string) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
};

export function formatChartDate(dateString: string) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function getAppIdForProtocol(protocol: string) {
    switch (protocol) {
       case 'polkadot': return process.env.NEXT_PUBLIC_POLKADOT_ALGOLIA_APP_ID as string;
       case 'flow': return process.env.NEXT_PUBLIC_FLOW_ALGOLIA_APP_ID as string;
       case 'lens': return process.env.NEXT_PUBLIC_LENS_ALGOLIA_APP_ID as string;
       case 'compound': return process.env.NEXT_PUBLIC_COMPOUND_ALGOLIA_APP_ID as string;
    }
}
 
export function getSearchKeyForProtocol(protocol: string) {
    switch (protocol) {
       case 'polkadot': return process.env.NEXT_PUBLIC_POLKADOT_ALGOLIA_SEARCH_KEY as string;
       case 'flow': return process.env.NEXT_PUBLIC_FLOW_ALGOLIA_SEARCH_KEY as string;
       case 'lens': return process.env.NEXT_PUBLIC_LENS_ALGOLIA_SEARCH_KEY as string;
       case 'compound': return process.env.NEXT_PUBLIC_COMPOUND_ALGOLIA_SEARCH_KEY as string;
    }
}

export function getSearchIndexForProtocol(protocol: string) {
    switch (protocol) {
       case 'polkadot': return process.env.NEXT_PUBLIC_POLKADOT_INDEX_NAME as string;
       case 'flow': return process.env.NEXT_PUBLIC_FLOW_INDEX_NAME as string;
       case 'lens': return process.env.NEXT_PUBLIC_LENS_INDEX_NAME as string;
       case 'compound': return process.env.NEXT_PUBLIC_COMPOUND_INDEX_NAME as string;
    }
}