import nodemailer from "nodemailer";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Expo Al Alam <info@yourverifieddomain.com>",
      to: to || process.env.EMAIL_RECEIVER,
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error("❌ Resend Error:", error.message);
    }

    console.log("✅ Email sent successfully:", data.id);
  } catch (error) {
    console.error("❌ Unexpected error sending email:", error.message);
  }
};

export const generateContactEmail = (fullName, email, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            body { margin: 0; padding: 0; background-color: #080808; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; background-color: #0c0c0c; border: 1px solid #1a1a1a; }
            .header { padding: 40px; border-bottom: 1px solid #1a1a1a; text-align: center; }
            .content { padding: 40px; }
            .footer { padding: 20px; background-color: #ffffff; color: #000000; text-align: center; font-size: 10px; font-weight: bold; letter-spacing: 2px; }
            .label { color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin-bottom: 8px; }
            .value { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #ffffff; margin-bottom: 30px; }
            .message-box { background-color: #141414; border-left: 3px solid #ffffff; padding: 20px; font-style: italic; color: #cbd5e1; line-height: 1.6; }
            .brand { font-size: 24px; font-weight: 900; letter-spacing: -1px; font-style: italic; text-transform: uppercase; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="brand">EXPO AL ALAM</div>
                <div style="font-size: 10px; color: #64748b; margin-top: 5px; letter-spacing: 5px; font-weight: bold;">VAULT INQUIRY MANIFEST</div>
            </div>
            
            <div class="content">
                <div class="label">Client Identity</div>
                <div class="value">${fullName}</div>

                <div class="label">Client's Email</div>
                <div class="value">${email}</div>

                <div class="label">Inquiry Transmission</div>
                <div class="message-box">
                    "${message}"
                </div>

                <div style="margin-top: 40px; border-top: 1px solid #1a1a1a; pt-20">
                    <p style="font-size: 9px; color: #475569; text-transform: uppercase; letter-spacing: 2px;">
                        System Timestamp: ${new Date().toLocaleString()}
                    </p>
                </div>
            </div>

            <div class="footer">
                © EXPO AL ALAM
            </div>
        </div>
    </body>
    </html>
    `;
};
