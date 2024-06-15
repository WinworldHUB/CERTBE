import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import { eq } from "drizzle-orm";
import { LoginRequest, SignupRequest } from "../types";
import stytchClient from "../stytchClient";
import users from "../db/schema/user";
import pfi from "../db/schema/pfi";
import agreements from "../db/schema/agreements";
import validateAgreement from "../utils/validateUserAgreement";
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
export const signUp: RequestHandler = async (req, res) => {
  const { fullName, email, phone, address, password }: SignupRequest = req.body;

  if (!fullName || !email || !phone || !address || !password) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "All fields are required" });
  }

  try {
    const name = fullName;
    const first_name = name.split(" ")[0];
    const last_name = name.split(" ")[1];
    const stytchresponse = await stytchClient.passwords.create({
      name: { first_name: first_name, last_name: last_name },
      email: email,
      password: password,
      session_duration_minutes: 527040,
    });

    if (stytchresponse.status_code === 200) {
      await db?.insert(users).values({
        name,
        email,
        phoneNo: phone,
        role: "USER",
        isPrimary: true,
      });
      return res.status(201).json({
        success: true,
        data: { name, email },
        message: "Added Successfully",
        session_duration: "366 days",
        fullName: name,
        session_token: stytchresponse.session_token,
        session_jwt: stytchresponse.session_jwt,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: "Unable to add", error });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password }: LoginRequest = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "All fields are required" });
  }

  try {
    const validatedAgreement = await validateAgreement(email);

    if (!validatedAgreement.success) {
      return res
        .status(validatedAgreement.statusCode)
        .json({
          success: false,
          data: null,
          message: validatedAgreement.message,
        });
    }

    if (validatedAgreement.success) {
      const stytchresponse = await stytchClient.passwords.authenticate({
        email: email,
        password: password,
        session_duration_minutes: 527040,
      });

      if (stytchresponse.status_code === 200) {
        return res.status(201).json({
          success: true,
          message: "Logged In Successfully",
          session_duration: "366 days",
          session_token: stytchresponse.session_token,
          session_jwt: stytchresponse.session_jwt,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: "Unable to login", error });
  }
};
