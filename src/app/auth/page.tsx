import Image from "next/image";
import { login } from "./actions";
import { Button } from "@/components/primitives/button";

const text = {
  title: "UBC Launch Pad Portal",
  login: "Log in With Google",
};

export default function Authpage() {
  return (
    <div className="flex flex-col relative shadow justify-center items-center  w-full  p-10 rounded-xl max-h-full max-w-lg h-[600px]    gap-4">
      <Image
        src="/images/logo_circle.png"
        width={180}
        height={180}
        className="rounded-full absolute top-0 transform -translate-y-1/2 border-4 border-neutral-900 shadow-lg hover:scale-105 transition-transform duration-300"
        alt="UBC Launch Pad logo"
      />
      <span className="text-4xl  font-bold font-heading text-white pt-20 pb-10">
        {text.title}
      </span>
      <div className="flex flex-col items-center gap-4 w-full"></div>
      <form
        action={login}
        className="flex flex-col justify-end items-center  w-full max-h-full  gap-4"
      >
        <Button
          className={
            "bg-white w-full flex items-center justify-center text-black font-bold rounded-md h-fit px-8 text-md p-2"
          }
          formAction={login}
        >
          {text.login}
        </Button>
      </form>
    </div>
  );
}
