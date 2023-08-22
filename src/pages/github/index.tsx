import Head from "next/head";

// Sidebar
import Sidebar from "@/modules/Sidebar/Sidebar";
import Loader from "@/modules/Loader/Loader";

// Github Ecosystem Components
import CodeFrequency from "@/components/githubCumulative/CodeFrequency";
import CommitActivity from "@/components/githubCumulative/CommitActivity";
import IssueCount from "@/components/githubCumulative/IssueCount";
import LanguageBreakdown from "@/components/githubCumulative/LanguageBreakdown";
import MostActiveIssues from "@/components/githubCumulative/MostActiveIssues";
import Participation from "@/components/githubCumulative/Participation";
import PullRequestCount from "@/components/githubCumulative/PullRequestCount";
import PunchCard from "@/components/githubCumulative/PunchCard";
import RecentCommits from "@/components/githubCumulative/RecentCommits";
import RecentIssues from "@/components/githubCumulative/RecentIssues";
import RecentPullRequests from "@/components/githubCumulative/RecentPullRequests";
import RecentReleases from "@/components/githubCumulative/RecentReleases";
import Stats from "@/components/githubCumulative/Stats";

// Heroicons
import {
  ChartPieIcon,
  ChartBarIcon,
  HomeIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export default function Github() {
  const navigation = [
    {
      name: "Stats",
      href: "#stats",
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Commit Activity",
      href: "#commit-activity",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Participation",
      href: "#participation",
      icon: ChartBarIcon,
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
      name: "Language Breakdown",
      href: "#language-breakdown",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Issue Count",
      href: "#issue-count",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Most Active Issues",
      href: "#most-active-issues",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Pull Request Count",
      href: "#pull-request-count",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Recent Issues",
      href: "#recent-issues",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Recent Pull Requests",
      href: "#recent-pull-requests",
      icon: ListBulletIcon,
      current: false,
    },
    {
      name: "Recent Commits",
      href: "#recent-commits",
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
        <title>GitHub - Flowana</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className="max-w-[90%] mx-auto mb-8 -mt-8 px-4 sm:px-6 lg:px-8 py-1">
        <div className="grid grid-cols-5 gap-12">
          <div className="md:col-span-1 md:block hidden">
            <Sidebar navigation={navigation} element />
          </div>
          <div className="md:col-span-4 col-span-5">
            <div className="flex flex-wrap space-y-10">
              <div id="stats" className="w-full">
                <Stats />
              </div>
              <div id="commit-activity" className="w-full">
                <CommitActivity />
              </div>
              <div className="flex space-x-10 w-full">
                <div id="recent-commits" className="w-full sm:w-2/3">
                  <RecentCommits />
                </div>
                <div id="language-breakdown" className="w-full md:w-1/3">
                  <LanguageBreakdown />
                </div>
              </div>
              <div id="punch-card" className="w-full">
                <PunchCard />
              </div>
              {/* <div id="code-frequency" className="w-full">
                <CodeFrequency />
              </div> */}
              <div className="flex space-x-10 w-full">
                <div id="recent-issues" className="w-full sm:w-2/3 h-full">
                  <RecentIssues />
                </div>
                <div id="issue-count" className="w-full sm:w-1/3 h-full">
                  <IssueCount />
                </div>
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
