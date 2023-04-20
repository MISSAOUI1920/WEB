window.onload = function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var xmlDoc = this.responseXML;
        var livres = xmlDoc.getElementsByTagName("livre");
        var tbody = document.getElementsByTagName("tbody")[0];
  
        for (var i = 0; i < livres.length; i++) {
          var livre = livres[i];
          var titre = livre.getElementsByTagName("titre")[0].childNodes[0].nodeValue;
          var type = livre.getElementsByTagName("type")[0].childNodes[0].nodeValue;
          var auteur = livre.getElementsByTagName("auteur")[0].childNodes[0].nodeValue;
          var annee = livre.getElementsByTagName("annee")[0].childNodes[0].nodeValue;
          var mots_cles = livre.getElementsByTagName("mots_cles")[0].childNodes[0].nodeValue;
  
          var tr = document.createElement("tr");
          var tdTitre = document.createElement("td");
          tdTitre.innerHTML = titre;
          var tdType = document.createElement("td");
          tdType.innerHTML = type;
          var tdAuteur = document.createElement("td");
          tdAuteur.innerHTML = auteur;
          var tdAnnee = document.createElement("td");
          tdAnnee.innerHTML = annee;
          var tdMotsCles = document.createElement("td");
          tdMotsCles.innerHTML = mots_cles;
  
          tr.appendChild(tdTitre);
          tr.appendChild(tdType);
          tr.appendChild(tdAuteur);
          tr.appendChild(tdAnnee);
          tr.appendChild(tdMotsCles);
  
          tbody.appendChild(tr);
        }
      }
    };
    xmlhttp.open("GET", "/bibliotheque.xml", true);
    xmlhttp.send();
  };
  