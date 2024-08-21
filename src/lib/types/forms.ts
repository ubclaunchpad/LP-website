export type FormItemValidation = {
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  type: "string" | "email" | "number" | "url" | "date";
  isArray?: boolean;
  pattern?: RegExp;
};
