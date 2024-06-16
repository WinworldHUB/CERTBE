import { Router } from "express";
import { approveUser, fetchAllUsersFromEmail, fetchAllUsersFromPfi, fetchInactiveUsersAndPfi } from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/inactive",fetchInactiveUsersAndPfi)
userRouter.get("/user/:email",fetchAllUsersFromEmail);
userRouter.get("/pfi/:parentId",fetchAllUsersFromPfi);
userRouter.put("/approve/:userId",approveUser);

export default userRouter;