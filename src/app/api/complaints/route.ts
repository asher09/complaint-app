import { NextRequest, NextResponse } from "next/server";
import Complaint from "../../../utils/Complaint";
import dbConnect from "../../../utils/db";
import { sendEmail } from "../../../utils/sendEmail";
import Admin from "../../../utils/Admin";


export async function GET() {
  await dbConnect();
  const complaints = await Complaint.find();
  return NextResponse.json(complaints);
}


export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const complaint = await Complaint.create(data);

  const admins = await Admin.find({}, "email");
  type AdminEmail = { email: string }
  const adminEmails = admins.map((a: AdminEmail) => a.email).filter(Boolean);
  await Promise.all(adminEmails.map((email: string) =>
    sendEmail({
      to: email,
      subject: "New Complaint Received",
      text: `A new complaint has been submitted.\n\nTitle: ${complaint.title}\nCategory: ${complaint.category}\nPriority: ${complaint.priority}\n\nCheck the admin dashboard for details.`,
    })
  ));

  return NextResponse.json(complaint, { status: 201 });
}