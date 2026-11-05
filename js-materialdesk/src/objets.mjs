export function normaliserEquipement(saisie) {
  if (!saisie || typeof saisie !== "object" || Array.isArray(saisie)) {
    throw new Error("Les données doivent être un objet.");
  }

  const { id, nom, categorie, prixJourCentimes, stock } = saisie;

  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("ID invalide.");
  }

  if (typeof nom !== "string" || nom.trim() === "") {
    throw new Error("Nom invalide.");
  }

  if (typeof categorie !== "string") {
    throw new Error("Catégorie invalide.");
  }

  const categorieNormalisee = categorie.trim().toLowerCase();

  if (!["video", "audio", "informatique"].includes(categorieNormalisee)) {
    throw new Error("Catégorie invalide.");
  }

  if (!Number.isInteger(prixJourCentimes) || prixJourCentimes < 0) {
    throw new Error("Prix invalide.");
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error("Stock invalide.");
  }

  const tags = saisie.tags === undefined ? [] : saisie.tags;

  if (
    !Array.isArray(tags) ||
    !tags.every(tag => typeof tag === "string" && tag.trim() !== "")
  ) {
    throw new Error("Tags invalides.");
  }

  const details = saisie.details === undefined ? {} : saisie.details;

  if (
    typeof details !== "object" ||
    details === null ||
    Array.isArray(details)
  ) {
    throw new Error("Details invalides.");
  }

  const salle = Object.hasOwn(details, "salle")
    ? details.salle
    : "non affectée";

  const etat = Object.hasOwn(details, "etat")
    ? details.etat
    : "bon";

  if (typeof salle !== "string" || salle.trim() === "") {
    throw new Error("Salle invalide.");
  }

  if (typeof etat !== "string" || etat.trim() === "") {
    throw new Error("Etat invalide.");
  }

  return {
    id: id.trim(),
    nom: nom.trim(),
    categorie: categorieNormalisee,
    prixJourCentimes,
    stock,
    tags: tags.map(tag => tag.trim()),
    details: {
      salle: salle.trim(),
      etat: etat.trim()
    }
  };
}

export function decrireEquipement(equipement) {
  return `ID: ${equipement.id} | Nom: ${equipement.nom} | Catégorie: ${equipement.categorie} | Stock: ${equipement.stock} | Prix: ${equipement.prixJourCentimes} centimes`;
}

export function lirePropriete(equipement, cle) {
  if (
    equipement === null ||
    typeof equipement !== "object"
  ) {
    throw new Error("Equipement invalide.");
  }

  if (Object.hasOwn(equipement, cle)) {
    return {
      presente: true,
      valeur: equipement[cle]
    };
  }

  return {
    presente: false
  };
}