import { Resend } from "resend";
import { getDefaultFromField } from "../helpers.js";
import type { ResendEmailProvider, EmailSender } from "../types";

// PRIVATE API
export function initResendEmailSender(config: ResendEmailProvider): EmailSender {
  const resend = new Resend(config.apiKey);
  const defaultFromField = getDefaultFromField();

  return {
    async send(email) {
      const fromField = email.from || defaultFromField;
      return resend.emails.send({
        from: fromField.name
          ? `${fromField.name} <${fromField.email}>`
          : fromField.email,
        to: [email.to],
        subject: email.subject,
        text: email.text,
        html: email.html,
      });
    },
  };
}
