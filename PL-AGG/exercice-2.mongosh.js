const pipeline = [
  {
    $match: {
      status: "RETURNED"
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
      loanCount: { $sum: 1 },
      averageDuration: { $avg: "$durationDays" },
      revenueCents: { $sum: "$feeCents" }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      loanCount: 1,
      averageDuration: {
        $round: ["$averageDuration", 2]
      },
      revenueCents: 1
    }
  },
  {
    $sort: {
      revenueCents: -1,
      category: 1
    }
  }
];

const result = db.loans.aggregate(pipeline).toArray();

printjson(result);