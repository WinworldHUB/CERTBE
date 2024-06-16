"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/pending", user_controller_1.fetchInactiveUsersAndPfi);
userRouter.get("/user/:email", user_controller_1.fetchAllUsersFromEmail);
userRouter.get("/pfi/:parentId", user_controller_1.fetchAllUsersFromPfi);
userRouter.put("/approve", user_controller_1.approveUser);
exports.default = userRouter;
