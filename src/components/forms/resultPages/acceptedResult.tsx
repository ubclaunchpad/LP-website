import { Form } from "@/lib/types/application";

const text = {
  accepted: "Congratulations! You have been accepted to UBC Launch Pad.",
};

export default function AcceptedResult({ application }: { application: Form }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col w-full  max-w-3xl gap-10 flex-1  p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {application.title}
        </h1>
        <div className="flex  justify-between gap-10">
          <h2 className="text-xl  font-heading text-white">{text.accepted}</h2>
        </div>
      </div>
    </div>
  );
}
