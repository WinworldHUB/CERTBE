import { db } from "./setup";
import pfi from "./schema/pfi";
import user from "./schema/user";
import agreements from "./schema/agreements";
// Seed data for PFIs
const seedPFI = async () => {
  const pfiData = [
    {
      name: "PFI 1",
      address: "123 Main St",
    },
    {
      name: "PFI 2",
      address: "456 Elm St",
    },
  ];

  for (const pfiItem of pfiData) {
    await db?.insert(pfi).values(pfiItem).execute();
  }
};

const seedAgreements = async () => {
  const agreementData = [
    {
      pfiId: 1,
      isActive: true,
      status: "Active",
      agreementAmount: "1000.00", // Change to string
      agreementPeriod: "12 months",
      isPaid: false,
      isApproved: true,
      commencementDate: new Date(),
      expiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
    },
    {
      pfiId: 2,
      isActive: true,
      status: "Active",
      agreementAmount: "1500.00", // Change to string
      agreementPeriod: "6 months",
      isPaid: false,
      isApproved: true,
      commencementDate: new Date(),
      expiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
    },
  ];

  for (const agreementItem of agreementData) {
    await db?.insert(agreements).values(agreementItem).execute();
  }
};
const seedDatabase = async () => {
  try {
    await seedPFI();
    await seedAgreements();
    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

// Call the seedDatabase function to populate the tables with seed data
seedDatabase();
