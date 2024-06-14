import { Router } from "express";
import { fetchAllUsersFromEmail, signUp, login, fetchAllUsersFromPfi } from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/:email",fetchAllUsersFromEmail);
userRouter.get("/:parentId",fetchAllUsersFromPfi);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
export default userRouter;