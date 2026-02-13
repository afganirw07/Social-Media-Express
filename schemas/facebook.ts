import { z } from 'zod';

export const FacebookSchema = z.object({
    url: z.string()
        .url()
        .refine((val) => val.startsWith("https://www.facebook"), {
            message: "URL harus dimulai dengan https://www.facebook"
        }),
    fileType: z.string().min(1, "File type harus diisi").max(50),
    userId: z.string().min(1, "User ID harus diisi").max(50)
});