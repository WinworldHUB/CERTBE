import { RequestHandler } from "express";
import { db } from "../db/setup";
import agreements from "../db/schema/agreements";
import { eq } from "drizzle-orm";
import uploadFile from "../utils/upload";

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

export const pfiDocuments: RequestHandler = async (req, res) => {
  const { documents } = req.body;

  if (!documents ) {
    return res
      .status(400)
      .json({ message: "Agreement and Due Dilligence files are required" });
  }
  // save the files to S3 and get the URL
  const document = await uploadFile(documents);

  if (!document) {
    return res.status(500).json({ message: "Failed to upload files" });
  }

  res.status(201).json({
    urls: {
      document,
    },

    message: "Files uploaded successfully",
  });
};
