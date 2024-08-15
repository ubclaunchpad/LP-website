import Link from "next/link";

type NavItem = {
  name: string;
  url: string;
};

type Nav = {
  items: NavItem[];
};

const nav: Nav = {
  items: [
    {
      name: "Applications",
      url: "/portal/admin/applications",
    },
    
  ],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 w-full">
      <div className="p-6 border-r border-neutral-800 w-56">
        <ul className="space-y-2">
          {nav.items.map((item) => (
            <li key={item.url}>
              <Link href={item.url}>
                <p className="cursor-pointer  font-bold block hover:bg-gray-200 p-2 rounded-md">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col w-full gap-4 overflow-y-auto
      ">{children}</div>
    </div>
  );
}
