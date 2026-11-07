import Loan from "../models/Loan.js";

export async function findReturnedLoans(from) {
  return Loan.find({
    status: "returned",
    returnedAt: {
      $gte: from
    }
  })
    .sort({
      returnedAt: -1,
      _id: 1
    })
    .populate("equipmentId");
}

export async function findById(id) {
  return Loan.findById(id);
}

export async function create(data) {
  return Loan.create(data);
}