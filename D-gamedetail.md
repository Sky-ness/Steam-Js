<img src="images/readme/header-small.jpg" >

# D. GameDetail <!-- omit in toc -->

**Voilà notre application est connectée à une base de données distante à travers une API REST, c'est super.**

**Pour voir si vous avez bien tout assimilé, voyons dans cet exercice si vous êtes capables de développer une page de détail pour les jeux de notre liste !**

Le principe est simple : faire en sorte que quand on clique sur une vignette de jeu dans la liste, on soit redirigé vers une page de détail du jeu qu'on a choisi, avec des informations supplémentaires (_screenshots, plateformes supportées, description, etc._).


## Sommaire <!-- omit in toc -->
- [D.1. Création de GameDetailView](#d1-création-de-gamedetailview)
- [D.2. Récupération du jeu à afficher](#d2-récupération-du-jeu-à-afficher)
- [D.3. Appel webservice et affichage](#d3-appel-webservice-et-affichage)
- [D.4. Lien GameList / GameDetail et modification du Router](#d4-lien-gamelist-gamedetail-et-modification-du-router)
- [D.5. Screenshots](#d5-screenshots)


> _Pour cet exercice vous pouvez choisir de faire tout.e seul.e comme un.e grand.e ou bien suivre les instructions ci-dessous._
>
> _À vous de choisir !_

## D.1. Création de GameDetailView
Pour commencer cet exercice, regardez un peu le code HTML contenu dans le fichier `index.html` : on a ligne 56 une balise "gameDetail" :
```html
<article class="gameDetail">Contenu de la vue "Détail"</article>
```

Cette balise est contenue dans la balise `<div class="viewContent activeOnly">`, à côté des autres balises qui contiennent les différentes vues de notre application (_`gameList`, `help`, `about`_).

La première étape que je vous propose est donc de faire en sorte qu'on soit capables d'afficher cette balise "gameDetail" :

1. Créez une classe `GameDetailView` qui hérite de la classe `View` dans un module `src/GameDetail.js`.

	> _pour le moment on n'a pas de comportement particulier à ajouter à cette classe, faites la juste étendre de `View`._
2. Dans le fichier `main.js` créez une instance de cette classe `GameDetailView` nommée `gameDetailView` (_avec un "g" minuscule_) et passez en paramètre du constructeur la balise `<article class="gameDetail">`
3. Pour afficher cette vue, il faut dire au Router quelle URL lui correspond. Cela se fait en modifiant le tableau `routes` qui ressemble actuellement à ceci :

	```js
	const routes = [
		{ path: '/', view: gameListView, title: 'Magasin' },
		{ path: '/about', view: aboutView, title: 'À propos' },
		{ path: '/help', view: helpView, title: 'Support' },
	];
	```

	Ajoutez donc une nouvelle `route` (_un nouvel objet littéral_) dans le tableau `routes` avec :
	- dans le paramètre `view` votre instance `gameListView`.
	- dans la propriété `title` ce que vous voulez (_par exemple `'Détail jeu'`_)
	- dans la propriété `path` mettons pour le moment une adresse temporaire pour nous permettre de tester notre page : `/detail`

		> _on dit "temporaire" car à un moment donné il faudra bien dire à faire figurer dans l'adresse l'id du jeu que la page de détail doit afficher_
		>
		> _Pour le moment on essaie déjà d'afficher la page, on verra par la suite comment faire ça_
4. Maintenant que la route est créée, rendez vous sur l'adresse http://localhost:8000/detail normalement la balise `<article class="gameDetail">` doit s'afficher  :

	<img src="images/readme/detail-init.png" />

## D.2. Récupération du jeu à afficher

Notre GameDetailView s'affiche mais elle est pour le moment incapable de savoir quel jeu charger.

Pour lui indiquer le jeu à récupérer depuis l'API on va passer dans l'URL de la page un [`slug` _(wikipedia)_](https://fr.wikipedia.org/wiki/Slug_(journalisme)#En_informatique). Chaque jeu de l'API de rawg dispose d'un slug unique, si vous inspectez la réponse du webservice https://api.rawg.io/api/games?key=votre-cle-d-api vous verrez qu'on a bien pour chaque jeu une propriété `slug` :

<img src="images/readme/detail-api-slug.png" />

On va donc maintenant essayer de faire en sorte que lorsque l'on va sur http://localhost:8000/detail-mario-kart-8-deluxe ou sur http://localhost:8000/detail-red-dead-redemption :
- le Router soit capable de savoir que c'est la route qui correspond à `GameDetailView` qu'il doit afficher
- le Router envoie à la `GameDetailView` la partie de l'URL qui se trouve **après** les caractères `"detail-"` (_par exemple en paramètre de l'appel à la méthode `show`_)

Il y a plein de techniques pour faire ça, mais vous pouvez par exemple :
1. Remplacer le `path` de votre route `/detail` par `/detail-*`
2. Dans la méthode `Router.navigate()`, au moment où le `Router` parcourt toutes les routes pour trouver celle qui correspond à l'URL demandée (`const route = this.routes.find(...)`), tester si le `path` de la route termine par une `*` et si l'URL demandée (_dans notre exemple `/detail-mario-kart-8-deluxe`_) **commence** par la même chose que ce qui se trouve avant l'`*` dans la route.

	Exemple :
	- si la `route.path` est `/detail-*` on prend tout ce qui se trouve "avant" le `*` donc `/detail-`
	- on vérifie si l'URL demandée (`path`) commence par `/detail-`. Dans le cas de  `/detail-mario-kart-8-deluxe` c'est bien le cas, c'est donc cette route là qui est la bonne et que doit retourner le `this.routes.find`

	Essayez de charger la page http://localhost:8000/detail-mario-kart-8-deluxe, si tout va bien c'est la page Détail qui doit s'afficher. Idem si vous vous rendez sur http://localhost:8000/detail-red-dead-redemption

	<img src="images/readme/detail-init.png" />

3. le Router doit envoyer à la vue le reste de l'URL (ce qui correspond au caractère `*` dans l'URL courante), ici ce sera tout ce qui se trouve après `/detail-` soit `mario-kart-8-deluxe`
4. Dans la `GameDetailView` récupérez cette information dans la méthode `show` (_pensez que c'est un override et qu'il faut donc faire appel à `super.show()`_) et affichez la dans la page, par exemple avec une instruction `this.element.innerHTML = ...`

	<img src="images/readme/detail-slug.png" />

## D.3. Appel webservice et affichage
A partir de maintenant le plus dur est fait !

Notre classe GameDetail connaît le slug du jeu à afficher, elle va dont pouvoir interroger l'API REST pour avoir tous les détails du jeu :

1. En vous inspirant de l'appel AJAX qu'on a fait dans la `GameListView`, appelez le webservice https://api.rawg.io/api/games/&lt;slug&gt;?key=xxxxxxxxxxx (_cf. https://api.rawg.io/docs/#operation/games_read_)

2. Une fois la réponse du webservice reçue, affichez le nom du jeu dans la page (_toujours dans `this.element`_) :

	<img src="images/readme/detail-name.png" />

3. Maintenant que vous avez récupéré le contenu du jeu, affichez des informations supplémentaires dans la page, par exemple :
	- note metacritic / date de parution
	- plateformes supportées (parent_platform)
	- genres
	- site web officiel
	- description
	- image de fond

	Si vous voulez un exemple de code HTML qui fonctionne avec les styles CSS qui vous sont fournis, en voici un (_notez que les genres et les plateformes sont des listes_):

	```html
	<div class="backgroundImage">
		<img src="images/mario-kart-8-deluxe.jpg" />
	</div>
	<header>
		<div class="breadcrumb">
			<a href="/">Tous les jeux</a>
			&gt;
			<a href="#" class="currentGameLink">Mario Kart 8 Deluxe</a>
		</div>
		<h2>
			<span class="name">Mario Kart 8 Deluxe</span>
			<span class="metacritic">92</span>
		</h2>
	</header>
	<section class="content">
		<div class="screenshots"></div>
		<div class="infos">
			<p class="label">Genres :</p>
			<ul class="genres">
				<li>Racing</li>
			</ul>
			<p class="label">Date de parution :</p>
			<time datetime="2017-04-27">27/04/2017</time>
			<p class="label">Plateformes :</p>
			<ul class="platforms">
				<li>
					<img src="images/platforms/nintendo.svg" />
				</li>
			</ul>
			<p class="label">Site officiel :</p>
			<a class="website" href="http://mariokart8.nintendo.com/">http://mariokart8.nintendo.com/</a>
		</div>
	</section>
	<section class="description">
		Hit the road with the definitive version of Mario Kart 8 and play anytime,
		anywhere! Race your friends or battle them in a revised battle mode on new and
		returning battle courses...
	</section>
	```

Le rendu devrait ressembler à ceci :
<img src="images/readme/detail-html.png" />

## D.4. Lien GameList / GameDetail et modification du Router

- modification href renderGameThumbnail
	- récupérer l'info depuis le JSON retourné par le WS
	- remplacer le href de l'image par celui du slug
- modification GameList
	- ajout écouteur d'événement clic
		- porter attention à quel moment le faire (dans le show)
			- soit dans le show + querySelectorAll + addEventListener
			- soit dans le constructeur + querySelector + test sur le target
	- récupération href

<img src="images/readme/detail-nav.png" />


## D.5. Screenshots
https://api.rawg.io/docs/#operation/games_screenshots_list

```html
<a href="..."><img src="..." /></a>
```

<img src="images/readme/detail-screenshots.png" />