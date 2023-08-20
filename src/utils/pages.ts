import type { PageFlags, IProtocol } from "@/types/general"

export const pages: Record<IProtocol['protocol'], PageFlags> = {
    "compound": {
        "projects": true,       
        "github": true,
        "forum": true,
        "governance": true,
        "developers": true,
        "leaderboard": true,
    },
    "flow": {
        "projects": true,
        "github": true,
        "forum": true,
        "governance": false,
        "developers": true,
        "leaderboard": true,
    },
    "lens": {
        "projects": true,
        "github": true,
        "forum": false,
        "governance": false,
        "developers": false,
        "leaderboard": true,
    },
    "polkadot": {
        "projects": true,
        "github": true,
        "forum": true,
        "governance": false,
        "developers": true,
        "leaderboard": true,
    }
}