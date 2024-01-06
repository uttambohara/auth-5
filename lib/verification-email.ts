import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Verification link",
    html: `<p>Click <a href="${verificationLink}">here</a> for verifying your email...<p>`,
  });
}
