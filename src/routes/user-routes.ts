import { Router } from "express";
import { approveUser, fetchAllUsersFromEmail, fetchAllUsersFromPfi } from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/:email",fetchAllUsersFromEmail);
userRouter.get("/pfi/:parentId",fetchAllUsersFromPfi);
userRouter.put("/approve/:userId",approveUser);
export default userRouter;