import type { NextApiRequest, NextApiResponse } from "next";
import Mailgun from "mailgun.js";
import formData from "form-data";

const DOMAIN = process.env.MAILGUN_DOMAIN || "mg.ubclaunchpad.com";
const API_KEY = process.env.MAILGUN_API_KEY || "";

// Initialize Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: API_KEY,
});

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormResult = {
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactFormResult>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { name, email, message }: ContactFormData = req.body;

    // Validate environment variables
    if (!API_KEY) {
      console.error(" MAILGUN_API_KEY is not configured");
      return res.status(500).json({
        success: false,
        error: "Email service not configured.",
      });
    }

    if (!DOMAIN) {
      console.error("MAILGUN_DOMAIN is not configured");
      return res.status(500).json({
        success: false,
        error: "Email service not configured.",
      });
    }

    // Validate form data
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please fill in all required fields.",
      });
    }

    // Send email via Mailgun
    const result = await mg.messages.create(DOMAIN, {
      from: `${name} <${email}>`,
      to: "strategy@ubclaunchpad.com",
      subject: "Contact Us Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return res.status(500).json({
      success: false,
      error:
        "There was an error sending your message. Please try again later or contact strategy@ubclaunchpad.com directly.",
    });
  }
}
