import { z } from "zod";
import { FormAnswers, FormQuestion, FormStep } from "../types/questions";

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
      { value: "Business", label: "Business" },
      { value: "Music", label: "Music" },
      { value: "Forestry", label: "Forestry" },
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
      { value: "Graduate Student", label: "Graduate Student" },
    ],
    config: {
      isRequired: true,
      schema: z.enum(["1", "2", "3", "4", "5", "Other", "Graduate Student"]),
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
      schema: z.enum([
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "Other",
      ]),
    },
  },
  {
    type: "select",
    label: "Specialization",
    id: "specialization",
    placeholder: "Select",
    options: [
      { value: "Anthropology", label: "Anthropology" },
      { value: "Biochemistry", label: "Biochemistry" },
      { value: "Biology", label: "Biology" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Classical Studies", label: "Classical Studies" },
      { value: "Computer Science", label: "Computer Science" },
      { value: "Economics", label: "Economics" },
      { value: "English Literature", label: "English Literature" },
      { value: "Environmental Science", label: "Environmental Science" },
      { value: "Film Studies", label: "Film Studies" },
      { value: "Geography", label: "Geography" },
      { value: "History", label: "History" },
      { value: "International Relations", label: "International Relations" },
      { value: "Mathematics", label: "Mathematics" },
      { value: "Microbiology", label: "Microbiology" },
      { value: "Music", label: "Music" },
      { value: "Philosophy", label: "Philosophy" },
      { value: "Physics", label: "Physics" },
      { value: "Political Science", label: "Political Science" },
      { value: "Psychology", label: "Psychology" },
      { value: "Sociology", label: "Sociology" },
      { value: "Statistics", label: "Statistics" },
      { value: "Theatre", label: "Theatre" },
      { value: "Visual Arts", label: "Visual Arts" },
      { value: "Zoology", label: "Zoology" },
      { value: "Biomedical Engineering", label: "Biomedical Engineering" },
      { value: "Civil Engineering", label: "Civil Engineering" },
      { value: "Electrical Engineering", label: "Electrical Engineering" },
      { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    ],
    config: {
      isRequired: true,
      schema: z.string(),
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
    type: "select",
    label:
      "Which out of the following would provide the most value to you? - select up to 3",
    id: "club-benefits",
    placeholder: "I would benefit most from...",
    config: {
      isRequired: true,
      schema: z.string().min(10),
      multiple: true,
    },
    options: [
      { value: "Working with a team", label: "Working with a team" },
      {
        value: "Learning new technologies",
        label: "Learning new technologies",
      },
      { value: "Exploration of new ideas", label: "Exploration of new ideas" },
      { value: "Building a project", label: "Building a project" },
      {
        value: "Working on a real-world problem",
        label: "Working on a real-world problem",
      },
      { value: "Working with designers", label: "Working with designers" },
      { value: "Working with developers", label: "Working with developers" },
      {
        value: "Mentorship from Launch Pad alumni",
        label: "Mentorship from Launch Pad alumni",
      },
      {
        value: "Networking and making connections",
        label: "Networking and making connections",
      },
      { value: "Other", label: "Other" },
      { value: "Networking", label: "Networking" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    type: "select",
    label:
      "Which role are you applying for? - only the option you select will be considered",
    id: "role",
    placeholder: "Select",
    config: {
      isRequired: true,
      schema: z.enum(["Developer", "Designer"]),
    },
    options: [
      { value: "Developer", label: "Developer" },
      { value: "Designer", label: "Designer" },
    ],
  },
];

const designQuestions: FormQuestion[] = [
  {
    type: "select",
    label: "What areas of design are you interested in?",
    id: "design-interest",
    placeholder: "Select",
    config: {
      isRequired: true,
      schema: z.enum(["UI/UX", "Graphic Design", "Web Design"]),
      multiple: true,
    },
    options: [
      { value: "UI/UX", label: "UI/UX" },
      { value: "Graphic Design", label: "Graphic Design" },
      { value: "Web Design", label: "Web Design" },
    ],
  },
  {
    type: "select",
    label: "What tools do you use?",
    id: "design-tools",
    placeholder: "Select",
    config: {
      isRequired: true,
      schema: z.array(
        z.enum(["Figma", "Adobe Creative Suite", "Sketch", "InVision", "Other"])
      ),
      multiple: true,
    },
    options: [
      { value: "Figma", label: "Figma" },
      { value: "Adobe Creative Suite", label: "Adobe Creative Suite" },
      { value: "Sketch", label: "Sketch" },
      { value: "InVision", label: "InVision" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    type: "textarea",
    label: "Tell us about your design experience",
    id: "design-experience",
    placeholder: "I have experience in...",
    config: {
      isRequired: true,
      schema: z.string().min(10),
    },
  },
];

const developerQuestions: FormQuestion[] = [
  {
    type: "select",
    label: "What areas of development are you interested in? - select up to 3",
    id: "development-interest",
    placeholder: "Select",
    config: {
      isRequired: true,
      schema: z
        .array(
          z.enum([
            "Frontend",
            "Backend",
            "Full Stack",
            "Mobile",
            "Cloud",
            "AI & ML",
            "Web",
            "Infrastructure",
            "Other",
          ])
        )
        .min(1)
        .max(3, { message: "Select up to 3" }),
      multiple: true,
    },
    options: [
      { value: "Frontend", label: "Frontend" },
      { value: "Backend", label: "Backend" },
      { value: "Full Stack", label: "Full Stack" },
      { value: "Mobile", label: "Mobile" },
      { value: "Cloud", label: "Cloud" },
      { value: "AI & ML", label: "AI & ML" },
      { value: "Web", label: "Web" },
      { value: "Infrastructure", label: "Infrastructure" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    type: "select",
    label: "What languages do you use the most? - select up to 3",
    id: "languages",
    placeholder: "Select",
    config: {
      isRequired: true,
      schema: z.array(z.enum(["JavaScript", "Python", "Java", "C++", "Other"])),
      multiple: true,
    },
    options: [
      { value: "JavaScript", label: "JavaScript" },
      { value: "Python", label: "Python" },
      { value: "Java", label: "Java" },
      { value: "C++", label: "C++" },
      { value: "C#", label: "C#" },
      { value: "Ruby", label: "Ruby" },
      { value: "Swift", label: "Swift" },
      { value: "Go", label: "Go" },
      { value: "Kotlin", label: "Kotlin" },
      { value: "Rust", label: "Rust" },
      { value: "TypeScript", label: "TypeScript" },
      { value: "PHP", label: "PHP" },
      { value: "Scala", label: "Scala" },
      { value: "Lua", label: "Lua" },
      { value: "R", label: "R" },
      { value: "Objective-C", label: "Objective-C" },
      { value: "Groovy", label: "Groovy" },
      { value: "Matlab", label: "Matlab" },
      { value: "SQL", label: "SQL" },
      { value: "Dart", label: "Dart" },
      { value: "Elixir", label: "Elixir" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    type: "select",
    label: "What frameworks or tools do you use the most? - select up to 3",
    id: "frameworks",
    placeholder: "Select",
    config: {
      isRequired: true,
      schema: z
        .array(z.string().refine((value) => value.length > 0))
        .min(0)
        .max(3, { message: "Select up to 3" }),
      multiple: true,
    },
    options: [
      { value: "React", label: "React" },
      { value: "Angular", label: "Angular" },
      { value: "Vue", label: "Vue" },
      { value: "Django", label: "Django" },
      { value: "Flask", label: "Flask" },
      { value: "Spring", label: "Spring" },
      { value: "Express.js", label: "Express.js" },
      { value: "Ruby on Rails", label: "Ruby on Rails" },
      { value: "ASP.NET", label: "ASP.NET" },
      { value: "Laravel", label: "Laravel" },
      { value: "Svelte", label: "Svelte" },
      { value: "TensorFlow", label: "TensorFlow" },
      { value: "PyTorch", label: "PyTorch" },
      { value: "Keras", label: "Keras" },
      { value: "Pandas", label: "Pandas" },
      { value: "NumPy", label: "NumPy" },
      { value: "Unity", label: "Unity" },
      { value: "Unreal Engine", label: "Unreal Engine" },
      { value: "AWS", label: "AWS" },
      { value: "Google Cloud", label: "Google Cloud" },
      { value: "Azure", label: "Azure" },
      { value: "Docker", label: "Docker" },
      { value: "Kubernetes", label: "Kubernetes" },
      { value: "Jenkins", label: "Jenkins" },
      { value: "CircleCI", label: "CircleCI" },
      { value: "JUnit", label: "JUnit" },
      { value: "Mocha", label: "Mocha" },
      { value: "Jest", label: "Jest" },
      { value: "Selenium", label: "Selenium" },
      { value: "Postman", label: "Postman" },
      { value: "Cypress", label: "Cypress" },
      { value: "Puppeteer", label: "Puppeteer" },
      { value: "PyTest", label: "PyTest" },
      { value: "RSpec", label: "RSpec" },
      { value: "Other", label: "Other" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    type: "textarea",
    label: "Describe a recent concept or software tool that you have learned",
    id: "development-learning",
    placeholder: "Last month, I started learning...",
    config: {
      isRequired: true,
      schema: z.string(),
    },
  },
  {
    type: "textarea",
    label: "What do you want to do most in the coming year?",
    id: "development-aspirations",
    placeholder: "This year, I want to...",
    config: {
      isRequired: true,
      schema: z.string().min(10),
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

export const formSteps: FormStep[] = [
  {
    title: "Personal Information",
    questions: personalQuestions,
    target: "everyone",
  },
  {
    title: "Education",
    questions: educationQuestions,
    target: "everyone",
  },
  {
    title: "Interest",
    questions: experienceQuestions,
    target: "everyone",
  },
  {
    title: "Designer",
    questions: designQuestions,
    target: "designer",
  },
  {
    title: "Developer",
    questions: developerQuestions,
    target: "developer",
  },
  {
    title: "Qualifications",
    questions: qualificationQuestions,
    target: "everyone",
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
