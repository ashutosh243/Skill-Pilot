import config from "../../config/config.js";
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email,
        pass: config.password,
    },
});

export default async function sendMail(email: string, msg: { day: number, heading: string }) {

    try {
        await transporter.sendMail({
            from: `"SkillPilot 🚀" <${email}>`,
            to: email,
            subject: "📘 Your Learning Plan for Today",
            html: `
                <div style="font-family: Arial, sans-serif;">
                <h2>🚀 SkillPilot Daily Plan</h2>
                <h3>Topic: ${msg.heading}</h3>
                <h3>Day: ${msg.day}</h3>
             
                <p>Regards,</p>
                <p>SkillPilot</p>
                </div>
      `,
        });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "unknown Error";
        console.log("error in sendmail", msg);
    }

}