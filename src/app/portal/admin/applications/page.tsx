import Link from "next/link";
import { getApplicationRounds } from "./actions";
import NewRoundModal from "@/components/admin/newRoundModal";

export default async function Page() {
  const rounds = await getApplicationRounds();

  return (
    <div className="flex flex-col gap-4 flex-1 w-full p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-2xl font-heading flex-1 text-left  border-neutral-800  text-white">
          Applications
        </h2>
        {
          // <NewRoundModal />
        }
      </div>
      <ul className="flex flex-col gap-2 py-2 w-full">
        {rounds.map((round) => (
          <li key={round.id} className="flex flex-col gap-2">
            <Link
              href={`/portal/admin/applications/${round.id}`}
              className="border w-full border-neutral-800 bg-neutral-800 text-lg px-4 hover:bg-primary p-2 rounded-md"
            >
              {round.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
