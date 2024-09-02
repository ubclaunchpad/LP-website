import Image from "next/image";
import Link from "next/link";
import { bottomFooterLinks, footerLinks } from "@/lib/data/generalData";

const logo = "/icons/logoVariants/logoPrimaryWithText.svg";
const text = {
  copyright: "Launch Pad © 2024",
  subheading: "Leading Software Engineering Club",
};

export default function FooterSection() {
  return (
    <section
      id={"contact"}
      className="flex flex-col items-center py-10 relative gap-10 text-center bg-[#3A3543] min-h-[200px] z-20 px-20 w-full "
    >
      <div
        className={
          "flex md:flex-row flex-col justify-between w-full text-left gap-4 text-[#F5F6FF]  z-40"
        }
      >
        <div
          className={
            "flex flex-col items-center md:items-start w-full gap-4 max-w-3xl"
          }
        >
          <a href="/">
            <Image src={logo} alt="Logo" width={256} height={85} unoptimized />
          </a>
          <p className={"opacity-70 hidden sm:block"}>{text.subheading}</p>
        </div>
        <div
          className={
            "sm:flex-row flex-col flex gap-4 pt-10 md:pt-0 justify-end opacity-70 flex-1"
          }
        >
          {footerLinks.map((section, index) => (
            <div
              key={index}
              className={
                "flex flex-col w-full max-w-[200px] flex-shrink-0 gap-2"
              }
            >
              <h3 className={"pb-2 font-bold"}>{section.section}</h3>
              {section.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className={"text-[#F5F6FF] w-full hover:text-purple-400"}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={"w-full min-h-[1px] bg-white opacity-20"}></div>
      <div
        className={"flex gap-4 justify-between sm:flex-row flex-col  w-full"}
      >
        <div className={"flex gap-6"}>
          {bottomFooterLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={
                " text-[#F5F6FF] opacity-80 w-full hover:text-purple-400"
              }
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div
          className={
            "bg-gradient-to-r inline-block text-transparent bg-clip-text from-[#B6BDFC] to-[#809CFF]"
          }
        >
          {text.copyright}
        </div>
      </div>
    </section>
  );
}
