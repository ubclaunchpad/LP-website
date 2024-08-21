import Navbar from '@/components/general/navbar';
import { nunitoSans } from './fonts';
import InfoButton from '@/components/buttons/infoButton';
import ImageArea from '@/components/general/imageArea';
import Developer from './../../public/icons/developer.svg'
import Designer from './../../public/icons/designer.svg'
import Strategist from './../../public/icons/strategist.svg'
import InfoCard from '@/components/general/infoCard';
import { Button } from '@/components/buttons/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ProjectSection = dynamic(() => import('@/components/general/projectSection'), { ssr: false });

const text = {
  heroTitle: "Welcome to UBC Launch Pad",
  heroDescription: "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",
  aboutUsTitle: "What we do at",
  aboutUsSubtitle: "Launch Pad",
  aboutUsText: `As the leading technology club at UBC, Launch Pad is devoted to create a collaborative and professional environment for software development. It is our goal to provide the best space for students to apply and develop their technical skills outside of classroom, to learn and practice industry-standard tools, and to build passion projects with like-minded individuals.
   
  In Launch Pad form into teams to work on an 8 month development project based on their interests and skill sets. Each team consists of a tech-lead, developers and designers, where they collaboratively go through the design thinking process to design and build a product.`,
  joinUsTitle: "Want to grow your skill?",
  joinUsSubtitle: "Join our team!",
  joinUsText: "We are looking for students passionate about tech with varying levels of experience to join our teams! ",
  joinUsButton: "Join our team",

}

const lpImageProps = {
  src: "/images/launchpadTeam.png",
  alt: "Launchpad team posing for a photo",
  width: 998 * 1.5 ,
  height: 580 * 1.5,
}

const memberRoles = [{
  icon: <Developer width = {60} height = {60} className="scale-2"/>,
  title: "Developers",
  description: "Build, test, and maintain software solutions, ensuring robust and scalable applications.",
},
{
  icon: <Designer width = {60} height = {60} />,
  title: "Designers",
  description: "Design, refine, and implement creative solutions, ensuring visually appealing and user-centric experiences."
},
{
  icon: <Strategist width = {60} height = {60}/>,
  title: "Strategists",
  description: "Develop and execute strategic plans, work on internal communication, and shape the future direction of the club."
}]

const cache = new Map();
const cacheTTL = 0 //24 * 60 * 60 * 1000;

async function getProjects() {
  const cacheKey = 'notion_projects';
  const now = Date.now();
  const notionDatabaseId = '3b9310c551614c3d83dd2e87ff05f508';
  const notionApiKey = 'secret_vKggckZ7D2nIElIIUWzAtmZpf5v8OTKSC5t9HDbuAOY' // TODO - store in .env
  
  
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (now - timestamp < cacheTTL) {
      return data;
    }
  }

  const filter = {
    "filter": {
      "or": [
      {
        "property": "Year",
        "multi_select": {
          "contains": "2023"
        }
      },
      {
        "property": "Year",
        "multi_select": {
          "contains": "2022"
        }
      }
    ]
    }
  }

  const res = await fetch(`https://api.notion.com/v1/databases/${notionDatabaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify(filter)
  });

  if (!res.ok) {
    console.error;
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  cache.set(cacheKey, { data, timestamp: now });

  return data.results.map((item: any) => ({
    title: item.properties.Name.title[0].text.content,
    description: item.properties.Oneliner.rollup.array[0].rich_text[0].text.content,
    imageSrc: item.properties["Files & media"]?.files?.[0]?.file?.url ?? "/images/launchpadTeam.png",
    alt: "Mock", 
    width: 372,
    height: 213,

  }))
}

export default async function Home() {
  const projects = await getProjects()
  console.log(projects)
  return (
    <main className="flex min-h-screen flex-col items-center px-4">
      <Navbar />
      <section className="flex flex-col items-center py-10 text-center">
        <h1 className="text-4xl font-bold">{text.heroTitle}</h1>
        <p className="text-lg">{text.heroDescription}</p>
      </section>

      <section className="flex flex-col lg:flex-row items-center space-x-10 space-y-5 w-full">
        <div className='lg:ml-10'>
        <ImageArea {...lpImageProps} />
        </div>
        <div className='flex flex-col items-center lg:items-end py-10 pl-0 lg:pl-10 pr-0 lg:pr-12 w-full'>
          <InfoButton text={'About us'} />
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}>{text.aboutUsTitle}</h1>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400 break-all`}>{text.aboutUsSubtitle}</h1>
          <p className='text-stone-400 text-center lg:text-right py-10 whitespace-pre-wrap'>
            {text.aboutUsText}
          </p>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-start justify-between w-full lg:space-x-10">
        <div className='flex flex-col text-center items-center lg:items-start py-10 pl-0 lg:pl-10 pr-0 lg:pr-12 w-full'>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}>{text.joinUsTitle}</h1>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400`}>{text.joinUsSubtitle}</h1>
          <p className='text-stone-400 text-center lg:text-left py-10'>
            {text.joinUsText}
          </p>
          <Link href='/portal/applications'>
          <Button className='p-4' size={'xl'} icon><label className='text-lg'>{text.joinUsButton}</label></Button>
          </Link>
        </div>
        <div className="flex flex-col items-center lg:items-start py-10 lg:pl-10 w-full">
          {memberRoles.map((role, index) => {
            return <InfoCard key={index} {...role} />
          })}
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-start justify-between w-full lg:space-x-10">
        <ProjectSection projects={projects}/>
      </section>
    </main>
  );
}
