import { z } from 'zod';

export const userRegisterSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(50),
    password: z.string().min(6).max(100)
})