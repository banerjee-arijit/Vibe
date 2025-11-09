import pkg from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
import {
  createWelcomeEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createCommentNotificationEmailTemplate,
} from "./emailTemplate.js";

const { MailtrapClient } = pkg;
const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_NAME || "UnLinked",
};

export const sendWelcomeMail = async (email, username, profileUrl) => {
  const recipient = [{ email }];
  try {
    await mailtrapClient.send({
      to: recipient,
      from: sender,
      subject: "Welcome to UnLinked!",
      html: createWelcomeEmailTemplate(username, profileUrl),
      category: "Welcome",
    });
    return { success: true, message: "Welcome mail sent successfully" };
  } catch (error) {
    console.log("Error in sendWelcomeMail:", error.message);
    throw error;
  }
};
