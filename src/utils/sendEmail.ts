import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_EMAIL_FROM!,
      name: 'ComplaintApp'
    },
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error: any) {
    console.error("Error sending email", error?.response?.body || error);
    throw new Error("Failed to send email");
  }
}
