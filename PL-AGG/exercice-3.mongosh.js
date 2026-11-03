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
    $lookup: {
      from: "members",
      localField: "memberId",
      foreignField: "_id",
      as: "member"
    }
  },
  {
    $unwind: "$member"
  },
  {
    $match: {
      "member.active": true
    }
  },
  {
    $group: {
      _id: "$member.city",
      loanCount: { $sum: 1 },
      revenueCents: { $sum: "$feeCents" }
    }
  },
  {
    $sort: {
      revenueCents: -1,
      _id: 1
    }
  },
  {
    $project: {
      _id: 0,
      city: "$_id",
      loanCount: 1,
      revenueCents: 1
    }
  }
];

const result = db.loans.aggregate(pipeline).toArray();

printjson(result);