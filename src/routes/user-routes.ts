import { Router } from "express";
import { fetchAllUsersFromEmail, fetchAllUsersFromPfi } from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/:email",fetchAllUsersFromEmail);
userRouter.get("/pfi/:parentId",fetchAllUsersFromPfi);
export default userRouter;