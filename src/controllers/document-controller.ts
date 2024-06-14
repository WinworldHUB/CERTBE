import { RequestHandler } from "express";
import { db } from "../db/setup";
import agreements from "../db/schema/agreements";
import uploadFile from "../utils/upload";
import documents from "../db/schema/documents";



export const pfiDocuments: RequestHandler = async (req, res) => {
  const agreementId = req.params.agreementId;

  if (!agreementId) {
    return res.status(400).json({ message: "PFI ID is required" });
  }

  const files = req.files as Express.Multer.File[];
  if (!req.files || !Array.isArray(req.files)) {
    return res
      .status(400)
      .json({
        message: "Invalid or no file(s) were given",
        allowedFiles: ".pdf, .docx, .doc, .txt",
      });
  }
  // Upload files to S3 and get the URLs
  try {
    const uploadPromises = files.map((file) => uploadFile(file));
    const urls = await Promise.all(uploadPromises);

    if (!urls || urls.length === 0) {
      return res.status(500).json({ message: "Failed to upload files" });
    }
    const parsedAgreementId= parseInt(agreementId);
    await db?.insert(documents).values({
      name: files[0].originalname,
      url: urls[0],
      agreementId: parsedAgreementId,
    });

    res.status(201).json({
      urls,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "Failed to upload files" });
  }
};
