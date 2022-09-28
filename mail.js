import nodemailer from "nodemailer";
import mailTemplate from "./mailTemplate.js";
import dotenv from "dotenv";

dotenv.config();
async function sendMail(to) {
  const { user, pass } = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: "javascript.react@outlook.com",
      to,
      subject: "Request confirmation",
      html: mailTemplate(to),
    });
    return info;
  } catch (error) {
    console.log(error);
    return
  }
}

export default sendMail;
