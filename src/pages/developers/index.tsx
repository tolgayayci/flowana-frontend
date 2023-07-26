import DevTypeTable from "@/components/developers/DevTypeTable";
import FullTime from "@/components/developers/FullTime";
import MonthlyActiveDevs from "@/components/developers/MonthlyActiveDevs";
import TotalCommits from "@/components/developers/TotalCommits";
import TotalRepos from "@/components/developers/TotalRepos";
import MonthlyCommitsByDevTypeChart from "@/components/developers/MonthlyCommitsByDevTypeChart";
import MonthlyActiveDevChart from "@/components/developers/MonthlyActiveDevChart";
import MonthlyCommitsChart from "@/components/developers/MonthlyCommitsChart";
import TotalMonthlyActiveDevChart from "@/components/developers/TotalMonthlyActiveDevChart";

export default function Developers() {
  return (
    <section className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-1">
      <FullTime />
      <MonthlyActiveDevs />
      <TotalCommits />
      <TotalRepos />
      <DevTypeTable />
      {/* <TotalMonthlyActiveDevChart /> */}
      {/* <MonthlyCommitsByDevTypeChart /> */}
      {/* <MonthlyActiveDevChart /> */}
      {/* <MonthlyCommitsChart /> */}
    </section>
  );
}
