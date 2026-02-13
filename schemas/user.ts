import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email("Email tidak valid"),
    username: z.string().min(3, "Username minimal 3 karakter").max(50, "Username maksimal 50 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter").max(100, "Password maksimal 100 karakter")
})

export const loginSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter").max(100, "Password maksimal 100 karakter")
})