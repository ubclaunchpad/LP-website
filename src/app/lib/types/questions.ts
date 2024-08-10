
import {SafeParseReturnType, ZodType, z} from "zod";

 export type QuestionFormat =
  | "text"
  | "email"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "upload"
  | "url";

  export type BaseFormQuestion = {
    type: QuestionFormat;
    label: string;
    id: string;
    placeholder: string;
    config: {
        isRequired: boolean;
        schema: z.ZodTypeAny;
    }
};

export type ListFormQuestion = BaseFormQuestion & {
    type: "select";
    options: Record<string, string>[];
    config: {
        isRequired: true;
        schema:  z.ZodTypeAny | z.ZodArray<z.ZodString, "many">;
        multiple?: boolean;
        allowCustom?: boolean;
    };
};

export type FormQuestion = (BaseFormQuestion & { type: Exclude<QuestionFormat, "select"> }) | ListFormQuestion;

export type FormStep = {
    title: string;
    questions: FormQuestion[];
};

export type FormAnswers = Record<string, string | string[] | boolean | File | null | number>;

export type Obj = Record<string, string | string[] | boolean | File | null | number>;
export type Application = {
    application: Obj,
    resume: File | null,
    status: "pending" | "submitted" | "rejected" | "accepted" | "waitlisted" | "withdrawn" | "interviewing" | "interviewed" | "offered" | "declined";
    meta: {
        submittedAt: Date | null;
        notes: string | null;
        team: string | null;
        reviewer: string | null;
        level: "beginner" | "junior" | "intermediate" | "senior" | "not determined";
    };
}


export type FormItem = {
    errors: SafeParseReturnType<any, any>;
    type: QuestionFormat;
    initialValue: string | string[] | boolean | File | null | number;
    value: string | string[] | boolean | File | null | number;
    validation: ZodType<any>;
    state: {
        isValid: "VALID" | "INVALID" | "NOT_VALIDATED";
    }
    eventHandlers: {
        onFocus: () => void;
        onBlur: () => void;
        onChange: (value: string | string[] | boolean | File | null | number) => void;
    };
    
};

export type FormDetails = {
    [key: string]: FormItem;
};

