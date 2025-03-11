import User from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
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

export const updateUser = async(req, res) => {
    try {
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            "statuscode": 200,
            "message": "User updated"
        });
    } catch (error) {
        res.status(500).json({
            "statuscode": 500,
            "message": "Internal Server Error",
            "error": error.message
        });
    }
}

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