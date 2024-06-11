import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import { eq } from "drizzle-orm";
export const fetchAllUsersFromPfi: RequestHandler = async (req, res) => {
  const { pfiId } = req.params;

  if (!pfiId) {
    res.status(400).json({ error: "PFI ID is required" });
    return;
  }

  const parsedPfiId = parseInt(pfiId);

  const users = await db
    ?.select()
    .from(user)
    .where(eq(user.pfiId, parsedPfiId));

  res.status(200).json(users);
};
