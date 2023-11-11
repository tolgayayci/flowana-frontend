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
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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

    const refsSnapshot = sectionRefs.current; // Capture the current value
    navigation.forEach((item) => {
      const section = refsSnapshot[item.href] as HTMLElement | null;
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      Object.values(refsSnapshot).forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [navigation]);

  function smoothScrollToSection(href: string) {
    const section = document.querySelector(href) as HTMLElement | null;
    if (section) {
      const topPosition = section.offsetTop - 180; // OFFSET to account for any header/nav bar height
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  }

  return (
    <>
      <div className={`w-full ${element ? "mb-0 md:mb-6" : ""}`}>{element}</div>
      <div className="sticky top-[180px]">
        <div className="h-auto shadow-xl p-8 border-2  border-main tracking-wide rounded-2xl hidden md:block">
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
                          item.href === `#${currentSection}`
                            ? "bg-[#3C4D6E] text-white"
                            : "text-sfblue-900 hover:text-white hover:bg-[#3C4D6E]",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-[420]"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.href === `#${currentSection}`
                              ? "text-white"
                              : "text-[#3C4D6E] group-hover:text-white",
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
