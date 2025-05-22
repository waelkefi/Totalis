// import {
// 	PASSWORD_RESET_REQUEST_TEMPLATE,
// 	PASSWORD_RESET_SUCCESS_TEMPLATE,
// 	VERIFICATION_EMAIL_TEMPLATE,
// } from "./emailTemplates.js";
// import { mailtrapClient, sender } from "./mailtrap.config.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Verify your email",
// 			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
// 			category: "Email Verification",
// 		});

// 		console.log("Email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending verification`, error);

// 		throw new Error(`Error sending verification email: ${error}`);
// 	}
// };

// export const sendWelcomeEmail = async (email, name) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
// 			template_variables: {
// 				company_info_name: "Auth Company",
// 				name: name,
// 			},
// 		});

// 		console.log("Welcome email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending welcome email`, error);

// 		throw new Error(`Error sending welcome email: ${error}`);
// 	}
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Reset your password",
// 			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
// 			category: "Password Reset",
// 		});
// 	} catch (error) {
// 		console.error(`Error sending password reset email`, error);

// 		throw new Error(`Error sending password reset email: ${error}`);
// 	}
// };

// export const sendResetSuccessEmail = async (email) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Password Reset Successful",
// 			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
// 			category: "Password Reset",
// 		});

// 		console.log("Password reset email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending password reset success email`, error);

// 		throw new Error(`Error sending password reset success email: ${error}`);
// 	}
// };

import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Remplace par ton service email si différent
  auth: {
	user: "testpitest7@gmail.com",
	pass: "pwivpghsslwzzdmi",
  },
  tls: {
	rejectUnauthorized: true,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error("Error sending verification email: " + error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to our platform!",
      html: `<p>Welcome ${name}, we're glad to have you on board!</p>`
    };
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Error sending welcome email: " + error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error("Error sending password reset email: " + error);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };
    await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error("Error sending password reset success email: " + error);
  }
};
