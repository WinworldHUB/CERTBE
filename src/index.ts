import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user-routes";
import pfiRouter from "./routes/pfi-routes";
import documentRouter from "./routes/document-routes";
import authRouter from "./routes/auth-routes";
import upload from "./middleware/upload-middleware";
import agreementRouter from "./routes/agreement-routes";
const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    "http://localhost:3002",
    "http://localhost:3001",
    "http://localhost:3000",
    "https://zcgs.netlify.app"
  ];
  const origin = req.headers.origin ?? "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});


app.use("/users", userRouter);
app.use("/pfis", pfiRouter);
app.use("/agreements", agreementRouter);
app.use("/documents", documentRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});