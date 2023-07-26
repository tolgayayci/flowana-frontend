// Hooks
import useDiscourseCategories from "@/models/discourse/useDiscourseCategories";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function Categories() {
  const { discourseCategories, isLoading } = useDiscourseCategories();

  return (
    <Layout>
      <CardHeader title="Discourse Categories" />
      {JSON.stringify(discourseCategories)}
    </Layout>
  );
}
