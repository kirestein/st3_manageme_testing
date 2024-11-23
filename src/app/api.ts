import { prisma } from "@/lib/prisma";

//get users from prisma
export const users = await prisma.user.findMany();

export const employees = await prisma.employee.findMany();

// criar uma função que calcula a idade do funcionário
export const getAge = (date: Date) => {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
};
