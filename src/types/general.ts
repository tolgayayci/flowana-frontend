import { ReactElement } from "react";
import { JsxElement } from "typescript";

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
    description?: string;
    selectedInterval?: Interval;
    setSelectedInterval?: (interval: Interval) => void;
    intervals?: Interval[];
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
}