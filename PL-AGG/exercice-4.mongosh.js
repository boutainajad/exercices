const pipeline = [
  {
    $match: {
      status: "DONE"
    }
  },
  {
    $lookup: {
      from: "equipments",
      localField: "equipmentId",
      foreignField: "_id",
      as: "equipment"
    }
  },
  {
    $unwind: "$equipment"
  },
  {
    $match: {
      "equipment.archived": false
    }
  },
  {
    $group: {
      _id: "$equipment.category",
      interventionCount: { $sum: 1 },
      totalCostCents: { $sum: "$costCents" },
      averageCostCents: { $avg: "$costCents" }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      interventionCount: 1,
      totalCostCents: 1,
      averageCostCents: {
        $round: ["$averageCostCents", 2]
      }
    }
  },
  {
    $sort: {
      totalCostCents: -1
    }
  }
];

const result = db.maintenance.aggregate(pipeline).toArray();

printjson(result);