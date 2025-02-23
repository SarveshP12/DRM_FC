import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_FROM, // Your verified sender email
      subject,
      text,
      html,
    };
    await sgMail.send(msg);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    return { success: false, message: "Failed to send email." };
  }
};
