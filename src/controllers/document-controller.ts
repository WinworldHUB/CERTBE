import { RequestHandler } from "express";
import { db } from "../db/setup";
import { eq } from "drizzle-orm";
import uploadFile from "../utils/upload";
import documents from "../db/schema/documents";
import users from "../db/schema/user";
import pfi from "../db/schema/pfi";
import agreements from "../db/schema/agreements";
import { sendRegistrationApprovalEmail } from "../emails/approve-user-email";

export const getDocbyAgreementId: RequestHandler = async (req, res) => {
  const { agreementId } = req.params;
  if (!agreementId) {
    res.status(400).json({ error: "PFI ID is required" });
    return;
  }

  const parsedAgreementId = parseInt(agreementId);
  const fetchedDocs = await db
    ?.select()
    .from(documents)
    .where(eq(documents.agreementId, parsedAgreementId));
  res.status(200).json(fetchedDocs);
};

export const pfiDocuments: RequestHandler = async (req, res) => {
  const { agreementId } = req.params;

  if (!agreementId) {
    return res.status(400).json({ message: "Agreement ID is required" });
  }

  const files = req.files as Express.Multer.File[];
  if (!req.files || !Array.isArray(req.files)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or no file(s) were given,.pdf, .docx, .doc, .txt",
      urls: [],
    });
  }
  // Upload files to S3 and get the URLs
  try {
    const uploadPromises = files.map((file) => uploadFile(file));
    const urls = await Promise.all(uploadPromises);

    if (!urls || urls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "URL not available for the files",
        urls: [],
      });
    }
    const parsedAgreementId = parseInt(agreementId);
    await db?.insert(documents).values({
      name: files[0].originalname,
      url: urls[0],
      agreementId: parsedAgreementId,
    });
    const storedAgreement = await db
      ?.select({
        pfiId: pfi.id,
      })
      .from(agreements)
      .where(eq(agreements.id, parsedAgreementId));

    const storedUser = await db
      ?.select({
        email: users.email,
      })
      .from(users)
      .where(eq(users.parentId, storedAgreement[0].pfiId));
    await sendRegistrationApprovalEmail(storedUser[0].email);
    res.status(201).json({
      success: true,
      urls,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ success: true, message: error, urls: [] });
  }
};
