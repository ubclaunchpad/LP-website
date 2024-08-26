import Link from "next/link";

export type NotFoundProps = {
  links: {
    href: string;
    label: string;
  }[];
};

export default function NotFoundWrapper({ links }: NotFoundProps) {
  return (
    <div className="w-screen h-screen bg-background-900 flex justify-center items-center">
      <div className="text-4xl flex-col flex gap-10 justify-center items-center">
        <h1>No Signal Here 📡</h1>
        <div className={"flex flex-col w-full gap-4 "}>
          {links.map((link) => (
            <Link
              key={link.href}
              className="text-2xl w-fit bg-lp-400 rounded p-1 px-4 text-black hover:scale-110 transition-transform"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
