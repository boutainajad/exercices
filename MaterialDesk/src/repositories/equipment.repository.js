import Equipment from "../models/Equipment.js";

export async function findAll(filters = {}) {
  return Equipment.find(filters);
}

export async function findById(id) {
  return Equipment.findById(id);
}

export async function findByAssetTag(assetTag) {
  return Equipment.findOne({ assetTag });
}

export async function create(data) {
  return Equipment.create(data);
}

export async function updateById(id, data) {
  return Equipment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
}

export async function incrementCheckoutCount(id) {
  return Equipment.findByIdAndUpdate(
    id,
    { $inc: { checkoutCount: 1 } },
    { new: true }
  );
}

export async function getStats() {
  return Equipment.aggregate([
    {
      $match: {
        isArchived: false
      }
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    }
  ]);
}