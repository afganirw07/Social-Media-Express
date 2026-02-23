import { Xendit } from "xendit-node";

const xenditClient = new Xendit({
    secretKey: process.env.XENDIT_SECRET_KEY as string,
});

const { Invoice } = xenditClient;

interface CreateInvoiceParams {
    userId: string;
    amount: number;
    email: string;
    description: string;
    successRedirectURL?: string;
    failureRedirectURL?: string;
}

export const createPaymentInvoice = async ({
    amount,
    email,
    description,
    successRedirectURL,
    failureRedirectURL,
    externalId,
}: Omit<CreateInvoiceParams, "userId"> & { externalId: string }) => {
    try {
        const response = await Invoice.createInvoice({
            data: {
                externalId,
                amount,
                payerEmail: email,
                description,
                successRedirectURL,
                failureRedirectURL,
                currency: "IDR",
            }
        });

        return response;
    } catch (error) {
        console.error("Error creating xendit invoice:", error);
        throw error;
    }
};

export const expireInvoice = async (invoiceId: string) => {
    try {
        const response = await Invoice.expireInvoice({
            invoiceId
        });
        return response;
    } catch (error) {
        console.error("Error expiring xendit invoice:", error);
        throw error;
    }
};
