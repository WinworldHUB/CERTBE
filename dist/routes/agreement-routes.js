"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agreement_controller_1 = require("../controllers/agreement-controller");
const agreementRouter = (0, express_1.Router)();
agreementRouter.get("/pfi/:pfiId", agreement_controller_1.getAgreementbyPfiId);
agreementRouter.post("/create", agreement_controller_1.createAgreement);
agreementRouter.put("/approve/:agreementId", agreement_controller_1.approveAgreement);
agreementRouter.put("/reject/:agreementId", agreement_controller_1.rejectAgreement);