import { prisma } from "../database/prisma";
import type { Request, Response } from "express";
import { twitterDownloader } from "../services/twitter";

// twitter download
export const twitterController = async (req: Request, res: Response) => {
    const { url, fileType, userId } = req.body;
    try {
        const result = await prisma.$transaction(async (tx) => {

            // cek token
            const checkToken = await tx.tokenBalance.findUnique({
                where: { userId: String(userId) },
            });

            if (!checkToken || checkToken.balance <= 0) {
                res.status(401).json({
                    status: false,
                    message: "Token tidak cukup",
                });
                return null;
            }

            // potong token
            await tx.tokenBalance.update({
                where: {
                    userId: String(userId),
                },
                data: {
                    balance: {
                        decrement: 1,
                    }
                }
            })

            // catat token
            await tx.tokenHistory.create({
                data: {
                    userId: String(userId),
                    type: "TWITTER_DOWNLOAD",
                    amount: -1,
                },
            });

            // catat download
            const download = await tx.downloadHistory.create({
                data: {
                    platform: "TWITTER",
                    url: url,
                    fileType,
                    userId: String(userId),
                }
            });
            return download;
        })

        if (!result) return;

        const media = await twitterDownloader(url);

        res.status(200).json({
            status: true,
            message: "Twitter video downloaded successfully",
            data: media,
            download: result,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "Error downloading Twitter video",
            error: error,
        });
    }
};
