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

export const approveAgreement: RequestHandler = async (req, res) => {
  const { agreementId } = req.params;
  if (!agreementId) {
    res.status(400).json({ error: "Agreement ID is required" });
    return;
  }

  const parsedAgreementId = parseInt(agreementId);
  const updatedAgreement = await db
    ?.update(agreements)
    .set({ isApproved: true })
    .where(eq(agreements.id, parsedAgreementId));
  res.status(200).json(updatedAgreement);
};

export const rejectAgreement: RequestHandler = async (req, res) => {
  const { agreementId } = req.params;
  if (!agreementId) {
    res.status(400).json({ error: "Agreement ID is required" });
    return;
  }

  const parsedAgreementId = parseInt(agreementId);
  const updatedAgreement = await db
    ?.update(agreements)
    .set({ isApproved: false })
    .where(eq(agreements.id, parsedAgreementId));
  res.status(200).json(updatedAgreement);
};

export const approveAgreementPayment: RequestHandler = async (req, res) => {
  const { agreementId } = req.params;
  if (!agreementId) {
    res.status(400).json({ error: "Agreement ID is required" });
    return;
  }

  const parsedAgreementId = parseInt(agreementId);
  const updatedAgreement = await db
    ?.update(agreements)
    .set({ isPaid: true })
    .where(eq(agreements.id, parsedAgreementId));
  res.status(200).json(updatedAgreement);
};
