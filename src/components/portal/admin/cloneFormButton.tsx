"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cloneForm } from "@/app/portal/admin/actions";
import { Button } from "@/components/primitives/button";
import { CopyIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

export default function CloneFormButton({
  formId,
  formTitle,
}: {
  formId: number;
  formTitle: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        cloneForm(formId)
          .then(() => {
            toast.success(`Duplicated "${formTitle}"`);
            router.refresh();
          })
          .catch(() => {
            toast.error("Error duplicating form");
          })
          .finally(() => setLoading(false));
      }}
      className={
        "bg-background-600 border border-background-500 rounded-md p-2 hover:border-lp-500 transition-colors"
      }
      aria-label={`Duplicate ${formTitle}`}
    >
      {loading ? (
        <LoaderCircleIcon className={"h-4 w-4 animate-spin"} />
      ) : (
        <CopyIcon className={"h-4 w-4"} />
      )}
    </Button>
  );
}
