import Link from "next/link";
import React from "react";
import Image from "next/image";

export type InaccessiblePageWrapperProps = {
  links: {
    href: string;
    label: string;
  }[];
  children?: React.ReactNode;
};

export default function InaccessiblePageWrapper({
  links,
  children,
}: InaccessiblePageWrapperProps) {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center">
      <Link
        href={"/"}
        className={
          "rounded-full absolute  top-0 left-4 transform  border-4 border-primary  z-40"
        }
      >
        <Image
          src="/images/logo_circle.png"
          width={80}
          height={80}
          className=""
          alt="UBC Launch Pad logo"
        />
      </Link>
      <div className={"fixed space-flow top-0 left-0 w-screen h-screen"}>
        <div className={"w-[300px]  h-[300px] absolute  right-10 top-0"}>
          <Image
            src={"/images/assets/planet1.svg"}
            alt={"planet"}
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
        <div className={"w-[267px] h-[200px] absolute  left-40 bottom-10"}>
          <Image
            src={"/images/assets/planet2.svg"}
            alt={"planet"}
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
        <Image
          src={"/images/assets/starsBg.svg"}
          alt={"planet"}
          layout={"fill"}
          objectFit={"cover"}
        />
      </div>
      <div className="text-4xl flex-col flex gap-6 justify-center items-center">
        <div
          className={
            "  z-40 border-background-600  p-10 rounded-xl flex-col w-full max-w-4xl flex gap-10 justify-center items-center"
          }
        >
          {children}
        </div>
        <div className={"flex  flex-col w-full items-center gap-4 "}>
          {links.map((link) => (
            <Link
              key={link.href}
              className="text-2xl white-glow w-fit bg-white  rounded-full z-10 p-1 px-4 text-black hover:scale-110 duration-300"
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

export function Unauthorized() {
  return (
    <InaccessiblePageWrapper
      links={[
        {
          href: "/auth",
          label: "Login",
        },
      ]}
    >
      <div className="text-4xl flex-col flex gap-10 justify-center items-center">
        <div className=" z-40   p-4 rounded-xl flex-col w-full max-w-4xl flex gap-10 justify-center items-center">
          <h1 className={""}>Unauthorized</h1>
          <p className="text-2xl">You are not authorized to access this page</p>
        </div>
      </div>
    </InaccessiblePageWrapper>
  );
}

export function NotFoundPage() {
  return (
    <InaccessiblePageWrapper
      links={[
        {
          href: "/",
          label: "Home",
        },
      ]}
    >
      <div className="text-4xl flex-col flex gap-10 justify-center items-center">
        <div className=" z-40 border-background-600  p-10 rounded-xl flex-col w-full max-w-4xl flex gap-10 justify-center items-center">
          <h1 className={""}>Page Not Found</h1>
          <p className="text-2xl">
            The page you are looking for does not exist
          </p>
        </div>
      </div>
    </InaccessiblePageWrapper>
  );
}
