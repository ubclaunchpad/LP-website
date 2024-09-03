"use client";

import Link from "next/link";
import { createContext, ReactNode, useEffect, useState } from "react";
import { FormFields } from "@/app/portal/admin/forms/[id]/submissions/columns";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export type Tab = {
  label: string;
  route: string;
};
export type TabViewProps = {
  tabs: Tab[];
  children: ReactNode;
  members: { id: string; email: string; display_name: string | undefined }[];
  form: { rawForm: any; formFields: FormFields; submissions: any[] };
};

function isActive(id: string, selectedTab?: string) {
  return id === selectedTab;
}

export const formContext = createContext(
  {} as {
    rawForm: any;
    formFields: FormFields;
    submissions: any[];
    members: any[];
    mergeNewData: (
      newData: { [p: string]: any },
      keyName: string,
      key: string,
    ) => void;
  },
);

export default function FormTabView({
  tabs,
  children,
  form,
  members,
}: TabViewProps) {
  const pathname = usePathname();
  const supabase = createClient();
  const { submissions, mergeNewData } = useRealtimeUpdate({
    supabase,
    formId: form.rawForm.id,
    data: form.submissions,
  });

  return (
    <formContext.Provider
      value={{
        rawForm: form.rawForm,
        formFields: form.formFields,
        submissions,
        members,
        mergeNewData,
      }}
    >
      <div className={"flex flex-col gap-4 flex-1 w-full min-h-screen  "}>
        <div className="flex justify-between items-center gap-2 border-background-500 border-b">
          <div className="flex flex-row p-2 items-center px-4 gap-2">
            <Link
              shallow={true}
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
          <div className="md:flex hidden flex-row  gap-1  px-2 pt-2">
            {tabs.map((tab, index) => {
              return (
                <Link
                  shallow={true}
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

function useRealtimeUpdate({
  formId,
  data,
  supabase,
}: {
  supabase: SupabaseClient<any, "public", any>;
  formId: bigint;
  data: any[];
}) {
  const [submissions, setSubmissions] = useState(data);

  function mergeNewData(
    newData: { [p: string]: any },
    keyName: string,
    key: string,
  ) {
    const newDataUpdate = submissions.map((item) => {
      if (item[keyName] === key) {
        return { ...item, ...newData };
      }
      return item;
    });
    setSubmissions(newDataUpdate);
  }

  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        `postgres_changes`,
        { event: "UPDATE", schema: "public", table: "applications" },
        (payload) => {
          const data = payload.new;
          mergeNewData(data, "id", data.id);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [formId, supabase]);

  return { submissions, setSubmissions, mergeNewData };
}
