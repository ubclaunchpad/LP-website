export type FormItemValidation = {
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  type: "string" | "email" | "number" | "url" | "date";
  isArray?: boolean;
  pattern?: RegExp;
};

export type Trigger = {
  id: string;
  name: string;
  event: {
    id: string;
    values: any[];
  };
  actions: [
    {
      type: "api";
      url: string;
      method: "GET" | "POST" | "PUT" | "DELETE";
      headers: { [key: string]: string };
      body: any;
      responseHandlers: EventResponse[];
    },
  ];
};

export type EventResponse = {
  id: string;
  type: "success" | "error";
  message: string;
  data: any;
};
