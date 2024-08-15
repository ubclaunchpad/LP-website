"use client";
import Input from "@/components/general/input";
import { login } from "../portal/applications/auth";
import Image from "next/image";
import authService from "@/app/lib/util/auth";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const text = {
  title: "UBC Launch Pad Portal",
  apply: "Log in",
};

export default function Authpage() {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    // console.log("logging in");

    // client.collection('users').authWithOAuth2({ provider: 'google' }).then((res) => {
    //   console.log("logged in");
    //   console.log(res);
    // }
    // // authService.oAuthLogin().then((res) => {
    // //   console.log(res);
    // // }
    // ).catch((e) => {
    //   console.log(e);
    // });
    authService
      .oAuthMethods()
      .then((res) => {
        console.log(res);
        setMethods(res as []);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const loginSection = useMemo(
    () => <AuthMethods methods={methods} />,
    [methods]
  );

  return (
    <div className="flex flex-col relative shadow justify-center items-center  w-full  p-10 rounded-xl max-h-full max-w-lg h-[600px]  border-neutral-800 bg-neutral-900 gap-4">
      <Image
        src="/images/logo_circle.png"
        width={180}
        height={180}
        className="rounded-full absolute top-0 transform -translate-y-1/2 border-4 border-neutral-900 shadow-lg hover:scale-105 transition-transform duration-300"
        alt="UBC Launch Pad logo"
      />
      <span className="text-4xl flex-1 font-bold font-heading text-white pt-20 pb-10">
        {text.title}
      </span>
      {loginSection}
      <div className="flex flex-col items-center gap-4 w-full">
        <span className="text-white">or</span>
      </div>
      <form
        action={login}
        className="flex flex-col justify-end items-center  w-full max-h-full  gap-4"
      >
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
          className="bg-white w-full flex items-center justify-center text-black font-bold rounded-md h-fit px-8 text-md p-2"
        >
          {text.apply}
        </button>
      </form>
    </div>
  );
}

function AuthMethods({
  methods,
}: {
  methods: { name: string; authUrl: string }[];
}) {
  const redirectURL = process.env.NEXT_PUBLIC_REDIRECT_URL;

  async function saveToLocalStorage(provider: {
    name: string;
    authUrl: string;
  }) {
    localStorage.setItem("provider", JSON.stringify(provider));
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {methods.map((provider) => {
        return (
          <Link
            href={provider.authUrl + redirectURL}
            key={provider.name}
            className="bg-white w-full flex items-center justify-center text-black font-bold rounded-md h-fit px-8 text-md p-2"
            onClick={() => saveToLocalStorage(provider)}
          >
            {provider.name}
          </Link>
        );
      })}
    </div>
  );
}
