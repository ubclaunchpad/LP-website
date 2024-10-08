"use client";
import { useContext } from "react";
import { userContext } from "./usercontext";
import useSWR from "swr";
import { fetcher, objectToQueryString } from "@/lib/utils/helpers";

export default function useSWRF({ url }) {
  // const {user} = useContext(userContext);
  return useSWR(url, fetcher);
}
