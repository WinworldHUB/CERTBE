import { db } from './setup';
import pfi  from './schema/pfi'; 
import user from './schema/user'; 
// Seed data for PFIs
const seedPFI = async () => {
  const pfiData = [
    {
      name: 'PFI 1',
      address: '123 Main St',
      agreementAmount: "10000.00",
      agreementPeriod: '1 year',
      agreementDocument: 'pfi1_agreement_url',
      dueDiligenceDocument: 'pfi1_due_diligence_url',
    },
    {
      name: 'PFI 2',
      address: '456 Elm St',
      agreementAmount: "15000.00",
      agreementPeriod: '2 years',
      agreementDocument: 'pfi2_agreement_url',
      dueDiligenceDocument: 'pfi2_due_diligence_url',
    },
  ];

  for (const pfiItem of pfiData) {
    await db
      ?.insert(pfi)
      .values(pfiItem)
      .execute();
  }
};

// Seed data for users
const seedUsers = async () => {
  const userData = [
    {
      name: 'User 1',
      email: 'user1@example.com',
      address: '123 Main St',
      pfiId: 1, // Assuming PFI 1 has id 1
      createdAt: new Date(),
      phoneNo: '123-456-7890',
    },
    {
      name: 'User 2',
      email: 'user2@example.com',
      address: '456 Elm St',
      pfiId: 1, // Assuming PFI 1 has id 1
      createdAt: new Date(),
      phoneNo: '123-456-7890',
    },
    {
      name: 'User 3',
      email: 'user3@example.com',
      address: '789 Oak St',
      pfiId: 2, // Assuming PFI 2 has id 2
      createdAt: new Date(),
      phoneNo: '123-456-7890',
    },
    {
      name: 'User 4',
      email: 'user4@example.com',
      address: '456 Pine St',
      pfiId: 2, // Assuming PFI 2 has id 2
      createdAt: new Date(),
      phoneNo: '123-456-7890',
    },
    {
      name: 'User 5',
      email: 'user5@example.com',
      address: '789 Cedar St',
      pfiId: 1, // Assuming PFI 1 has id 1
      createdAt: new Date(),
      phoneNo: '123-456-7890',
    },
    {
      name: 'User 6',
      email: 'user6@example.com',
      address: '123 Maple St',
      pfiId: 2, // Assuming PFI 2 has id 2
      createdAt: new Date(),
      phoneNo: '123-456-7890',
    },
  ];

  for (const userItem of userData) {
    await db
      ?.insert(user)
      .values(userItem)
      .execute();
  }
};

// Execute seed scripts
const seedDatabase = async () => {
  try {
    await seedPFI();
    await seedUsers();
    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

// Call the seedDatabase function to populate the tables with seed data
seedDatabase();
