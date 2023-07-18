// Widgets
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

// Helper Components
import Custom404 from "@/pages/404";
import Loader from "@/modules/Loader/Loader";

// Models
import useRepositoryInfoModel from "@/models/github/useRepositoryInfo";

export default function Projects() {
  const { repositoryInfo, isLoading } = useRepositoryInfoModel("polkadot");

  if (isLoading) return <Loader />;
  if (!repositoryInfo) return <Custom404 />;

  return (
    <div className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-1">
      <div className="flex flex-wrap space-y-4">
        <div className="w-full">
          <RepositoryInfo />
        </div>
        <div className="w-full sm:w-1/2"></div>
        <div className="w-full sm:w-1/2">
          <CommunityProfile />
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-full sm:w-2/3">
            <RecentStargazingActivity />
          </div>
          <div className="w-full sm:w-1/3">
            <LanguageBreakdown />
          </div>
        </div>
        <div className="w-full">
          <CommitActivity />
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-full sm:w-2/3">
            <RecentCommits />
          </div>
          <div className="w-full sm:w-1/3"></div>
        </div>
        <div className="w-full"></div>
        <div className="w-full">
          <CodeFrequency />
        </div>
        <div className="w-full">
          <PunchCard />
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-full sm:w-2/3">
            <RecentIssues />
          </div>
          <div className="w-full sm:w-1/3">
            <IssueCount />
          </div>
        </div>
        <div className="w-full">
          <Participation />
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-full sm:w-1/3">
            <PullRequestCount />
          </div>
          <div className="w-full sm:w-2/3">
            <RecentPullRequests />
          </div>
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-full sm:w-1/3">
            <RecentReleases />
          </div>
          <div className="w-full sm:w-2/3">
            <MostActiveIssues />
          </div>
        </div>
      </div>
    </div>
  );
}
