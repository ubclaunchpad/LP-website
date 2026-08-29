"use client";

import { useContext, useMemo, useState } from "react";
import { formContext } from "@/components/layouts/formTabView";
import { updateSubmissionField } from "@/app/portal/admin/actions";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";


const FALLBACK_PIPELINE = [
  "submitted",
  "interviewed",
  "offered",
  "accepted",
  "paid",
  "waitlisted",
  "declined",
  "rejected",
];

export default function ApplicationBoardPage() {
  const { submissions, members, formFields, mergeNewData } =
    useContext(formContext);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  const configuredOptions = formFields["status"]?.options?.filter(
    (o) => o.id,
  ) || [];

  // Columns = pipeline order, then configured statuses, then any status
  // present in the data — so every application always has a visible column.
  const columns = useMemo(() => {
    const labels: Record<string, string> = {};
    configuredOptions.forEach((o) => {
      labels[o.id] = o.label;
    });
    const grouped: Record<string, any[]> = {};
    submissions.forEach((s) => {
      const status = s.status || "submitted";
      if (!grouped[status]) {
        grouped[status] = [];
      }
      grouped[status].push(s);
    });
    const ids = [
      ...new Set([
        ...FALLBACK_PIPELINE,
        ...configuredOptions.map((o) => o.id),
        ...Object.keys(grouped),
      ]),
    ];
    return {
      ids,
      grouped,
      label: (id: string) =>
        labels[id] || id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }, [submissions, configuredOptions]);

  const reviewerLabel = (id: any) => {
    if (!id) return null;
    const member = members.find((m) => m.id === id);
    return member ? member.display_name || member.email : null;
  };

  function handleDrop(newStatus: string) {
    setDropTarget(null);
    if (!draggedId) return;
    const card = submissions.find((s) => s.id === draggedId);
    if (!card || card.status === newStatus) {
      setDraggedId(null);
      return;
    }
    setMovingId(draggedId);
    updateSubmissionField(draggedId, "status", "applications", newStatus)
      .then(() => {
        mergeNewData({ status: newStatus }, "id", draggedId);
        toast.success("Status updated");
      })
      .catch(() => toast.error("Failed to update status"))
      .finally(() => setMovingId(null));
    setDraggedId(null);
  }

  if (!formFields["status"]) {
    return (
      <div className="p-8 text-gray-400">
        This form has no status field configured — add a status subfield in the
        form settings to use the board.
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto p-4 h-full">
      {columns.ids.map((statusId) => {
        const cards = columns.grouped[statusId] || [];
        const isTarget = dropTarget === statusId;
        return (
          <div
            key={statusId}
            className={`flex flex-col flex-shrink-0 w-72 bg-background-700 rounded-lg border ${
              isTarget ? "border-lp-400" : "border-background-600"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDropTarget(statusId);
            }}
            onDragLeave={() => setDropTarget(null)}
            onDrop={() => handleDrop(statusId)}
          >
            <div className="flex items-center justify-between p-3 border-b border-background-600">
              <span className="font-semibold text-sm capitalize">
                {columns.label(statusId)}
              </span>
              <span className="text-xs text-gray-400 bg-background-600 rounded-full px-2 py-0.5">
                {cards.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-2 min-h-24 overflow-y-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  draggable={movingId !== card.id}
                  onDragStart={() => setDraggedId(card.id)}
                  onDragEnd={() => setDraggedId(null)}
                  className={`bg-background-600 border border-background-500 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-lp-500 transition-colors ${
                    draggedId === card.id ? "opacity-40" : ""
                  } ${movingId === card.id ? "animate-pulse" : ""}`}
                >
                  <p className="text-sm font-medium truncate">
                    {card.firstName || card.lastName
                      ? `${card.firstName || ""} ${card.lastName || ""}`.trim()
                      : card.email}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{card.email}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.level && card.level !== "unassigned" && (
                      <span className="text-xs bg-background-500 rounded-full px-2 py-0.5">
                        {card.level}
                      </span>
                    )}
                    {card.role && Array.isArray(card.role) && (
                      <span className="text-xs bg-background-500 rounded-full px-2 py-0.5">
                        {card.role.join(", ")}
                      </span>
                    )}
                    {reviewerLabel(card.reviewer_id) && (
                      <span className="text-xs bg-background-500 rounded-full px-2 py-0.5">
                        ✓ {reviewerLabel(card.reviewer_id)}
                      </span>
                    )}
                    {movingId === card.id && (
                      <LoaderCircleIcon className="w-3 h-3 animate-spin text-lp-400" />
                    )}
                  </div>
                </div>
              ))}
              {cards.length === 0 && (
                <div className="text-xs text-gray-500 text-center py-4">
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
