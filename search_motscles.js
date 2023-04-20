function rechercherParMotsCles() {
    // Récupérer les mots clés saisis
    var motsCles = document.getElementById("mots_cles").value.toLowerCase();
  
    // Charger le fichier XML
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var xmlDoc = this.responseXML;
        var livres = xmlDoc.getElementsByTagName("livre");
        var tableLivres = document.getElementById("table_livres");
        var tbody = tableLivres.getElementsByTagName("tbody")[0];
  
        // Effacer le contenu de la table
        tbody.innerHTML = "";
  
        // Parcourir tous les livres
        for (var i = 0; i < livres.length; i++) {
          var livre = livres[i];
          var titre = livre.getElementsByTagName("titre")[0].childNodes[0].nodeValue;
          var type = livre.getElementsByTagName("type")[0].childNodes[0].nodeValue;
          var auteur = livre.getElementsByTagName("auteur")[0].childNodes[0].nodeValue;
          var annee = livre.getElementsByTagName("annee")[0].childNodes[0].nodeValue;
          var motsClesLivre = livre.getElementsByTagName("mots_cles")[0].childNodes[0].nodeValue.toLowerCase();
  
          // Vérifier si les mots clés sont présents dans le livre
          if (motsClesLivre.includes(motsCles)) {
            // Ajouter le livre à la table
            var row = tbody.insertRow();
            var cellTitre = row.insertCell();
            var cellType=row.insertCell();
            var cellAuteur = row.insertCell();
            var cellAnnee = row.insertCell();
            var cellMotsCles = row.insertCell();
            cellTitre.innerHTML = titre;
            cellType.innerHTML = type;
            cellAuteur.innerHTML = auteur;
            cellAnnee.innerHTML = annee;
            cellMotsCles.innerHTML = motsClesLivre;
          }
        }
      }
    };
    xhttp.open("GET", "/bibliotheque.xml", true);
    xhttp.send();
  }
  // Ajouter un écouteur d'événements sur la zone de texte de l'auteur
var motsClesInput = document.getElementById("mots_cles");
motsClesInput.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		rechercherParMotsCles();
	}
});
  