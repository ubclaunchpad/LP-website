const TEXT = {
  title: "Member Onboarding",
  description: "All done! You can now access all the resources and tools. ",
  description2: "You can close this tab now",
};

export default function OnboardingEnd() {
  return (
    <div className="flex  w-full flex-col items-center gap-10 h-full">
      <section className="flex flex-col items-start gap-4 w-full">
        <h1 className="text-4xl font-semibold text-left w-full font-heading ">
          {TEXT.title}
        </h1>
      </section>
      <section className="flex flex-col items-start gap-4 w-full">
        <p className="text-lg text-left w-full ">
          {TEXT.description}
          {TEXT.description2}
        </p>
      </section>
    </div>
  );
}
