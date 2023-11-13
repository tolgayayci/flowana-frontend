import Image from "next/image";

// Hooks
import useRepositoryInfoModel from "@/models/github/useRepositoryInfo";

export default function SideInfo() {
  const { repositoryInfo } = useRepositoryInfoModel();

  return (
    <div className="border-2 border-sfblue-800 bg-sfblue-400 text-sfblue-900 rounded-2xl p-5 h-full shadow-xl bg-white-100">
      <div className="flex items-center xl:flex-col 2xl:flex-row">
        <Image
          unoptimized
          src={repositoryInfo?.owner_avatar_url as string}
          alt="Owner Avatar"
          className="rounded-lg mr-6 xl:mr-0 2xl:mr-4 mb-0 xl:mb-3 2xl:mb-0"
          width={64}
          height={64}
        />
        <div className="text-left xl:text-center 2xl:text-left w-full truncate">
          <div className="w-full">
            <p className="text-xl font-semibold truncate w-full mb-1">
              {repositoryInfo?.repo}
            </p>
          </div>
          <p className="text-gray-500">{repositoryInfo?.owner_login}</p>
          <a
            href={repositoryInfo?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="items-center mt-2.5 bg-side border-2 border-main text-main px-3 py-0.5 rounded-xl text-sm font-semibold inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
              className="mr-1"
            >
              <path
                fillRule="evenodd"
                d="M8 0a8 8 0 00-2.534 15.589c.4.074.547-.173.547-.384l-.006-1.356c-2.227.484-2.695-1.072-2.695-1.072-.364-.923-.888-1.17-.888-1.17-.726-.496.054-.486.054-.486.803.057 1.225.826 1.225.826.714 1.224 1.874.87 2.33.665.072-.518.28-.87.508-1.07-1.779-.201-3.644-.89-3.644-3.974 0-.878.314-1.593.826-2.155-.084-.2-.358-.99.078-2.066 0 0 .653-.21 2.14.8a7.546 7.546 0 012 0c1.487-1.01 2.14-.8 2.14-.8.437 1.076.162 1.866.078 2.066.51.562.82 1.277.82 2.155 0 3.092-1.868 3.77-3.65 3.966.287.248.54.737.54 1.484l-.007 2.198c0 .213.143.46.55.383A8 8 0 008 0z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
