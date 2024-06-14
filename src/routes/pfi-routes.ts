import { Router } from "express";
import { fetchAllPfi,registerPfi } from "../controllers/pfi-controller";


const pfiRouter = Router();

pfiRouter.get("/",fetchAllPfi);
pfiRouter.post("register", registerPfi)

export default pfiRouter;