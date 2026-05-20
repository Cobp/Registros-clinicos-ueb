import Link from "next/link";
import { routerLinks } from "@/content/router-links";

export default function SideBar() {
  return (
    <aside data-slot="sidebar" className="lg:relative lg:col-span-1 lg:row-span-3 hidden lg:block rounded-xl h-full">
      <div className="sticky top-4 z-10">
        <div className="flex items-center h-12 bg-secondary mb-4 rounded-xl col-primary p-2.5 gap-2.5">
          <svg
            className="shrink-0 text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            width="1.75rem"
            height="1.75rem"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15s-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5"
              clipRule="evenodd"
            />
          </svg>
          <p className="flex flex-col text-xs">
            <span className="font-medium">Maria José Villarroel Barja</span>
            <span className="text-neutral-400">Villarroelbmj@ueb.edu.bo</span>
          </p>
        </div>
        <p className="text-sm font-medium text-neutral-400 pb-2">Principal</p>
        {routerLinks.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className="flex items-center gap-2 text-sm font-medium rounded-xl text-neutral-400 p-2 px-3 transition border border-transparent hover:bg-neutral-200"
          >
            <link.icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
