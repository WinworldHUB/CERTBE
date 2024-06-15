import { eq } from "drizzle-orm";
import { RequestHandler } from "express";
import users from "../db/schema/user";
import { db } from "../db/setup";
import stytchClient from "../stytchClient";
import { SignupRequest, LoginRequest } from "../types";
import validateUser from "../utils/validateUser";
import pfi from "../db/schema/pfi";

export const register: RequestHandler = async (req, res) => {
  const {
    userFullName,
    email,
    phone,
    address,
    password,
    orgName,
  }: SignupRequest = req.body;

  if (!userFullName || !email || !phone || !address || !password || !orgName) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "All fields are required" });
  }

  try {
    const first_name = userFullName.split(" ")[0];
    const last_name = userFullName.split(" ")[1];
    const stytchresponse = await stytchClient.passwords.create({
      name: { first_name: first_name, last_name: last_name },
      email: email,
      password: password,
      session_duration_minutes: 527040,
    });

    if (stytchresponse.status_code === 200) {
      await db?.insert(users).values({
        fullName: userFullName,
        email: email,
        phoneNo: phone,
        role: "USER",
        isPrimary: true,
      });

      const postPfi = await db
        ?.insert(pfi)
        .values({
          name: orgName,
          address: address,
        })
        .returning({ insertedId: pfi.id });

      const pfiId = postPfi[0].insertedId;

      return res.status(201).json({
        success: true,
        message: "Added Successfully",
        session_duration: "366 days",
        userFullName: userFullName,
        pfiId: pfiId,
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
    const validatedUser = await validateUser(email);

    if (!validatedUser.isActive) {
      return res.status(validatedUser.statusCode).json({
        success: false,
        message: validatedUser.message,
        session_duration: "",
        session_token: "",
        session_jwt: "",
        fullName: "",
      });
    }

    if (validatedUser.isActive) {
      const stytchresponse = await stytchClient.passwords.authenticate({
        email: email,
        password: password,
        session_duration_minutes: 527040,
      });

      if (stytchresponse.status_code === 200) {
        const storedUser = await db
          ?.select()
          .from(users)
          .where(eq(users.email, email));
        const userFullName = storedUser[0].fullName;
        return res.status(201).json({
          success: true,
          message: "Logged In Successfully",
          session_duration: "366 days",
          session_token: stytchresponse.session_token,
          session_jwt: stytchresponse.session_jwt,
          fullName: userFullName,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Unable to login",
        error,
        session_duration: "",
        session_token: "",
        session_jwt: "",
        fullName: "",
      });
  }
};
