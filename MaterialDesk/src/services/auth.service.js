
import User from "../models/User.js";

export async function createAdmin() {
  const email = "admin@materialdesk.com";

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log("Admin existe deja.");
    return existingAdmin;
  }

  const admin = await User.create({
    name: "Admin",
    email: email,
    password: "Admin123!",
    role: "admin"
  });

  console.log("Admin cr aeevec succes.");

  return admin;
}

export async function createMember() {
  const email = "member@materialdesk.com";

  const existingMember = await User.findOne({ email });

  if (existingMember) {
    console.log("Member existe deja.");
    return existingMember;
  }

  const member = await User.create({
    name: "Member",
    email: email,
    password: "Member123!",
    role: "member"
  });

  console.log("Member cree avec succes.");

  return member;
}

