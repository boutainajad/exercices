import {
  chercherEquipement,
  calculerBilan
} from "./tableaux.mjs";

import {
  deplacerEquipement
} from "./copies.mjs";

export class Catalogue {
  constructor(label, equipements) {
    if (typeof label !== "string" || label.trim() === "") {
      throw new Error("Label invalide.");
    }

    if (!Array.isArray(equipements)) {
      throw new Error("Le catalogue doit être un tableau.");
    }

    const ids = equipements.map(equipement => equipement.id);

    if (new Set(ids).size !== ids.length) {
      throw new Error("Les identifiants doivent être uniques.");
    }

    this.label = label.trim();

    this._equipements = structuredClone(equipements);
  }

  rechercher(id) {
    const equipement = chercherEquipement(this._equipements, id);

    if (equipement === null) {
      return null;
    }

    return structuredClone(equipement);
  }

  bilan() {
    return calculerBilan(this._equipements);
  }

  deplacer(id, salle) {
    this._equipements = deplacerEquipement(
      this._equipements,
      id,
      salle
    );

    return this.rechercher(id);
  }

  exporter() {
    return structuredClone(this._equipements);
  }
}