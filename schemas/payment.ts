import { z } from "zod";

export const paymentSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    description: z.string().min(5, "Description minimal 5 karakter"),
    successRedirectURL: z.string().url().optional(),
    failureRedirectURL: z.string().url().optional(),
});
