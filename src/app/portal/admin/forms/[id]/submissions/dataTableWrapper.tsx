"use client";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  createColumns,
  FormFields,
} from "@/app/portal/admin/forms/[id]/submissions/columns";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fields: FormFields;
};

type DataTableWrapperProps<TData> = {
  users: any;
  data: TData[];
};

export function getFormFields({ users }: { users: any }): FormFields {
  return {
    id: {
      type: "text",
      label: "Submission ID",
    },
    appReviewer: {
      type: "text",
      label: "Reviewer",
      cell: ({ row }: { row: any }) => {
        const reviewerId = row.getValue("appReviewer");
        if (!reviewerId) {
          return "Not assigned";
        }
        const reviewer = users[reviewerId];
        return reviewer.name ? reviewer.name : reviewer.email;
      },
    },
    appStatus: {
      type: "text",
      label: "Status",
    },
    email: {
      type: "email",
      label: "Email",
    },
    firstName: {
      type: "text",
      label: "First Name",
    },
    lastName: {
      type: "text",
      label: "Last Name",
    },
    preferredName: {
      type: "text",
      label: "Preferred Name",
    },
    pronouns: {
      type: "select",
      label: "Pronouns",
      options: [
        { label: "She/Her", value: "she" },
        { label: "He/Him", value: "he" },
        { label: "They/Them", value: "they" },
        { label: "Other", value: "other" },
      ],
    },
    studentEmail: {
      type: "email",
      label: "UBC Email",
    },
    faculty: {
      type: "select",
      label: "Faculty",
      options: [
        { label: "Arts", value: "arts" },
        { label: "Science", value: "science" },
        { label: "Engineering", value: "engineering" },
        { label: "Education", value: "education" },
        { label: "Music", value: "music" },
        { label: "Business", value: "business" },
        { label: "Kinesiology", value: "kinesiology" },
      ],
    },
    specialization: {
      type: "select",
      label: "Specialization",
      options: [
        { label: "Anthropology", value: "Anthropology" },
        { label: "Biochemistry", value: "Biochemistry" },
        { label: "Biology", value: "Biology" },
        { label: "Chemistry", value: "Chemistry" },
        { label: "Computer Science", value: "Computer Science" },
        { label: "Economics", value: "Economics" },
        { label: "English", value: "English" },
        { label: "Media Studies", value: "Media Studies" },
        { label: "International Relations", value: "International Relations" },
        { label: "Mathematics", value: "Mathematics" },
        { label: "Philosophy", value: "Philosophy" },
        { label: "Physics", value: "Physics" },
        { label: "Political Science", value: "Political Science" },
        { label: "Psychology", value: "Psychology" },
        { label: "Sociology", value: "Sociology" },
        { label: "Statistics", value: "Statistics" },
        { label: "Visual Arts", value: "Visual Arts" },
        { label: "Biomedical Engineering", value: "Biomedical Engineering" },
        { label: "Civil Engineering", value: "Civil Engineering" },
        { label: "Electrical Engineering", value: "Electrical Engineering" },
        { label: "Mechanical Engineering", value: "Mechanical Engineering" },
        { label: "Computer Engineering", value: "Computer Engineering" },
        { label: "Not listed", value: "Not listed" },
      ],
    },
    year: {
      type: "select",
      label: "Year of Study",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "Other", value: "Other" },
        { label: "Graduate Student", value: "Graduate Student" },
      ],
    },
    graduationYear: {
      type: "number",
      label: "Graduation Year",
    },
    resume: {
      type: "url",
      label: "Resume Link - Make sure it's public and as a PDF",
    },
    linkedin: {
      type: "url",
      label: "LinkedIn",
    },
    github: {
      type: "url",
      label: "GitHub",
    },
    website: {
      type: "url",
      label: "Portfolio/Case Study",
    },
    role: {
      type: "select",
      label:
        "Which role are you applying for? - only the option you select will be considered",
      options: [
        { label: "Developer", value: "Developer" },
        { label: "Designer", value: "Designer" },
      ],
    },
    "lp-team": {
      type: "select",
      label: "Which Launch Pad team are you applying for?",
      options: [
        {
          label: "Bluenav",
          value: "Bluenav",
        },
        {
          label: "Classsync",
          value: "Classsync",
        },
        {
          label: "Cosmic Gateway",
          value: "Cosmic Gateway",
        },
        {
          label: "Epilog",
          value: "Epilog",
        },
        {
          label: "Essentially",
          value: "Essentially",
        },
        {
          label: "Floradora",
          value: "Floradora",
        },
        {
          label: "Labby",
          value: "Labby",
        },
        {
          label: "Microvan",
          value: "Microvan",
        },
        {
          label: "Nom Appetit",
          value: "Nom Appetit",
        },
        {
          label: "Other",
          value: "Other",
        },
      ],
    },
    learning: {
      type: "textarea",
      label: "Describe a recent concept or tool that you have learned",
    },
    aspirations: {
      type: "textarea",
      label: "What do you want to do most in the coming year?",
    },
    misc: {
      type: "textarea",
      label: "Anything else you'd like to share with us?",
    },
  };
}

export default function DataTableWrapper<TData>({
  data,
  users,
}: DataTableWrapperProps<TData>) {
  const fields = getFormFields({ users: users });
  const fieldData = data as unknown as (string | number)[];
  const columns = createColumns(fields);
  return <DataTable columns={columns} data={fieldData} fields={fields} />;
}
