interface ContributionInfo {
    owner: string;
    repo: string;
    html_url: string;
    commits: number;
}
  
interface AuthorInfo {
    avatar_url: string;
    html_url: string;
    login: string;
}
  
export interface IContributors {
    contributions: Record<string, ContributionInfo>;
    author: AuthorInfo;
    total_commits: number;
}

interface RepositoryInfo {
  created_at: string;
  description: string;
  release_count: number;
  owner_login: string;
  is_empty: boolean;
  stargazer_count: number;
  categories: {
    lvl0: string[];
  };
  watcher_count: number;
  url: string;
  updated_at: string;
  owner_avatar_url: string;
  default_branch_commit_count: number;
  disk_usage: number;
  commit_comment_count: number;
  pull_request_count: number;
  environment_count: number;
  issue_count: number;
  primary_language_color: string;
  valid: boolean;
  is_archived: boolean;
  is_closed: boolean;
  fork_count: number;
  is_fork: boolean;
  primary_language_name: string;
}

interface HealthScore {
  total: number;
  pull_request_activity: number;
  commit_activity: number;
  contribution_activity: number;
  issue_activity: number;
  grade: string;
  release_activity: number;
}

export interface IProjects {
  repository_info: RepositoryInfo;
  health_score: HealthScore;
}
