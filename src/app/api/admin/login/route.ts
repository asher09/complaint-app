import { NextRequest, NextResponse } from "next/server";
import Admin from "@/utils/Admin";
import dbConnect from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinInput } from "@/utils/validation";

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const parsed = signinInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Inputs not correct" }, { status: 411 });
  }
  const { email, password } = body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.password)))
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const token = jwt.sign(
    { id: admin._id, email: admin.email, name: admin.name, role: "admin" },
    process.env.JWT_SECRET!,
    {}
  );
  return NextResponse.json({ token });
}
