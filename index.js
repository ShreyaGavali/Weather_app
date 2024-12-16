import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import weatherRoute from "./routes/weather.js";

// Initialize App
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Database Configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export { db };

app.use("/api/user", userRoute);
app.use("/api/weather", weatherRoute);

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
