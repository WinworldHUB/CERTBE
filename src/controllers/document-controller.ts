import { RequestHandler } from "express";
import pfi from "../db/schema/pfi";
import { db } from "../db/setup";
import agreements from "../db/schema/agreements";
import { eq } from "drizzle-orm";
import uploadFile from "../utils/upload";
import documents from "../db/schema/documents";

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

export const registerDocument: RequestHandler = async (req, res) => {
  const { dueDilligenceDoc, agreementDoc } = req.body;

  if (!dueDilligenceDoc || !agreementDoc) {
    return res
      .status(400)
      .json({ message: "Agreement and Due Dilligence files are required" });
  }
  // save the files to S3 and get the URL
  const dueDilligenceDocUrl = await uploadFile(dueDilligenceDoc);
  const agreementDocUrl = await uploadFile(agreementDoc);

  if (!dueDilligenceDocUrl || !agreementDocUrl) {
    return res.status(500).json({ message: "Failed to upload files" });
  }

  res.status(201).json({
    urls: {
      dueDilligenceDoc: dueDilligenceDocUrl,
      agreementDoc: agreementDocUrl,
    },

    message: "Files uploaded successfully",
  });
};
