import { RequestHandler } from "express";
import pfi from "../db/schema/pfi";
import { db } from "../db/setup";

export const fetchAllPfi: RequestHandler = async (req, res) => {
  const pfis = await db?.select().from(pfi);
  res.status(200).json(pfis);
};

export const registerPfi: RequestHandler = async (req, res) => {
  const { name, phoneNo, address, email } = req.body;

  if (!name || !phoneNo || !address || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [pfiId] = await db
    ?.insert(pfi)
    .values({ name, phoneNo, address ,email })
    .returning({ insertedId: pfi.id });

  res.status(201).json({
    id: pfiId,
    message: "PFI registered successfully",
  });
};
