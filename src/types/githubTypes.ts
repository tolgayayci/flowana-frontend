export interface IRepositoryInfo {
    fork_count: number;
    is_fork: boolean;
    watcher_count: number;
    issue_count: number;
    commit_comment_count: number;
    release_count: number;
    owner_avatar_url: string;
    topics: string[];
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
