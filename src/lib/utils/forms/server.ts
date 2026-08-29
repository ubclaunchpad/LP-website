import { db } from "@/db";

// Plain server module (no "use server") — internal reads shared by
// member-facing pages and admin flows. Not an invokable RPC endpoint.
export async function getFormById(id: number | bigint) {
  try {
    return await db.forms.findFirst({
      where: {
        id: BigInt(id),
      },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}
