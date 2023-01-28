<img src="images/readme/header-small.jpg" >

# E. Formulaire de recherche <!-- omit in toc -->

_**Dans cette dernière partie du TP, je vous propose de commencer à coder un peu le formulaire de recherche qu'on a ajouté en début de TP à la gameList.**_

> _**NB :** Je dis "commencer à coder" parce que ce formulaire prendra tout son sens quand on aura plus de résultats dans la liste et en particulier quand on connectera notre application à une vrai base de données (coucou le chapitre sur AJAX 👋)_

**Comme il s'agit du dernier exercice et que vous avez en principe vu tout ce dont vous aviez besoin sur l'API DOM et les formulaires dans les précédentes parties, je vous laisse trouver vous-même la solution en mode "lâché dans la nature" autrement dit : vous ne serez pas guidé.e comme dans les autres exercices.** \
_**Youhou c'est l'aventure !**_

Voici donc ce que l'on vous demande :

À la soumission du formulaire de recherche :
1. **N'affichez que les jeux dont le nom contient la chaîne saisie par l'utilisateur dans le champ "search"**
2. **Changez l'ordre d'affichage selon la valeur sélectionnée dans la liste déroulante "ordering" :**
	- **"Tri par note"** : les résultats doivent s'afficher par ordre de note metacritic décroissante (_la meilleure note en premier_)
	- **"Tri par date de sortie"** : les résultats doivent s'afficher par date de sortie décroissante (_le plus récent en premier_)
	- **"Tri par pertinence"** : les résultats doivent s'afficher dans l'ordre initial du tableau tel qu'il se trouvait au chargement de la page (_NB : attention souvenez vous du TP1 : la méthode `sort` **modifie le tableau sur lequel on l'appelle**, il faudra en faire une "sauvegarde"/un clone..._)

> _**NB :** pour que le tri par note et le tri par date de sortie retournent un ordre différent vous avez le droit de modifier les notes des jeux du tableau data, vous pouvez par exemple passer la note de "The Last of Us Part 2" à 95_
<br/>
<br/>
<br/>

**Si vous parvenez à finir cet exercice, félicitations, ce TP2 est terminé !** 👏👏👏