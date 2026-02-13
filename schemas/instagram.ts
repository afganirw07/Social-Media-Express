import { z } from 'zod';

export const InstagramSchema = z.object({
    url: z.string()
        .url()
        .refine((val) => val.startsWith("https://www.instagram"), {
            message: "URL harus dimulai dengan https://www.instagram"
        }),
    fileType: z.string().min(1, "File type harus diisi").max(50),
    userId: z.string().min(1, "User ID harus diisi").max(50)
});