import Link from "next/link";
import Image from "next/image";

const logo = "/icons/logoVariants/logoPrimaryWithText.svg";

export type NavBarItem = {
  name: string;
  url: string;
};

type NavbarProps = {
  navItems: NavBarItem[];
};

// TODO: Add Mobile Hamburger Menu
export default function Navbar({ navItems }: NavbarProps) {
  return (
    <nav className={"flex justify-between items-center w-full p-6"}>
      <a href="/">
      <Image src={logo} alt="Logo" width={141} height={49} unoptimized />
      </a>
      <ul className=" justify-between  gap-12 items-center hidden lg:flex">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.url} className={"text-white hover:text-violet-400"}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
