<img src="images/readme/header-small.jpg" >

# G. Destructuring, filtres, tri et destructuring <!-- omit in toc -->

_**Pour cette dernière partie du TP, je vous propose d'aborder des sujets que l'on a pas vu en cours mais qui peuvent vous être extrêmement utiles pour les prochains TPs.**_

> _Dans tout les exercices qui suivent, pensez à vérifier que votre code compile bien et que c'est bien le fichier `build/main.js` que vous chargez dans votre `index.html` et pas celui du dossier `src`_

## Sommaire <!-- omit in toc -->
- [G.1. Destructuring](#g1-destructuring)
	- [G.1.1. Principe du destructuring](#g11-principe-du-destructuring)
	- [G.1.2. Destructuring et fonctions](#g12-destructuring-et-fonctions)
	- [G.1.3. Mise en application](#g13-mise-en-application)
- [G.2. Tri de tableau](#g2-tri-de-tableau)
- [G.3. Système de filtres](#g3-système-de-filtres)


## G.1. Destructuring

**Je vous propose d'abord de découvrir une syntaxe qui est l'une des fonctionnalités ES6+ les plus utilisées et qui s'appelle le "destructuring".**

### G.1.1. Principe du destructuring

Le **destructuring**, c'est une syntaxe qui permet de déclarer des variables, dont les valeurs vont être récupérées directement depuis les propriétés d'un objet. Prenons par exemple l'objet `character` ci-dessous :

```js
const character = { firstName: 'Skyler', lastName: 'White', age: 38 };
```

Si l'on veut récupérer son nom, son prénom et son âge, sans le destructuring, on ferait ceci :
```js
const firstName = character.firstName,
	lastName = character.lastName,
	age = character.age;
```
**C'est assez verbeux** : on répète `character` trois fois, `firstName` deux fois, `lastName` et `age` deux fois également.

Et bien, avec le destructuring on va pouvoir faire exactement la même chose mais en plus rapide :
```js
const { firstName, lastName, age } = character;
```

> _Notez les accolades autour du nom des constantes : c'est la syntaxe pour faire du destructuring d'objets._

Pour que ça marche, il faut bien sûr que les constantes qu'on crée (_ici `firstName`, etc._) aient exactement le même nom que les propriétés de l'objet qu'on décompose (_même si un [système d'alias existe](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition#Affecter_avec_un_nom_diff%C3%A9rent)_).

Destructuring ou pas, le résultat, est le même : on crée dans les 2 cas trois constantes, dont les valeurs sont celles des propriétés de l'objet `character`.

> _**NB :** le destructuring fonctionne avec des `const` comme dans les exemples ci-dessus mais bien entendu aussi avec des `let` !_

### G.1.2. Destructuring et fonctions
**Le destructuring est souvent utilisé dans la déclaration de fonctions qui reçoivent des objets en paramètre** (_ce qui est le cas de notre fonction `renderGameThumbnail` d'ailleurs_ 🤔). \
Par exemple, imaginons la fonction suivante :

```js
function kill(character) {
	console.log( `${character.firstName} ${character.lastName} is dead :'(` );
}
```

Le destructuring permet de simplifier l'écriture de la fonction comme ceci :
```js
function kill( {firstName, lastName} ) { // destructuring directement dans les paramètres !
	console.log( `${firstName} ${lastName} is dead :'(` );
}
```

Dans cette nouvelle version, le code est beaucoup moins verbeux, et surtout la fonction est maintenant quasiment **auto-documentée** : rien qu'en lisant la **signature de la fonction**, on sait que le paramètre qu'on doit lui passer est un objet (_grâce aux accolades_) et aussi qu'il doit avoir deux propriétés, firstName et lastName. Pratique !

### G.1.3. Mise en application
La consigne pour cet exercice est simple : **appliquez le destructuring à la fonction renderGameThumbnail !**

Constatez que le code de la fonction est maintenant beaucoup plus léger !

## G.2. Tri de tableau

Revenons maintenant un peu sur les méthodes des tableaux.

A l'aide de la [méthode `.sort()` de la classe Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort), triez les jeux avant leur affichage :

1. **Par ordre alphabétique**

	<img src="images/readme/screenshot-tri-alpha.png" />

2. **Par date de sortie antéchronologique** (_plus récent en premier_)

	<img src="images/readme/screenshot-tri-released.png" />

3. **Par note metacritic décroissante **(_mieux noté en premier_)** et en cas d'égalité par date de sortie chronologique** (_plus ancien en premier_)

	<img src="images/readme/screenshot-tri-metacritic-released.png" />



## G.3. Système de filtres
Pour terminer, à l'aide de la [méthode .filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter), n'affichez que les jeux dont :
1. **la note `metacritic` est supérieure à 93**

	<img src="images/readme/screenshot-filter-metacritic.png" />

2. **l'année de sortie est 2022**

	<img src="images/readme/screenshot-filter-released.png" />

3. **le nom contient deux fois la lettre "u"**

	<img src="images/readme/screenshot-filter-u.png" />


<br/>
<br/>
<br/>

_**Voilà ! C'est terminé, vous avez atteint la fin de ce TP, félicitation !!!**_ \
_**RDV dans quelques jours pour le prochain chapitre !**_ 🥳
