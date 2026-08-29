"use client";

import { useCallback, useEffect, useState } from "react";
import { getAdminMembers, addAdminByEmail, removeAdmin } from "@/app/portal/admin/actions";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { toast } from "sonner";
import {
  LoaderCircleIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserPlusIcon,
} from "lucide-react";
import { createClient } from "@/lib/utils/supabase/client";

type AdminMember = {
  id: string;
  email: string | undefined;
  display_name: string | undefined;
  created_at: string | Date | null;
  last_sign_in_at: string | Date | null;
};

export default function UserManagementPage() {
  const [admins, setAdmins] = useState<AdminMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const loadAdmins = useCallback(() => {
    setLoading(true);
    getAdminMembers()
      .then((res) => setAdmins(res as AdminMember[]))
      .catch(() => toast.error("Failed to load admins"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAdmins();
    createClient()
      .auth.getUser()
      .then(({ data }) => setCurrentUserId(data.user?.id ?? null));
  }, [loadAdmins]);

  function handleAdd() {
    const trimmed = email.trim();
    if (!trimmed) return;
    setAdding(true);
    addAdminByEmail(trimmed)
      .then((res) => {
        toast.success(`${res.email} is now an admin`);
        setEmail("");
        loadAdmins();
      })
      .catch((e) => {
        toast.error(e?.message || "Failed to add admin");
      })
      .finally(() => setAdding(false));
  }

  function handleRemove(admin: AdminMember) {
    setRemovingId(admin.id);
    removeAdmin(admin.id)
      .then(() => {
        toast.success(`${admin.email} is no longer an admin`);
        loadAdmins();
      })
      .catch((e) => {
        toast.error(e?.message || "Failed to remove admin");
      })
      .finally(() => setRemovingId(null));
  }

  return (
    <div className="min-h-screen bg-background-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ShieldCheckIcon className="w-7 h-7 text-lp-400" />
            User Management
          </h1>
          <p className="text-gray-400">
            Admins can manage forms, review applications, and modify this list.
            Accounts must have signed in with Google at least once before they
            can be promoted.
          </p>
        </div>

        {/* Add admin */}
        <div className="bg-background-700 border border-background-600 rounded-lg p-4 mb-6 flex gap-2 items-center">
          <UserPlusIcon className="w-5 h-5 text-lp-400 flex-shrink-0" />
          <Input
            type="email"
            placeholder="someone@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 bg-background-600 border-background-500"
          />
          <Button
            onClick={handleAdd}
            disabled={adding || !email.trim()}
            className="min-h-none h-10 gap-2"
          >
            {adding && <LoaderCircleIcon className="w-4 h-4 animate-spin" />}
            Add Admin
          </Button>
        </div>

        {/* Admin list */}
        <div className="bg-background-700 border border-background-600 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center">
              <LoaderCircleIcon className="w-6 h-6 animate-spin text-lp-400" />
            </div>
          ) : (
            <ul className="divide-y divide-background-600">
              {admins.map((admin) => {
                const isSelf = admin.id === currentUserId;
                return (
                  <li
                    key={admin.id}
                    className="flex items-center justify-between p-4 gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {admin.display_name || admin.email}
                        {isSelf && (
                          <span className="ml-2 text-xs text-lp-400">
                            (you)
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {admin.email}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-4 flex-shrink-0">
                      <div className="text-xs text-gray-400">
                        {admin.last_sign_in_at && (
                          <p>
                            Last seen{" "}
                            {new Date(admin.last_sign_in_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="secondary"
                        disabled={isSelf || removingId === admin.id}
                        onClick={() => handleRemove(admin)}
                        className="bg-background-600 min-h-none h-9 gap-2 hover:bg-red-600/40"
                      >
                        {removingId === admin.id ? (
                          <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2Icon className="w-4 h-4" />
                        )}
                        Remove
                      </Button>
                    </div>
                  </li>
                );
              })}
              {admins.length === 0 && (
                <li className="p-8 text-center text-gray-400">
                  No admins found
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
