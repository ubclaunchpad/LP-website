import Navbar from '@/components/general/navbar';
import { nunitoSans } from './fonts';
import InfoButton from '@/components/buttons/infoButton';
const text = {
  heroTitle: "Welcome to UBC Launch Pad",
  heroDescription: "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",

}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Navbar />
      <section className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-center">{text.heroTitle}</h1>
      <p className="text-lg text-center">{text.heroDescription}</p>
      </section>

      <section className="flex flex-row items-center">
        <div className='flex flex-col items-center px-20 py-10 bg-white'>
          <p>{'Picture goes here. At [Team/Organization Name], we embark on a journey of creation and collaboration. From brainstorming innovative ideas to executing complex coding tasks, we combine our technical prowess with a passion for learning. Our projects a rapidly evolving technological landscape.At [Team/Organization At [Team/Organization Name], we embark on a journey of creation and collaboration. Fro'}</p>
        </div>
        <div className='flex flex-col items-end py-10 px-10'>
          <InfoButton text={'About us'}/>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans pt-5`}>{'What we do at'}</h1>
          <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans text-indigo-400`}>{'Launch Pad'}</h1>
          <p className='text-stone-400 text-right py-10'>
            {'At [Team/Organization Name], we embark on a journey of creation and collaboration. From brainstorming innovative ideas to executing complex coding tasks, we combine our technical prowess with a passion for learning. Our projects a rapidly evolving technological landscape.At [Team/Organization At [Team/Organization Name], we embark on a journey of creation and collaboration. Fro'}
          </p>
        </div>
      </section>
    </main>
  );
}
