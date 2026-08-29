import React from "react";
import Link from "next/link";
import { Users, FileText, BarChart3, UserCheck } from "lucide-react";
import { db } from "@/db";
import { getSessionUser, isAdmin } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.id))) {
    redirect("/portal");
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalForms,
    activeMembers,
    pendingApplications,
    submissionsThisMonth,
    latestForm,
  ] = await Promise.all([
    db.forms.count(),
    db.members.count(),
    db.applications.count({ where: { status: null } }),
    db.submissions.count({ where: { created_at: { gte: startOfMonth } } }),
    db.forms.findFirst({
      where: { type: "recruitment" },
      orderBy: { created_at: "desc" },
    }),
  ]);

  const adminRoutes = [
    {
      title: "Forms Management",
      description: "Create, edit, and manage application forms",
      href: "/portal/admin/forms",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Members Database",
      description: "View and manage all organization members",
      href: "/portal/admin/members",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "User Management",
      description: "Manage user roles and permissions",
      href: "/portal/admin/users",
      icon: UserCheck,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Analytics",
      description: "View application and member statistics",
      href: "/portal/admin/analytics",
      icon: BarChart3,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const stats = [
    { label: "Total Forms", value: totalForms, icon: FileText, color: "text-blue-500" },
    { label: "Active Members", value: activeMembers, icon: Users, color: "text-green-500" },
    { label: "Pending Applications", value: pendingApplications, icon: UserCheck, color: "text-yellow-500" },
    { label: "Submissions This Month", value: submissionsThisMonth, icon: BarChart3, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Manage your organization&apos;s forms, members, and settings
          </p>
        </div>

        {latestForm?.title && (
          <div className="mb-8 border border-background-600 bg-background-700 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Latest recruitment form</p>
              <p className="text-lg font-semibold">{latestForm.title}</p>
            </div>
            <div className="text-sm text-gray-400 text-right">
              {latestForm.open_at ? (
                <p>
                  {latestForm.open_at.toLocaleDateString()} —{" "}
                  {latestForm.close_at?.toLocaleDateString() || "open-ended"}
                </p>
              ) : (
                <p className="text-yellow-500">Not scheduled yet</p>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-background-700 border border-background-600 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminRoutes.map((route, index) => {
            const Icon = route.icon;
            return (
              <Link
                key={index}
                href={route.href}
                className="group block bg-background-700 border border-background-600 rounded-lg p-6 hover:border-lp-500 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${route.color} transition-colors duration-200`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-lp-400 transition-colors">
                      {route.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{route.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
