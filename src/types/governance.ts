interface DataPoint {
    balance: number;
    timestamp: string;
}
  
interface SeriesItem {
    twitter: string;
    address: string;
    data: DataPoint[];
    name: string;
    bio: string;
    tally_url: string;
    ens: string;
    type: string;
    picture: string;
    email: string;
}
  
export interface IVotingPowerChart {
    chart: string;
    yAxis: {
      type: string;
    };
    xAxis: {
      type: string;
    };
    series: SeriesItem[];
}

interface ParticipationStats {
    delegationCount: number;
    votingPower: {
      in: number;
      net: number;
      out: number;
    };
    activeDelegationCount: number;
    weight: {
      total: number;
      owned: number;
    };
    votes: {
      total: number;
    };
    voteCount: number;
    delegations: {
      total: number;
    };
    recentParticipationRate: {
      recentProposalCount: number;
      recentVoteCount: number;
    };
    tokenBalance: number;
    createdProposalsCount: number;
}
  
interface Account {
    twitter: string;
    address: string;
    name: string;
    bio: string;
    tally_url: string;
    id: string;
    ens: string;
    picture: string;
    email: string;
}
  
export interface IDelegates {
    participation: {
      stats: ParticipationStats;
    };
    account: Account;
}

export interface IProposal {
    proposer: {
      twitter: string;
      address: string;
      name: string;
      bio: string;
      tally_url: string;
      id: string;
      ens: string;
      email: string;
    };
    start: {
      timestamp: string;
    };
    createdTransaction: {
      block: {
        number: number;
        timestamp: string;
      };
    };
    description: string;
    statusChanges: {
      type: string;
      txHash: string;
      transaction: {
        block: {
          number: number;
          timestamp: string;
        };
      };
    }[];
    tally_url: string;
    title: string;
    executable: {
      values: string[];
      callDatas: string[];
      targets: string[];
      signatures: string[];
    };
    eta: string;
    voteStats: {
      weight: number;
      votes: string;
      support: string;
      percent: number;
    }[];
    end: {
      timestamp: string;
    };
    block: {
      number: number;
      timestamp: string;
    };
    votes: {
      reason: string;
      weight: number;
      tally_url: string;
      voter: {
        twitter: string;
        address: string;
        name: string;
        bio: string;
        id: string;
        ens: string;
        email: string;
      };
      support: string;
      transaction: {
        block: {
          number: number;
          timestamp: string;
        };
      };
    }[];
    governor: {
      quorum: string;
    };
    id: number;
}

interface Token {
    logoURI: string;
    symbol: string;
    decimals: number;
    address: string | null;
    fiat: string;
    amount: string;
    name: string;
}
  
interface Owner {
    address: string;
    bio: string;
    id: string;
    tally_url: string;
    picture: string | null;
    name: string;
}
  
interface GnosisSafe {
    version: string;
    balance: {
      tokens: Token[];
      totalUSDValue: string;
    };
    nonce: number;
    threshold: number;
    id: string;
    name: string;
    tally_url: string;
    owners: Owner[];
}
  
export interface ISafes {
    gnosisSafes: GnosisSafe[];
    latestUpdate: string;
}

interface Token {
  type: string;
  id: string;
  isIndexing: boolean;
  symbol: string;
  decimals: number;
  lastIndexedBlock: {
    number: number;
    timestamp: string;
  };
  name: string;
}

interface Organization {
  slug: string;
  description: string;
  website: string;
  visual: {
    icon: string;
    color: string;
  };
  id: string;
  tally_url: string;
  votingParameters: {
    quorum: number;
    votingPeriod: number;
    bigVotingPeriod: string;
  };
  name: string;
}

interface ContractAddresses {
  tokens: { address: string }[];
  timelock: { address: string };
  governor: { address: string };
}

interface Stats {
  tokens: {
    delegatedVotingPower: number;
    voters: number;
    delegates: {
      total: number;
    };
    supply: number;
    owners: number;
  };
  proposals: {
    active: number;
    total: number;
    passed: number;
    failed: number;
  };
}

export interface IInfo {
  active: boolean;
  tokens: Token[];
  kind: string;
  organization: Organization;
  id: string;
  contracts: ContractAddresses;
  chainId: string;
  timelockId: string;
  stats: Stats;
  proposalThreshold: number;
}