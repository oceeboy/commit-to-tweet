/** Shared author / committer shape */
export type GitHubCommitUser = {
  name: string;
  email: string;
  username?: string;
  date?: string;
};

/** A single commit in `commits[]` */
export type GitHubCommit = {
  id: string;
  tree_id: string;
  distinct: boolean;
  message: string;
  timestamp: string;
  url: string;
  author: GitHubCommitUser;
  committer: GitHubCommitUser;
  added: string[];
  removed: string[];
  modified: string[];
};

/** Head commit (same as commit but author/committer include date) */
export type GitHubHeadCommit = GitHubCommit & {
  author: GitHubCommitUser & { date: string };
  committer: GitHubCommitUser & { date: string };
};

/** Minimal push webhook focused on commits */
export type GitHubPushWebhookCommitsOnly = {
  ref: string;
  before: string;
  after: string;
  compare: string;
  commits: GitHubCommit[];
  head_commit: GitHubHeadCommit | null;
};
