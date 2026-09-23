"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircleIcon, TriangleAlertIcon } from "lucide-react";
import { formContext } from "@/components/layouts/formTabView";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/primitives/dialog";
import { deleteForm, getFormSubmissionCount } from "@/app/portal/admin/actions";
import { DELETE_FORM_CONFIRMATION } from "@/lib/utils/forms/helpers";
import SettingsSection from "./settingsSection";

// confirm -> (only if the form holds submissions) hasData
type Step = "confirm" | "hasData";

const destructiveButton = "bg-red-600 text-white hover:bg-red-500";

export default function DeleteFormSection() {
  const { rawForm: form } = useContext(formContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("confirm");
  const [submissionCount, setSubmissionCount] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);

  const formId = Number(form.id);
  const phraseMatches = phrase.trim() === DELETE_FORM_CONFIRMATION;

  function handleOpenChange(next: boolean) {
    if (loading) return;
    setOpen(next);
    if (!next) {
      setStep("confirm");
      setPhrase("");
    }
  }

  async function runDelete(confirmation?: string) {
    setLoading(true);
    try {
      await deleteForm(formId, confirmation);
      toast.success(`Deleted "${form.title}"`);
      // replace, not push: the deleted form's pages must not stay in history
      router.replace("/portal/admin/forms");
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Error deleting form");
      setLoading(false);
    }
  }

  // Count on the server at confirm time so the data warning is never based
  // on stale client state.
  async function handleFirstConfirm() {
    setLoading(true);
    let count: number;
    try {
      count = await getFormSubmissionCount(formId);
    } catch (error) {
      console.error("Error checking form submissions:", error);
      toast.error("Could not check form for responses");
      setLoading(false);
      return;
    }
    if (count === 0) {
      await runDelete();
      return;
    }
    setSubmissionCount(count);
    setStep("hasData");
    setLoading(false);
  }

  const responsesLabel = `${submissionCount} ${
    submissionCount === 1 ? "response" : "responses"
  }`;

  return (
    <SettingsSection title="Danger zone">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/5 p-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-medium text-neutral-100">Delete this form</h3>
          <p className="text-sm text-neutral-400">
            Permanently removes the form along with all of its responses and
            applications. This cannot be undone.
          </p>
        </div>
        <Button
          size="sm"
          className={destructiveButton}
          onClick={() => setOpen(true)}
        >
          Delete form
        </Button>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="dark sm:max-w-lg">
          {step === "confirm" && (
            <>
              <DialogHeader>
                <DialogTitle>Delete &quot;{form.title}&quot;?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this form? This action is
                  permanent and cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={destructiveButton}
                  disabled={loading}
                  onClick={handleFirstConfirm}
                >
                  {loading && (
                    <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Yes, delete form
                </Button>
              </DialogFooter>
            </>
          )}

          {step === "hasData" && (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (phraseMatches) runDelete(phrase);
              }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-500">
                  <TriangleAlertIcon className="w-5 h-5" />
                  This form contains data
                </DialogTitle>
                <DialogDescription>
                  &quot;{form.title}&quot; has{" "}
                  <span className="font-semibold text-red-400">
                    {responsesLabel}
                  </span>
                  . Deleting the form will permanently erase every response,
                  application, and status history entry attached to it. Are you
                  absolutely sure you want to continue?
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm">
                To confirm, type{" "}
                <span className="font-mono font-semibold text-red-400">
                  {DELETE_FORM_CONFIRMATION}
                </span>{" "}
                below.
              </p>
              <Input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder={DELETE_FORM_CONFIRMATION}
                aria-label={`Type "${DELETE_FORM_CONFIRMATION}" to confirm`}
                autoComplete="off"
                disabled={loading}
                autoFocus
              />
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={destructiveButton}
                  disabled={!phraseMatches || loading}
                >
                  {loading && (
                    <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Delete form permanently
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </SettingsSection>
  );
}
