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
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      // @ts-expect-error: error.response may exist
      console.error("Error sending email", error.response?.body || error);
    } else {
      console.error("Error sending email", error);
    }
    throw new Error("Failed to send email");
  }
}
