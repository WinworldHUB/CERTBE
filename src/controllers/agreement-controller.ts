import { eq } from "drizzle-orm";
import { RequestHandler } from "express";
import agreements from "../db/schema/agreements";
import { db } from "../db/setup";

export const getAgreementbyPfiId: RequestHandler = async (req, res) => {
    const { pfiId } = req.params;
    if (!pfiId) {
      res.status(400).json({ error: "PFI ID is required" });
      return;
    }
  
    const parsedPfiId = parseInt(pfiId);
    const pfis = await db
      ?.select()
      .from(agreements)
      .where(eq(agreements.pfiId, parsedPfiId));
    res.status(200).json(pfis);
  };