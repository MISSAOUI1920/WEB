
from flask import Flask, render_template, request
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('form.html')


@app.route('/result', methods=['POST'])
def resultat():
  result = request.form
  type = result['type']
  titre = result['titre']
  auteur = result['auteur']
  annee=result['annee']
  mots_cles=result['mots_cles']

  # Ouvrir le fichier XML en mode append pour ajouter les nouvelles données
  tree = ET.parse('bibliotheque.xml')
  root = tree.getroot()

  nouveau_livre = ET.SubElement(root, 'livre')
  ET.SubElement(nouveau_livre, 'titre').text = titre
  ET.SubElement(nouveau_livre, 'type').text = type
  ET.SubElement(nouveau_livre,'auteur').text=auteur
  ET.SubElement(nouveau_livre,'annee').text=annee
  ET.SubElement(nouveau_livre,'mots_cles').text=mots_cles
  for elem in root.iter():
    if len(elem):
        elem.text = '\n' + '\t' + (elem.text.strip() if elem.text else '') + '\n' + '\t'
    else:
        elem.tail = '\n' + '\t' + (elem.tail.strip() if elem.tail else '') + '\n'

  tree.write('bibliotheque.xml')

  return render_template("result.html")

app.run(debug=True)
