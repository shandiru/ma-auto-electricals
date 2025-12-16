import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Create transporter (using Gmail SMTP for example)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
    });

    const info = await transporter.sendMail({
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email sending failed:", err);
  }
};
