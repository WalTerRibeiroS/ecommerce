import { z } from "zod"

export const loginUsuarioSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email inválido")
        .max(255),

    senha: z
        .string()
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .max(72, "Senha muito longa")
});