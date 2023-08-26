import Head from "next/head";

// Sidebar
import Sidebar from "@/modules/Sidebar/Sidebar";
import SideInfo from "@/components/github/SideInfo";

// Github Components
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
import Contributors from "@/components/github/Contributors";
import ParticipationCount from "@/components/github/ParticipationCount";
import IssueActivity from "@/components/github/IssueActivity";
import PullRequestActivity from "@/components/github/PullRequestActivity";
import HealthScore from "@/components/github/HealthScore";

// Helper Components
import Custom404 from "@/pages/404";
import Closed404 from "@/components/github/Closed404";
import Forked404 from "@/components/github/Forked404";
import Loader from "@/modules/Loader/Loader";

// Heroicons
import {
  ChartPieIcon,
  ChartBarIcon,
  HomeIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

// Hooks
import useRepositoryInfoModel from "@/models/github/useRepositoryInfo";

export default function ProjectDetail() {
  const { repositoryInfo, isLoading } = useRepositoryInfoModel();

  if (isLoading) return <Loader />;

  if (!repositoryInfo) return <Custom404 />;

  if (repositoryInfo.isClosed) {
    return <Closed404 />;
  }

  if (repositoryInfo.is_fork) {
    return <Forked404 />;
  }

  const navigation = [
    {
      name: "Repository Info",
      href: "#repository-info",
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Recent Stargazing Activity",
      href: "#recent-stargazing-activity",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Language Breakdown",
      href: "#language-breakdown",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Health Score",
      href: "#health-score",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Community Profile",
      href: "#community-profile",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Commit Activity",
      href: "#commit-activity",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Recent Commits",
      href: "#recent-commits",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Participation Count",
      href: "#participation-count",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Contributors",
      href: "#contributors",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Code Frequency",
      href: "#code-frequency",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Punch Card",
      href: "#punch-card",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Issue Activity",
      href: "#issue-activity",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Recent Issues",
      href: "#recent-issues",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Issue Count",
      href: "#issue-count",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Pull Request Activity",
      href: "#pull-request-activity",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Pull Request Count",
      href: "#pull-request-count",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Recent Pull Requests",
      href: "#recent-pull-requests",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Participation",
      href: "#participation",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Most Active Issues",
      href: "#most-active-issues",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Recent Releases",
      href: "#recent-releases",
      icon: ListBulletIcon,
      current: false,
    },
  ];

  return (
    <>
      <Head>
        <title>
          {repositoryInfo.owner +
            "/" +
            repositoryInfo.repo +
            " - GitHub - Flowana"}
        </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className="max-w-[90%] mx-auto mb-8 -mt-8 px-4 sm:px-6 lg:px-8 py-1">
        <div className="grid grid-cols-5 gap-12">
          <div className="md:col-span-1 md:block hidden">
            <Sidebar navigation={navigation} element={<SideInfo />} />
          </div>
          <div className="md:col-span-4 col-span-5">
            <div className="flex flex-wrap space-y-10">
              <div id="repository-info" className="w-full">
                <RepositoryInfo />
              </div>
              <div className="flex space-x-10 w-full">
                <div
                  id="recent-stargazing-activity"
                  className="w-full md:w-2/3"
                >
                  <RecentStargazingActivity />
                </div>
                <div id="language-breakdown" className="w-full md:w-1/3">
                  <LanguageBreakdown />
                </div>
              </div>
              <div className="flex space-x-10 w-full">
                <div id="health-score" className="w-full sm:w-1/2">
                  <HealthScore />
                </div>
                <div id="community-profile" className="w-full sm:w-1/2">
                  <CommunityProfile />
                </div>
              </div>
              <div id="commit-activity" className="w-full">
                <CommitActivity />
              </div>
              <div className="flex space-x-10 w-full">
                <div id="recent-commits" className="w-full sm:w-2/3">
                  <RecentCommits />
                </div>
                <div id="participation-count" className="w-full sm:w-1/3">
                  <ParticipationCount />
                </div>
              </div>
              <div id="contributors" className="w-full">
                <Contributors />
              </div>
              <div id="code-frequency" className="w-full">
                <CodeFrequency />
              </div>
              <div id="punch-card" className="w-full">
                <PunchCard />
              </div>
              <div id="issue-activity" className="w-full">
                <IssueActivity />
              </div>
              <div className="flex space-x-10 w-full">
                <div id="recent-issues" className="w-full sm:w-2/3 h-full">
                  <RecentIssues />
                </div>
                <div id="issue-count" className="w-full sm:w-1/3 h-full">
                  <IssueCount />
                </div>
              </div>
              <div id="pull-request-activity" className="w-full">
                <PullRequestActivity />
              </div>
              <div className="flex space-x-10 w-full">
                <div id="pull-request-count" className="w-full sm:w-1/3 h-full">
                  <PullRequestCount />
                </div>
                <div
                  id="recent-pull-requests"
                  className="w-full sm:w-2/3 h-full"
                >
                  <RecentPullRequests />
                </div>
              </div>
              <div id="participation" className="w-full">
                <Participation />
              </div>
              <div className="flex space-x-10 w-full">
                <div id="most-active-issues" className="w-full sm:w-2/3 h-full">
                  <MostActiveIssues />
                </div>
                <div id="recent-releases" className="w-full sm:w-1/3 h-full">
                  <RecentReleases />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
