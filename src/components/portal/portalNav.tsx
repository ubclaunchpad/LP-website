import Link from "next/link";
import UserBubble from "./userBubble";
import Image from "next/image";

const PortalNavbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 py-2   border-neutral-800  z-50">
      <Link className="flex items-center gap-4" href="/">
        <Image
          src="/images/logo_circle.png"
          width={24}
          height={24}
          className="rounded-full  border-neutral-700 border shadow-lg hover:scale-105 transition-transform duration-300"
          alt="UBC Launch Pad logo"
        />
        <span className="text-white text-heading font-medium">
          UBC Launch Pad Portal
        </span>
      </Link>
      <UserBubble />
    </nav>
  );
};

export default PortalNavbar;
