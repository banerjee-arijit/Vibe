import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sendMail = async () => {
  email: process.env.EMAIL_FROM;
  name: process.env.EMAIL_NAME;
};
