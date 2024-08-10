import Input from "@/components/general/input";
import { login } from "../applications/auth";

const text = {
  title: "UBC Launch Pad Portal",
  apply: "Log in",
};

export default async function page() {
  return (
    <div className="w-screen h-screen bg-neutral-950  ">
      <div className="flex flex-col items-center justify-center h-full m gap-10 w-full">
        <form
          action={login}
          className="flex flex-col justify-center items-center border w-full max-h-full max-w-xl h-[600px] rounded border-neutral-800 bg-neutral-900 gap-4"
        >
          <span className="text-xl font-heading text-white py-10">
            {text.title}
          </span>
          <Input
            className="w-full bg-neutral-800 p-2"
            name="email"
            type="email"
            placeholder="email"
          />
          <Input
            className="w-full bg-neutral-800 p-2"
            name="password"
            type="password"
            placeholder="password"
          />
          <button
            type="submit"
            className="bg-white w-full text-black  px-8 text-xl p-1"
          >
            {text.apply}
          </button>
        </form>
      </div>
    </div>
  );
}
