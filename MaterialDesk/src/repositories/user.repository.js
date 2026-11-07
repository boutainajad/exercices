import User from "../models/User.js";

export async function findByEmail(email) {
  return User.findOne({ email });
}

export async function findById(id) {
  return User.findById(id);
}

export async function create(data) {
  return User.create(data);
}