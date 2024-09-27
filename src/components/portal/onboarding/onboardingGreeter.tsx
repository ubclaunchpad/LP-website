const TEXT = {
  title: "Member Onboarding",
  description:
    "Here are the steps to get access to all the resources and tools. You can come back to this page to redo the onboarding.",
  description2: "You can come back to this page to redo the onboarding.",
};

export default function OnboardingGreeter() {
  return (
    <div className="flex  w-full flex-col items-center gap-10 h-full">
      <section className="flex flex-col items-start gap-4 w-full">
        <h1 className="text-4xl font-semibold text-left w-full font-heading ">
          {TEXT.title}
        </h1>
        <p className="text-lg text-left w-full ">{TEXT.description}</p>
      </section>
    </div>
  );
}
