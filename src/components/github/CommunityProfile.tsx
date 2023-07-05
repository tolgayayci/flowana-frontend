import useCommunityProfile from "@/models/github/useCommunityProfile";
export default function CommunityProfile() {
  const { communityProfile } = useCommunityProfile("polkadot");

  return (
    <div>
      <h1>Community Profile</h1>
      {JSON.stringify(communityProfile, null, 2)}
    </div>
  );
}
