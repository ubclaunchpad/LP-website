import { getForm } from "@/app/portal/admin/actions";
import { redirect } from "next/navigation";

// const defaultConfig = {
//     submissions: {
//         audience: "public",
//         limit: 10,
//     },
//     form: {
//         showProgressBar: true,
//         shuffleSections: false,
//         autoSaveSection: false
//     },
//     events: {
//         status: {
//             submitted: {
//                 sendEmail: false,
//             }
//         }
//     }
// }

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id) {
    return redirect("/portal/admin/forms");
  }

  const form = await getForm(Number(params.id));

  if (!form) {
    return redirect("/portal/admin/forms");
  }

  const config = form.config as {
    submissions: { audience: string; limit: number };
  };

  return (
    <div className="flex flex-col gap-4 flex-1 items-center w-full px-4 ">
      <div className="flex flex-col justify-center items-center  gap-2 w-full max-w-4xl">
        <section className="flex flex-col w-full rounded-md p-4 gap-4">
          <h3 className="text-2xl border-b py-4 border-b-background-800">
            Submissions
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <label className="text-lg w-80">Audience</label>
            <p>{config.submissions.audience}</p>
          </div>
          <div className="flex w-full  justify-between items-center gap-2">
            <label className="text-lg w-80">Submission Limit</label>
            <p>{config.submissions.limit}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
