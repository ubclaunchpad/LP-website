import { FormStep, Obj } from "../../lib/types/questions";

export type ApplicationStatus =
  | "pending"
  | "submitted"
  | "rejected"
  | "accepted"
  | "waitlisted"
  | "withdrawn"
  | "interviewing"
  | "interviewed"
  | "offered"
  | "declined";

export type ApplicationRound = {
  id: string;
  title: string;
  start: string;
  end: string;
  questions: FormStep[];
  createdAt: string;
  updatedAt: string;
};
