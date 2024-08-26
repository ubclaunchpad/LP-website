"use server";
import Mailgun from "mailgun.js";
import formData from "form-data";

type MailConfig = {
  from: string;
  fromName: string;
  to: string;
  cc?: string;
  subject: string;
  text?: string;
  html?: string;
};

const DOMAIN = process.env.MAILGUN_DOMAIN || "mg.ubclaunchpad.com";
const API_KEY = process.env.MAILGUN_API_KEY || "";

const mg = new Mailgun(formData);
const mailgun = mg.client({
  username: "api",
  key: API_KEY,
});

export async function sendEmail(config: MailConfig) {
  try {
    const res = await mailgun.messages.create(DOMAIN, {
      from: `${config.fromName} <${config.from}>`,
      to: [config.to],
      subject: config.subject,
      ...(config.html
        ? { html: config.html }
        : { text: config.text ? config.text : "" }),
      ...(config.cc ? { cc: [config.cc] } : {}),
    });
    return res.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
}
