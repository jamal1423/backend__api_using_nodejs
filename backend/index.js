import express from "express";
import db from "./config/Database.js";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import bodyParser from "body-parser";

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

// Test Database Connection
(async () => {
    try {
        await db.authenticate();
        console.log("Database Connected...");
        await db.sync(); // Menyesuaikan tabel jika belum ada
    } catch (error) {
        console.error("Database Connection Failed: ", error);
    }
})();


app.listen(5000, ()=> console.log('Server up and running...'));