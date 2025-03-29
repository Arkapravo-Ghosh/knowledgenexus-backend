import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import checkJSON from "./middlewares/checkJSON";

// Express Configuration
const app = express();

// CORS Configuration
import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Logger Configuration
app.use(process.env.PRODUCTION ? logger("combined") : logger("dev"));

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("public")));
app.use(checkJSON);

// Cache Configuration
import fs from "fs";
import cacheConfig from "./configs/cacheConfig";
if (!fs.existsSync(cacheConfig.cacheDir)) {
  try {
    fs.mkdirSync(cacheConfig.cacheDir);
  } catch (error) {
    console.error("Error creating cache directory:", error);
  };
};

// Server Configuration
const server = http.createServer(app);
const port: number = Number(process.env.PORT) || 8000;

// Index Router Import
import indexRouter from "./indexRouter";

app.use("/", indexRouter);

// Error Handler Middleware
import errorHandler from "./middlewares/errorHandler";
app.use(errorHandler);

server.listen(port, (): void => {
  console.log("Server listening on port " + port);
});

// Close server
const closeServer = (): void => {
  server.close();
};

process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);
process.once("SIGUSR2", closeServer);
