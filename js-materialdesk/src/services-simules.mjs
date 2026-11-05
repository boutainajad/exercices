import { readFile } from "node:fs/promises";

const cheminCatalogue = new URL(
  "../data/catalogue.json",
  import.meta.url
);

const cheminDemandes = new URL(
  "../data/demandes.json",
  import.meta.url
);

function attendre(delaiMs) {
  if (!Number.isInteger(delaiMs) || delaiMs < 0) {
    return Promise.reject(new Error("Délai invalide."));
  }

  return new Promise(resolve => {
    setTimeout(resolve, delaiMs);
  });
}

export async function chargerCatalogue({ delaiMs = 80 } = {}) {
  await attendre(delaiMs);

  const contenu = await readFile(cheminCatalogue, "utf8");

  const donnees = JSON.parse(contenu);

  return structuredClone(donnees);
}

export async function chargerDemandes({ delaiMs = 30 } = {}) {
  await attendre(delaiMs);

  const contenu = await readFile(cheminDemandes, "utf8");

  const donnees = JSON.parse(contenu);

  return structuredClone(donnees);
}

export function creerPromesseControlee() {
  let resolve;
  let reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject
  };
}