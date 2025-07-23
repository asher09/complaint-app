import { NextRequest, NextResponse } from "next/server";
import Admin from "@/utils/Admin";
import dbConnect from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signupInput } from "@/utils/validation";

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const parsed = signupInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ 
        message: "Inputs not correct" 
    }, { 
        status: 411 
    });
  }
  if (await Admin.findOne({ email: body.email })) {
    return NextResponse.json({ 
        error: "Admin exists" 
    }, { 
        status: 409 
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const admin = await Admin.create({
    name: body.name,
    email: body.email,
    password: hashedPassword
  });
  const token = jwt.sign(
    { id: admin._id, email: admin.email, name: admin.name, role: "admin" },
    process.env.JWT_SECRET!,
    {}
  );
  return NextResponse.json({ token });
}
