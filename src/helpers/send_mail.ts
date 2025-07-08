import { createTransport } from "nodemailer"


function customHtml(username: string, verificationCode: string, email: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Verification Code Email</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 20px 0;">
        <tr>
          <td>
            <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
              <tr>
                <td style="background-color:#222; color:#ffffff; padding:20px; text-align:center; font-size:24px; font-weight:bold;">
                  Anonify
                </td>
              </tr>
              <tr>
                <td style="padding:30px; color:#333333; font-size:16px;">
                  <p style="margin:0 0 15px;">Hello ${username},</p>
                  <p style="margin:0 0 15px;">Thank you for registering. Please use the following verification code to complete your registration:</p>
                  <h3 style="margin:0 0 15px; font-size:24px; font-weight:bold; color:#222; text-align:center;">${verificationCode}</h3>
                  <p style="margin:0;">If you did not request this code, please ignore this email.</p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f4f4f4; padding:20px; text-align:center; font-size:12px; color:#888;">
                  <p style="margin:0;">Date: ${new Date().toDateString()}</p>
                  <p style="margin:0;">This email was sent to <a href="mailto:${email}" style="color:#888; text-decoration:underline;">${email}</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}



const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});


async function sendEmail(username: string, verifyCode: string, email: string) {
    const info = await transporter.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: "Anonyfy , Verification Code",
        html: customHtml(username, verifyCode, email)
    });

    console.log("Message sent:", info);
}


export default sendEmail