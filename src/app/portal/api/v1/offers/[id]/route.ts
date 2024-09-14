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
  const offerDetails = newOfferSchema.safeParse(request.body);
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

  await db.pending_members.create({
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

  const body = {
    message: `Offer to join has been created`,
  };

  return NextResponse.json(JSON.stringify(body), { status: 201 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const pendingOffer = await db.pending_members.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!pendingOffer) {
    return NextResponse.json("Offer not found", { status: 404 });
  }

  return NextResponse.json(JSON.stringify(pendingOffer), { status: 200 });
}

const updateOfferSchema = z.object({
  status: z.enum(["accepted", "declined", "expired"]),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const pendingOffer = await db.pending_members.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!pendingOffer) {
    return NextResponse.json("Offer not found", { status: 404 });
  }

  const updateDetails = updateOfferSchema.safeParse(request.body);

  if (!updateDetails.success) {
    return NextResponse.json("Invalid update details", { status: 400 });
  }

  const updatedOffer = await db.pending_members.update({
    where: {
      id: params.id,
    },
    data: {
      ...updateDetails.data,
    },
  });

  const body = {
    message: `Offer has been updated - ${updateDetails.data.status}`,
  };

  if (updateDetails.data.status === "accepted") {
    // Add user to team and add user to members table
    await db.members.create({
      data: {
        id: pendingOffer.user_id,
      },
    });

    await db.team_members.create({
      data: {
        user_id: pendingOffer.user_id,
        team_id: pendingOffer.team_id,
      },
    });
  }

  return NextResponse.json(JSON.stringify(body), { status: 200 });
}
