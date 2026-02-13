import rahad from "rahad-all-downloader-v2";

export const facebookDownloader = async (url: string) => {
    try {
        const result = await rahad.alldl(url);
        return result;
    } catch (error) {
        console.error("Error downloading Facebook video:", error);
        throw error;
    }
};

facebookDownloader("https://www.facebook.com/share/v/173BLXqg6y/")