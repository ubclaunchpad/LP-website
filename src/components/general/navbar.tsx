import Link from "next/link";

type NavBarItem = {
	name: string;
	url: string;
}

const navItems: NavBarItem[] = [
	{
		name: "About",
		url: "#about"
	},
	{
		name: "Projects",
		url: "#projects"
	},
	{
		name: "Be a Partner",
		url: "#partner"
	},
	{
		name: "Our Team",
		url: "#team"
	},
	{
		name: "FAQ",
		url: "#faq"
	},
	{
		name: "Contact",
		url: "#contact"
	}
]

export default function Navbar() {
	return (
		<ul className="flex justify-between p-10 gap-10 items-center">
			{navItems.map((item, index) => (
				<li key={index}>
					<Link href={item.url} className={"text-white px-10"}>{item.name}</Link>
				</li>
			))}
		</ul>
	)
}