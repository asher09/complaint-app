import { NextRequest, NextResponse } from "next/server";
import Complaint from "../../../../utils/Complaint";
import dbConnect from "../../../../utils/db";

export async function PUT(req: NextRequest) {
  await dbConnect();

  const data = await req.json();

  const id = req.nextUrl.pathname.split("/").pop();

  const updatedComplaint = await Complaint.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(updatedComplaint);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop();

  const deletedComplaint = await Complaint.findByIdAndDelete(id);

  return NextResponse.json(deletedComplaint);
}
