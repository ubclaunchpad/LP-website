import Image from "next/image";
import { login } from "./actions";
import { Button } from "@/components/primitives/button";

const text = {
  title: "Launch Pad Portal",
  login: "Log in With Google",
};

export default function Authpage() {
  return (
    <div className="flex flex-col relative shadow justify-center items-center  w-full  p-10 rounded-xl max-h-full max-w-lg h-[600px]    gap-10">
      <div className="flex flex-col items-center gap-4 w-full"></div>
      <form
        action={login}
        className="flex flex-col justify-end items-center  w-full max-h-full  gap-4"
      >
        <Button
          className={
            "text-2xl white-glow w-fit bg-white  rounded-full z-10 p-1 px-8 text-black hover:scale-110 transition-all duration-300"
          }
          formAction={login}
        >
          {text.login}
        </Button>
      </form>
    </div>
  );
}
