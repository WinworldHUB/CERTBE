import { Router } from "express";
import { fetchAllPfi, } from "../controllers/pfi-controller";


const pfiRouter = Router();

pfiRouter.get("/",fetchAllPfi);

export default pfiRouter;