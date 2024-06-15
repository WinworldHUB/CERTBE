import { Router } from "express";
import { register } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", register);

export default authRouter;
