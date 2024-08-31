// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import { FormQuestion } from "@/lib/types/questions";
import MultiSelect from "../general/multiSelect";
import { Input } from "@/components/primitives/input";

export default function FormQuestionMapper({
  question,
  value,
  OnChange,
  ...props
}: {
  question: FormQuestion;
  value: string | string[] | number | number[] | boolean | null;
  OnChange: (value: string) => void;
}) {
  switch (question.type) {
    case "number":
      return (
        <Input
          type={question.type}
          placeholder={question.placeholder}
          value={value ? Number(value) : undefined}
          onChange={(e) => OnChange(Number(e.target.value))}
          {...props}
        />
      );
    case "text":
    case "email":
    case "url":
      return (
        <Input
          type={question.type}
          placeholder={question.placeholder?.toString()}
          value={value ? value.toString() : undefined}
          onChange={(e) => OnChange(e.target.value)}
          {...props}
        />
      );
    case "date":
      return (
        <Input
          type="date"
          placeholder={question.placeholder}
          {...props}
          onChange={(e) => OnChange(e.target.value)}
        />
      );
    case "textarea":
      return (
        <Textarea
          placeholder={question.placeholder}
          value={value ? value.toString() : undefined}
          onChange={(e) => OnChange(e.target.value)}
          {...props}
        />
      );
    case "select":
      const values = Array.isArray(value) && value.length ? value : [];
      return (
        <MultiSelect
          options={question.options}
          value={values}
          {...props}
          onChange={(e) => OnChange(e)}
          allowMultiple={question.config.multiple}
        />
      );
    default:
      return <div />;
  }
}

function Textarea({ value, onChange, ...props }) {
  return (
    <textarea
      className="w-full p-2 border border-background-600 bg-background-700  rounded-md"
      value={value || ""}
      onChange={onChange}
      {...props}
    />
  );
}
