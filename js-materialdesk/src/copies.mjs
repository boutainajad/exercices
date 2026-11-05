export function deplacerEquipement(catalogue, id, nouvelleSalle) {
  if (
    typeof nouvelleSalle !== "string" ||
    nouvelleSalle.trim() === ""
  ) {
    throw new Error("Nouvelle salle invalide.");
  }

  const index = catalogue.findIndex(
    equipement => equipement.id === id
  );

  if (index === -1) {
    throw new Error("Equipement introuvable.");
  }

  return catalogue.map((equipement, i) => {
    if (i !== index) {
      return equipement;
    }

    return {
      ...equipement,
      details: {
        ...equipement.details,
        salle: nouvelleSalle.trim()
      }
    };
  });
}

export function creerInstantane(catalogue) {
  return structuredClone(catalogue);
}