import { eq } from "drizzle-orm";
import pfis from "../db/schema/user";
import { db } from "../db/setup";
import { ValidationResult } from "../types";


const validatePfi = async (email: string): Promise<ValidationResult> => {
  try {
    const fetchPfi = await db
      ?.select()
      .from(pfis)
      .where(eq(pfis.email, email));
    if (!fetchPfi || fetchPfi.length === 0) {
      return {
        isActive: false,
        message: "Pfi not found",
        statusCode: 404,
      };
    }

    if (fetchPfi[0].isActive === false) {
      return {
        isActive: false,
        message: "Pfi is not approved yet",
        statusCode: 401,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isActive: false,
      message: "Internal server error",
      statusCode: 500,
    };
  }
  return {
    isActive: true,
    message: "Pfi is active",
    statusCode: 200,
  };
};

export default validatePfi;
