import useRepositoryInfoModel from "@/models/github/useRepositoryInfo";

export default function RepositoryInfo() {
  const { repositoryInfo } = useRepositoryInfoModel("polkadot");

  return (
    <div>
      <h1>Repository Info</h1>
      {JSON.stringify(repositoryInfo, null, 2)}
    </div>
  );
}
