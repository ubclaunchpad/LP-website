import Navbar from '@/components/general/navbar';

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
    </main>
  );
}
