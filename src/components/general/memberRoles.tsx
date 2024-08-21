'use client'
import Developer from "./../../../public/icons/developer.svg"
import Designer from "./../../../public/icons/designer.svg";
import Strategist from "./../../../public/icons/strategist.svg";
import InfoCard from "./infoCard";
import useIsMobile from "@/app/lib/hooks/useIsMobile";
import { useMemo } from "react";


export default function MemberRoles() {
    const BREAKPOINT= 768;
    const isMobile = useIsMobile(BREAKPOINT)
    const SCALE = isMobile ? 0.75 : 1 // icons should be smaller on mobile devices
    const roles = useMemo(() => ([
        {
          icon: <Developer width={60*SCALE} height={60*SCALE}/>,
          title: "Developers",
          description:
            "Build, test, and maintain software solutions, ensuring robust and scalable applications.",
        },
        {
          icon: <Designer width={60*SCALE} height={60*SCALE} />,
          title: "Designers",
          description:
            "Design, refine, and implement creative solutions, ensuring visually appealing and user-centric experiences.",
        },
        {
          icon: <Strategist width={60*SCALE} height={60*SCALE} />,
          title: "Strategists",
          description:
            "Develop and execute strategic plans, work on internal communication, and shape the future direction of the club.",
        },
      ]), [SCALE]);
    
    return(
        <div className="flex flex-col items-center lg:items-start py-10 lg:pr-10 w-full">
          {roles.map((role, index) => {
            return <InfoCard key={index} {...role} />;
          })}
        </div>
    )
}