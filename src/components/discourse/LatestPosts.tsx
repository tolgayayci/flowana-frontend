// Hooks
import useDiscourseLatestPosts from "@/models/discourse/useDiscourseLatestPosts";
// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function LatestPosts() {
  const { latestPosts, isLoading } = useDiscourseLatestPosts();

  return (
    <Layout>
      <CardHeader title="Discourse Latest Posts" />
      {JSON.stringify(latestPosts)}
    </Layout>
  );
}
