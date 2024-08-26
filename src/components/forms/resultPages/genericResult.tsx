import { Form } from "@/lib/types/application";
import Link from "next/link";

export default function GenericResult({
  application,
  message,
}: {
  application: Form;
  message: string;
}) {
  return (
    <div className="flex flex-col  flex-1 items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col   max-w-3xl gap-4  flex-1 border-neutral-900   rounded-md p-10">
        <h1 className="text-5xl text-left w-full pb-10 font-heading text-white">
          {application.title}
        </h1>

        <h2 className="text-lg text-white">{message}</h2>
        <p className="text-lg pb-4 text-white">
          If you have any questions, please contact us at{" "}
          <Link
            href={"mailto:strategy@ubclaunchpad.com"}
            className={"text-lp-600"}
          >
            strategy@ubclaunchpad.com
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
