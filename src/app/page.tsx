import Navbar from "@/components/layouts/navbar";
import { nunitoSans } from "./fonts";
import InfoButton from "@/components/primitives/infoButton";
import ImageArea from "@/components/general/imageArea";
import { Button } from "@/components/primitives/button";
import Link from "next/link";
import dynamic from 'next/dynamic';
import MemberRoles from "@/components/general/memberRoles";

const ProjectSection = dynamic(() => import('@/components/general/projectSection'), { ssr: false });

const refreshProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/refresh`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    }
  });

  const data = await res.json()
  return data.data
  
}

const text = {
  heroTitle: "Welcome to UBC Launch Pad",
  heroDescription:
    "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",
  aboutUsTitle: "What we do at",
  aboutUsSubtitle: "Launch Pad",
  aboutUsText: `As the leading technology club at UBC, Launch Pad is devoted to create a collaborative and professional environment for software development. It is our goal to provide the best space for students to apply and develop their technical skills outside of classroom, to learn and practice industry-standard tools, and to build passion projects with like-minded individuals.
   
  In Launch Pad form into teams to work on an 8 month development project based on their interests and skill sets. Each team consists of a tech-lead, developers and designers, where they collaboratively go through the design thinking process to design and build a product.`,
  joinUsTitle: "Want to grow your skill?",
  joinUsSubtitle: "Join our team!",
  joinUsText: "We are looking for students passionate about tech with varying levels of experience to join our teams! ",
  joinUsButton: "Join our team"
}

const lpImageProps = {
  src: "/images/launchpadTeam.png",
  alt: "Launchpad team posing for a photo",
  width: 998 * 2 ,
  height: 580 * 2,
}

export default async function Home() {
  const projects = await refreshProjects()
  return (
    <main className="flex min-h-screen flex-col items-center px-4">
      <Navbar />
      <section className="flex flex-col items-center py-10 text-center">
        <h1 className="text-4xl font-bold">{text.heroTitle}</h1>
        <p className="text-lg">{text.heroDescription}</p>
      </section>

      <section className="flex flex-col lg:flex-row items-center space-x-10 space-y-5 w-full">
        <div >
        <ImageArea {...lpImageProps} />
        </div>
        <div className='flex flex-col items-center lg:items-end py-10 pl-0 lg:pl-10 pr-0 md:pr-6 lg:pr-12 w-full'>
          <InfoButton text={'About us'} />
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}>{text.aboutUsTitle}</h1>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400 break-all`}>{text.aboutUsSubtitle}</h1>
          <p className='text-stone-400 text-center lg:text-right py-10 whitespace-pre-wrap'>
            {text.aboutUsText}
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-start justify-between w-full">
        <div className="flex flex-col text-center items-center lg:items-start py-10 pl-0 lg:pl-10 md:pr-10 w-full">
          <h1
            className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}
          >
            {text.joinUsTitle}
          </h1>
          <h1
            className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400`}
          >
            {text.joinUsSubtitle}
          </h1>
          <p className="text-stone-400 text-center lg:text-left py-10">
            {text.joinUsText}
          </p>
          <Link href="/portal/applications">
            <Button className="p-4" size={"xl"} icon>
              <label className="text-lg">{text.joinUsButton}</label>
            </Button>
          </Link>
        </div>
        <MemberRoles/>
      </section>

      <section className="flex flex-col lg:flex-row items-start justify-between w-full lg:space-x-10">
        <ProjectSection projects={projects ?? []}/>
      </section>
    </main>
  );
};
