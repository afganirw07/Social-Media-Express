const { alldl } = require('rahad-all-downloader-v2');

export const downloadYoutube = async (url: string) => {
    try {
        const result = await alldl.youtube(url);
        return result;
        
    } catch (error) {
        console.error('Error downloading YouTube video:', error);
        throw error;
    }
}