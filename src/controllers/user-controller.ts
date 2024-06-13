import { RequestHandler } from "express";
import user from "../db/schema/user";
import { db } from "../db/setup";
import { eq } from "drizzle-orm";
import { LoginRequest, User } from "../types";
import stytchClient from "../stytchClient";
export const fetchAllUsersFromPfi: RequestHandler = async (req, res) => {

};

export const signUp: RequestHandler = async (req, res) => {
  const { username, email, phone, address, pfiId, password }: User = req.body;

  if (!username || !email || !phone || !pfiId || !address || !password) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "All fields are required" });
  }

  try {
    const name = username;
    const stytchresponse = await stytchClient.passwords.create({
      email: email,
      password: password,
      session_duration_minutes: 527040,
    });

    if (stytchresponse.status_code === 200) {

      return res.status(201).json({
        success: true,
        data: { name, email },
        message: "Added Successfully",
        session_duration: "366 days",
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
    const {  email,  password }: LoginRequest = req.body;
  
    if ( !email ||  !password) {
      return res
        .status(400)
        .json({ success: false, data: null, message: "All fields are required" });
    }
  
    try {
      const stytchresponse = await stytchClient.passwords.authenticate({ email: email,
        password: password,
        session_duration_minutes:527040
       });
  
      if (stytchresponse.status_code === 200) {
  
      return res.status(201).json({
        success: true,
        message: "Logged In Successfully",
        "session_duration": "366 days",
        "session_token": stytchresponse.session_token,
        "session_jwt": stytchresponse.session_jwt
      });
      }
     
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, data: null, message: "Unable to login", error });
    }
  };