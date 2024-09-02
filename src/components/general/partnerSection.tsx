"use client";
import Company from "./../../../public/icons/company.svg";
import Mentor from "./../../../public/icons/mentor.svg";
import InfoCard from "./infoCard";
import useIsMobile from "@/app/lib/hooks/useIsMobile";
import { useMemo } from "react";

export default function MemberRoles() {
  const BREAKPOINT = 768;
  const isMobile = useIsMobile(BREAKPOINT);
  const SCALE = isMobile ? 0.75 : 1; // icons should be smaller on mobile devices
  const roles = useMemo(
    () => [
      {
        icon: <Company width={80 * SCALE} height={80 * SCALE} />,
        title: "For Companies and NPOs",
        description:
          "We are looking for companies and non-profits with exciting projects to work with. If you have a project for us, please reach out!"
      },
      {
        icon: <Mentor width={80 * SCALE} height={80 * SCALE} />,
        title: "For Mentors",
        description:
          "We are looking for experienced mentors who want to share their expertise with a community of aspiring developers and designers. Interested? Please get in touch!"
      },
    ],
    [SCALE],
  );

  return (
    <div className="flex flex-col items-center lg:items-start py-10 lg:pr-10 w-full" id={"partner"}>
      {roles.map((role, index) => {
        return <InfoCard key={index} {...role} />;
      })}
    </div>
  );
}
