import Link from "next/link";
import UserBubble from "@/components/portal/userBubble";

export type Tab = {
  label: string;
  route: string;
};
export type TabViewProps = {
  tabs: Tab[];
  children: React.ReactNode;
  selectedTab?: string;
};

// function isActive(id: string, selectedTab?: string) {
//    return id === selectedTab
// }

export default function TabView({ tabs, children }: TabViewProps) {
  // const activeTab = tabs.find(tab => isActive(tab.route, selectedTab)) || tabs[0]

  return (
    <div
      className={
        "flex flex-col gap-4 flex-1 w-full min-h-screen  bg-background-950 "
      }
    >
      <div className="flex justify-between items-center gap-2 border-background-600 border-b">
        <div className="flex flex-row w-full gap-1   px-2 pt-2">
          {tabs.map((tab, index) => {
            return (
              <Link
                href={tab.route}
                key={index}
                className="bg-background-800 border-t border-x p-4 py-2 border-background-600 rounded-t-xl"
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
        <div className={"flex flex-row gap-2"}>
          <UserBubble />
        </div>
      </div>
      <section className={"flex flex-col gap-4 flex-1  py-1"}>
        {/*<h2 className="text-xl font-heading px-4 text-left text-white">*/}
        {/*    {activeTab.label}*/}
        {/*</h2>*/}
        {children}
      </section>
    </div>
  );
}
