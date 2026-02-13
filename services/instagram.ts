import rahad from "rahad-all-downloader-v2";

export const instagramDownloader = async (url: string) => {
    try {
        const result = await rahad.alldl(url);
        return result;
    } catch (error) {
        console.error("Error downloading Instagram video:", error);
        throw error;
    }
};
