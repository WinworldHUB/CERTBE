import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import { eq } from "drizzle-orm";
export const fetchAllUsersFromEmail: RequestHandler = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Email is required" });
  }

  const users = await db?.select().from(user).where(eq(user.email, email));
  return res.status(200).json({ success: true, data: users });
};

export const fetchAllUsersFromPfi: RequestHandler = async (req, res) => {
  const { parentId } = req.params;

  if (!parentId) {
    res.status(400).json({ error: "PFI ID is required" });
    return;
  }

  const parsedParentId = parseInt(parentId);

  const users = await db
    ?.select()
    .from(user)
    .where(eq(user.parentId, parsedParentId));

  res.status(200).json(users);
};
