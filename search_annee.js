document.getElementById("annee").addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    rechercherParAnnee();
  }
});
function rechercherParAnnee() {
    // Récupérer la valeur de l'année saisie dans le formulaire
    var annee = document.getElementById("annee").value;
  
    // Charger le fichier XML
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var xmlDoc = this.responseXML;
  
        // Rechercher les livres qui ont été publiés dans l'année spécifiée
        var livres = xmlDoc.getElementsByTagName("livre");
        var resultatHtml = "";
        for (var i = 0; i < livres.length; i++) {
          var livre = livres[i];
          var anneeLivre = livre.getElementsByTagName("annee")[0].textContent;
          if (anneeLivre == annee) {
            var titre = livre.getElementsByTagName("titre")[0].textContent;
            var type = livre.getElementsByTagName("type")[0].textContent;
            var auteur = livre.getElementsByTagName("auteur")[0].textContent;
            var motsCles = livre.getElementsByTagName("mots_cles")[0].textContent;
            resultatHtml += "<tr><td>" + titre + "</td><td>"+type + "</td><td>" + auteur + "</td><td>" + anneeLivre + "</td><td>" + motsCles + "</td></tr>";
          }
        }
  
        // Afficher les résultats dans le tableau
        document.getElementById("resultats").getElementsByTagName("tbody")[0].innerHTML = resultatHtml;
      }
    };
    xhr.open("GET", "/bibliotheque.xml", true);
    xhr.send();
  }

  