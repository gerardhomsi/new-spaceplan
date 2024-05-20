"use server";

import { Resend } from "resend";

import { EmailTemplate } from "@/components/email/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData) => {
  const { senderName, senderEmail, contactMessage } = formData;

  const res = await resend.emails.send({
    from: "SpacePlan <onboarding@resend.dev>",
    to: ["gerard.homsi@gmail.com"],
    reply_to: senderEmail,
    subject: "Contact From",
    react: EmailTemplate({ contactMessage, senderEmail, senderName }),
  });

  return res;
};
