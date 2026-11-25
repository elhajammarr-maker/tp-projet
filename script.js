
let produits = document.querySelectorAll('input[name="produit"]');
let total = document.getElementById("total");

let prixProduits = {
    "Gel Nettoyant": 35,
    "Crème Hydratante": 45,
    "Sérum Visage": 55,
    "Crème Solaire SPF 50": 40,
    "Masque Visage": 25,
    "Eau Micellaire": 30
};

function calculerTotal(liste) {
    let somme = 0;

    liste.forEach(function(produit) {
        somme += prixProduits[produit];
    });

    return somme;
}

produits.forEach(function(produit) {
    produit.addEventListener("change", function() {
        let selection = [];

        produits.forEach(function(p) {
            if (p.checked) {
                selection.push(p.value);
            }
        });

        total.value = calculerTotal(selection) + " DT";
    });
});

document.getElementById("myForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let email = document.getElementById("email").value.trim();
    let telephone = document.getElementById("telephone").value.trim();
    let adresse = document.getElementById("adresse").value.trim();

    let produitsChoisis = [];

    produits.forEach(function(p) {
        if (p.checked) {
            produitsChoisis.push(p.value);
        }
    });

    if (nom == "") {
        alert("Veuillez saisir votre nom !");
    }
    else if (prenom == "") {
        alert("Veuillez saisir votre prénom !");
    }
    else if (email == "") {
        alert("Veuillez saisir votre email !");
    }
    else if (!email.includes("@") || !email.includes(".")) {
        alert("Email invalide !");
    }
    else if (telephone == "") {
        alert("Veuillez saisir votre téléphone !");
    }
    else if (adresse == "") {
        alert("Veuillez saisir votre adresse !");
    }
    else if (produitsChoisis.length == 0) {
        alert("Veuillez choisir au moins un produit !");
    }
    else {

        let somme = calculerTotal(produitsChoisis);

        let tableau = document.getElementById("tableClients");
        let ligne = tableau.insertRow();

        ligne.insertCell(0).textContent = nom;
        ligne.insertCell(1).textContent = prenom;
        ligne.insertCell(2).textContent = email;
        ligne.insertCell(3).textContent = telephone;
        ligne.insertCell(4).textContent = adresse;
        ligne.insertCell(5).textContent = produitsChoisis.join(", ");
        ligne.insertCell(6).textContent = somme + " DT";

        let action = ligne.insertCell(7);

        let modifier = document.createElement("button");
        modifier.textContent = "Modifier";
        modifier.className = "btn-edit";

        modifier.addEventListener("click", function() {

            let nouveau = prompt(
                "Entrez les produits séparés par une virgule :\nGel Nettoyant, Crème Hydratante, Sérum Visage, Crème Solaire SPF 50, Masque Visage, Eau Micellaire",
                ligne.cells[5].textContent
            );

            if (nouveau === null) {
                return;
            }

            let nouvelleListe = nouveau.split(",").map(function(p) {
                return p.trim();
            }).filter(function(p) {
                return p != "";
            });

            let listeValide = nouvelleListe.every(function(p) {
                return Object.keys(prixProduits).some(function(nom) {
                    return nom.toLowerCase() == p.toLowerCase();
                });
            });

            if (!listeValide || nouvelleListe.length == 0) {
                alert("Produits invalides !");
                return;
            }

            nouvelleListe = nouvelleListe.map(function(p) {
                return Object.keys(prixProduits).find(function(nom) {
                    return nom.toLowerCase() == p.toLowerCase();
                });
            });

            nouvelleListe = [...new Set(nouvelleListe)];

            let nouveauTotal = calculerTotal(nouvelleListe);

            ligne.cells[5].textContent = nouvelleListe.join(", ");
            ligne.cells[6].textContent = nouveauTotal + " DT";

            alert("Modification effectuée avec succès !");
        });

        let supprimer = document.createElement("button");
        supprimer.textContent = "Supprimer";
        supprimer.className = "btn-delete";

        supprimer.addEventListener("click", function() {
            if (confirm("Voulez-vous supprimer ce client ?")) {
                ligne.remove();
            }
        });

        action.appendChild(modifier);
        action.appendChild(supprimer);

        alert("Votre achat est enregistré avec succès !");

        document.getElementById("myForm").reset();
        total.value = "";
    }

});