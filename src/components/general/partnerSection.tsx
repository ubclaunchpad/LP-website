"use client";
import PartnerCard from "./partnerCard";
import Company from "./../../../public/icons/company.svg";
import Mentor from "./../../../public/icons/mentor.svg";
import useIsMobile from "@/app/lib/hooks/useIsMobile";
import { useMemo } from "react";

export default function MemberRoles() {
  const BREAKPOINT = 768;
  const isMobile = useIsMobile(BREAKPOINT);
  const SCALE = isMobile ? 0.75 : 1; // icons should be smaller on mobile devices
  const roles = useMemo(
    () => [
      {
        icon: <Company width={60 * SCALE} height={60 * SCALE} />,
        title: "For Companies and NPOs",
        description:
          "We are looking for companies and non-profits with exciting projects to work with. If you have a project for us, please reach out!",
      },
      {
        icon: <Mentor width={60 * SCALE} height={60 * SCALE} />,
        title: "For Mentors",
        description:
          "We are looking for experienced mentors who want to share their expertise with a community of aspiring developers and designers. Interested? Please get in touch!",
      },
    ],
    [SCALE],
  );

  return (
    <div
      className="flex sm:flex-row flex-col items-center lg:items-start sm:px-28 px-8 w-full"
      id={"partner"}
    >
      {roles.map((role, index) => {
        return <PartnerCard key={index} {...role} />;
      })}
    </div>
  );
}
