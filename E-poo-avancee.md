<img src="images/readme/header-small.jpg" >

# D. POO avancée <!-- omit in toc -->

_**Dans cette partie je vous propose quelques exercices complémentaires pour améliorer notre classe Router.**_

## Sommaire <!-- omit in toc -->
- [E.1. private : Router et menu](#e1-private-router-et-menu)
	- [E.1.1. Syntaxe : les propriétés privées](#e11-syntaxe-les-propriétés-privées)
	- [E.1.2. Mise en oeuvre](#e12-mise-en-oeuvre)
- [E.3. History API](#e3-history-api)
- [E.4. Le deep linking](#e4-le-deep-linking)
- [E.5. GameList](#e5-gamelist)

## E.1. private : Router et menu
**L'objectif ici est de faire en sorte que le Router soit capable, tout seul, d'activer/désactiver les liens du menu en fonction de la route qu'on cherche à afficher.**

On va pour cela s'appuyer sur une propriété privée `#menuElement`.

### E.1.1. Syntaxe : les propriétés privées

Pour déclarer et utiliser des propriétés ou méthodes privées il suffit de les préfixer du caractère `'#'` comme ceci :

```js
class Character {
	firstName;
	#canCook = false; // propriété privée (#)
	constructor(firstName) {
		this.firstName = firstName;
		this.#canCook = (firstName === 'Walter');
	}
}
```

Comme les propriétés publiques, le support des propriétés et méthodes privées a été rajouté tout récemment dans ECMAScript (ES2022/ES13 sortie en juin 2022). Le `preset-env` de Babel permet de les utiliser dans notre code !

Notez qu'il est tout à fait possible de cumuler le `#` (_private_) avec le mot clé `static`

> _**NB :** Si vous vous demandez pourquoi on écrit `#propriete` et pas `private propriete` comme dans d'autres langages, la réponse se trouve ici :_ https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md#why-arent-declarations-private-x

### E.1.2. Mise en oeuvre
Commencez par remplacer la page affichée initialement dans le `main.js` en remplaçant `Router.navigate('/');` par
```js
Router.navigate('/help')
```

On voit bien en faisant ça que le lien du menu "Support" ne se sélectionne pas.

Pour régler ce problème vous allez :
- rajouter une propriété statique privée `menuElement` dans la classe `Router`
- créer une méthode statique `setMenuElement()` dans la classe `Router`
- dans le `main.js` appelez cette nouvelle méthode `Router.setMenuElement()` en lui envoyant `document.querySelector('.mainMenu')`
- à l'intérieur de la méthode `setMenuElement` écoutez le clic sur tous les liens contenus dans `menuElement` de manière à pouvoir supprimer les deux lignes suivantes du `main.js` :

	```js
	const menuLinks = document.querySelectorAll('.mainMenu a');
	menuLinks.forEach(link => link.addEventListener('click', handleMenuLinkClick));
	```

	> _Souvenez-vous des problèmes de scope de `this` avec `addEventListener` vus tout à l'heure et de la technique d'utiliser les arrow functions_
- dans la méthode `navigate` de la classe Router, retirez la classe CSS `active` au lien qui correspond à l'ancienne vue affichée (_s'il y en avait une_) et rajoutez la sur le lien qui correspond à la route demandée.
- nettoyez enfin la fonction `handleMenuLinkClick` des portions de code devenues inutiles

Une fois tout ça fait, si vous rechargez la page, le lien "Support" doit être actif, mais si vous cliquez sur les liens du menu le lien actif doit changer.

À nouveau sur cette exercice, du point de vue de la personne qui visite notre site, rien n'a changé : pas de nouvelle fonctionnalité ! Mais par contre, au niveau du code, on a pu supprimer de notre module `Router.js` toutes les références à l'objet global `document` ce qui permet de faire de notre module `Router.js` un module vraiment réutilisable dans un autre projet !

## E.3. History API

_**Notre SPA commence à ressembler à quelque chose mais souffre encore d'un GROS PROBLÈME par rapport à une application web "classique" (celles avec rechargement de page) : impossible d'utiliser les boutons précédent/suivant du navigateur !**_

Heureusement il existe une API JS qui va nous permettre de résoudre ce problème : **la [History API (mdn)](https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Manipuler_historique_du_navigateur)** .\
Cette API est un ensemble de méthodes de l'objet `window`, disponibles de base, et qui permettent de **manipuler l'URL dans la barre d'adresse du navigateur SANS rechargement de page** !

Quand l'utilisateur change de page (_pour passer de la liste au formulaire par exemple_) on va pouvoir modifier, en JS, l'url courante :

<img src="images/readme/changement-url.gif" />

Ce qui permet ensuite d'utiliser les boutons précédent/suivant du navigateur (_là aussi sans rechargement de page_) :

<img src="images/readme/boutons-prev-next.gif" />

1. **Dans la méthode `Router.navigate()`, appelez [`window.history.pushState()` _(mdn)_](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) pour modifier l'URL de la page.**

	> _**NB :** Si vous lisez la documentation en détail vous verrez qu'au final peu importe la valeur des 2 premiers paramètres de `pushState()` (ils peuvent être `null`), c'est surtout le 3e qui est important._

2. **L'URL change maintenant à chaque fois que vous cliquez sur un lien du menu, mais si vous utilisez les boutons précédent/suivant du navigateur, vous verrez que rien ne se passe.** Il reste en effet à détecter le changement d'URL dans notre code pour **invoquer `Router.navigate()` à chaque fois que l'utilisateur utilise les boutons précédent/suivant**.

	Pour cela nous avons à notre disposition 2 outils :
	- le **callback [`window.onpopstate` _(mdn)_](https://developer.mozilla.org/fr/docs/Web/API/WindowEventHandlers/onpopstate)** qui permet d'appeler une fonction lors de l'utilisation des boutons précédent/suivant du navigateur
	- et la **propriété [`document.location` _(mdn)_](https://developer.mozilla.org/fr/docs/Web/API/Document/location)** qui permet d'obtenir des informations sur l'URL de la page courante

	**Dans `src/main.js`, assignez une fonction (_une arrow function par exemple_) à `window.onpopstate`** et placez-y pour le moment juste un `console.log(document.location)`.

	Rechargez la page, naviguez un peu via le menu et les boutons précédent/suivant et inspectez dans la console ce que contient `document.location`, **vous devriez y trouver quelque chose qui peut vous aider à afficher la bonne page**...

	> _**NB :** faites attention à ne pas invoquer `window.history.pushState()` lors du `onpopstate` sinon cela va "casser" la navigation avec les boutons précédent/suivant en créant une "inception"..._


## E.4. Le deep linking

_**Notre application est presque terminée, à un détail près : l'absence de [deep linking](https://fr.wikipedia.org/wiki/Lien_profond).**_

En effet, si vous vous rendez directement sur http://localhost:8000/help dans votre navigateur (_sans passer par la racine_), le serveur vous retourne une erreur 404 à la place de la page de détail.

<img src="images/readme/404.gif" />

En fait, lorsque vous lancez la requête en entrant cette URL dans la barre d'adresse du navigateur, le serveur http lancé avec `npx serve` cherche par défaut à trouver un fichier `help.html` ou bien un fichier `index.html` dans un sous dossier `/help/`. Autant dire que ça n'a aucune chance de fonctionner comme ça.

Heureusement `webpack dev server` dispose d'une option `historyApiFallback` qui permet de rediriger toutes les 404 vers le `index.html` de la racine : ainsi notre page HTML se chargera correctement et il ne restera plus qu'à déterminer (en JS) quelle page afficher grâce à l'URL courante. Facile !

1. **Stoppez donc webpack (la commande `npm start`) et modifiez le fichier de configuration de webpack en ajoutant dans la clé `devServer` (juste après la ligne `port: 8000,` par exemple ) la ligne suivante :**
	```js
	historyApiFallback: true,
	```
	Relancez le `npm start` puis rechargez la page http://localhost:8000/help : la 404 a disparu est le site s'affiche ! Malheureusement c'est la `GameList` qui s'affiche et pas la page "Support"...

2. **Maintenant que notre site s'affiche quelque soit l'URL de la page, il ne reste donc plus qu'à faire en sorte que l'on affiche la bonne page : c'est à dire celle qui correspond à l'URL demandée par l'utilisateur.**

	Actuellement, au chargement, notre application affiche systématiquement la `gameList` en premier car dans notre `main.js` nous avons le code :
	```js
	Router.navigate('/');
	```
	La solution est simple : il suffit de remplacer cette URL en dur (`'/'`) par l'URL de la page courante.

	Ça tombe bien, dans l'exercice précédent vous avez découvert la propriété qui permet de récupérer l'URL courante de la barre d'adresse. Ne reste plus qu'à envoyer cette valeur au `Router.navigate()` initial et le tour est joué !

_**À partir de maintenant, vous pouvez en principe charger le site depuis n'importe quelle URL ! Youpi. Merci le deep linking !**_

<img src="images/readme/deeplinking.gif" />

## E.5. GameList
**Pour finir ce TP je vous propose de convertir le module GameListView.js en classe.**

Au lieu d'avoir dans le `main.js` :
```js
const gameListView = new View(document.querySelector('.viewContent > .gameList'));
```
On aura :
```js
const gameListView = new GameListView(document.querySelector('.viewContent > .gameList'));
```
Le but étant de ne plus avoir aucune référence à l'objet global `document` dans notre module `GameListView.js` !