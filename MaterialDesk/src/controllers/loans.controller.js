import Loan from "../models/Loan.js";

export async function getReturnedLoans(req, res, next) {
  try {
    const from = req.query.from;

    if (!from) {
      return res.status(400).json({
        message: "Le paramètre from est obligatoire."
      });
    }

    const date = new Date(from);

    if (
      isNaN(date.getTime()) ||
      !/^\d{4}-\d{2}-\d{2}T/.test(from) ||
      !/(Z|[+-]\d{2}:\d{2})$/.test(from)
    ) {
      return res.status(400).json({
        message: "Date invalide."
      });
    }

    const loans = await Loan.find({
      status: "returned",
      returnedAt: {
        $gte: date
      }
    })
      .sort({
        returnedAt: -1,
        _id: 1
      })
      .populate("equipmentId");

    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
}