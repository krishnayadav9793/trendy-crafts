import { transporter } from "@/lib/mailer";
import OtpEmail from "@/components/OTPMail";
export async function sendOTP(OTP, email) {
    const htmlComp = OtpEmail({ OTP: OTP })
    // console.log(htmlComp);
    try {
        const info = await transporter.sendMail({
            to: email,
            from: process.env.SYSTEM_MAIL,
            subject: "Trendy Craft OTP",
            text: "OTP is valid for 15 min only",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your OTP – Trendy Crafts</title>
</head>
<body style="margin:0;padding:0;background-color:#04050e;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#04050e;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" border="0"
          style="max-width:520px;width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background:linear-gradient(135deg,#7c3aed,#6d28d9);
                    border-radius:16px;
                    width:52px;height:52px;
                    text-align:center;
                    vertical-align:middle;
                    font-size:20px;font-weight:700;
                    color:#ffffff;
                    letter-spacing:-0.5px;
                    box-shadow:0 0 28px rgba(124,58,237,0.55);
                  ">TC</td>
                  <td style="padding-left:12px;">
                    <span style="
                      font-size:20px;font-weight:600;
                      color:#ffffff;letter-spacing:-0.3px;
                    ">Trendy Crafts</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Card ── -->
          <tr>
            <td style="
              background-color:#070817;
              border:1px solid #1a1d38;
              border-radius:24px;
              overflow:hidden;
              box-shadow:0 40px 80px rgba(0,0,0,0.55);
            ">

              <!-- Top accent line -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    height:2px;
                    background:linear-gradient(90deg,transparent,#7c3aed,transparent);
                  "></td>
                </tr>
              </table>

              <!-- Card body -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:40px 44px 36px;">

                    <!-- Icon -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="
                          width:56px;height:56px;
                          background:rgba(124,58,237,0.12);
                          border:1px solid rgba(124,58,237,0.25);
                          border-radius:14px;
                          text-align:center;vertical-align:middle;
                          font-size:26px;
                        ">🔐</td>
                      </tr>
                    </table>

                    <!-- Heading -->
                    <p style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.3px;">
                      Your Login OTP
                    </p>
                    <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.6;">
                      Use the code below to sign in to your
                      <span style="color:#a78bfa;font-weight:500;">Trendy Crafts</span>
                      account. This code is for you only.
                    </p>

                    <!-- OTP Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom:28px;">
                      <tr>
                        <td align="center" style="
                          background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(109,40,217,0.08));
                          border:1px solid rgba(124,58,237,0.3);
                          border-radius:16px;
                          padding:28px 20px;
                        ">
                          <!-- Digit boxes -->
                          <table cellpadding="0" cellspacing="0" border="0"
                            style="margin-bottom:14px;">
                            <tr>
                              ${OTP.split("").map(digit => `
                              <td style="padding:0 6px;">
                                <div style="
                                  width:52px;height:64px;
                                  background:#0a0c1e;
                                  border:2px solid #7c3aed;
                                  border-radius:12px;
                                  display:inline-block;
                                  text-align:center;
                                  line-height:64px;
                                  font-size:28px;
                                  font-weight:700;
                                  color:#c4b5fd;
                                  letter-spacing:0;
                                  box-shadow:0 0 16px rgba(124,58,237,0.25);
                                ">${digit}</div>
                              </td>`).join("")}
                            </tr>
                          </table>
                          <p style="margin:0;font-size:12px;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;">
                            One-Time Password
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Timer badge -->
                    <table cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom:28px;">
                      <tr>
                        <td style="
                          background:rgba(245,158,11,0.08);
                          border:1px solid rgba(245,158,11,0.2);
                          border-radius:20px;
                          padding:8px 16px;
                        ">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:14px;padding-right:6px;">⏱</td>
                              <td style="font-size:12px;color:#fbbf24;font-weight:500;">
                                Valid for <strong>15 minutes only</strong> — expires soon
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom:24px;">
                      <tr>
                        <td style="height:1px;background:#1a1d35;"></td>
                      </tr>
                    </table>

                    <!-- Warning box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom:24px;">
                      <tr>
                        <td style="
                          background:rgba(239,68,68,0.07);
                          border:1px solid rgba(239,68,68,0.2);
                          border-left:3px solid #ef4444;
                          border-radius:12px;
                          padding:14px 16px;
                        ">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td valign="top" style="padding-right:10px;font-size:16px;">🚨</td>
                              <td>
                                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#fca5a5;">
                                  Never share this code with anyone
                                </p>
                                <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                                  Trendy Crafts will <strong style="color:#f87171;">never</strong> ask for your OTP via
                                  call, chat, or email. If someone is asking for this code,
                                  it is a scam — please ignore and report it.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Info note -->
                    <p style="margin:0;font-size:12px;color:#4b5563;line-height:1.7;">
                      If you didn't request this OTP, you can safely ignore this email.
                      Your account remains secure and no changes have been made.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Bottom accent line -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    height:1px;
                    background:linear-gradient(90deg,transparent,rgba(124,58,237,0.25),transparent);
                  "></td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:18px 44px;background:#05060f;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <p style="margin:0;font-size:11px;color:#374151;">
                            © ${new Date().getFullYear()} Trendy Crafts · All rights reserved
                          </p>
                        </td>
                        <td align="right">
                          <a href="#" style="font-size:11px;color:#6b7280;text-decoration:none;margin-left:16px;">Privacy</a>
                          <a href="#" style="font-size:11px;color:#6b7280;text-decoration:none;margin-left:16px;">Terms</a>
                          <a href="#" style="font-size:11px;color:#6b7280;text-decoration:none;margin-left:16px;">Support</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Bottom note -->
          <tr>
            <td align="center" style="padding-top:20px;">
              <p style="margin:0;font-size:11px;color:#374151;line-height:1.6;">
                This is an automated message from Trendy Crafts.<br/>
                Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`

        })
        console.log(info);
    } catch (err) {
        console.log("error in sending OTP", err)
    }

}