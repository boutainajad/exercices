import { Catalogue } from "./catalogue.mjs";

import {
  chargerCatalogue,
  chargerDemandes
} from "./services-simules.mjs";

export function calculerDevis(catalogue, demande) {
  if (!(catalogue instanceof Catalogue)) {
    throw new Error("Un objet Catalogue est obligatoire.");
  }

  if (!demande || typeof demande !== "object") {
    throw new Error("Demande invalide.");
  }

  if (
    typeof demande.id !== "string" ||
    demande.id.trim() === ""
  ) {
    throw new Error("Identifiant de demande invalide.");
  }

  if (
    typeof demande.equipementId !== "string" ||
    demande.equipementId.trim() === ""
  ) {
    throw new Error("Identifiant équipement invalide.");
  }

  if (
    !Number.isInteger(demande.quantite) ||
    demande.quantite <= 0
  ) {
    throw new Error("Quantité invalide.");
  }

  const equipement = catalogue.rechercher(demande.equipementId);

  if (equipement === null) {
    throw new Error("Equipement introuvable.");
  }

  if (demande.quantite > equipement.stock) {
    throw new Error("Stock insuffisant.");
  }

  return {
    idDemande: demande.id,
    equipementId: equipement.id,
    quantite: demande.quantite,
    montantCentimes:
      equipement.prixJourCentimes * demande.quantite
  };
}

export async function preparerRapport({
  chargerCatalogueFn = chargerCatalogue,
  chargerDemandesFn = chargerDemandes
} = {}) {

  // Les deux chargements commencent avant le await.

  const promesseCatalogue = chargerCatalogueFn();

  const promesseDemandes = chargerDemandesFn();

  const [equipements, demandes] = await Promise.all([
    promesseCatalogue,
    promesseDemandes
  ]);

  const catalogue = new Catalogue(
    "MaterialDesk",
    equipements
  );

  const devis = demandes.map(demande =>
    calculerDevis(catalogue, demande)
  );

  const totalDemandesCentimes = devis.reduce(
    (total, ligne) => total + ligne.montantCentimes,
    0
  );

  return {
    bilanCatalogue: catalogue.bilan(),
    devis,
    totalDemandesCentimes
  };
}