import CodeFrequency from "@/components/github/CodeFrequency";
import CommitActivity from "@/components/github/CommitActivity";
import CommunityProfile from "@/components/github/CommunityProfile";
import IssueCount from "@/components/github/IssueCount";
import LanguageBreakdown from "@/components/github/LanguageBreakdown";
import MostActiveIssues from "@/components/github/MostActiveIssues";
import Participation from "@/components/github/Participation";
import PullRequestCount from "@/components/github/PullRequestCount";
import PunchCard from "@/components/github/PunchCard";
import RecentCommits from "@/components/github/RecentCommits";
import RecentIssues from "@/components/github/RecentIssues";
import RecentPullRequests from "@/components/github/RecentPullRequests";
import RecentReleases from "@/components/github/RecentReleases";
import RecentStargazingActivity from "@/components/github/RecentStargazingActivity";
import RepositoryInfo from "@/components/github/RepositoryInfo";

export default function Projects() {
  return (
    <div>
      <CodeFrequency />
      <CommitActivity />
      <CommunityProfile />
      <IssueCount />
      <LanguageBreakdown />
      <MostActiveIssues />
      <Participation />
      <PullRequestCount />
      <PunchCard />
      <RecentCommits />
      <RecentIssues />
      <RecentPullRequests />
      <RecentReleases />
      <RecentStargazingActivity />
      <RepositoryInfo />
    </div>
  );
}
