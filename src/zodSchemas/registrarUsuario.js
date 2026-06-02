import { z } from "zod"

export const registrarUsuarioSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(50, "Nome muito longo"),

    sobrenome: z
        .string()
        .trim()
        .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
        .max(50, "Sobrenome muito longo"),

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