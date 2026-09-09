"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formContext } from "@/components/layouts/formTabView";
import { updateForm } from "@/app/portal/admin/actions";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { LoaderCircleIcon, LockIcon } from "lucide-react";

type EditorOption = { value: string; label: string };
type EditorQuestion = {
  id: string;
  type: string;
  label: string;
  options?: EditorOption[];
  config: any;
};
type EditorStep = {
  id: string;
  title: string;
  questions: EditorQuestion[];
};

const TYPE_LABELS: Record<string, string> = {
  text: "Text",
  textarea: "Long text",
  email: "Email",
  url: "URL",
  number: "Number",
  date: "Date",
  select: "Dropdown",
  checkbox: "Checkbox",
  info: "Info box",
};

export default function FormQuestionsEditorPage() {
  const { rawForm } = useContext(formContext);
  const router = useRouter();

  const [steps, setSteps] = useState<EditorStep[]>(() =>
    structuredClone(rawForm?.questions ?? []),
  );
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const initialJson = useMemo(
    () => JSON.stringify(rawForm?.questions ?? []),
    [rawForm],
  );
  const dirty = JSON.stringify(steps) !== initialJson;

  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        if (!question.label.trim()) {
          errors.push(`${question.id}: label is empty`);
        }
        (question.options ?? []).forEach((option) => {
          if (!option.label.trim()) {
            errors.push(`${question.id}: option "${option.value}" has no label`);
          }
        });
      });
    });
    return errors;
  }, [steps]);

  if (!rawForm) {
    return null;
  }

  function updateQuestion(
    stepIndex: number,
    questionIndex: number,
    patch: Partial<EditorQuestion>,
  ) {
    setSteps((prev) => {
      const next = structuredClone(prev);
      next[stepIndex].questions[questionIndex] = {
        ...next[stepIndex].questions[questionIndex],
        ...patch,
      };
      return next;
    });
  }

  function updateOption(
    stepIndex: number,
    questionIndex: number,
    optionIndex: number,
    label: string,
  ) {
    setSteps((prev) => {
      const next = structuredClone(prev);
      const options = next[stepIndex].questions[questionIndex].options ?? [];
      options[optionIndex] = { ...options[optionIndex], label };
      next[stepIndex].questions[questionIndex].options = options;
      return next;
    });
  }

  async function handleSave() {
    if (validationErrors.length > 0) {
      toast.error(
        `Fix ${validationErrors.length} issue(s) before saving: ${validationErrors[0]}`,
      );
      return;
    }
    setSaving(true);
    try {
      await updateForm(Number(rawForm.id), {
        questions: steps as unknown as object[],
      });
      setSavedAt(new Date().toLocaleTimeString());
      toast.success("Question content saved");
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error("Save failed — try again");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-20 flex-1 items-center w-full px-4">
      <div className="flex flex-wrap w-full sticky top-0 z-10 justify-between items-center gap-3 bg-background-800 py-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl">Form Questions</h2>
          <p className="flex items-center gap-1.5 text-xs text-neutral-400">
            <LockIcon size={12} />
            Structure is locked — you can edit the wording of questions and
            options, but not add, remove, or reorder them.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-xs text-neutral-400">Saved {savedAt}</span>
          )}
          <Button
            disabled={!dirty || validationErrors.length > 0 || saving}
            onClick={handleSave}
          >
            {saving && <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {steps.map((step, stepIndex) => (
          <section
            key={step.id}
            className="flex flex-col gap-3 w-full rounded-md p-4 bg-background-800 border border-background-600"
          >
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <h3 className="text-base font-semibold">{step.title}</h3>
              <span className="text-xs text-neutral-400">
                {step.questions.length} question
                {step.questions.length === 1 ? "" : "s"}
              </span>
            </div>

            {step.questions.map((question, questionIndex) => (
              <div
                key={question.id}
                className="rounded-lg border border-background-600 bg-background-700 p-3 sm:p-4 flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-background-500 bg-background-600 rounded-full px-2.5 py-0.5 text-xs text-lp-300 font-medium uppercase tracking-wide">
                    {TYPE_LABELS[question.type] ?? question.type}
                  </span>
                  <code className="text-xs text-neutral-400 font-mono truncate max-w-[240px]">
                    {question.id}
                  </code>
                  {question.config?.validation?.isRequired && (
                    <span className="text-xs text-neutral-300">
                      Required <span className="text-lp-400">*</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`label-${stepIndex}-${questionIndex}`}
                    className="text-xs text-neutral-400"
                  >
                    Question text
                  </label>
                  {question.type === "info" ? (
                    <textarea
                      id={`label-${stepIndex}-${questionIndex}`}
                      value={question.label}
                      onChange={(e) =>
                        updateQuestion(stepIndex, questionIndex, {
                          label: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full p-2 text-sm bg-background-800 border border-background-500 rounded-md focus:outline-none focus:border-lp-400"
                    />
                  ) : (
                    <Input
                      id={`label-${stepIndex}-${questionIndex}`}
                      value={question.label}
                      onChange={(e) =>
                        updateQuestion(stepIndex, questionIndex, {
                          label: e.target.value,
                        })
                      }
                      className="p-2 bg-background-800 border-background-500"
                    />
                  )}
                </div>

                {(question.options?.length ?? 0) > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-neutral-400">
                      Options
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {(question.options ?? []).map((option, optionIndex) => (
                        <div
                          key={option.value}
                          className="flex items-center gap-2"
                        >
                          <code className="text-xs text-neutral-500 font-mono w-28 sm:w-36 shrink-0 truncate">
                            {option.value}
                          </code>
                          <Input
                            value={option.label}
                            onChange={(e) =>
                              updateOption(
                                stepIndex,
                                questionIndex,
                                optionIndex,
                                e.target.value,
                              )
                            }
                            aria-label={`Label for ${option.value}`}
                            className="p-2 flex-1 min-w-0 bg-background-800 border-background-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
