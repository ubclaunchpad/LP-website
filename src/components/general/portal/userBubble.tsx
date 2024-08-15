"use client";

import { userContext } from "@/app/lib/context/usercontext";
import { useContext } from "react";

export default function UserBubble() {
  const { user } = useContext(userContext);

  return (
    <div className="flex items-center gap-2 border p-1 px-2 rounded-full border-neutral-700 ">
      <span>{user.email}</span>
    </div>
  );
}
