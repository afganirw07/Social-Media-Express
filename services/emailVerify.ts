import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: string) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Social Downloader" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Verification Code",
        html: `
      <h2>Email Verification</h2>
      <p>Your OTP code:</p>
      <h1>${otp}</h1>
      <p>This code expires in 5 minutes.</p>
    `,
    });
};
