import { prisma } from "../database/prisma";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";


// create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password : hashedPassword,
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
                    create:{
                        amount: 20,
                        type: "RESET",
                    }
                }
            },
        });
        res.status(201).json({
            status: true,
            message: "User created successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
            },
        })

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            status: false,
            message: "Error creating user",
            error: error,
        });
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

        res.status(200).json({
            status: true,
            message: "User logged in successfully",
            data: {
                id: user.id,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            status: false,
            message: "Error logging in user",
        });
    }
};


// get user by id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(id) },
            include: {
                subscription: true,
                tokenBalance: true,
                tokenHistory: true,
                downloads: true,
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
            include: {
                subscription: true,
                tokenBalance: true,
                tokenHistory: true,
                downloads: true,
                payments: true,
            }
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