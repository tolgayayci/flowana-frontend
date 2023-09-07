import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

// Hooks
import useDiscourseCategories from "@/models/discourse/useDiscourseCategories";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";
import { formatDistanceToNow } from "@/utils/functions";
import { formatBadgeStatsCount } from "@/utils/functions";
import { FaMedal, FaReply, FaEye } from "react-icons/fa";

const forumInfos = {
  flow: {
    forum_url: "https://forum.onflow.org/c/",
    logo: "/flow-logo.png",
  },
  compound: {
    forum_url: "https://www.comp.xyz/c/",
    logo: "/compound-logo.png",
  },
  polkadot: {
    forum_url: "https://forum.polkadot.network/c/",
    logo: "/polkadot-logo.jpg",
  },
  lens: {
    forum_url: "#",
    logo: "/lens-logo.jpg",
  },
};

function CountIcon({ icon, count, tooltip, id }) {
  return (
    <span className="w-12 justify-center items-center inline-flex z-50">
      {icon}
      <span className="ml-1">{formatBadgeStatsCount(count)}</span>

      {/* Tooltip */}
      <Tooltip id={id} place="top">
        {tooltip}
      </Tooltip>
    </span>
  );
}

export default function Categories() {
  const { discourseCategories, isLoading } = useDiscourseCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { protocol } = useProtocol();

  const forumInfo = forumInfos[protocol["protocol"]];

  useEffect(() => {
    if (discourseCategories && !selectedCategory) {
      setSelectedCategory(discourseCategories[0]);
    }
  }, [discourseCategories]);

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Category Distribution"
            tooltip="Dive into a dual-pie chart experience! The first chart showcases the main categories, and by clicking on any segment, the second chart reveals the associated subcategories. Each category and subcategory displays their respective post and topic counts, offering a comprehensive view of content distribution on the platform."
          />
        }
      />
    );
  }

  if (!discourseCategories) {
    return (
      <NoData
        element={
          <CardHeader
            title="Category Distribution"
            tooltip="Dive into a dual-pie chart experience! The first chart showcases the main categories, and by clicking on any segment, the second chart reveals the associated subcategories. Each category and subcategory displays their respective post and topic counts, offering a comprehensive view of content distribution on the platform."
          />
        }
        message=""
      />
    );
  }

  const handleChartClick = (params) => {
    const category = discourseCategories.find(
      (cat) => cat.name === params.name
    );
    setSelectedCategory(category);
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
  // const topCategories = sortedCategories.slice(0, 4);

  const mainOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    //   data: topCategories.map((cat) => cat.name),
    // },
    label: {
      show: false,
      position: "center",
    },
    labelLine: {
      show: false,
    },
    series: [
      {
        name: "Categories",
        type: "pie",
        radius: ["40%", "70%"],
        selectedMode: "single", // This allows only one item to be selected at a time
        selectedOffset: 10, // This controls the pixel distance the selected slice moves outward
        data: discourseCategories.map((cat) => ({
          value: cat.topic_count,
          name: cat.name,
          selected: selectedCategory && cat.name === selectedCategory.name, // This will mark the category as selected if it matches the selectedCategory
        })),
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.30)",
          },
        },
    
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

  const subOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "0%",
      // If subcategories are present, show their names. Otherwise, show the selected category name.
      data:
        selectedCategory &&
        selectedCategory.subcategories &&
        selectedCategory.subcategories.length > 0
          ? selectedCategory.subcategories.map((sub) => sub.name)
          : selectedCategory
          ? [selectedCategory.name]
          : [],
    },
    series: [
      {
        
        name: "Subcategories",
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            // fontSize: ,
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.30)",
          },
        },
    
        data:
          selectedCategory &&
          selectedCategory.subcategories &&
          selectedCategory.subcategories.length > 0
            ? selectedCategory.subcategories.map((sub) => ({
                value: sub.topic_count,
                name: sub.name,
              }))
            : selectedCategory
            ? [
                {
                  value: selectedCategory.topic_count,
                  name: selectedCategory.name,
                },
              ]
            : [],
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Category Distribution"
        tooltip="Dive into a dual-pie chart experience! The first chart showcases the main categories, and by clicking on any segment, the second chart reveals the associated subcategories. Each category and subcategory displays their respective post and topic counts, offering a comprehensive view of content distribution on the platform."
      />{" "}
      <div className="flex justify-between my-10">
        {/* Main Categories Chart */}
        <ReactECharts
          option={mainOption}
          onEvents={{ click: handleChartClick }}
          showLoading={isLoading}
          style={{ minHeight: "450px", width: "100%" }}
          notMerge={true}
        />

        {/* Subcategories Chart */}
        <div className="border-l-2 border-gray-600/10 w-1/3">
          <ReactECharts
            option={subOption}
            style={{ minHeight: "450px", width: "100%" }}
            notMerge={true}
          />
        </div>
      </div>
      {selectedCategory && (
        <div className="w-full">
          <ul>
            <li
              key={selectedCategory.id}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500"
            >
              <Link
                href={forumInfo.forum_url + `${selectedCategory.slug}`}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
                      src={forumInfo.logo}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-lg">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {selectedCategory.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
                        {selectedCategory.description_text}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end space-x-2 overflow-x-auto">
                    <span
                      className="bg-green-200/70 border-2 border-green-300 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                      id="topic_count"
                    >
                      <CountIcon
                        id="topic_count"
                        icon={<FaReply className="inline" />}
                        count={selectedCategory.topic_count}
                        tooltip="Topic Count"
                      />
                    </span>
                    <span
                      className="bg-red-200/70 border-2 border-red-300 text-red-800 text-xs font-semibold px-2 py-1 rounded"
                      id="post_count"
                    >
                      <CountIcon
                        id="post_count"
                        icon={<FaEye className="inline" />}
                        count={selectedCategory.post_count}
                        tooltip="Post Count"
                      />
                    </span>
                    <span
                      className="bg-purple-200/70 border-2 border-purple-300 text-purple-800 text-xs font-semibold px-2 py-1 rounded"
                      id="num_featured_topics"
                    >
                      <CountIcon
                        id="num_featured_topics"
                        icon={<FaMedal className="inline" />}
                        count={selectedCategory.num_featured_topics}
                        tooltip="Number of Featured Topics"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Layout>
  );
}
