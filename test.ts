import { Downloader } from "@tobyg74/tiktok-api-dl"

export const tiktokDownload = async () => {
    try {
        const downloader = await Downloader("https://vt.tiktok.com/ZSm22vDEU/");
        console.log(downloader);
    } catch (error) {
        console.error("Error downloading TikTok video:", error);
        throw error;
    }
};

tiktokDownload();