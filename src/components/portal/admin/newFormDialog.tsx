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
import { BasicForm, FormDetails, Obj } from "@/lib/types/questions";
import FormItemInput from "@/components/forms/formItem";
import { FormEvent, useState } from "react";
import { questionToFormItem } from "@/lib/utils/forms/helpers";
import { createForm } from "@/app/portal/admin/actions";

const formQ: BasicForm = {
  questions: [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Form Title",
      config: {
        validation: {
          isRequired: true,
          type: "string",
        },
      },
    },
    {
      id: "open_at",
      label: "Start Date",
      type: "date",
      placeholder: "Start Date",
      config: {
        validation: {
          isRequired: true,
          type: "string",
        },
      },
    },
    {
      id: "close_at",
      label: "Close Date",
      type: "date",
      placeholder: "End Date",
      config: {
        validation: {
          isRequired: true,
          type: "string",
        },
      },
    },
  ],
};

export default function NewFormDialog() {
  const [formAnswers, setFormAnswers] = useState<FormDetails>(
    formQ.questions.reduce((acc, question) => {
      acc[question.id] = questionToFormItem(question, "", updateForm);
      return acc;
    }, {} as FormDetails),
  );
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateForm(
    id: string,
    value: string | string[] | null | number | number[],
  ) {
    setFormAnswers((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          value: value,
        },
      };
    });
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data: Obj = {};
      Object.entries(formAnswers).forEach(([key, value]) => {
        if (value.value === "") return;
        data[key] = value.value;
      });

      await createForm({ title: data.title as string });

      // Close dialog on success
      setOpen(false);

      // Reset form answers
      setFormAnswers(
        formQ.questions.reduce((acc, question) => {
          acc[question.id] = questionToFormItem(question, "", updateForm);
          return acc;
        }, {} as FormDetails),
      );
    } catch (error) {
      console.error("Failed to create form:", error);
      // Optionally handle error (show toast, etc.)
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
            Forms are used to collect information, surveys, recruitment, etc.
          </DialogDescription>
        </DialogHeader>
        <form
          className={"flex flex-col gap-2"}
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div className="flex items-center flex-col w-full gap-4 space-x-2">
            <div className="flex flex-1 flex-col w-full pb-4 gap-2">
              {formQ.questions.map((question, index) => (
                <FormItemInput
                  expanded={true}
                  question={question}
                  key={index}
                  questionData={formAnswers[question.id]}
                />
              ))}
            </div>
          </div>
          <Button size={"sm"} type="submit" disabled={isSubmitting}>
            Create Form
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
