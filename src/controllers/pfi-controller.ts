import { RequestHandler } from "express";
import pfi from "../db/schema/pfi";
import { db } from "../db/setup";
import { PfiRequest } from "../types";
import agreements from "../db/schema/agreements";
import { eq } from "drizzle-orm";

export const fetchAllPfi: RequestHandler = async (req, res) => {
  const pfis = await db?.select().from(pfi);
  res.status(200).json(pfis);
};

export const approvePfi: RequestHandler = async (req, res) => {
  const { pfiId } = req.params;

  if (!pfiId) {
    return res.status(400).json({
      success: false,
      message: "Pfi id is required",
    });
  }

  const parsedPfiId = parseInt(pfiId);
  try {
    const updatePfi = await db
      ?.update(pfi)
      .set({ isActive: true })
      .where(eq(pfi.id, parsedPfiId));
    if (updatePfi) {
      return res.status(200).json({
        success: true,
        message: "Pfi approved successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
