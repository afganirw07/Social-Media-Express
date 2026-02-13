import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Reset untuk Client Email */
            body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #F9FAFB; }
            img { line-height: 100%; border: 0; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            
            @media only screen and (max-width: 480px) {
                .container { width: 90% !important; }
                .otp-text { font-size: 32px !important; letter-spacing: 10px !important; }
            }
        </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F9FAFB; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table class="container" role="presentation" width="460" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #E5E7EB;">
                        <tr>
                            <td style="padding: 40px;">
                                <div style="text-align: center; margin-bottom: 32px;">
                                    <div style="display: inline-block; background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%); width: 48px; height: 48px; border-radius: 12px; line-height: 48px; color: white; font-weight: bold; font-size: 24px;">S</div>
                                    <h2 style="margin: 12px 0 0 0; font-size: 20px; color: #111827; letter-spacing: -0.5px;">Social Downloader</h2>
                                </div>

                                <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #111827; text-align: center;">Verifikasi Email Anda</h1>
                                <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4B5563; text-align: center;">
                                    Gunakan kode keamanan berikut untuk menyelesaikan pendaftaran. Jangan bagikan kode ini kepada siapapun.
                                </p>

                                <div style="background-color: #F3F4F6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px; border: 1px solid #E5E7EB;">
                                    <span class="otp-text" style="font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #6366F1; text-shadow: 1px 1px 0px #ffffff;">
                                        ${otp}
                                    </span>
                                </div>

                                <p style="margin: 0; font-size: 14px; color: #9CA3AF; text-align: center;">
                                    Berlaku selama <span style="color: #EF4444; font-weight: 600;">5 menit</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 40px 40px 40px;">
                                <div style="border-top: 1px solid #F3F4F6; padding-top: 24px; text-align: center;">
                                    <p style="margin: 0; font-size: 12px; color: #9CA3AF; line-height: 1.5;">
                                        Pesan ini dikirim secara otomatis. Jika Anda tidak merasa meminta ini, mohon abaikan email ini.
                                    </p>
                                    <div style="margin-top: 16px;">
                                        <a href="#" style="text-decoration: none; color: #6366F1; font-size: 12px; font-weight: 600;">Pusat Bantuan</a>
                                        <span style="color: #D1D5DB; margin: 0 8px;">•</span>
                                        <a href="#" style="text-decoration: none; color: #6366F1; font-size: 12px; font-weight: 600;">Kebijakan Privasi</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <p style="margin-top: 24px; font-size: 12px; color: #9CA3AF; text-align: center;">
                        &copy; 2024 Social Downloader Inc. All rights reserved.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: `"Social Downloader" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `🔐 ${otp} adalah kode verifikasi Anda`,
        html: htmlContent,
    });
};