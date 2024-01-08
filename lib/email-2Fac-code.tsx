import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function send2FactCode(email: string, token: string) {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Reset password",
    html: `<p>Your two factor code is  ${token}</p>`,
  });
}
