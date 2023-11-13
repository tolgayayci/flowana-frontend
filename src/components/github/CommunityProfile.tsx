import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { AiFillRocket } from "react-icons/ai";

//Hooks
import useCommunityProfile from "@/models/github/useCommunityProfile";

export default function CommunityProfile() {
  const { communityProfile, isLoading } = useCommunityProfile();

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Community Profile"
            tooltip="Displays key components of the protocol's community structure along with a health score. This score encapsulates the robustness of the community's guidelines and resources."
          />
        }
      />
    );
  }

  if (!communityProfile)
    return (
      <NoData
        element={
          <CardHeader
            title="Community Profile"
            tooltip="Displays key components of the protocol's community structure along with a health score. This score encapsulates the robustness of the community's guidelines and resources."
          />
        }
        message=""
      />
    );

  const { health_percentage, updated_at, documentation, description, files } =
    communityProfile;

  function capitalizeFirstLetter(str: string) {
    return str
      .replace(/(?:^|\s|_)\w/g, function (match) {
        return match.toUpperCase();
      })
      .replace(/_/g, " ");
  }

  return (
    <Layout>
      <CardHeader
        title="Community Profile"
        tooltip="Displays key components of the protocol's community structure along with a health score. This score encapsulates the robustness of the community's guidelines and resources."
      />{" "}
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-12 mt-8">
        {" "}
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/4 mb-4 md:mb-0">
          {/* Display Health Percentage */}
          <div className="mb-2 md:mb-8 w-full">
            <div
              className="w-full h-16 rounded-xl md:rounded-lg border-2 border-sfgreen-900 text-white flex items-center justify-center text-lg font-bold px-8"
              style={{ backgroundColor: "#455e8d" }}
            >
              <span className="inline-flex items-center justify-center mr-1">
                <AiFillRocket />
              </span>
              {health_percentage}%
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col space-y-4 w-full md:w-3/4">
          {" "}
          <ul
            className="divide-y divide-opacity-50"
            style={{ borderColor: "#5978b8" }}
          >
            {" "}
            {Object.keys(files)
              .sort((a, b) => (files[b] ? 1 : -1))
              .map((key) => (
                <li
                  key={key}
                  className="flex items-center py-3 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                >
                  {files[key] ? (
                    // SVG for existing files (checkmark)
                    <svg
                      className="w-6 h-6 mr-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    // SVG for non-existing files (cross or "X")
                    <svg
                      className="w-6 h-6 mr-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  )}
                  <span className="flex-grow">
                    {capitalizeFirstLetter(key.replace(/_/g, " "))}
                  </span>{" "}
                  {files[key] && (
                    <a
                      href={files[key].html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-white px-3 text-sm rounded-md hover:underline mr-4"
                      style={{ backgroundColor: "#5c7cd9" }}
                    >
                      View
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
