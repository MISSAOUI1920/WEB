function rechercherLivre() {
	// Récupérer l'auteur saisi dans le formulaire
	var auteur = document.getElementById("auteur").value;

	// Créer un objet XMLHttpRequest pour charger le fichier XML
	var xhr = new XMLHttpRequest();

	// Ouvrir la connexion avec la méthode GET et le fichier bibliotheque.xml
	xhr.open("GET", "/bibliotheque.xml", true);

	// Définir le type de contenu de la réponse
	xhr.setRequestHeader("Content-type", "application/xml");

	// Ajouter une fonction de rappel pour traiter la réponse
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		// Charger le fichier XML dans un objet document XML
		var xmlDoc = xhr.responseXML;

		// Récupérer tous les livres
		var livres = xmlDoc.getElementsByTagName("livre");

		// Parcourir tous les livres pour trouver ceux de l'auteur recherché
		var resultats = document.getElementById("resultats").getElementsByTagName("tbody")[0];
		resultats.innerHTML = "";
		for (var i = 0; i < livres.length; i++) {
		  var livre = livres[i];
		  var auteurLivre = livre.getElementsByTagName("auteur")[0].childNodes[0].nodeValue;
		  if (auteurLivre.toLowerCase().includes(auteur.toLowerCase())) {
			// Ajouter une ligne pour le livre dans le tableau des résultats
			var titreLivre = livre.getElementsByTagName("titre")[0].childNodes[0].nodeValue;
			var typeLivre = livre.getElementsByTagName("type")[0].childNodes[0].nodeValue;
			var anneeLivre = livre.getElementsByTagName("annee")[0].childNodes[0].nodeValue;
			var motsClesLivre = livre.getElementsByTagName("mots_cles")[0].childNodes[0].nodeValue;
			var ligne = "<tr><td>" + titreLivre + "</td><td>" + typeLivre + "</td><td>" + auteurLivre + "</td><td>" + anneeLivre + "</td><td>" + motsClesLivre + "</td></tr>";
			resultats.innerHTML += ligne;
		  }
		}
	  }
	};

	// Envoyer la requête
	xhr.send();
  }

  // Ajouter un écouteur d'événements sur la zone de texte de l'auteur
  var auteurInput = document.getElementById("auteur");
  auteurInput.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
	  rechercherLivre();
	}
  });

