import { prisma } from "../database/prisma";
import type { Request, Response } from "express";
import { downloadYoutube } from "../services/youtube";

export const youtubeDownloader = async (req: Request, res: Response) => {
    const { url, fileType, userId } = req.body;
    try {
        const result = await prisma.$transaction(async (tx) => {

            // cek token
            const checkToken = await tx.tokenBalance.findUnique({
                where: { userId: String(userId) },
            })

            if (!checkToken?.id) {
                res.status(401).json({
                    status: false,
                    message: "User tidak ditemukan",
                });
                return null;
            }

            if (!checkToken || checkToken.balance <= 0) {
                return res.status(401).json({
                    status: false,
                    message: "Token tidak cukup",
                });
            }

            // potong token
            await tx.tokenBalance.update({
                where: { userId: String(userId) },
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
                    type: "YOUTUBE_DOWNLOAD",
                    amount: -1,
                },
            });

            // catat download
            const download = await tx.downloadHistory.create({
                data: {
                    platform: "YOUTUBE",
                    userId: String(userId),
                    url,
                    fileType,
                },
            });
            return download;
        })

        const media = await downloadYoutube(url);

        res.status(200).json({
            status: true,
            message: "TikTok video downloaded successfully",
            data: media,
            download: result,
        });


    } catch (error) {
        console.error("Error downloading YouTube video:", error);
        res.status(500).json({
            status: false,
            message: "Error downloading YouTube video",
            error: error,
        });
    }
}