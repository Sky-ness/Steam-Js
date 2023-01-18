<img src="images/readme/header-small.jpg" >

# G. Destructuring, filtres, tri et destructuring <!-- omit in toc -->

_**Pour cette dernière partie du TP, je vous propose d'aborder des sujets que l'on a pas vu en cours mais qui peuvent vous être extrêmement utiles pour les prochains TPs.**_

> _Dans tout les exercices qui suivent, pensez à vérifier dans le terminal que votre code compile bien (absence d'erreur de compilation) et que c'est bien le fichier `build/main.js` que vous chargez dans votre `index.html` et pas celui du dossier `src`_

## Sommaire <!-- omit in toc -->
- [G.1. Destructuring](#g1-destructuring)
	- [G.1.1. Principe du destructuring](#g11-principe-du-destructuring)
	- [G.1.2. Destructuring et fonctions](#g12-destructuring-et-fonctions)
- [G.2. Tri de tableau](#g2-tri-de-tableau)
- [G.3. Système de filtres](#g3-système-de-filtres)
- [G.4. Formatage date](#g4-formatage-date)


## G.1. Destructuring

**Je vous propose d'abord de découvrir une syntaxe qui est l'une des fonctionnalités ES6+ les plus utilisées et qui s'appelle le "destructuring".**

### G.1.1. Principe du destructuring

Le [**destructuring** (_mdn_)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), c'est une syntaxe qui permet de déclarer des variables dont les valeurs vont être récupérées à partir des propriétés d'un objet. Prenons par exemple l'objet `character` ci-dessous :

```js
const character = { firstName: 'Skyler', lastName: 'White', age: 38 };
```

Si l'on veut récupérer son nom, son prénom et son âge, sans le destructuring, on ferait ceci :
```js
const firstName = character.firstName,
	lastName = character.lastName,
	age = character.age;
```
**C'est assez verbeux** : on répète `character` 3 fois, `firstName` 2 fois, `lastName` et `age` 2 fois également.

Et bien, avec le destructuring on va pouvoir faire exactement la même chose mais sans toutes ces répétitions :
```js
const { firstName, lastName, age } = character;
```

> _Notez les accolades autour du nom des constantes : c'est la syntaxe pour faire du destructuring d'objets._

Pour que ça marche, il faut bien sûr que les constantes qu'on crée (_ici `firstName`, etc._) aient exactement le même nom que les propriétés de l'objet qu'on décompose (_même si un [système d'alias existe](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition#Affecter_avec_un_nom_diff%C3%A9rent)_).

Dans les 2 situation (avec et sans destructuring) le résultat est le même : on crée au final trois constantes, dont les valeurs sont celles des propriétés de l'objet `character`.

> _**NB :** le destructuring fonctionne avec des `const` comme dans les exemples ci-dessus mais bien entendu aussi avec des `let` !_

_**C'est votre tour maintenant : appliquez le destructuring à l'intérieur de la fonction `renderGameThumbnail` !**_

### G.1.2. Destructuring et fonctions
**Le destructuring est souvent utilisé dans la déclaration de fonctions qui reçoivent des objets en paramètre** (_ce qui est le cas de notre fonction `renderGameThumbnail` d'ailleurs_ 🤔). \
Par exemple, imaginons la fonction suivante :

```js
function kill(character) {
	console.log( `${character.firstName} ${character.lastName} is dead :'(` );
}
```

On peut utiliser le destructuring à l'intérieur de la fonction comme vu au chapitre précédent :
```js
function kill(character) {
	const {firstName, lastName} = character;
	console.log( `${firstName} ${lastName} is dead :'(` );
}
```

C'est pas mal, on a simplifié le `console.log`, mais on peut faire encore mieux ! \
En effet, dans une fonction on peut écrire le destructing **directement dans les paramètres de la fonction** !!! Comme ceci :
```js
function kill( {firstName, lastName} ) { // destructuring directement dans les paramètres !
	console.log( `${firstName} ${lastName} is dead :'(` );
}
```

Dans cette nouvelle version, le code est beaucoup moins verbeux, et surtout la fonction est maintenant quasiment **auto-documentée** : rien qu'en lisant la **signature de la fonction**, on sait que :
1. le paramètre qu'on doit lui passer est un objet (_grâce aux accolades_)
2. et aussi qu'il doit avoir au moins 2 propriétés `firstName` et `lastName`. Dinguerie.

_**C'est votre tour maintenant : appliquez ce principe à la fonction renderGameThumbnail !**_

Constatez que le code de la fonction est maintenant beaucoup plus léger !

## G.2. Tri de tableau

Revenons maintenant un peu sur les méthodes des tableaux.

A l'aide de la [méthode `.sort()` de la classe Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort), triez les jeux avant leur affichage :

1. **Par ordre alphabétique**

	<img src="images/readme/screen-tri-alpha.png" />

2. **Par date de sortie antéchronologique** (_plus récent en premier_)

	<img src="images/readme/screen-tri-released.png" />

3. **Par note metacritic décroissante **(_mieux noté en premier_)** et en cas d'égalité par date de sortie chronologique** (_plus ancien en premier_)

	<img src="images/readme/screen-tri-metacritic-released.png" />

Si vous avez réussi, commentez votre code de tri et passons aux filtres !


## G.3. Système de filtres
Pour terminer, à l'aide de la [méthode .filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter), n'affichez que les jeux dont :
1. **la note `metacritic` est supérieure à 93**

	<img src="images/readme/screen-filter-metacritic.png" />

2. **l'année de sortie est 2022**

	<img src="images/readme/screen-filter-released.png" />

3. **le nom contient deux fois (_et pas plus_) la lettre "a"**

	<img src="images/readme/screen-filter-a.png" />


## G.4. Formatage date

Si vous êtes encore en vie, alors j'ai un dernier truc pour vous : l'affichage des dates de sortie n'est pas terrible puisque au format ISO :

<img src="images/readme/screen-released.png" />

Ce serait tellement mieux si les dates étaient formatées en français !

<img src="images/readme/screen-released-locale.png" />

> _**Indice :** Plutôt que de vous casser la tête avec les méthodes des chaînes de caractères, regardez un peu du côté de la [classe Date (mdn)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), vous verrez elle a des méthodes de localisation qui peuvent être utiles..._

<br/>
<br/>
<br/>

<img src="images/readme/screen-final.png" />

_**Voilà ! C'est terminé, vous avez atteint la fin de ce TP, félicitation !!!**_ \
_**RDV dans quelques jours pour le prochain chapitre !**_ 🥳
