import {Router} from "express";

import {approveAgreement, createAgreement, getAgreementbyPfiId, getAllAgreements, rejectAgreement} from "../controllers/agreement-controller";

const agreementRouter = Router();

agreementRouter.get("/",getAllAgreements);
agreementRouter.get("/pfi/:pfiId",getAgreementbyPfiId);
agreementRouter.post("/create",createAgreement);
agreementRouter.put("/approve/:agreementId",approveAgreement);
agreementRouter.put("/reject/:agreementId",rejectAgreement);

export default agreementRouter;