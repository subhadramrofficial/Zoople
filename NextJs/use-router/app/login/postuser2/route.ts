
import { users } from "@/app/data/student";
import type { Student } from "@/app/data/student";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body: Omit<Student, "id"> = await req.json();

  const student: Student = {
    id:
      users.length > 0
        ? Math.max(...users.map((u) => u.id)) + 1
        : 1,
    name: body.name,
    email: body.email,
    course: body.course,
  };

  users.push(student);

  return NextResponse.json({
    message: "Student Added",
    users,
  });
}

export async function PUT(req: Request) {
  const body: Student = await req.json();

  const student = users.find((u) => u.id === body.id);

  if (!student) {
    return NextResponse.json(
      { message: "Student not found" },
      { status: 404 }
    );
  }

  student.name = body.name;
  student.email = body.email;
  student.course = body.course;

  return NextResponse.json({
    message: "Student Updated",
    users,
  });
}

export async function DELETE(req: Request) {
  const body: { id: number } = await req.json();

  const index = users.findIndex((u) => u.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Student not found" },
      { status: 404 }
    );
  }

  users.splice(index, 1);

  return NextResponse.json({
    message: "Student Deleted",
    users,
  });
}
