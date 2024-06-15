import { eq } from "drizzle-orm";
import users from "../db/schema/user";
import { db } from "../db/setup";
import { ValidationResult } from "../types";


const validateUser = async (email: string): Promise<ValidationResult> => {
  try {
    const fetchUser = await db
      ?.select()
      .from(users)
      .where(eq(users.email, email));
    if (!fetchUser || fetchUser.length === 0) {
      return {
        isActive: false,
        message: "User not found",
        statusCode: 404,
      };
    }

    if (fetchUser[0].isActive === false) {
      return {
        isActive: false,
        message: "User is not approved yet",
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
    message: "User is active",
    statusCode: 200,
  };
};

export default validateUser;
