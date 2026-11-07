import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true
    },

    status: {
      type: String,
      enum: ["returned", "ongoing"],
      required: true
    },

    returnedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;