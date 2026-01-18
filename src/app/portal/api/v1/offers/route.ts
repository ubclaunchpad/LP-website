import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";

const newOfferSchema = z.object({
  userId: z.string().uuid(),
  teamId: z.number(),
  appId: z.string().uuid(),
  expiringAt: z.date().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const offerDetails = newOfferSchema.safeParse(body);
  if (!offerDetails.success) {
    return NextResponse.json(
      { message: "Invalid offer details" },
      { status: 400 },
    );
  }

  const { userId, teamId, appId } = offerDetails.data;
  const application = await db.applications.findUnique({
    where: {
      id: appId,
    },
    include: {
      submissions: true,
    },
  });

  if (!application) {
    return NextResponse.json("Application not found", { status: 404 });
  }

  const pendingOffer = await db.pending_members.create({
    data: {
      user_id: userId,
      team_id: teamId,
      status: "pending",
      meta: {
        application: application,
        expiringAt: offerDetails.data.expiringAt,
      },
    },
  });

  const resbody = {
    message: `Offer to join has been created`,
  };

  return NextResponse.json(resbody, { status: 201 });
}
