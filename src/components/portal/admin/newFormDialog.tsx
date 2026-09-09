"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createForm } from "@/app/portal/admin/actions";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";

export default function NewFormDialog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Give the form a title");
      return;
    }
    setIsSubmitting(true);
    try {
      const id = await createForm({ title: title.trim() });
      setOpen(false);
      setTitle("");
      toast.success("Draft created — build your form, then launch it");
      router.refresh();
      router.push(`/portal/admin/forms/${id}/questions`);
    } catch (error) {
      console.error("Failed to create form:", error);
      toast.error("Failed to create form — try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"fit"}>New Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>New Form</DialogTitle>
          <DialogDescription>
            Creates a draft you can build question-by-question. Nothing is
            visible to applicants until you launch it.
          </DialogDescription>
        </DialogHeader>
        <form
          className={"flex flex-col gap-4"}
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form title — e.g. Winter 2027 Recruitment"
            className="p-3 bg-background-700 border-background-600"
            autoFocus
          />
          <Button
            size={"sm"}
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="self-end"
          >
            {isSubmitting && (
              <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create draft
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
