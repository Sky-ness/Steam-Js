<img src="images/readme/header-small.jpg" >

# C. Interroger une API REST <!-- omit in toc -->

**Maintenant que l'on est capables de récupérer une ressource externe en JS et d'en afficher le contenu, connectons notre application à une base de données à travers une API REST !!!**

**Dans cet exercice nous allons en effet nous attacher à faire en sorte que la liste des jeux affichés dans la `GameListView` ne soit plus une liste "en dur" dans le fichier `data.js`, mais une liste de jeux fournis par une API REST distante.**


## Sommaire <!-- omit in toc -->
- [C.1. Découverte de l'API REST de rawg.io](#c1-découverte-de-lapi-rest-de-rawgio)
- [C.2. Récupération de la liste des jeux](#c2-récupération-de-la-liste-des-jeux)
- [C.3. Recherche et tri](#c3-recherche-et-tri)
- [C.4. Feedback](#c4-feedback)


## C.1. Découverte de l'API REST de rawg.io
L'API que je vous propose d'utiliser pour la liste des jeux est l'api de [rawg.io](https://rawg.io/) et dont la documentation se trouve ici : https://api.rawg.io/docs/

Elle a l'avantage d'être gratuite, rapide et d'offrir de base **toutes les fonctionnalités dont vous aurez besoin dans ce projet**.

Pour pouvoir l'utiliser il vous faudra une **clé d'API** gratuite et que vous pouvez créer en suivant les instructions ici : https://rawg.io/apidocs.
1. Créez vous un compte sur rawg.io
2. Une fois connecté, ouvrez le menu en haut à droite (en survolant les "...")
3. Cliquez sur le lien "Get an API key" dans le menu qui s'est affiché
4. Remplissez le formulaire de demande de clé
5. Dans la page de confirmation, vous obtenez immédiatement la clé à utiliser dans chaque appel AJAX que vous ferez vers l'API
6. **Vérifiez que votre clé d'API fonctionne correctement en ouvrant dans votre navigateur la page https://api.rawg.io/api/games?key=xxxxxxxxxxxxxxxxxxxxxx** (_remplacez "xxxxxxxxxxxxxxxxxxxxxx" par votre clé d'API_)

	<img src="images/readme/rawg-games.png" >

> _**NB :** la version gratuite de l'API vous limite à 20 000 requêtes par mois et par clé d'API ce qui vous laisse en principe de la marge si vous ne faites pas de boucles infinies !_ 😬

## C.2. Récupération de la liste des jeux

_**Maintenant que vous avez votre clé d'API, connectons notre appli aux webservices de rawg.io :**_

1. **Supprimez toute trace de nos données en "dur" :**
	- supprimez le fichier `data.js` et son import dans `GameListView.js`
	- toujours dans le `GameListView.js`, commentez le code contenu dans la méthode `renderGameList()` (_certaines choses pourraient vous être utiles pour la suite..._)

	La page "MAGASIN" ne contient en principe maintenant plus de jeux :

	<img src="images/readme/gamelist-vide.png">

2. Dans la méthode `renderGameList()` **lancez un appel AJAX vers l'URL https://api.rawg.io/api/games?key=xxxxxxxxxxxxxxxxxxxxxx** (_n'oubliez pas votre clé d'API_).

	> _**NB2 :** cette méthode `renderGameList() {...}` -[codée lors du précédent TP](https://gitlab.univ-lille.fr/js/tp3/-/blob/master/E-poo-avancee.md#e5-gamelist)- est appelée par la `GameListView` lorsqu'elle est affichée (méthode `show`) et quand l'utilisateur.rice soumet le formulaire de recherche (méthode `handleSearchFormSubmit()`)._
	>
	> _En plaçant notre appel AJAX dans cette méthode `renderGameList()`, la requête AJAX sera du coup déclenchée **à chaque fois que l'utilisateur arrive sur la page "MAGASIN"** mais aussi **à chaque fois qu'il fera une recherche** ! Ce qui permettra plus tard dans le TP d'avoir toujours des données à jour et de passer les critères de recherche à l'API._

3. **Une fois les données reçues, mettez à jour la page HTML avec la liste des jeux reçus**

	> _**Indices :**_
	> 1. _**Souvenez vous que `fetch` est une fonction asynchrone** et retourne une Promesse, pour chaîner des traitements il faut utiliser la méthode `.then`_
	> 2. _**L'API de rawg retourne du texte au format JSON**. Comme vu en cours il y a différents moyens pour parser cette chaîne de caractères et pour récupérer des données exploitables en JS._
	> 3. _**Utilisez l'inspecteur Réseau/Network des devtools de votre navigateur (Chrome/Firefox) pour étudier la structure de la réponse retournée par l'API de rawg :** en cherchant bien vous devrier pouvoir trouver un tableau d'objets littéraux contenant des jeux _
	> 4. _**N'utilisez PAS l'objet `document` dans votre module sans quoi il ne sera pas facilement réutilisable !**_

	<img src="images/readme/gamelist-remplie.png">

	Wow ça y est ! La page s'affiche maintenant avec une liste de jeux fournis par une API distante !! 🤘 🎉 🏆 🎮 🍻

## C.3. Recherche et tri

Alors c'est bien on peut afficher la liste des jeux retournée par défaut par l'API, mais comme on a commenté le code de notre méthode `renderGamelist()` on a "perdu" le code qui permettait de filtrer et de trier les résultats. 😕

En fait ceci est volontaire : notre mécanique de recherche était un peu "basique" puisqu'elle ne permettait de rechercher / trier que parmi les résultats affichés dans la page.

Si on réactive notre mécanique de recherche telle qu'elle, on ne pourra rechercher que parmi les 20 résultats fournis de base par l'API. Dommage quand on sait que la base de données de rawg.io contient plus de 350.000 jeux !!

Par chance, l'API que l'on utilise pour récupérer la liste des jeux autorise l'envoi de paramètres GET permettant de :
- rechercher : paramètre `search=...`
- trier les résultats : paramètre `ordering=...`

> _cf. https://api.rawg.io/docs/#operation/games_list_

à partir de ces informations faites donc en sorte que le moteur de recherche fonctionne à nouveau, par exemple si vous recherchez "red" et que vous triez par note, vous devriez avoir un résultat de ce type :

<img src="images/readme/gamelist-recherche.png">


## C.4. Feedback
TODO

## Étape suivante  <!-- omit in toc -->
Maintenant que l'on est capable de faire communiquer notre appli JS avec un serveur distant, nous allons voir dans le prochain exercice comment envoyer des données au serveur pour qu'il les enregistre en bdd : [C. AJAX : POST & formulaires](C-post.md).