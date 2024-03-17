import http from "http";
import express from "express";
import cors from "cors";
import calculatorRoutes from "./routes/calculatorRoutes.js";

const app = express();

// Configure middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", calculatorRoutes);

// Configure server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log("Server started in port: " + PORT));
