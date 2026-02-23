import type { Request, Response } from "express";
import { createPaymentInvoice } from "../services/xendit";
import { prisma } from "../database/prisma";

export const createPayment = async (req: Request, res: Response) => {
    try {
        const { amount, description } = req.body;
        const user = (req as any).user;

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }

        const externalId = `inv-${Date.now()}-${user.id}`;

        const result = await prisma.$transaction(async (tx) => {
            const invoice = await createPaymentInvoice({
                externalId,
                amount,
                email: user.email,
                description,
                successRedirectURL: "http://localhost:3000/home",
                failureRedirectURL: "http://localhost:3000/home",
            });

            await tx.payment.create({
                data: {
                    id: externalId,
                    userId: user.id,
                    provider: "XENDIT",
                    amount: amount,
                    status: "PENDING",
                    referenceId: invoice.invoiceUrl,
                },
            });

            return invoice;
        });

        res.status(200).json({
            status: true,
            message: "Invoice created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in createPayment controller:", error);
        res.status(500).json({
            status: false,
            message: "Failed to create payment",
            error: error instanceof Error ? error.message : error,
        });
    }
};



export const handleWebhook = async (req: Request, res: Response) => {
    try {
        const callbackToken = req.headers["x-callback-token"];

        if (process.env.XENDIT_CALLBACK_TOKEN && callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
            return res.status(403).json({
                status: false,
                message: "Invalid callback token",
            });
        }

        const { external_id, status } = req.body;

        if (!external_id) {
            return res.status(400).json({
                status: false,
                message: "Missing external_id",
            });
        }

        let paymentStatus: "PENDING" | "PAID" | "FAILED" | "EXPIRED";

        switch (status) {
            case "PAID":
            case "SETTLED":
                paymentStatus = "PAID";
                break;
            case "EXPIRED":
                paymentStatus = "EXPIRED";
                break;
            default:
                paymentStatus = "PENDING";
        }

        await prisma.$transaction(async (tx) => {
            const payment = await tx.payment.update({
                where: { id: external_id },
                data: { status: paymentStatus },
            });

            if (paymentStatus === "PAID") {
                await tx.subscription.update({
                    where: { userId: payment.userId },
                    data: {
                        type: "PREMIUM",
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    },
                });

                await tx.tokenBalance.update({
                    where: { userId: payment.userId },
                    data: {
                        balance: { increment: 100000000 }
                    },
                });

                await tx.tokenHistory.create({
                    data: {
                        userId: payment.userId,
                        amount: 100000000,
                        type: "PURCHASE"
                    }
                });

                console.log(`User ${payment.userId} upgraded to PREMIUM via payment ${external_id}`);
            }
        });

        res.status(200).json({
            status: true,
            message: "Webhook processed successfully",
        });
    } catch (error) {
        console.error("Error in handleWebhook controller:", error);
        res.status(500).json({
            status: false,
            message: "Failed to process webhook",
            error: error instanceof Error ? error.message : error,
        });
    }
};


