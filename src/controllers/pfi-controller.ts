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
  const {
    name,
    phoneNo,
    address,
    email,
    agreementAmount,
    agreementPeriod,
    isActive,
    status,
    commencementDate,
    expiryDate,
  }: PfiRequest = req.body;

  if (
    !name ||
    !phoneNo ||
    !address ||
    !email ||
    !agreementAmount ||
    !agreementPeriod ||
    !isActive ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const insertedPfi = await db
    ?.insert(pfi)
    .values({ name, phoneNo, address, email })
    .returning({ insertedId: pfi.id });

  const pfiId = insertedPfi[0].insertedId;
  await db
    ?.insert(agreements)
    .values({
      pfiId: pfiId,
      isActive: isActive,
      status: status,
      agreementAmount: agreementAmount.toString(),
      agreementPeriod: agreementPeriod,
      commencementDate: commencementDate,
      expiryDate: expiryDate,
    })
    .returning({ insertedId: agreements.id });

  res.status(201).json({
    id: pfiId,
    message: "PFI registered successfully",
  });
};
