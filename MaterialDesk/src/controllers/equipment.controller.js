import mongoose from "mongoose";
import Equipment from "../models/Equipment.js";

export async function getEquipments(req, res, next) {
  try {
    const category = req.query.category;

    const filters = {
      isArchived: false
    };

    if (category) {
      filters.category = category;
    }

    const equipments = await Equipment.find(filters);

    res.status(200).json(equipments);
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentStats(req, res, next) {
  try {
    const count = await Equipment.countDocuments({
      isArchived: false
    });

    res.status(200).json({
      count: count
    });
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentById(req, res, next) {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Identifiant invalide."
      });
    }

    const equipment = await Equipment.findOne({
      _id: id,
      isArchived: false
    });

    if (!equipment) {
      return res.status(404).json({
        message: "Équipement introuvable."
      });
    }

    res.status(200).json(equipment);
  } catch (error) {
    next(error);
  }
}

export async function createEquipment(req, res, next) {
  try {
    const { assetTag, name, category, dailyLateFeeCents } = req.body;

    if (
      !assetTag ||
      !name ||
      !category ||
      dailyLateFeeCents === undefined
    ) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires."
      });
    }

    if (
      typeof assetTag !== "string" ||
      typeof name !== "string" ||
      !["video", "audio", "informatique"].includes(category) ||
      typeof dailyLateFeeCents !== "number" ||
      !Number.isInteger(dailyLateFeeCents) ||
      dailyLateFeeCents < 0
    ) {
      return res.status(400).json({
        message: "Données invalides."
      });
    }

    const equipment = await Equipment.create({
      assetTag: assetTag,
      name: name,
      category: category,
      dailyLateFeeCents: dailyLateFeeCents
    });

    res.status(201).json(equipment);
  } catch (error) {
    next(error);
  }
}