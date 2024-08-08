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
      return <Input type={question.type} placeholder={question.placeholder} value={value} onChange={(e) => OnChange(e.target.value)} {...props} />;
    case "date":
      return <input type="date"  placeholder={question.placeholder} {...props} />;
    case "textarea":
      return <textarea placeholder={question.placeholder} {...props} />;
    case "select":
      if (question.config.multiple) {
        return <MultiSelect options={question.options} {...props}/>;
      } 
      return (
        <Select options={question.options} {...props} value={value} onChange={(e) => OnChange(e.target.value)} />
      );
    case "checkbox":
      return <input type="checkbox" {...props}/>;
    case "upload":
      return <input type="file" {...props}/>;
    default:
      return <div/>;
  }
}
