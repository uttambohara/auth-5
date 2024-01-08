import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmailPasswordResetToken(
  email: string,
  token: string
) {
  const generatedToken = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Reset password",
    html: `<p>Click <a href="${generatedToken}">here</a> to change your password....</p>`,
  });
}
