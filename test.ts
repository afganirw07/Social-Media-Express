
// @ts-ignore
import rahadMedia from "rahad-media-downloader";
// @ts-ignore
import { snapsave } from "snapsave-media-downloader";
// @ts-ignore
import { twitter as btchTwitter } from "btch-downloader";

const twitterUrl = "https://x.com/NGtankterra/status/2022043273674862738?s=20";

const testLibraries = async () => {
    console.log("Testing various libraries for Twitter support...");

    // Test rahad-media-downloader
    try {
        console.log("\nTesting rahad-media-downloader...");
        // rahad-media-downloader likely exports an object with 'twitter' property
        if (rahadMedia && typeof rahadMedia.twitter === 'function') {
            const res = await rahadMedia.twitter(twitterUrl);
            console.log("rahad-media-downloader result:", JSON.stringify(res, null, 2));
        } else {
            console.log("rahad-media-downloader: 'twitter' function not found on default export.");
            console.log("Export keys:", Object.keys(rahadMedia || {}));
        }
    } catch (e: any) {
        console.log("rahad-media-downloader failed:", e.message);
    }

    // Test snapsave-media-downloader
    try {
        console.log("\nTesting snapsave-media-downloader...");
        const res = await snapsave(twitterUrl);
        console.log("snapsave-media-downloader result:", JSON.stringify(res, null, 2));
    } catch (e: any) {
        console.log("snapsave-media-downloader failed:", e.message);
    }

    // Test btch-downloader
    try {
        console.log("\nTesting btch-downloader...");
        const res = await btchTwitter(twitterUrl);
        console.log("btch-downloader result:", JSON.stringify(res, null, 2));
    } catch (e: any) {
        console.log("btch-downloader failed:", e.message);
    }

}

testLibraries();