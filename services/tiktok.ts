import { Downloader } from "@tobyg74/tiktok-api-dl"

export const tiktokDownload = async (url : string) => {
    try {
        if (!url) {
            throw new Error("URL is required");
        };
        const downloader = await Downloader(url);
        return downloader;
    } catch (error) {
        console.error("Error downloading TikTok video:", error);
        throw error;
    }
};