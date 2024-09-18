import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";

const newOfferSchema = z.object({
  status: z.enum(["accepted", "declined"]),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const reqBody = await request.json();
  const offerDetails = newOfferSchema.safeParse(reqBody);
  if (!offerDetails.success) {
    return NextResponse.json(
      { message: "Invalid offer details" },
      { status: 400 },
    );
  }

  const appId = params.id;

  const application = await db.applications.findUnique({
    where: {
      id: appId,
    },
    include: {
      submissions: true,
    },
  });

  if (
    !application ||
    !application.submissions ||
    !application.submissions.details
  ) {
    return NextResponse.json("Application not found", { status: 404 });
  }

  try {
    await db.$transaction(async (transaction) => {
      // Update application status
      await transaction.applications.update({
        where: { id: appId },
        data: { status: offerDetails.data.status },
      });

      const userId = application.submissions.user_id;
      const teamId = application.team_id;
      const details = application.submissions.details as {
        [key: string]: string;
      };

      // If the offer is declined, return early
      if (offerDetails.data.status === "declined") {
        const body = { message: `Offer to join has been declined` };
        return NextResponse.json(JSON.stringify(body), { status: 200 });
      }

      // Upsert member details
      await transaction.members.upsert({
        where: { id: userId },
        create: {
          id: userId,
          first_name: details["firstName"] ?? "",
          last_name: details["lastName"] ?? "",
          faculty: details["faculty"]?.[0] ?? "",
          specialization: details["specialization"]?.[0] ?? "",
          grad_year: Number(details["graduationYear"]) ?? null,
          year_level: Number(details["yearLevel"]?.[0]) ?? null,
        },
        update: {
          first_name: details["firstName"] ?? "",
          last_name: details["lastName"] ?? "",
          faculty: details["faculty"]?.[0] ?? "",
          specialization: details["specialization"]?.[0] ?? "",
          grad_year: Number(details["graduationYear"]) ?? null,
          year_level: Number(details["yearLevel"]?.[0]) ?? null,
        },
      });

      // Create team member if teamId is provided
      if (teamId) {
        await transaction.team_members.create({
          data: {
            team_id: teamId,
            member_id: userId,
            role: details["role"]?.[0] ?? "",
          },
        });
      }
    });

    const body = { message: `Offer to join has been created` };
    return NextResponse.json(JSON.stringify(body), { status: 200 });
  } catch (error) {
    console.error("Transaction failed:", error);
    const body = {
      message: `Failed to process the offer`,
      error: error.message,
    };
    return NextResponse.json(JSON.stringify(body), { status: 500 });
  }
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

export async function PATCH(
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

function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
