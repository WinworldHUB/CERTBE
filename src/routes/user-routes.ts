import { Router } from "express";
import { fetchAllUsersFromPfi } from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/:pfiId",fetchAllUsersFromPfi);

export default userRouter;