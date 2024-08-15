"use client";
import { FormQuestion } from "@/app/lib/types/questions";
import Input from "../input";
import Select from "../select";
import MultiSelect from "../multiSelect";

export default function formQuestionMapper({
  question,
  value,
  OnChange,
  ...props
}: {
  question: FormQuestion;
  value: string;
  OnChange: (value: string) => void;
}) {
  switch (question.type) {
    case "text":
    case "email":
    case "number":
    case "url":
      return (
        <Input
          type={question.type}
          placeholder={question.placeholder}
          value={value}
          onChange={(e) => OnChange(e.target.value)}
          {...props}
        />
      );
    case "date":
      return (
        <input
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
          value={value}
          onChange={(e) => OnChange(e.target.value)}
          {...props}
        />
      );
    case "select":
      if (question.config.multiple) {
        return (
          <MultiSelect
            options={question.options}
            value={value}
            {...props}
            onChange={(e) => OnChange(e)}
          />
        );
      }
      return (
        <Select
          options={question.options}
          {...props}
          value={value}
          onChange={(e) => OnChange(e)}
        />
      );
    case "upload":
      return (
        <Input
          type="file"
          {...props}
          onChange={(e) => OnChange(e.target.files[0])}
        />
      );
    default:
      return <div />;
  }
}

function Textarea({ value, onChange, ...props }) {
  return (
    <textarea
      className="w-full p-2 border border-neutral-800 resize-none bg-neutral-800 rounded-md"
      value={value || ""}
      onChange={onChange}
      {...props}
    />
  );
}
