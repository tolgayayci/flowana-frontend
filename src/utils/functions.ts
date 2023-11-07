import { IProtocol } from "@/types/general";

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

export function formatLargeNumber(numStr: string): string {
  // Remove commas, spaces and convert to a number
  let num = parseFloat(numStr.replace(/,/g, '').replace(/\s+/g, ''));
  const isNegative = num < 0; // Check if the number is negative
  num = Math.abs(num); // Work with the absolute value

  let units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De"];
  let unitIndex = 0;

  while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
  }

  // Round to two decimal places, add the unit, and restore the negative sign if needed
  return `${isNegative ? '-' : ''}${num.toFixed(0)} ${units[unitIndex]}`.trim();
}


export function formatChartDate(dateString: string) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, {});
}

export function formatBadgeStatsCount(count: number) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count.toString();
  }
}

export function getAppIdForProtocol(protocol: string) {
    switch (protocol) {
       case 'polkadot': return process.env.NEXT_PUBLIC_POLKADOT_ALGOLIA_APP_ID as string;
       case 'flow': return process.env.NEXT_PUBLIC_FLOW_ALGOLIA_APP_ID as string;
       case 'lens': return process.env.NEXT_PUBLIC_LENS_ALGOLIA_APP_ID as string;
       case 'compound': return process.env.NEXT_PUBLIC_COMPOUND_ALGOLIA_APP_ID as string;
       case 'balancer': return process.env.NEXT_PUBLIC_BALANCER_ALGOLIA_APP_ID as string;
       case 'aave': return process.env.NEXT_PUBLIC_AAVE_ALGOLIA_APP_ID as string;
       case 'proton': return process.env.NEXT_PUBLIC_PROTON_ALGOLIA_APP_ID as string;
       case 'osmosis': return process.env.NEXT_PUBLIC_OSMOSIS_ALGOLIA_APP_ID as string;
       case 'the-graph': return process.env.NEXT_PUBLIC_THE_GRAPH_ALGOLIA_APP_ID as string;
       case 'ton': return process.env.NEXT_PUBLIC_TON_ALGOLIA_APP_ID as string;
       case 'ocean': return process.env.NEXT_PUBLIC_OCEAN_ALGOLIA_APP_ID as string;
       case 'eos': return process.env.NEXT_PUBLIC_EOS_ALGOLIA_APP_ID as string;
    }
}
 
export function getSearchKeyForProtocol(protocol: string) {
    switch (protocol) {
       case 'polkadot': return process.env.NEXT_PUBLIC_POLKADOT_ALGOLIA_SEARCH_KEY as string;
       case 'flow': return process.env.NEXT_PUBLIC_FLOW_ALGOLIA_SEARCH_KEY as string;
       case 'lens': return process.env.NEXT_PUBLIC_LENS_ALGOLIA_SEARCH_KEY as string;
       case 'compound': return process.env.NEXT_PUBLIC_COMPOUND_ALGOLIA_SEARCH_KEY as string;
       case 'balancer': return process.env.NEXT_PUBLIC_BALANCER_ALGOLIA_SEARCH_KEY as string;
       case 'aave': return process.env.NEXT_PUBLIC_AAVE_ALGOLIA_SEARCH_KEY as string;
       case 'proton': return process.env.NEXT_PUBLIC_PROTON_ALGOLIA_SEARCH_KEY as string;
       case 'osmosis': return process.env.NEXT_PUBLIC_OSMOSIS_ALGOLIA_SEARCH_KEY as string;
       case 'the-graph': return process.env.NEXT_PUBLIC_THE_GRAPH_ALGOLIA_SEARCH_KEY as string;
       case 'ton': return process.env.NEXT_PUBLIC_TON_ALGOLIA_SEARCH_KEY as string;
       case 'ocean': return process.env.NEXT_PUBLIC_OCEAN_ALGOLIA_SEARCH_KEY as string;
       case 'eos': return process.env.NEXT_PUBLIC_EOS_ALGOLIA_SEARCH_KEY as string;
    }
}

export function getSearchIndexForProtocol(protocol: string) {
    switch (protocol) {
       case 'polkadot': return process.env.NEXT_PUBLIC_POLKADOT_INDEX_NAME as string;
       case 'flow': return process.env.NEXT_PUBLIC_FLOW_INDEX_NAME as string;
       case 'lens': return process.env.NEXT_PUBLIC_LENS_INDEX_NAME as string;
       case 'compound': return process.env.NEXT_PUBLIC_COMPOUND_INDEX_NAME as string;
       case 'balancer': return process.env.NEXT_PUBLIC_BALANCER_INDEX_NAME as string;
       case 'aave': return process.env.NEXT_PUBLIC_AAVE_INDEX_NAME as string;
       case 'proton': return process.env.NEXT_PUBLIC_PROTON_INDEX_NAME as string;
       case 'osmosis': return process.env.NEXT_PUBLIC_OSMOSIS_INDEX_NAME as string;
       case 'the-graph': return process.env.NEXT_PUBLIC_THE_GRAPH_INDEX_NAME as string;
       case 'ton': return process.env.NEXT_PUBLIC_TON_INDEX_NAME as string;
       case 'ocean': return process.env.NEXT_PUBLIC_OCEAN_INDEX_NAME as string;
       case 'eos': return process.env.NEXT_PUBLIC_EOS_INDEX_NAME as string;
    }
}
