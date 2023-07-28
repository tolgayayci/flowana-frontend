export interface ICumulativeStats {
    default_branch_commit_count: number;
    disk_usage: number;
    release_count: number;
    commit_comment_count: number;
    pull_request_count: number;
    stargazers_count: number;
    issue_count: number;
    watcher_count: number;
    environment_count: number;
    fork_count: number;
}

export interface ICumulativeCommitActivity {
    days: number[];
    total: number;
    week: number;
}
  
export interface DataPoint {
    name: string;
    data: number[];
    type: string;
}
  
export interface ICumulativeParticipation {
    xAxis: {
      type: string;
    };
    yAxis: {
      type: string;
    };
    series: DataPoint[];
}

export interface ICumulativeCodeFrequency {
    xAxis: {
      data: string[];
    };
    series: {
      stack: string;
      type: string;
      data: number[];
    }[];
    yAxis: {};
}

export interface ICumulativePunchCard {
    hour: number;
    day: number;
    commits: number;
}

export interface ICumulativeLanguageBreakdown {
    name: string;
    percentage: number;
    size: number;
}

export interface ICumulativeIssueCount {
    open: number;
    closed: number;
}

export interface ICumulativeMostActiveIssues {
    author_avatar_url: string;
    author_login: string;
    closed: boolean;
    comments_count: number;
    created_at: string;
    number: number;
    state: "OPEN" | "CLOSED";
    title: string;
    updated_at: string;
    owner: string;
    repo: string;
}

export interface ICumulativePullRequestCount {
    open: number;
    closed: number;
}

export interface ICumulativeRecentIssues {
    author_avatar_url: string;
    author_login: string;
    comments_count: number;
    created_at: string;
    number: number;
    state: "OPEN" | "CLOSED";
    title: string;
    updated_at: string;
    owner: string;
    repo: string;
}

export interface ICumulativeRecentPullRequests {
    author_avatar_url: string;
    author_login: string;
    comments_count: number;
    created_at: string;
    number: number;
    state: "OPEN" | "CLOSED" | "MERGED";
    title: string;
    updated_at: string;
    owner: string;
    repo: string;
}

export interface ICumulativeRecentCommits {
    author_avatar_url: string;
    author_login: string;
    committed_date: string;
    message: string;
    url: string;
    owner: string;
    repo: string;
}

export interface ICumulativeRecentReleases {
    name: string;
    published_at: string;
    tag_name: string;
    url: string;
    owner: string;
    repo: string;
}