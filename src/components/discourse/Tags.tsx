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
            {discourseTags?.map((tag) => (
              <div className="bg-white rounded-lg shadow-md p-4" key={tag.id}>
                <h2 className="text-xl font-semibold mb-4">{tag.text}</h2>
                <p className="text-sm text-gray-600">Count: {tag.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
