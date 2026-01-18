"use client";

import React from "react";
import { Button } from "@/components/primitives/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/primitives/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

// Mock Data
const openApplications = [
  {
    id: 1,
    title: "Fall 2024 Software Engineering Intern",
    description:
      "Join our tech team to build the future of our club's digital infrastructure.",
    deadline: "Sept 15, 2024",
    link: "/portal/apply/1",
  },
  {
    id: 2,
    title: "Event Coordinator",
    description:
      "Help organize and manage our club's biggest events of the year.",
    deadline: "Sept 20, 2024",
    link: "/portal/apply/2",
  },
  {
    id: 3,
    title: "Outreach Lead",
    description:
      "Connect with campus organizations and manage external partnerships.",
    deadline: "Sept 22, 2024",
    link: "/portal/apply/3",
  },
];

const currentApplications = [
  {
    id: 101,
    title: "Community Manager",
    status: "Draft",
    lastUpdated: "2 days ago",
    link: "/portal/application/101",
  },
  {
    id: 102,
    title: "Design Lead",
    status: "Submitted",
    submittedAt: "Aug 28, 2024",
    link: "/portal/application/102",
  },
];

const pastApplications = [
  {
    id: 201,
    title: "Spring 2024 Developer",
    status: "Accepted",
    submittedAt: "Jan 15, 2024",
    link: "/portal/application/201",
  },
  {
    id: 202,
    title: "Marketing Associate",
    status: "Rejected",
    submittedAt: "Jan 20, 2024",
    link: "/portal/application/202",
  },
];

function StatusBadge({ status }: { status: string }) {
  let colorClass = "bg-gray-100 text-gray-800";

  switch (status) {
    case "Draft":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "Submitted":
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case "Accepted":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "Rejected":
      colorClass = "bg-red-100 text-red-800";
      break;
    default:
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
}

export default function Portal() {
  const router = useRouter();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <ArrowBigLeft onClick={() => router.back()} className="cursor-pointer"/>
        <h1 className="text-3xl font-bold tracking-tight">Applicant Portal</h1>
        <p className="text-muted-foreground">
          View your application history and explore new opportunities to join
          the club.
        </p>
      </div>

      {/* Open Applications Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Open Applications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openApplications.map((app) => (
            <Card
              key={app.id}
              className="flex flex-col h-full bg-background border-border hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <CardTitle>{app.title}</CardTitle>
                <CardDescription className="mt-2">
                  Due: {app.deadline}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {app.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={app.link || "#"} className="w-full">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Applications Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Active Applications</h2>
          {currentApplications.length > 0 ? (
            <div className="space-y-4">
              {currentApplications.map((app) => (
                <Card key={app.id} className="bg-background">
                  <div className="flex items-center p-6 justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{app.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {app.lastUpdated
                            ? `Last updated: ${app.lastUpdated}`
                            : `Submitted: ${app.submittedAt}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={app.status} />
                      <Link
                        href={app.link || "#"}
                        className="text-sm text-primary hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No active applications.</p>
          )}
        </section>

        {/* Past Applications Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Past Applications</h2>
          {pastApplications.length > 0 ? (
            <div className="space-y-4">
              {pastApplications.map((app) => (
                <Card key={app.id} className="opacity-80 bg-background">
                  <div className="flex items-center p-6 justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg text-muted-foreground">
                        {app.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Submitted: {app.submittedAt}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No past applications.</p>
          )}
        </section>
      </div>
    </div>
  );
}
