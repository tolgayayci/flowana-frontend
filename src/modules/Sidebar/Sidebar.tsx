import React, { useState, useRef, useEffect } from "react";
import { INavigationItem } from "@/types/general";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({
  navigation,
  element,
}: {
  navigation: INavigationItem[];
  element: React.ReactNode | null;
}) {
  const [currentSection, setCurrentSection] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    navigation.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        sectionRefs.current[item.href] = section;
        observer.observe(section);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [navigation]);

  function smoothScrollToSection(href: string) {
    const section = document.querySelector(href);
    if (section) {
      const topPosition = section.offsetTop - 180; // OFFSET to account for any header/nav bar height
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  }

  return (
    <>
      <div className={`w-full ${element ? "mb-6" : null}`}>{element}</div>
      <div className="sticky top-[180px]">
        <div className=" h-auto shadow-xl p-8 border-2  border-sfblue-800 tracking-wide rounded-2xl">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          smoothScrollToSection(item.href);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-sfblue-800 text-white"
                            : "text-sfblue-900 hover:text-white hover:bg-sfblue-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-[420]"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-sfred-700 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <span className="ml-1">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
