import { ReactElement } from "react";

export type Interval = {
    value: string;
    name: string;
}

export type Order = {
    value: string;
    name: string;
}
  
export interface ICardHeader {
    title: string;
    tooltip?: string;
    description?: string;
    selectedInterval?: Interval;
    setSelectedInterval?: (interval: Interval) => void;
    intervals?: Interval[];
}

type HealthScoreProps = {
    commit_activity: number;
    contribution_activity: number;
    grade: string;
    issue_activity: number;
    pull_request_activity: number;
    release_activity: number;
    total: number;
}

export interface IHitProps {
    objectID: string;
    url: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
    description: string;
    owner: string;
    repo: string;
    stars: number;
    "categories.lvl0": string[];
    path: string;
    lastmodified: number;
    health_score?: HealthScoreProps;
}

export interface INavigationItem {
    name: string;
    href: string;
    icon: React.ElementType;
    count?: string;
    current: boolean;
}

export interface IProtocol {
    protocol: 'compound' | 'polkadot' | 'lens' | 'flow' | 'balancer' | 'aave' | 'proton' | 'osmosis' | 'the-graph' | 'ton'| 'ocean' | 'eos';
}

export interface IProtocols{
    name: string;
    value: IProtocol['protocol'];
    logo: string;
}

type PageKey = "projects" | "github" | "forum" | "governance" | "developers" | "leaderboard";

export interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
    key: PageKey;
}

export type PageFlags = {
    projects: boolean;
    github: boolean;
    forum: boolean;
    governance: boolean;
    developers: boolean;
    leaderboard: boolean;
};