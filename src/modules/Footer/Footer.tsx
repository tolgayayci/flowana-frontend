import Image from "next/image";
import { FaTwitter, FaGithub, FaMailBulk } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-main mt-24">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <Image
                src="/yk-logo.svg"
                className="h-32 mr-3"
                alt="YK Labs Logo"
                width={90}
                height={90}
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Ecosystems
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="/flow/projects"
                    className="hover:underline"
                    target="_blank"
                  >
                    Flow
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="/lens/projects"
                    className="hover:underline"
                    target="_blank"
                  >
                    Lens
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="/compound/projects"
                    className="hover:underline"
                    target="_blank"
                  >
                    Compound
                  </a>
                </li>
                <li>
                  <a
                    href="/polkadot/projects"
                    className="hover:underline"
                    target="_blank"
                  >
                    Polkadot
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/yk-labs-dev"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="mailto:mert@yk-labs.com" className="hover:underline">
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white-200 sm:mx-auto dark:border-white-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2023{" "}
            <a
              href="https://yk-labs.com/"
              className="hover:underline"
              target="_blank"
            >
              YK Labs
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="#" className="text-white dark:hover:text-gray-500">
              <FaTwitter />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="https://github.com/yk-labs-dev"
              className="text-white dark:hover:text-gray-500"
            >
              <FaGithub />
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              href="mailto:mert@yk-labs.com"
              className="text-white dark:hover:text-gray-500"
            >
              <FaMailBulk />
              <span className="sr-only">Mail Address</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
