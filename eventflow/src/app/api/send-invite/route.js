import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/emailConfig";

export async function POST(req) {
  try {
    const { email, eventTitle, eventDate, startTime, endTime, location, description, eventURL } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const subject = `You're Invited to ${eventTitle}!`;
    const htmlContent = `
      <h2>${eventTitle}</h2>
      <p><strong>Date:</strong> ${eventDate}</p>
      <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p>${description}</p>
      <p><a href="${eventURL}" target="_blank">View Event Details</a></p>
    `;

    const response = await sendEmail({ to: email, subject, text: description, html: htmlContent });

    if (response.success) {
      return NextResponse.json({ message: "Invitation sent successfully!" }, { status: 200 });
    } else {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in send-invite API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
