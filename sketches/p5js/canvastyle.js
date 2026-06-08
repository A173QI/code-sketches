function setup() {
    // --- TAILLE DU CANVAS ---
    // Change ces valeurs pour agrandir ou rétrécir ta zone de dessin
    createCanvas(400, 400);

    // --- COULEUR DE FOND ---
    // 0 = noir, 255 = blanc. Tu peux aussi mettre (R, G, B)
    background(255);

    // --- STRUCTURE DE LA GRILLE ---
    // Change "8" par un autre chiffre pour avoir plus ou moins de colonnes/lignes
    for (let y = 0; y < 400; y++) {
        for (let x = 0; x < 400; x++) {

            // --- STYLE DES CONTOURS ---
            // Utilise stroke(0) pour des bordures noires ou noStroke() pour aucune bordure
            noStroke();

            // --- LOGIQUE DES COULEURS (R, G, B) ---
            // Modifie les calculs pour changer le dégradé :
            // x * 100 : le rouge augmente vers la droite
            // y * 90  : le bleu augmente vers le bas
            // Remplace par random(255) pour un effet "confetti"
            fill(x * 14, 14, y * 15);

            // --- DESSIN ET POSITION ---
            // square(PositionX, PositionY, Taille)
            // Pour espacer les carrés, augmente le multiplicateur (ex: x * 60)
            // Pour changer la forme, remplace 'square' par 'circle' ou 'rect'
            square(x * 12, y * 10, 10);

            // --- CONSOLE (DÉBOGAGE) ---
            // Utile pour vérifier les valeurs calculées par l'ordinateur
            print("Case: " + x + "," + y);
        }
    }
}

function draw() {
    // Ce qui est ici s'exécute en boucle (utile pour l'animation)
}