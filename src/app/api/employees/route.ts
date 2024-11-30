import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewEmployeeSchema } from "@/lib/schemas/NewEmployee";
// import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = NewEmployeeSchema.parse(data);

    // Verifique se o email já existe
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const newEmployee = await prisma.employee.create({
      data: {
        name: parsedData.name ?? "",
        email: parsedData.email ?? "",
        tagName: parsedData.tagName ?? "",
        tagLastName: parsedData.tagLastName ?? "",
        birthDate: new Date(), // Adicione o valor apropriado para birthDate
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  try {
    if (id) {
      // Buscar funcionário por ID
      const employee = await prisma.employee.findUnique({
        where: { id: id },
      });

      if (!employee) {
        return NextResponse.json(
          { error: "Employee not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(employee, { status: 200 });
    } else if (name) {
      // Buscar funcionários por nome
      const employees = await prisma.employee.findMany({
        where: { name: { contains: name, mode: "insensitive" } },
      });

      return NextResponse.json(employees, { status: 200 });
    } else {
      // Buscar todos os funcionários
      const employees = await prisma.employee.findMany();
      return NextResponse.json(employees, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
