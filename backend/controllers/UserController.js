import User from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        if (!response || response.length === 0) {
            return res.status(404).json({
                "statuscode": 404,
                "message": "Data not found",
                "data": null
            });
        }

        res.status(200).json({
            "statuscode": 200,
            "message": "Data found",
            "data": response
        })
    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        
        if (!response) {
            return res.status(404).json({
                "statuscode": 404,
                "message": "Data not found",
                "data": null
            });
        }

        res.status(200).json({
            "statuscode": 200,
            "message": "Data found",
            "data": response
        })
    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
}

export const createUser = async(req, res) => {
    try {
        await User.create(req.body);
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
}

import crypto from "crypto";

export const updateUser = async (req, res) => {
    try {
        // Cek apakah user dengan ID yang diberikan ada
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                "statuscode": 404,
                "message": "User not found",
                "data": null
            });
        }

        // Jika ada perubahan password, enkripsi menggunakan MD5
        if (req.body.password) {
            req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
        }

        // Lakukan update
        const [updated] = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (updated === 0) {
            return res.status(400).json({
                "statuscode": 400,
                "message": "User not updated",
                "data": null
            });
        }

        return res.status(200).json({
            "statuscode": 200,
            "message": "User updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
};


export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            "statuscode": 200,
            "message": "User deleted"
        });
    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
}