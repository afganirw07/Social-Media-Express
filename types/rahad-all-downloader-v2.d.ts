declare module 'rahad-all-downloader-v2' {
    const rahad: {
        alldl: (url: string) => Promise<any>;
    };
    export default rahad;
}
