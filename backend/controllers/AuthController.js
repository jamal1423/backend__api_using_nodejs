import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// REGISTER
export const register = async (req, res) => {
    const { name, email, password, gender} = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan user ke database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender
        });

        res.status(201).json({
            "statuscode": 201,
            "message": "User created"
        });
    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek apakah user ada di database
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ 
            "statuscode": 404,
            "message": "User not found"
        });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ 
            "statuscode": 400,
            "message": "Invalid credentials"
        });

        // Buat token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ 
            "statuscode": 200,
            "message": "Login successfully",
            "token": token
        });
    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
};
