import { z } from "zod";
import { FormAnswers, FormQuestion } from "../types/questions";

const personalQuestions: FormQuestion[] = [
  {
    type: "text",
    label: "First Name",
    id: "first-name",
    placeholder: "John",
    config: {
      isRequired: true,
      schema: z.string().min(2),
    },
  },
  {
    type: "text",
    label: "Last Name",
    id: "last-name",
    placeholder: "Doe",
    config: {
      isRequired: true,
      schema: z.string().min(2),
    },
  },
  {
    type: "email",
    label: "Email",
    id: "email",
    placeholder: "john@doe.com",
    config: {
      isRequired: true,
      schema: z.string().email(),
    },
  },
  {
    type: "text",
    label: "Prefered Name",
    id: "preferred-name",
    placeholder: "John",
    config: {
      isRequired: false,
      schema: z.string(),
    },
  },
  {
    type: "select",
    label: "Pronouns",
    id: "pronouns",
    placeholder: "Select",
    options: [
      { value: "He/Him", label: "He/Him" },
      { value: "She/Her", label: "She/Her" },
      { value: "They/Them", label: "They/Them" },
      { value: "Other", label: "Other" },
    ],
    config: {
      isRequired: true,
      schema: z.array(z.string()),
      multiple: true,
    },
  },
];

const educationQuestions: FormQuestion[] = [
  {
    type: "select",
    label: "Faculty",
    id: "faculty",
    placeholder: "Select",
    options: [
      { value: "Science", label: "Science" },
      { value: "Engineering", label: "Engineering" },
      { value: "Arts", label: "Arts" },
      { value: "Other", label: "Other" },
    ],
    config: {
      isRequired: true,
      schema: z.string().min(2),
    },
  },
  {
    type: "select",
    label: "Year of Study",
    id: "year",
    placeholder: "Select",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "Other", label: "Other" },
    ],
    config: {
      isRequired: true,
      schema: z.string().min(2),
    },
  },
  {
    type: "select",
    label: "Graduation Year",
    id: "graduation-year",
    placeholder: "Select",
    options: [
      { value: "2024", label: "2024" },
      { value: "2025", label: "2025" },
      { value: "2026", label: "2026" },
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
      { value: "2030", label: "2030" },
      { value: "Other", label: "Other" },
    ],
    config: {
      isRequired: true,
      schema: z.string().min(2),
    },
  },
  {
    type: "select",
    label: "Specialization",
    id: "specialization",
    placeholder: "Select",
    options: [
      { value: "Software Engineering", label: "Software Engineering" },
      { value: "Computer Science", label: "Computer Science" },
      { value: "Other", label: "Other" },
    ],
    config: {
      isRequired: true,
      schema: z.string().min(2),
    },
  },
  {
    type: "email",
    label: "UBC Email",
    id: "ubc-email",
    placeholder: "john@students.ubc.ca",
    config: {
      isRequired: true,
      schema: z
        .string()
        .email()
        .refine((email) => email.endsWith("ubc.ca"), {
          message: "Email must be a UBC email",
        }),
    },
  },
  {
    type: "number",
    label: "Student Number",
    id: "student-number",
    placeholder: "12345678",
    config: {
      isRequired: true,
      schema: z.string().min(4).max(12),
    },
  },
];

const experienceQuestions: FormQuestion[] = [
  {
    type: "textarea",
    label: "Tell us about your experience",
    id: "experience",
    placeholder: "I have experience in...",
    config: {
      isRequired: true,
      schema: z.string().min(10),
    },
  },
  {
    type: "upload",
    label: "Resume",
    id: "resume",
    placeholder: "Upload your resume",
    config: {
      isRequired: true,
      schema: z.any(),
    },
  },
  {
    type: "url",
    label: "Portfolio",
    id: "portfolio",
    placeholder: "https://johnsportfolio.com",
    config: {
      isRequired: false,
      schema: z.string().url(),
    },
  },
  {
    type: "url",
    label: "LinkedIn",
    id: "linkedin",
    placeholder: "https://linkedin.com/in/johndoe",
    config: {
      isRequired: false,
      schema: z.string().url(),
    },
  },
  {
    type: "url",
    label: "GitHub",
    id: "github",
    placeholder: "https://www.github.com/johndoe",
    config: {
      isRequired: false,
      schema: z.string().url(),
    },
  },
];

const qualificationQuestions: FormQuestion[] = [
  {
    type: "select",
    label: "Are you able to commit to 6-8 hours a week?",
    id: "commitment",
    placeholder: "Yes",
    config: {
      isRequired: true,
      schema: z.enum(["Yes", "No"]),
    },
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    type: "select",
    label: "Are you able to attend weekly meetings excluding holidays?",
    id: "meetings",
    placeholder: "Yes",
    config: {
      isRequired: true,
      schema: z.enum(["Yes", "No"]),
    },
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    type: "select",
    label: "Will you attend Launch Pad social and professional events?",
    id: "events",
    placeholder: "Yes",
    config: {
      isRequired: true,
      schema: z.enum(["Yes", "Most Likely", "Not Sure", "No"]),
    },
    options: [
      { value: "Yes", label: "Yes" },
      { value: "Most Likely", label: "Most Likely" },
      { value: "Not Sure", label: "Not Sure" },
      { value: "No", label: "No" },
    ],
  },
  {
    type: "select",
    label: "Are you able to pay the membership fee of $20?",
    id: "fee",
    placeholder: "Yes",
    config: {
      isRequired: true,
      schema: z.enum(["Yes", "No"]),
    },
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    type: "select",
    label: "I agree to the terms and conditions",
    id: "terms",
    placeholder: "Yes",
    config: {
      isRequired: true,
      schema: z.enum(["Yes", "No"]),
    },
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    type: "select",
    label: "I agree to the code of conduct",
    id: "conduct",
    placeholder: "Yes",
    config: {
      isRequired: true,
      schema: z.enum(["Yes", "No"]),
    },
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
];

export const formSteps = [
  {
    title: "Personal Information",
    questions: personalQuestions,
  },
  {
    title: "Education",
    questions: educationQuestions,
  },
  {
    title: "Experience",
    questions: experienceQuestions,
  },
  {
    title: "Qualifications",
    questions: qualificationQuestions,
  },
] as const;

export function createEmptyAnswers(): FormAnswers {
  const answers: FormAnswers = {};
  formSteps.forEach((step) => {
    step.questions.forEach((question) => {
      if (question.type === "select" && question.config.multiple) {
        answers[question.id] = [];
      } else {
        answers[question.id] = null;
      }
    });
  });
  return answers;
}
