import rahad from "rahad-all-downloader-v2";

export const instagramDownloader = async (url: string) => {
    try {
        const result = await rahad.alldl(url);
        console.log(result);
    } catch (error) {
        console.error("Error downloading Facebook video:", error);
        throw error;
    }
};

instagramDownloader("https://www.instagram.com/p/DUsRMZwkyVK/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==")