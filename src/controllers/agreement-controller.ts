import { and, eq } from "drizzle-orm";
import { RequestHandler } from "express";
import agreements from "../db/schema/agreements";
import { db } from "../db/setup";
import { AgreementRequest } from "../types";
import pfi from "../db/schema/pfi";
import documents from "../db/schema/documents";
import generateAgreementNumber from "../utils/generateAgreementNumber";

export const getAllAgreements: RequestHandler = async (req, res) => {
  try {
    const fetchedAgreements = await db
      ?.select({
        agreementId: agreements.id,
        pfiId: agreements.pfiId,
        orgName: pfi.name,
        status: agreements.status,
        orgAddress: pfi.address,
        agreementNumber: agreements.agreementNumber,
        agreementAmount: agreements.agreementAmount,
        commencementDate: agreements.commencementDate,
        expiryDate: agreements.expiryDate,
        period: agreements.agreementPeriod,
      })
      .from(agreements)
      .leftJoin(pfi, eq(agreements.pfiId, pfi.id))
      .where(eq(agreements.isActive, true))
      .groupBy(
        agreements.id,
        agreements.pfiId,
        pfi.name,
        agreements.status,
        pfi.address,
        agreements.agreementNumber,
        agreements.agreementAmount,
        agreements.commencementDate,
        agreements.expiryDate,
        agreements.agreementPeriod
      );

    if (fetchedAgreements.length === 0) {
      res.status(200).json({
        success: true,
        message: "No agreements found",
        agreements: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      agreements: fetchedAgreements ?? [],
      message: "Agreements fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error, agreements: [] });
  }
};

export const getAgreementbyPfiId: RequestHandler = async (req, res) => {
  const { pfiId } = req.params;
  if (!pfiId) {
    res.status(400).json({ error: "PFI ID is required" });
    return;
  }

  const parsedPfiId = parseInt(pfiId);

  const fetchedAgreements = await db
    ?.select({
      agreementId: agreements.id,
      pfiId: agreements.pfiId,
      orgName: pfi.name,
      agreementNumber: agreements.agreementNumber,
      orgAddress: pfi.address,
      agreementAmount: agreements.agreementAmount,
      commencementDate: agreements.commencementDate,
      expiryDate: agreements.expiryDate,
      period: agreements.agreementPeriod,
      status: agreements.status,
    })
    .from(agreements)
    .leftJoin(pfi, eq(agreements.pfiId, pfi.id))
    .where(eq(agreements.pfiId, parsedPfiId))
    .groupBy(
      agreements.id,
      agreements.pfiId,
      pfi.name,
      agreements.agreementNumber,
      pfi.address,
      agreements.status,
      agreements.agreementAmount,
      agreements.commencementDate,
      agreements.expiryDate,
      agreements.agreementPeriod
    );

  if (fetchedAgreements.length === 0) {
    res
      .status(404)
      .json({ success: false, message: "No agreement found for this PFI" });
    return;
  }

  res.status(200).json({
    success: true,
    agreements: fetchedAgreements,
    documents: [],
  });
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
export const createAgreement: RequestHandler = async (req, res) => {
  const {
    pfiId,
    agreementAmount,
    agreementPeriod,
    commencementDate,
    expiryDate,
  } = req.body;

  if (
    !pfiId ||
    !agreementAmount ||
    !agreementPeriod ||
    !commencementDate ||
    !expiryDate
  ) {
    console.log("Validation failed: Missing agreement data");
    return res.status(400).json({
      success: false,
      message: "Agreement data is required",
      agreement: {},
    });
  }

  try {
    console.log("Generating agreement number");
    const agreementNumber = generateAgreementNumber(
      new Date(commencementDate),
      pfiId
    );
    console.log("Inserting agreement into database");
    const newAgreement = await db
      .insert(agreements)
      .values({
        pfiId,
        agreementNumber,
        agreementAmount,
        agreementPeriod,
        commencementDate: new Date(commencementDate),
        expiryDate: new Date(expiryDate),
      })
      .returning({
        agreementId: agreements.id,
        pfiId: agreements.pfiId,
        agreementNumber: agreements.agreementNumber,
        agreementAmount: agreements.agreementAmount,
        commencementDate: agreements.commencementDate,
        expiryDate: agreements.expiryDate,
        period: agreements.agreementPeriod,
        agreementStatus: agreements.status,
      });

    if (!newAgreement) {
      console.log("Agreement creation failed");
      return res.status(400).json({
        success: false,
        message: "Agreement creation failed",
        agreement: {},
      });
    }

    console.log("Agreement created successfully");
    res.status(201).json({
      success: true,
      message: "Agreement created successfully",
      agreement: newAgreement[0],
    });
  } catch (error) {
    console.error("Error creating agreement:", error);
    res.status(500).json({ success: false, message: error, agreement: {} });
  }
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

export const getAgreementDetails: RequestHandler = async (req, res) => {
  const { agreementId } = req.params;
  if (!agreementId) {
    res.status(400).json({ error: "Agreement ID is required" });
    return;
  }
  const parsedAgreementId = parseInt(agreementId);

  try {
    const fetchedAgreements = await db
      ?.select({
        agreementId: agreements.id,
        pfiId: agreements.pfiId,
        agreementNumber: agreements.agreementNumber,
        agreementAmount: agreements.agreementAmount,
        commencementDate: agreements.commencementDate,
        expiryDate: agreements.expiryDate,
        agreementPeriod: agreements.agreementPeriod,
      })
      .from(agreements)
      .where(eq(agreements.id, parsedAgreementId));

    if (fetchedAgreements.length === 0) {
      res.status(200).json({
        success: true,
        message: "No agreement found for this PFI",
        agreement: {},
        documents: [],
      });
      return;
    }

    const storedDocuments = await db
      ?.select({
        documentId: documents.id,
        documentName: documents.name,
        documentUrl: documents.url,
      })
      .from(documents)
      .where(eq(documents.agreementId, fetchedAgreements[0].agreementId));

    res.status(200).json({
      success: true,
      message: "Agreement details fetched successfully",
      agreement: fetchedAgreements[0],
      documents: storedDocuments ?? [],
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error, agreement: {}, documents: [] });
  }
};
