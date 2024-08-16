import { ApplicationRound } from "@/app/lib/types/application";

export default function GenericResult({
  application,
  message,
}: {
  application: ApplicationRound;
  message: string;
}) {
  return (
    <div className="flex flex-col  flex-1 items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col items-center  max-w-3xl gap-10  flex-1 border-neutral-900   rounded-md p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {application.title}
        </h1>

        <h2 className="text-lg text-white">{message}</h2>
      </div>
    </div>
  );
}
