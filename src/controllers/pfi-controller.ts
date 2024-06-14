import { RequestHandler } from "express";
import pfi from "../db/schema/pfi";
import { db } from "../db/setup";
import { PfiRequest } from "../types";
import agreements from "../db/schema/agreements";

export const fetchAllPfi: RequestHandler = async (req, res) => {
  const pfis = await db?.select().from(pfi);
  res.status(200).json(pfis);
};
export const registerPfi: RequestHandler = async (req, res) => {
  try {
    const { name, address }: PfiRequest = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let insertedPfi;
    try {
      insertedPfi = await db
        ?.insert(pfi)
        .values({ name, address })
        .returning({ insertedId: pfi.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to register PFI" });
    }

    if (!insertedPfi) {
      return res.status(500).json({ message: "Failed to register PFI" });
    }
    const pfiId = insertedPfi[0].insertedId;

    res.status(201).json({
      id: pfiId,
      success: true,
      message: "PFI registered successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
