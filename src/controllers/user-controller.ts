import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import { and, eq } from "drizzle-orm";
import pfi from "../db/schema/pfi";
import { sendRegistrationApprovalEmail } from "../emails/approve-user-email";
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
  const { userId, pfiId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });
  }

  if (!pfiId) {
    return res.status(400).json({
      success: false,
      message: "Pfi id is required",
    });
  }

  const parsedUserId = parseInt(userId);
  const parsedPfiId = parseInt(pfiId);

  try {
    const updateUserPromise = db
      ?.update(user)
      .set({ isActive: true })
      .where(eq(user.id, parsedUserId));

    const updatePfiPromise = db
      ?.update(pfi)
      .set({ isActive: true })
      .where(eq(pfi.id, parsedPfiId));

    // Run both update operations concurrently
    const [updateUserResult, updatePfiResult] = await Promise.all([
      updateUserPromise,
      updatePfiPromise,
    ]);

    if (updateUserResult && updatePfiResult) {
      const storedUser = await db
        ?.select({
          email: user.email,
        })
        .from(user)
        .where(eq(user.id, parsedUserId));
      await sendRegistrationApprovalEmail(storedUser[0].email);
      return res.status(200).json({
        success: true,
        message: "User and PFI approved successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User or PFI not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const fetchInactiveUsersAndPfi: RequestHandler = async (req, res) => {
  try {
    const users = await db
      .select({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        pfiId: user.parentId,
        orgAddress: pfi.address,
        orgName: pfi.name,
      })
      .from(user)
      .leftJoin(pfi, eq(user.parentId, pfi.id))
      .where(eq(user.isActive, false)).groupBy(
        user.id,
        user.fullName,
        user.email,
        user.parentId,
        pfi.address,
        pfi.name
      )

    if (users.length === 0) {
      return res.status(200).json({ success: true, user: [] });
    }

    return res.status(200).json({ success: true, user: users });
  } catch (error) {
    console.error("Error fetching inactive users and PFIs:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
