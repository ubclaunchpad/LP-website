import React from "react";
import Link from "next/link";
import { Users, FileText, Settings, BarChart3, UserCheck } from "lucide-react";

export default function AdminDashboard() {
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-background-700 border border-background-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Forms</p>
                <p className="text-2xl font-semibold text-white">-</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-background-700 border border-background-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Members</p>
                <p className="text-2xl font-semibold text-white">-</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-background-700 border border-background-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Applications</p>
                <p className="text-2xl font-semibold text-white">-</p>
              </div>
              <UserCheck className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-background-700 border border-background-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-semibold text-white">-</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </div>
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
