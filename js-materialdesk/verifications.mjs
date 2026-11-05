import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  normaliserEquipement,
  decrireEquipement,
  lirePropriete
} from "./src/objets.mjs";

import {
  chercherEquipement,
  listerDisponibles,
  creerCartes,
  calculerBilan,
  trierParPrix,
  regrouperParCategorie,
  auMoinsUnIndisponible,
  tousStocksNonNegatifs
} from "./src/tableaux.mjs";

import {
  deplacerEquipement,
  creerInstantane
} from "./src/copies.mjs";

import { Catalogue } from "./src/catalogue.mjs";

import {
  preparerRapport,
  calculerDevis
} from "./src/rapport.mjs";

import {
  creerPromesseControlee
} from "./src/services-simules.mjs";

let nombreVerifications = 0;

function verifier(description, fonction) {
  fonction();

  nombreVerifications++;

  console.log(` ${description}`);
}

async function verifierAsync(description, fonction) {
  await fonction();

  nombreVerifications++;

  console.log(` ${description}`);
}

const contenu = await readFile(
  new URL("./data/catalogue.json", import.meta.url),
  "utf8"
);

const donneesBrutes = JSON.parse(contenu);

const catalogue = donneesBrutes.map(normaliserEquipement);

const equipementTest = catalogue[0];


verifier("JS1-C1 : normaliser un équipement", () => {
  assert.equal(equipementTest.id, "E1");
  assert.equal(equipementTest.nom, "Vidéoprojecteur");
});

verifier("JS1-C2 : normaliser la catégorie", () => {
  const resultat = normaliserEquipement({
    id: " E5 ",
    nom: " Projecteur ",
    categorie: " VIDEO ",
    prixJourCentimes: 100,
    stock: 2
  });

  assert.equal(resultat.id, "E5");
  assert.equal(resultat.nom, "Projecteur");
  assert.equal(resultat.categorie, "video");
});

verifier("JS1-C3 : valeurs par défaut", () => {
  const resultat = normaliserEquipement({
    id: "E5",
    nom: "Projecteur",
    categorie: "video",
    prixJourCentimes: 100,
    stock: 2
  });

  assert.deepEqual(resultat.tags, []);

  assert.deepEqual(resultat.details, {
    salle: "non affectée",
    etat: "bon"
  });
});

verifier("JS1-C4 : rejeter une catégorie invalide", () => {
  assert.throws(
    () => normaliserEquipement({
      id: "E5",
      nom: "Test",
      categorie: "autre",
      prixJourCentimes: 100,
      stock: 2
    }),
    /Catégorie invalide/
  );
});

verifier("JS1-C5 : rejeter un prix invalide", () => {
  assert.throws(
    () => normaliserEquipement({
      id: "E5",
      nom: "Test",
      categorie: "video",
      prixJourCentimes: -10,
      stock: 2
    }),
    /Prix invalide/
  );
});

verifier("JS1-C6 : décrire un équipement", () => {
  const description = decrireEquipement(equipementTest);

  assert.ok(description.includes("E1"));
  assert.ok(description.includes("Vidéoprojecteur"));
});

verifier("JS1-C7 : lire une propriété existante", () => {
  const resultat = lirePropriete(equipementTest, "nom");

  assert.deepEqual(resultat, {
    presente: true,
    valeur: "Vidéoprojecteur"
  });
});

verifier("JS1-C8 : propriété absente", () => {
  const resultat = lirePropriete(equipementTest, "couleur");

  assert.deepEqual(resultat, {
    presente: false
  });
});


verifier("JS2-C1 : rechercher un équipement", () => {
  assert.equal(
    chercherEquipement(catalogue, "E1"),
    catalogue[0]
  );
});

verifier("JS2-C2 : équipement introuvable", () => {
  assert.equal(
    chercherEquipement(catalogue, "E99"),
    null
  );
});

verifier("JS2-C3 : lister les équipements disponibles", () => {
  const resultat = listerDisponibles(catalogue);

  assert.equal(resultat.length, 3);

  assert.deepEqual(
    resultat.map(e => e.id),
    ["E1", "E3", "E4"]
  );
});

verifier("JS2-C4 : filtrer les équipements vidéo", () => {
  const resultat = listerDisponibles(catalogue, "video");

  assert.deepEqual(
    resultat.map(e => e.id),
    ["E1", "E3"]
  );
});

verifier("JS2-C5 : créer des cartes indépendantes", () => {
  const cartes = creerCartes(catalogue);

  assert.equal(cartes.length, 4);

  assert.notEqual(cartes[0], catalogue[0]);

  assert.deepEqual(cartes[0], {
    id: "E1",
    nom: "Vidéoprojecteur",
    disponible: true,
    prixJourCentimes: 100
  });
});

verifier("JS2-C6 : calculer le bilan", () => {
  assert.deepEqual(calculerBilan(catalogue), {
    nombreReferences: 4,
    totalUnites: 9,
    valeurJourCentimes: 800
  });
});

verifier("JS2-C7 : trier sans modifier le tableau original", () => {
  const resultat = trierParPrix(catalogue);

  assert.deepEqual(
    resultat.map(e => e.id),
    ["E4", "E2", "E1", "E3"]
  );

  assert.equal(catalogue[0].id, "E1");
});

verifier("JS2-C8 : regrouper par catégorie", () => {
  const resultat = regrouperParCategorie(catalogue);

  assert.deepEqual(resultat.video, {
    nombreReferences: 2,
    totalUnites: 5,
    valeurJourCentimes: 700
  });

  assert.deepEqual(resultat.audio, {
    nombreReferences: 2,
    totalUnites: 4,
    valeurJourCentimes: 100
  });
});

verifier("JS2-C9 : détecter un équipement indisponible", () => {
  assert.equal(auMoinsUnIndisponible(catalogue), true);
});

verifier("JS2-C10 : vérifier les stocks non négatifs", () => {
  assert.equal(tousStocksNonNegatifs(catalogue), true);
});


verifier("JS3-C1 : déplacer un équipement sans modifier l'original", () => {
  const resultat = deplacerEquipement(catalogue, "E1", "C3");

  assert.notEqual(resultat, catalogue);

  assert.notEqual(resultat[0], catalogue[0]);

  assert.notEqual(resultat[0].details, catalogue[0].details);

  assert.equal(resultat[0].details.salle, "C3");

  assert.equal(catalogue[0].details.salle, "A1");
});

verifier("JS3-C2 : créer un instantané indépendant", () => {
  const instantane = creerInstantane(catalogue);

  assert.notEqual(instantane, catalogue);

  assert.notEqual(instantane[0], catalogue[0]);

  assert.notEqual(
    instantane[0].details,
    catalogue[0].details
  );

  instantane[0].details.salle = "TEST";

  assert.equal(catalogue[0].details.salle, "A1");
});


verifier("JS4-C1 : créer une instance Catalogue", () => {
  const instance = new Catalogue("Test", catalogue);

  assert.equal(instance.label, "Test");

  assert.equal(instance instanceof Catalogue, true);
});

verifier("JS4-C2 : méthodes sur le prototype", () => {
  const premier = new Catalogue("Premier", catalogue);

  const deuxieme = new Catalogue("Deuxième", catalogue);

  assert.equal(Object.hasOwn(premier, "bilan"), false);

  assert.equal(premier.bilan, deuxieme.bilan);
});

verifier("JS4-C3 : recherche indépendante", () => {
  const instance = new Catalogue("Test", catalogue);

  const resultat = instance.rechercher("E1");

  resultat.details.salle = "TEST";

  assert.equal(instance.rechercher("E1").details.salle, "A1");

  assert.equal(instance.rechercher("E99"), null);
});

verifier("JS4-C4 : déplacement dans le catalogue", () => {
  const instance = new Catalogue("Test", catalogue);

  const resultat = instance.deplacer("E1", "C5");

  assert.equal(resultat.details.salle, "C5");

  assert.equal(instance.rechercher("E1").details.salle, "C5");
});

verifier("JS4-C5 : exporter un instantané indépendant", () => {
  const instance = new Catalogue("Test", catalogue);

  const exportation = instance.exporter();

  exportation[0].nom = "Nom modifié";

  assert.equal(
    instance.rechercher("E1").nom,
    "Vidéoprojecteur"
  );
});


verifier("JS5-C1 : calculer un devis", () => {
  const instance = new Catalogue("Test", catalogue);

  const devis = calculerDevis(instance, {
    id: "D1",
    equipementId: "E1",
    quantite: 2
  });

  assert.deepEqual(devis, {
    idDemande: "D1",
    equipementId: "E1",
    quantite: 2,
    montantCentimes: 200
  });
});

verifier("JS5-C2 : rejeter une quantité supérieure au stock", () => {
  const instance = new Catalogue("Test", catalogue);

  assert.throws(
    () => calculerDevis(instance, {
      id: "D1",
      equipementId: "E1",
      quantite: 10
    }),
    /Stock insuffisant/
  );
});

await verifierAsync("JS5-C3 : charger et calculer le rapport", async () => {
  const rapport = await preparerRapport();

  assert.deepEqual(rapport.bilanCatalogue, {
    nombreReferences: 4,
    totalUnites: 9,
    valeurJourCentimes: 800
  });

  assert.equal(rapport.devis.length, 3);

  assert.equal(rapport.totalDemandesCentimes, 475);

  assert.deepEqual(
    rapport.devis.map(devis => devis.montantCentimes),
    [200, 200, 75]
  );
});

await verifierAsync("JS5-C4 : démarrer les deux chargements avant l'attente", async () => {
  const promesseCatalogue = creerPromesseControlee();

  const promesseDemandes = creerPromesseControlee();

  let catalogueDemarre = false;
  let demandesDemarre = false;

  const rapportPromise = preparerRapport({
    chargerCatalogueFn: () => {
      catalogueDemarre = true;
      return promesseCatalogue.promise;
    },

    chargerDemandesFn: () => {
      demandesDemarre = true;
      return promesseDemandes.promise;
    }
  });

  assert.equal(catalogueDemarre, true);
  assert.equal(demandesDemarre, true);

  promesseCatalogue.resolve(catalogue);

  promesseDemandes.resolve([
    {
      id: "D1",
      equipementId: "E1",
      quantite: 2
    }
  ]);

  const resultat = await rapportPromise;

  assert.equal(resultat.totalDemandesCentimes, 200);
});

console.log(`Résultat : ${nombreVerifications} vérifications réussies`);
