import { snapsave } from "snapsave-media-downloader";

const download = await snapsave("https://www.facebook.com/share/r/1CPt7NF9df/");

console.log(download);  