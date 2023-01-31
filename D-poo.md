<img src="images/readme/header-small.jpg" >

# D. POO <!-- omit in toc -->

_**Dans cette partie du TP nous allons faire un peu de POO pour essayer d'améliorer l'organisation de notre code.**_




## Sommaire <!-- omit in toc -->
- [D.1. Notre problème](#d1-notre-problème)
- [D.2. Rappels de syntaxe](#d2-rappels-de-syntaxe)
	- [D.2.1. class \& propriétés publiques](#d21-class-propriétés-publiques)
	- [D.2.2. méthodes](#d22-méthodes)
- [D.3. La classe HelpView](#d3-la-classe-helpview)
- [D.4. Héritage : La classe View](#d4-héritage-la-classe-view)
- [D.5. Propriété et méthodes statiques : la classe Router](#d5-propriété-et-méthodes-statiques-la-classe-router)


## D.1. Notre problème
_**Dans la partie B. du TP qu'on vient de terminer, on a beaucoup amélioré l'organisation de notre code en le répartissant dans différents fichiers, mais quel est le problème ?**_

En fait, le principe des modules est normalement d'avoir **des fichiers JS qui puissent être réutilisables facilement** sur d'autres projets.

Or, dans notre projet ce n'est pas vraiment le cas car plusieurs de nos modules :
- font référence à la variable globale `document` (_pour faire des `document.querySelector`_) et vont donc chercher eux-même les balises n'importe où dans la page.

	C'est un problème car si on importe par exemple notre module `Help.js` (_formulaire de contact/support_) dans un autre projet, et que ce projet contient plusieurs formulaires différents sur la même page en plus du formulaire de contact, on ne peut pas garantir que les 2 lignes suivantes iront bien cibler les bonnes balises, celles du formulaire de contact, et pas celles d'un autre formulaire de la page :
	```js
	// récupération des 2 champs du formulaire
	const subjectInput = document.querySelector('input[name=subject]');
	const bodyTextarea = document.querySelector('textarea[name=body]');
	```
- Par ailleurs, comme vu au précédent chapitre, on a un autre problème : le module `GameList.js` déclenche des traitements dès qu'on l'importe : le seul fait d'importer le module va ajouter -_dès l'import_- plusieurs écouteurs d'événements `addEventListener` sans qu'on le sache.


## D.2. Rappels de syntaxe
### D.2.1. class & propriétés publiques
Comme vu dans le cours (*procurez vous le support pdf !*) ES6 a introduit une nouvelle syntaxe pour la création de classes. Finis les `prototypes`, désormais le mot clé `class` fait son apparition et permet d'utiliser une syntaxe plus proche de ce qui se fait dans les autres langages objets :
```js
class Character {
	constructor(firstName) { // constructeur de la classe
		this.firstName = firstName; // création de propriété
	}
}
const heisenberg = new Character('Walter');
```
La création de propriétés d'instances se fait par l'utilisation du mot clé `this` dans le constructeur : `this.firstName = firstName;` permet de créer une propriété `firstName` sur l'instance en cours de création et de lui assigner la valeur passée au constructeur via l'instruction `new Character('Walter');`.

On peut ensuite accéder aux propriétés de l'objet en utilisant la notation pointée :
```js
console.log( heisenberg.firstName );
```
Il est possible également de déclarer les propriétés d'instance en dehors du constructeur de cette manière :
```js
class Character {
	firstName;
	constructor(firstName) {
		this.firstName = firstName;
	}
}
```
Cette notation a été intégrée tout récemment dans la spec officielle d'ECMAScript (_la spec suivie par JavaScript_) : elle fait partie des fonctionnalités incluses dans ES2022 (ES13) sortie en juin 2022 : cf. https://github.com/tc39/proposals/blob/master/finished-proposals.md et https://github.com/tc39/notes/blob/HEAD/meetings/2021-04/apr-19.md#class-fields-private-methods-and-static-class-features-for-stage-4

Ceci dit, cela fait plusieurs années que Babel permet de l'utiliser !

### D.2.2. méthodes
La création de méthodes d'une classe se fait de la manière suivante :
```js
class Character {
	firstName;
	lastName;
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	fullName(){ // déclaration de méthode
		return `${this.firstName} ${this.lastName}`;
	}
}
```
Pour appeler la méthode, on utilise simplement la notation pointée :
```js
heisenberg.fullName();
```


## D.3. La classe HelpView

## D.4. Héritage : La classe View

## D.5. Propriété et méthodes statiques : la classe Router

## Étape suivante <!-- omit in toc -->
Si vous avez terminé cette partie sur la POO, il est l'heure de mettre en place les modules dans la partie suivante : [C. Les modules](C-modules.md).