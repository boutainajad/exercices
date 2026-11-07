import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    assetTag: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: ["video", "audio", "informatique"]
    },

    dailyLateFeeCents: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "dailyLateFeeCents doit être un entier"
      }
    },

    isArchived: {
      type: Boolean,
      default: false
    },

    checkoutCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "checkoutCount doit être un entier"
      }
    }
  },
  {
    timestamps: true
  }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;