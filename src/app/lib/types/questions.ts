
import {ZodType, z} from "zod";
// const formSteps = [
//     {
//       title: "Personal Information",
//       questions: formQuestions,
//     },
//     {
//       title: "Academic Information",
//       questions: formQuestions2,
//     },
//     {
//       title: "Launch Pad",
//       questions: formQuestions,
//     },
//     {
//       title: "Experience",
//       questions: formQuestions,
//     },
//   ];

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
        schema: ZodType<string>;
        multiple?: boolean;
        allowCustom?: boolean;
    };
};

export type FormQuestion = (BaseFormQuestion & { type: Exclude<QuestionFormat, "select"> }) | ListFormQuestion;

export type FormStep = {
    title: string;
    questions: FormQuestion[];
};

export type FormAnswers = Record<string, string | string[]>;


//   const exampleFormQuestion: FormQuestion = {
//     type: "text",
//     label: "First Name",
//     id: "first-name",
//     placeholder: "John",
//     config: {
//         isRequired: true,
//         schema: z.string().min(2),
//     },
    
// };

// const exampleSelectFormQuestion: ListFormQuestion = {
//     type: "select",
//     label: "Pronouns",
//     id: "pronouns",
//     placeholder: "Select",
//     options: [
//         { label: "He/Him", value: "he/him" },
//         { label: "She/Her", value: "she/her" },
//         { label: "They/Them", value: "they/them" },
//         { label: "Other", value: "other" },
//     ],
//     config: {
//         isRequired: true,
//         schema: z.enum(["he/him", "she/her", "they/them", "other"]),
//     },
// };


