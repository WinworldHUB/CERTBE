import { Router } from "express";
import { fetchAllUsersFromPfi, signUp, login } from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/:pfiId",fetchAllUsersFromPfi);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
export default userRouter;