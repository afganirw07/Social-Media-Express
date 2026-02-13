
// @ts-ignore
import rahadMedia from "rahad-media-downloader";

const twitterUrl = "https://x.com/InternetH0F/status/2021977757484249467?s=20";

const test = async () => {
    console.log("Testing rahad-media-downloader...");
    try {
        if (rahadMedia && typeof rahadMedia.twitter === 'function') {
            const res = await rahadMedia.twitter(twitterUrl);
            console.log("Result:", JSON.stringify(res, null, 2));
        } else {
            console.log("rahad-media-downloader: 'twitter' function not found on default export.");
            console.log("Export keys:", Object.keys(rahadMedia || {}));
        }
    } catch (e: any) {
        console.log("Error:", e.message);
    }
}
test();
