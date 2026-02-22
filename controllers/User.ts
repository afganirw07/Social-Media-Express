import { prisma } from "../database/prisma";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { jwtCreate } from "../services/jwtCreate";
import generateOTP from "../nodemailer/generateOtp";
import { sendOTPEmail } from "../services/emailVerify";


// create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                otpCode: hashedOTP,
                otpExpires: expiresAt,
                subscription: {
                    create: {
                        type: "FREE",
                    }
                },
                tokenBalance: {
                    create: {
                        balance: 20,
                    }
                },
                tokenHistory: {
                    create: {
                        amount: 20,
                        type: "RESET",
                    }
                }
            },
        });
        await sendOTPEmail(email, otp);

        res.status(201).json({
            status: true,
            message: "User created. Please verify your email.",
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            status: false,
            message: "Error creating user",
            error: error,
        });
    }
};

// resending otp
export const resendOTP = async (req: Request, res: Response) => {
    try {

        const { email } = req.body;

        const checkUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!checkUser) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        if(checkUser.isVerified){
            return res.status(400).json({
                status: false,
                message: "User already verified",
            });
        }

        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);


        await prisma.user.update({
            where: { email },
            data: {
                otpCode: hashedOTP,
                otpExpires: expiresAt,
            },
        });

        await sendOTPEmail(email, otp);
        res.status(200).json({
            status: true,
            message: "OTP resent successfully",
        });
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).json({
            status: false,
            message: "Error resending OTP",
            error: error,
        })
    }
}

// verify email
export const verifyEmail = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.otpCode || !user.otpExpires) {
            return res.status(400).json({ message: "Invalid request" });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const isValid = await bcrypt.compare(otp, user.otpCode);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                otpCode: null,
                otpExpires: null,
            }
        });

        res.status(200).json({
            status: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        res.status(500).json({ status: false, message: "Error" });
        console.error("Error verifying email:", error);
    }
};


// login user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                status: false,
                message: "Please verify your email first"
            });
        }


        const token = jwtCreate({
            id: user.id,
            email: user.email,
        })

        res.status(200).json({
            status: true,
            message: "User logged in successfully",
            data: {
                id: user.id,
                email: user.email,
                token,
            },
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            status: false,
            message: "Error logging in user",
            error: error,
        });
    }
};


// get user by id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(id) },
            select: {
                id: true,
                email: true,
                username: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
                subscription: true,
                tokenBalance: true,
                tokenHistory: true,
                downloads: {
                    orderBy : {
                        createdAt: 'desc'
                    }
                },
                payments: true,
            }
        });
        if (user) {
            res.status(200).json({
                status: true,
                message: "User found",
                data: user,
            });
        } else {
            res.status(404).json({
                status: false,
                message: "User not found",
            });
        }
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({
            status: false,
            message: "Error getting user",
            error: error,
        });
    }
};

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: { isVerified: true },
            select: {
                id: true,
                email: true,
                username: true,
                isVerified: true,
                subscription: {
                    select: {
                        type: true,
                        expiresAt: true
                    }
                },
            },

        });
        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({
            status: false,
            message: "Error getting users",
            error: error,
        })
    }
};

// update user by id
export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, username, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: String(id) },
            data: {
                email,
                username,
                password,
            },
        });
        res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            status: false,
            message: "Error updating user",
            error: error,
        });
    }
};

// delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: String(id) },
        });
        res.status(200).json({
            status: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            status: false,
            message: "Error deleting user",
            error: error,
        });
    }
};