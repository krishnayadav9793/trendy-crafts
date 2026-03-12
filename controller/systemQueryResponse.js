import { transporter } from "@/lib/mailer";


export async function sendMail(gmail) {
    try {
        transporter.sendMail({
            to: gmail,
            from: process.env.SYSTEM_MAIL,
            text: "Thank you for reaching out us.",
            subject:"Thank you for reaching out us.",
            html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Thank You for Reaching Out</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

                    * { margin: 0; padding: 0; box-sizing: border-box; }

                    body {
                    background-color: #0d0d0d;
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 16px;
                    }

                    .wrapper {
                    max-width: 600px;
                    width: 100%;
                    }

                    .card {
                    background: linear-gradient(145deg, #111111, #1a1a1a);
                    border: 1px solid #2a2a2a;
                    border-radius: 4px;
                    overflow: hidden;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                    }

                    /* Top accent bar */
                    .accent-bar {
                    height: 4px;
                    background: linear-gradient(90deg, #c9a96e, #e8c97a, #c9a96e);
                    background-size: 200% 100%;
                    animation: shimmer 3s ease-in-out infinite;
                    }

                    @keyframes shimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    }

                    /* Header */
                    .header {
                    padding: 52px 52px 36px;
                    border-bottom: 1px solid #222;
                    }

                    .logo-area {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 36px;
                    }

                    .logo-icon {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #c9a96e, #e8c97a);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    }

                    .logo-icon svg {
                    width: 18px;
                    height: 18px;
                    fill: #0d0d0d;
                    }

                    .logo-text {
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 500;
                    font-size: 13px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #888;
                    }

                    .checkmark-wrap {
                    margin-bottom: 28px;
                    }

                    .checkmark-circle {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    border: 2px solid #c9a96e;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse-ring 2.5s ease-in-out infinite;
                    }

                    @keyframes pulse-ring {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(201,169,110,0.3); }
                    50% { box-shadow: 0 0 0 12px rgba(201,169,110,0); }
                    }

                    .checkmark-circle svg {
                    width: 28px;
                    height: 28px;
                    stroke: #c9a96e;
                    stroke-width: 2.5;
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    }

                    h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 38px;
                    font-weight: 700;
                    color: #f0ead6;
                    line-height: 1.15;
                    letter-spacing: -0.5px;
                    margin-bottom: 14px;
                    }

                    h1 span {
                    color: #c9a96e;
                    }

                    .tagline {
                    font-size: 14px;
                    color: #555;
                    letter-spacing: 2.5px;
                    text-transform: uppercase;
                    font-weight: 400;
                    }

                    /* Body */
                    .body {
                    padding: 40px 52px;
                    }

                    .greeting {
                    font-size: 16px;
                    color: #bbb;
                    font-weight: 300;
                    margin-bottom: 18px;
                    line-height: 1.7;
                    }

                    .message {
                    font-size: 15px;
                    color: #999;
                    line-height: 1.85;
                    font-weight: 300;
                    margin-bottom: 36px;
                    }

                    /* Info card */
                    .info-card {
                    background: #161616;
                    border: 1px solid #252525;
                    border-left: 3px solid #c9a96e;
                    border-radius: 2px;
                    padding: 24px 28px;
                    margin-bottom: 36px;
                    }

                    .info-card-label {
                    font-size: 11px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #c9a96e;
                    font-weight: 500;
                    margin-bottom: 10px;
                    }

                    .info-card-text {
                    font-size: 14px;
                    color: #aaa;
                    line-height: 1.7;
                    font-weight: 300;
                    }

                    .info-card-text strong {
                    color: #ddd;
                    font-weight: 500;
                    }

                    /* Divider */
                    .divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
                    margin: 36px 0;
                    }

                    /* What to expect section */
                    .expect-title {
                    font-size: 11px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #555;
                    font-weight: 500;
                    margin-bottom: 20px;
                    }

                    .steps {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    }

                    .step {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    }

                    .step-num {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    border: 1px solid #2a2a2a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    color: #c9a96e;
                    font-weight: 500;
                    flex-shrink: 0;
                    margin-top: 1px;
                    }

                    .step-content strong {
                    display: block;
                    font-size: 13px;
                    color: #ccc;
                    font-weight: 500;
                    margin-bottom: 3px;
                    }

                    .step-content span {
                    font-size: 13px;
                    color: #666;
                    font-weight: 300;
                    line-height: 1.5;
                    }

                    /* Footer */
                    .footer {
                    background: #0a0a0a;
                    padding: 28px 52px;
                    border-top: 1px solid #1e1e1e;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                    }

                    .footer-left {
                    font-size: 12px;
                    color: #3a3a3a;
                    font-weight: 300;
                    }

                    .footer-right {
                    font-size: 12px;
                    color: #3a3a3a;
                    font-weight: 300;
                    }

                    .footer-right a {
                    color: #c9a96e;
                    text-decoration: none;
                    opacity: 0.7;
                    }

                    .footer-right a:hover {
                    opacity: 1;
                    }

                    /* Animation on load */
                    .card {
                    animation: fadeUp 0.6s ease both;
                    }

                    @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                    }

                    @media (max-width: 520px) {
                    .header, .body { padding-left: 28px; padding-right: 28px; }
                    h1 { font-size: 28px; }
                    .footer { padding: 24px 28px; flex-direction: column; align-items: flex-start; }
                    }
                </style>
                </head>
                <body>
                <div class="wrapper">
                    <div class="card">
                    <div class="accent-bar"></div>

                    <!-- Header -->
                    <div class="header">
                        <div class="logo-area">
                        <div class="logo-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </div>
                        <span class="logo-text">Trendy Crafts</span>
                        </div>

                        <div class="checkmark-wrap">
                        <div class="checkmark-circle">
                            <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        </div>

                        <h1>Thank You for<br/><span>Reaching Out.</span></h1>
                        <p class="tagline">Message received &nbsp;·&nbsp; We'll be in touch</p>
                    </div>

                    <!-- Body -->
                    <div class="body">
                        <p class="greeting">Hello,</p>
                        <p class="message">
                        We truly appreciate you taking the time to contact us. Your message has been received and is important to us. 
                        Our team reviews every inquiry with care, and we want to make sure you receive a thoughtful and helpful response.
                        </p>

                        <div class="info-card">
                        <div class="info-card-label">Response Time</div>
                        <div class="info-card-text">
                            We will get back to you <strong>as soon as possible</strong>. Our team typically responds within 
                            <strong>24–48 business hours</strong>. We appreciate your patience in the meantime.
                        </div>
                        </div>

                        <div class="divider"></div>

                        <p class="expect-title">What happens next</p>
                        <div class="steps">
                        <div class="step">
                            <div class="step-num">1</div>
                            <div class="step-content">
                            <strong>Message Received</strong>
                            <span>Your inquiry has been logged and is in our queue.</span>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-num">2</div>
                            <div class="step-content">
                            <strong>Team Review</strong>
                            <span>A member of our team will carefully review your message.</span>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-num">3</div>
                            <div class="step-content">
                            <strong>Personal Reply</strong>
                            <span>You'll receive a direct reply to your email address shortly.</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        <div class="footer-left">© 2026 Your Company. All rights reserved.</div>
                        <div class="footer-right">
                        <a href="#">Unsubscribe</a> &nbsp;·&nbsp; <a href="#">Privacy Policy</a>
                        </div>
                    </div>
                    </div>
                </div>
                </body>
                </html>`
        })
    } catch (e) {
        console.log("failed in sending mail")
    }

}