// Hooks
import useDiscourseTags from "@/models/discourse/useDiscourseTags";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function Tags() {
  const { discourseTags, isLoading } = useDiscourseTags();

  return (
    <Layout>
      <CardHeader title="Discourse Tags" />
      {JSON.stringify(discourseTags)}
    </Layout>
  );
}
