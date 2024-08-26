"use client";

import { userContext } from "@/lib/context/usercontext";
import Image from "next/image";
import { useContext, useState, useRef } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function UserBubble() {
  const { user } = useContext(userContext);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  let width = 0;
  const ref = useRef<HTMLButtonElement>(null);

  if (ref.current) {
    width = ref.current.offsetWidth;
  }

  async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/auth");
    }
  }

  return (
    <div className="relative">
      {showMenu && (
        <div
          className="absolute top-12 right-0 bg-neutral-900 border border-neutral-800 rounded-md shadow-md text-sm overflow-hidden gap-2"
          style={{ minWidth: width, width: "fit-content" }}
        >
          <span className="block w-full p-2 text-left  rounded-md">
            {user.email}
          </span>
          {/*<span className="block w-full p-2 text-left  rounded-md">*/}
          {/*  {user.role}*/}
          {/*</span>*/}
          <button
            className="block w-full p-2 text-left bg-primary "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
      <button
        ref={ref}
        className={`flex items-center gap-2  p-2 rounded-full border-neutral-700 ${showMenu ? "bg-neutral-800" : ""}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className={`flex  items-center gap-2 `}>
          <Image
            src={"/icons/profileIcon.svg"}
            alt="user"
            width={20}
            height={20}
            className="rounded-full"
          />
        </span>
      </button>
    </div>
  );
}
