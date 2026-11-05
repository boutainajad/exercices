import { preparerRapport } from "./src/rapport.mjs";

const etat = {
  chargement: true,
  rapport: null,
  erreur: null
};

console.log("Etat initial :");
console.log(etat);

try {
  etat.rapport = await preparerRapport();
} catch (error) {
  etat.erreur = error.message;
} finally {
  etat.chargement = false;
}

console.log("\nEtat final :");
console.log(JSON.stringify(etat, null, 2));