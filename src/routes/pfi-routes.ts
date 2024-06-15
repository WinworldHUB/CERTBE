import { Router } from "express";
import { approvePfi, fetchAllPfi, } from "../controllers/pfi-controller";


const pfiRouter = Router();

pfiRouter.get("/",fetchAllPfi);
pfiRouter.put("/approve/:pfiId",approvePfi);
export default pfiRouter;