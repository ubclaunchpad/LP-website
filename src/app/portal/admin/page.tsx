

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
        {
            name: "Notion",
            url: "/portal/admin/notion",
        },
    ],
};



export default function page() {
  return (
    <div>
       
    </div>
  );
}