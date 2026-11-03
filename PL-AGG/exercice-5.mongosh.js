const pipeline = [
  {
    $match: {
      status: "RETURNED",
      returnedAt: {
        $gte: new Date("2026-03-01"),
        $lt: new Date("2026-05-01")
      }
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
      _id: {
        period: {
          $dateToString: {
            format: "%Y-%m",
            date: "$returnedAt"
          }
        },
        category: "$equipment.category"
      },
      loanCount: { $sum: 1 },
      revenueCents: { $sum: "$feeCents" }
    }
  },
  {
    $project: {
      _id: 0,
      period: "$_id.period",
      category: "$_id.category",
      loanCount: 1,
      revenueCents: 1
    }
  },
  {
    $sort: {
      period: 1,
      revenueCents: -1,
      category: 1
    }
  }
];

const result = db.loans.aggregate(pipeline).toArray();

printjson(result);