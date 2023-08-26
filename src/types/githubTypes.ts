export interface IRepositoryInfo {
    fork_count: number;
    is_fork: boolean;
    watcher_count: number;
    issue_count: number;
    commit_comment_count: number;
    release_count: number;
    owner_avatar_url: string;
    "categories.lvl0": string[];
    pull_request_count: number;
    created_at: string;
    description: string;
    owner_login: string;
    primary_language_color: string;
    stargazer_count: number;
    environment_count: number;
    primary_language_name: string;
    url: string;
    default_branch_commit_count: number;
    is_archived: boolean;
    updated_at: string;
    disk_usage: number;
    is_empty: boolean;
    owner: string;
    repo: string;
    isClosed?: boolean;
    valid?: boolean;
}

interface GitHubFileInfo {
    html_url: string;
    url: string;
    name?: string;
    spdx_id?: string;
    key?: string;
    node_id?: string;
}

export interface ICommunityProfile {
    health_percentage: number;
    updated_at: string;
    documentation: string;
    description: string;
    files: {
        issue_template: GitHubFileInfo;
        license: GitHubFileInfo;
        code_of_conduct_file: GitHubFileInfo;
        contributing: GitHubFileInfo;
        pull_request_template: GitHubFileInfo;
        readme: GitHubFileInfo;
        code_of_conduct: GitHubFileInfo;
    };
    content_reports_enabled: boolean;
}
  
interface SeriesData {
  stack: string;
  data: number[];
  type: string;
}

export interface IRecentStargazingActivity {
  yAxis: {};
  xAxis: {
      data: string[];
  };
  series: SeriesData[];
}

export interface ILanguageBreakdown {
  size: number;
  percentage: number;
  name: string;
}

export interface ICommitActivity {
  total: number;
  week: number;
  days: number[];
}

export interface IRecentCommits {
  message: string;
  url: string;
  owner: string;
  repo: string;
  author_login: string;
  author_avatar_url: string;
  committed_date: string;
}

export interface ICodeFrequency {
  yAxis: {};
  xAxis: {
      data: string[];
  };
  series: SeriesData[];
}

export interface IPunchCard {
  day: number;
  hour: number;
  commits: number;
}

type IssueType = 'OPEN' | 'CLOSED';

export interface IRecentIssues {
  comments_count: number;
  number: number;
  created_at: string;
  url: string;
  owner: string;
  title: string;
  repo: string;
  author_login: string;
  updated_at: string;
  author_avatar_url: string;
  state: IssueType;
}

export interface IIssueCount {
  closed: number;
  open: number;
}

export interface IParticipation {
  xAxis: {
      type: string;
      data: string[];
  };
  yAxis: {
      type: string;
  };
  series: Array<{
      name: string;
      type: string;
      data: number[];
  }>;
}

export interface IPullRequestCount {
  closed: number;
  open: number;
}

export type PullRequestState = 'OPEN' | 'CLOSED' |'MERGED';

export interface IRecentPullRequests {
    comments_count: number;
    number: number;
    created_at: string;
    url: string;
    owner: string;
    title: string;
    repo: string;
    author_login: string;
    updated_at: string;
    author_avatar_url: string;
    state: PullRequestState;
}

export interface IRecentReleases {
    name: string;
    tag_name: string;
    repo: string;
    published_at: string;
    url: string;
    owner: string;
}

export interface IMostActiveIssues {
  closed_at: string | null;
  number: number;
  created_at: string;
  closed: boolean;
  comments_count: number;
  url: string;
  owner: string;
  title: string;
  repo: string;
  author_login: string;
  author_avatar_url: string;
  updated_at: string;
  state: IssueType
}

interface Author {
  html_url: string;
  type: string;
  node_id: string;
  id: number;
  url: string;
  login: string;
  gists_url: string;
  organizations_url: string;
  following_url: string;
  repos_url: string;
  followers_url: string;
  gravatar_id: string;
  received_events_url: string;
  subscriptions_url: string;
  avatar_url: string;
  site_admin: boolean;
  starred_url: string;
  events_url: string;
}

interface Week {
  d: number;
  a: number;
  w: number;
  c: number;
}

export interface IContributors {
  total: number;
  author: Author;
  weeks: Week[];
}

export interface IParticipationCount {
  owner: number;
  others: number;
}

export interface IIssueActivity {
  xAxis: {
      data: string[];
  };
 series: Array<{
      name: string;
      data: number[]
 }>
}

export interface IPullRequestActivity {
  xAxis: {
    data: string[];
  };
  series: Array<{
      name: string;
      data: number[]
  }>
}

export interface IHealthScore {
  total: number;
  pull_request_activity: number,
  commit_activity: number,
  contribution_activity: number,
  issue_activity: number,
  grade: string,
  release_activity: number
}
