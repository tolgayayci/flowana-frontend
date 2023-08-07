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
      <div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JSON.stringify(discourseTags)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
