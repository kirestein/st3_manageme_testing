import { z } from "zod";

export const NewEmployeeSchema = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório" }).optional(),
  tagName: z
    .string()
    .min(3, { message: "Nome para o crachá é obrigatório" })
    .optional(),
  tagLastName: z
    .string()
    .min(3, { message: "Sobrenome para o crachá é obrigatório" })
    .optional(),
  email: z.string().email("Invalid email").optional(),
  birthDate: z.date().optional(),
  phoneNumber: z
    .string()
    .min(9, { message: "Telefone é obrigatório" })
    .optional(),
});
