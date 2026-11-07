import { connectDB } from "./config/database.js";
import {
  createAdmin,
  createMember
} from "./services/auth.service.js";

async function seed() {
  try {
    await connectDB();
    await createAdmin();
    await createMember();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();