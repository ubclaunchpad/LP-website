"use client";

import { FormQuestion } from "@/app/lib/types/questions";
import formQuestionMapper from "./formMapper";
import { useEffect, useState } from "react";
import { z } from "zod";
import { parseFactory } from "@/app/lib/util/helpers";

type ValueValidation = "VALID" | "INVALID" | "NOT_VALIDATED";

export default function FormItem({ question, formAnswer }: { question: FormQuestion , formAnswer: string | string[] | undefined}) {
  const [message, setMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const initialValue = formAnswer || "";
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState<ValueValidation>("NOT_VALIDATED");

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (isFocused) {
      setIsDirty(true);
    }
    if (!isFocused && isDirty) {
      try {
        parseFactory(question.config.schema)(value);
        setMessage("");
        setIsValid("VALID");
      } catch (error) {
        const zodError = error as z.ZodError;
        setMessage(zodError?.issues[0]?.message);
        setIsValid("INVALID");
      }
    } else {
      setMessage("");
      if (!isDirty) {
        setIsValid("NOT_VALIDATED");
      } else if (!isFocused && isDirty) {
        setIsValid("VALID");
      }
    }
  }, [isDirty, isFocused, question.config.schema, value]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="flex items-center gap-1">
        <span className="">{question.label}</span>
        {question.config.isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center w-full gap-2 relative *:w-full">
        {formQuestionMapper({
          question: question,
          value,
          OnChange: setValue,
          onFocus: handleOnFocus,
          onBlur: handleBlur,
        })}
        {isValid === "VALID" && (
          <span className="absolute right-2 pointer-events-none  top-2 text-green-500">
            ✓
          </span>
        )}
        {isValid === "INVALID" && (
          <span className="absolute right-2 top-2 pointer-events-none  text-red-500">
            ✗
          </span>
        )}
      </div>
      <span className="text-red-500 px-1 h-6 text-sm">{message}</span>
    </div>
  );
}
