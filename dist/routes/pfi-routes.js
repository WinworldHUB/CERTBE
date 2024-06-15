"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pfi_controller_1 = require("../controllers/pfi-controller");
const pfiRouter = (0, express_1.Router)();
pfiRouter.get("/", pfi_controller_1.fetchAllPfi);
pfiRouter.put("/approve/:pfiId", pfi_controller_1.approvePfi);
exports.default = pfiRouter;
