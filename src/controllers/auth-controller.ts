import { eq, or } from "drizzle-orm";
import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import stytchClient from "../stytchClient";
import { SignupRequest, LoginRequest } from "../types";
import validateUser from "../utils/validateUser";
import pfi from "../db/schema/pfi";
import {sendWelcomeEmail} from "../emails/welcome-email";

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
      const postPfi = await db
        ?.insert(pfi)
        .values({
          name: orgName,
          address: address,
        })
        .returning({ insertedId: pfi.id });

      const pfiId = postPfi[0].insertedId;

      await db?.insert(user).values({
        fullName: userFullName,
        email: email,
        phoneNo: phone,
        role: "USER",
        isPrimary: true,
        parentId: pfiId,
      });

      await sendWelcomeEmail(email);

      return res.status(201).json({
        success: true,
        message: "Added Successfully",
        session_duration: "366 days",
        userFullName: userFullName,
        pfiId: pfiId,
        userRole: "USER",
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
    return res.status(400).json({
      success: false,
      pfiId: "",
      message: "All fields are required",
      session_duration: "",
      session_token: "",
      session_jwt: "",
      fullName: "",
    });
  }

  try {
    const validatedUser = await validateUser(email);

    if (!validatedUser.isActive) {
      return res.status(validatedUser.statusCode).json({
        success: false,
        pfiId: "",
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
          ?.select({
            fullName: user.fullName,
            role: user.role,
            pfiId: user.parentId,
            orgName: pfi.name,
            orgAddress: pfi.address,
          })
          .from(user)
          .leftJoin(pfi, eq(user.parentId, pfi.id))
          .where(eq(user.email, email)).groupBy(
            user.fullName,
            user.role,
            user.parentId,
            pfi.name,
            pfi.address
          
          );

        if (!storedUser[0]) {
          return res.status(404).json({
            success: false,
            message: "Unable to login",
            session_duration: "",
            session_token: "",
            pfiId: "",
            session_jwt: "",
            fullName: "",
            orgName: "",
            orgAddress: "",
          });
        }
  

        return res.status(201).json({
          success: true,
          message: "Logged In Successfully",
          session_duration: "366 days",
          session_token: stytchresponse.session_token,
          session_jwt: stytchresponse.session_jwt,
          fullName: storedUser[0].fullName,
          userRole: storedUser[0].role,
          pfiId: storedUser[0].pfiId,
          orgName: storedUser[0].orgName,
          orgAddress: storedUser[0].orgAddress,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to login",
      error,
      session_duration: "",
      session_token: "",
      pfiId: "",
      session_jwt: "",
      fullName: "",
      orgName: "",
      orgAddress: "",
    });
  }
};
