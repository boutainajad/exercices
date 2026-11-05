export function chercherEquipement(catalogue, id) {
  return catalogue.find(equipement => equipement.id === id) ?? null;
}

export function listerDisponibles(catalogue, categorie) {
  return catalogue.filter(equipement => {
    const disponible = equipement.stock > 0;

    if (categorie === undefined) {
      return disponible;
    }

    return (
      disponible &&
      equipement.categorie === categorie.trim().toLowerCase()
    );
  });
}

export function creerCartes(catalogue) {
  return catalogue.map(equipement => ({
    id: equipement.id,
    nom: equipement.nom,
    disponible: equipement.stock > 0,
    prixJourCentimes: equipement.prixJourCentimes
  }));
}

export function calculerBilan(catalogue) {
  return catalogue.reduce(
    (bilan, equipement) => {
      bilan.nombreReferences++;
      bilan.totalUnites += equipement.stock;

      bilan.valeurJourCentimes +=
        equipement.prixJourCentimes * equipement.stock;

      return bilan;
    },
    {
      nombreReferences: 0,
      totalUnites: 0,
      valeurJourCentimes: 0
    }
  );
}

export function trierParPrix(catalogue) {
  return [...catalogue].sort((a, b) => {
    const differencePrix =
      a.prixJourCentimes - b.prixJourCentimes;

    if (differencePrix !== 0) {
      return differencePrix;
    }

    return a.id.localeCompare(b.id);
  });
}

export function regrouperParCategorie(catalogue) {
  return catalogue.reduce((groupes, equipement) => {
    const categorie = equipement.categorie;

    if (!groupes[categorie]) {
      groupes[categorie] = {
        nombreReferences: 0,
        totalUnites: 0,
        valeurJourCentimes: 0
      };
    }

    groupes[categorie].nombreReferences++;

    groupes[categorie].totalUnites += equipement.stock;

    groupes[categorie].valeurJourCentimes +=
      equipement.prixJourCentimes * equipement.stock;

    return groupes;
  }, {});
}

export function auMoinsUnIndisponible(catalogue) {
  return catalogue.some(equipement => equipement.stock <= 0);
}

export function tousStocksNonNegatifs(catalogue) {
  return catalogue.every(equipement => equipement.stock >= 0);
}