import Link from "next/link";
import Image from "next/image";

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
        <div className="flex justify-between items-center w-full p-4 md:p-10">
  <div className="flex items-center">
	<a href="/">
    <Image 
	src="/images/logo_navbar.svg" 
	alt="Logo"
	width={180}
	height={180}
	className="h-12 pr-4 md:h-16" 
	/>
	</a>
  </div>
            <ul className="flex p-10">
			{navItems.map((item, index) => (
				<li key={index}>
					<Link href={item.url} className={"text-white px-10"}>{item.name}</Link>
				</li>
			))}
		</ul>
		</div>
	)
}