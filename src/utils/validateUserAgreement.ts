import { eq } from "drizzle-orm";
import agreements from "../db/schema/agreements";
import pfi from "../db/schema/pfi";
import users from "../db/schema/user";
import { db } from "../db/setup";
import { ValidationResult } from "../types";

const validateAgreement = async (email: string): Promise<ValidationResult> => {
    try {
      const fetchUser = await db
        ?.select()
        .from(users)
        .where(eq(users.email, email));
      if (!fetchUser || fetchUser.length === 0) {
        return { success: false, data: null, message: "User not found", statusCode: 400 };
      }
  
      const parentId = fetchUser[0].parentId;
  
      if (parentId === null) {
        return { success: false, data: null, message: "Parent ID is null", statusCode: 400 };
      }
  
      const fetchedPfi = await db?.select().from(pfi).where(eq(pfi.id, parentId));
  
      if (!fetchedPfi || fetchedPfi.length === 0) {
        return { success: false, data: null, message: "PFI not found", statusCode: 400 };
      }
  
      const fetchedAgreement = await db
        ?.select()
        .from(agreements)
        .where(eq(agreements.pfiId, parentId));
  
      if (!fetchedAgreement || fetchedAgreement.length === 0) {
        return { success: false, data: null, message: "Agreement not found", statusCode: 400 };
      }
  
      if (fetchedAgreement[0].isApproved === false) {
        return { success: false, data: null, message: "Agreement not approved", statusCode: 400 };
      }
  
      return { success: true, data: fetchedAgreement[0], message: "Validation successful", statusCode: 200 };
    } catch (error) {
      return { success: false, data: null, message: "Server error", statusCode: 500 };
    }
  };
  
  export default validateAgreement;