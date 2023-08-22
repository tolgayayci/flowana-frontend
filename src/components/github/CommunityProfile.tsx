import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

//Hooks
import useCommunityProfile from "@/models/github/useCommunityProfile";

export default function CommunityProfile() {
  const { communityProfile, isLoading } = useCommunityProfile();

  if (isLoading) {
    return <CardLoader element={<CardHeader title="Community Profile" />} />;
  }

  if (!communityProfile)
    return (
      <NoData element={<CardHeader title="Community Profile" />} message="" />
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
      <CardHeader title="Community Profile" />
      <div className="flex items-center space-x-12">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-1/3">
          {/* Display Health Percentage */}
          <div className="mb-8">
            <div className="w-full h-16 rounded-lg bg-sfgreen-600 border-2 border-sfgreen-900 text-white flex items-center justify-center text-lg font-bold px-8">
              Score: {health_percentage}%
            </div>
          </div>

          {/* Display Other Details */}
          <div className="flex-grow">
            <p className="mb-2 text-center">{description}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col space-y-4 w-2/3">
          <ul className="divide-y divide-sfred-700">
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
                      className="w-6 h-6 mr-4 text-green-500"
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
                      className="bg-sfgreen-600 border-2 border-sfgreen-800 text-white px-3 text-sm rounded-md hover:underline mr-4"
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
