"use client";

import Link from "next/link";
import { createContext, ReactNode, useState } from "react";
import { FormFields } from "@/app/portal/admin/forms/[id]/submissions/columns";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export type Tab = {
  label: string;
  route: string;
};
export type TabViewProps = {
  tabs: Tab[];
  children: ReactNode;
  form: { rawForm: any; formFields: FormFields; submissions: any[] };
};

function isActive(id: string, selectedTab?: string) {
  return id === selectedTab;
}

export const formContext = createContext(
  {} as { rawForm: any; formFields: FormFields; submissions: any[] },
);

export default function FormTabView({ tabs, children, form }: TabViewProps) {
  const pathname = usePathname();
  const [formState] = useState(form);

  return (
    <formContext.Provider value={formState}>
      <div className={"flex flex-col gap-4 flex-1 w-full min-h-screen  "}>
        <div className="flex justify-between items-center gap-2 border-background-500 border-b">
          <div className="flex flex-row p-2 items-center px-4 gap-2">
            <Link
              href={"/portal/admin/forms"}
              className={
                "  p-0.5 hover:border-lp-500 hover:text-lp-500 border  rounded-full border-transparent font-heading"
              }
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-lg flex-1 flex-shrink-0 font-medium font-heading">
              {form.rawForm.title}
            </h1>
          </div>
          <div className="flex flex-row  gap-1  px-2 pt-2">
            {tabs.map((tab, index) => {
              return (
                <Link
                  href={tab.route}
                  key={index}
                  className={` border-t border-x p-4 py-2 border-background-500 rounded-t-xl ${
                    isActive(tab.route, pathname)
                      ? "bg-lp-400"
                      : "bg-background-500 hover:bg-background-400"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
        <section className={"flex flex-col gap-4 flex-1  py-1"}>
          {children}
        </section>
      </div>
    </formContext.Provider>
  );
}
