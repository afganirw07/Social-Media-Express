import { z } from 'zod';

export const YoutubeSchema = z.object({
    url: z.string()
        .url()
        .refine((val) => val.startsWith("https://youtu"), {
            message: "URL harus dimulai dengan https://youtu"
        }),
    fileType: z.string().min(1, "File type harus diisi").max(50),
    userId: z.string().min(1, "User ID harus diisi").max(50)
});