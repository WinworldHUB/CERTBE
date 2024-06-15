"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("./setup");
const pfi_1 = __importDefault(require("./schema/pfi"));
const agreements_1 = __importDefault(require("./schema/agreements"));
// Seed data for PFIs
const seedPFI = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(pfi_1.default).values(pfiItem).execute());
    }
});
const seedAgreements = () => __awaiter(void 0, void 0, void 0, function* () {
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
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
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
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
    ];
    for (const agreementItem of agreementData) {
        yield (setup_1.db === null || setup_1.db === void 0 ? void 0 : setup_1.db.insert(agreements_1.default).values(agreementItem).execute());
    }
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield seedPFI();
        yield seedAgreements();
        console.log("Seed data inserted successfully!");
    }
    catch (error) {
        console.error("Error inserting seed data:", error);
    }
});
// Call the seedDatabase function to populate the tables with seed data
seedDatabase();
