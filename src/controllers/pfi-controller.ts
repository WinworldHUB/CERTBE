import { RequestHandler } from "express";
import pfi from "../db/schema/pfi";
import { db } from "../db/setup";
export const fetchAllPfi: RequestHandler = async (req, res) => {
    const pfis = await db?.select().from(pfi);
    res.status(200).json(pfis);
}