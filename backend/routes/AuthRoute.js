import express from "express";
import { register, login } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({ 
        "statuscode":200,
        "message": "Profile data", 
        "data": req.user });
});


export default router;