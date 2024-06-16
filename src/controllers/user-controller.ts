import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import { and, eq } from "drizzle-orm";
import pfi from "../db/schema/pfi";
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

export const approveUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });
  }
  const parsedUserId = parseInt(userId);
  try {
    const updateUser = await db
      ?.update(user)
      .set({ isActive: true })
      .where(eq(user.id, parsedUserId));
    if (updateUser) {
      return res.status(200).json({
        success: true,
        message: "User approved successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const fetchInactiveUsersAndPfi: RequestHandler = async (req, res) => {
  try {
    console.log("Fetching inactive users...");
    const users = await db.select().from(user).where(eq(user.isActive, false));
    console.log("Inactive users:", users);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No inactive users found" });
    }

    console.log("Fetching inactive PFIs...");
    const parentId = users[0].parentId; 
    if (!parentId) {
      return res
        .status(404)
        .json({ success: false, message: "No PFIs found for this user" });
    }
    const pfis = await db.select().from(pfi).where(and(eq(pfi.isActive, false), eq(pfi.id, parentId)));
    console.log("Inactive PFIs:", pfis);

    if (pfis.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No inactive PFIs found" });
    }

    return res.status(200).json({ success: true, users: users, pfis: pfis });
  } catch (error) {
    console.error("Error fetching inactive users and PFIs:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};