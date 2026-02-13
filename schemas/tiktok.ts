import { z } from 'zod';

export const TikTokSchema = z.object({
    url: z.string()
        .url()
        .refine((val) => val.startsWith("https://vt.tiktok.com/"), {
            message: "URL harus dimulai dengan https://vt.tiktok.com/"
        }),
    fileType: z.string().min(1, "File type harus diisi").max(50),
    userId: z.string().min(1, "User ID harus diisi").max(50)
});