import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmailVerificationToken(
  email: string,
  token: string
) {
  const generatedToken = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Verification code",
    html: `<p>Click <a href="${generatedToken}">here</a> to register your email....</p>`,
  });
}
