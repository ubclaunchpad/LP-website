import Navbar from '@/components/general/navbar';
import { nunitoSans } from './fonts';
import InfoButton from '@/components/buttons/infoButton';
import ImageArea from '@/components/general/imageArea';
import Developer from './../../public/icons/developer.svg'
import Designer from './../../public/icons/designer.svg'
import Strategist from './../../public/icons/strategist.svg'
import InfoCard from '@/components/general/infoCard';

const text = {
  heroTitle: "Welcome to UBC Launch Pad",
  heroDescription: "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",
  aboutUsTitle: "What we do at",
  aboutUsSubtitle: "UBC Launch Pad",
  aboutUsText: 'As the leading technology club at UBC, Launch Pad is devoted to create a collaborative and professional environment for software development. It is our goal to provide the best space for students to apply and develop their technical skills outside of classroom, to learn and practice industry-standard tools, and to build passion projects with like-minded individuals. In Launch Pad form into teams to work on an 8 month development project  based on their interests and skill sets. Each team consists of a  tech-lead, developers and designers, where they collaboratively go  through the design thinking process to design and build a product.',
  joinUsTitle: "Want to grow your skill?",
  joinUsSubtitle: "Join our team!",
  joinUsText: "We are looking for students passionate about tech with varying levels of experience to join our teams! "
}

const lpImageProps = {
    src: "/images/launchpadTeam.png",
    alt: "Launchpad team posing for a photo",
    width: 998*3,
    height: 580*3,
}

const memberRoles = [{
  icon: <Developer/>,
  title: "Developers",
  description: "Build, test, and maintain software solutions, ensuring robust and scalable applications.",
},
{
  icon: <Designer/>,
  title: "Designers",
  description: "Design, refine, and implement creative solutions, ensuring visually appealing and user-centric experiences."
},
{
  icon: <Strategist/>,
  title: "Strategists",
  description: "Develop and execute strategic plans, work on internal communication, and shape the future direction of the club."
}]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Navbar />
      <section className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-center">{text.heroTitle}</h1>
      <p className="text-lg text-center">{text.heroDescription}</p>
      </section>

      <section className="flex flex-row items-center">
        <ImageArea {...lpImageProps}/>
        <div className='flex flex-col items-end py-10 pl-10 pr-12'>
          <InfoButton text={'About us'}/>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}>{text.aboutUsTitle}</h1>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400`}>{text.aboutUsSubtitle}</h1>
          <p className='text-stone-400 text-right py-10'>
            {text.aboutUsText}
          </p>
        </div>
      </section>
      <section className="flex flex-row items-center">
        <div className='flex flex-col items-start py-10 pl-10 pr-12'>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}>{text.joinUsTitle}</h1>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400`}>{text.joinUsSubtitle}</h1>
          <p className='text-stone-400 text-left py-10 w-10/12'>
            {text.joinUsText}
          </p>
        </div>
        <div>
        {memberRoles.map((role,index) => {
          return <InfoCard key={index} { ...role}/>
        })}
          </div>
      </section>
    </main>
  );
}
