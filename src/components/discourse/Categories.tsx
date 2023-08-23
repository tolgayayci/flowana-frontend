import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import useDiscourseCategories from "@/models/discourse/useDiscourseCategories";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Categories() {
  const { discourseCategories, isLoading } = useDiscourseCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) {
    return <CardLoader element={<CardHeader title="Categories" />} />;
  }

  if (!discourseCategories) {
    return <NoData element={<CardHeader title="Categories" />} message="" />;
  }

  const handleChartClick = (params) => {
    const category = discourseCategories.find(
      (cat) => cat.name === params.name
    );
    if (
      category &&
      category.subcategories &&
      category.subcategories.length > 0
    ) {
      setSelectedCategory(category);
    }
  };

  const isClickable = (categoryName) => {
    const category = discourseCategories.find(
      (cat) => cat.name === categoryName
    );
    return (
      category && category.subcategories && category.subcategories.length > 0
    );
  };

  // Sort the categories by topic_count in descending order
  const sortedCategories = [...discourseCategories].sort(
    (a, b) => b.topic_count - a.topic_count
  );

  // Get the top 5 categories for the legends
  const topCategories = sortedCategories.slice(0, 5);

  const mainOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: topCategories.map((cat) => cat.name),
    },
    series: [
      {
        name: "Categories",
        type: "pie",
        data: discourseCategories.map((cat) => ({
          value: cat.topic_count,
          name: cat.name,
        })),
        label: {
          formatter: (params) => {
            return isClickable(params.name) ? `${params.name} ➔` : params.name;
          },
          rich: {
            a: {
              fontSize: 16,
              padding: [0, 5, 0, 0],
            },
          },
        },
      },
    ],
  };

  const subOption = selectedCategory
    ? {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "Subcategories",
            type: "pie",
            data: selectedCategory.subcategories.map((sub) => ({
              value: sub.topic_count,
              name: sub.name,
            })),
          },
        ],
      }
    : null;

  return (
    <Layout>
      <CardHeader title="Categories" />
      {/* Wrapping div for flexbox */}
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mb-8"
      >
        {/* Main Categories Chart */}
        <ReactECharts
          option={mainOption}
          onEvents={{ click: handleChartClick }}
          showLoading={isLoading}
          style={{
            minHeight: "350px",
            width: selectedCategory ? "50%" : "100%",
          }}
          notMerge={true}
        />

        {/* Subcategories Chart */}
        {selectedCategory && (
          <div
            style={{ width: "50%", marginLeft: "10px" }}
            className="border-l-2 border-sfgreen-900"
          >
            <button className="ml-6" onClick={() => setSelectedCategory(null)}>
              X
            </button>
            <ReactECharts
              option={subOption}
              style={{ minHeight: "350px", width: "100%" }}
              notMerge={true}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
