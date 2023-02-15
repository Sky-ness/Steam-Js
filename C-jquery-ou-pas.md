<img src="images/readme/header-small.jpg" >

# C. jQuery or not jQuery ?<!-- omit in toc -->

_**Maintenant que l'on connaît les fonctions de base de jQuery, voyons ce que ça donne une fois tout le code de l'application converti.**_

## Sommaire <!-- omit in toc -->
- [C.1. Migrer à jQuery](#c1-migrer-à-jquery)
- [C.2. Recoder jQuery ?](#c2-recoder-jquery-)
- [C.3. Conclusion](#c3-conclusion)

## C.1. Migrer à jQuery
**Modifiez le code de l'application pour utiliser jQuery au lieu des méthodes classiques de l'API DOM** : on ne veut plus avoir de `querySelector`, `innerHTML`, `classList.add/remove`, `addEventListener`, etc. mais leurs équivalents jQuery !

Dans nos vues nous avons parfois ce type de code :
```js
this.element.querySelector('.xxxxxxx')
```
Ce code permet de sélectionner une balise contenue à "l'intérieur" de la balise `this.element`.

Pour faire la même chose en jQuery vous avez 2 solutions :

1. **Les objets jQuery disposent d'une méthode [`.find` _(doc)_](https://api.jquery.com/find/)** :

	```js
	const myJqueryElement = $('.xxxxxx');
	const links = myJqueryElement.find('.link');
	```

2. **Une autre solution pour sélectionner des Element à l'intérieur d'un autre Element, c'est de passer un 2e paramètre à la fonction `$()`** : le **["context" _(doc)_](https://api.jquery.com/jQuery/#jQuery-selector-context)**. Ce "context", c'est justement un élément HTML dans lequel jQuery va restreindre sa recherche !

	> _**NB :** comme indiqué dans la doc, cette technique utilise en fait en arrière plan la méthode `find` :_ \
	> "_Selector context is implemented with the .find() method; therefore, $( "li.item-ii" ).find( "li" ) is equivalent to $( "li", "li.item-ii" )._"

	Par exemple, ce code :
	```js
	const footer = document.querySelector('body > footer');
	$('div', footer).html('Breaking Bad');
	```
	Ne va modifier que les `<div>` qui se trouvent dans le footer, les autres ne seront pas impactées !


> _**Astuce :** Quand vous stockez un objet jQuery dans une variable, une convention de nommage couramment employée consiste à **préfixer le nom de la variable avec un `$`** (pour indiquer qu'il s'agit d'un objet jQuery à l'intérieur)._ \
> _Par exemple :_
> ```js
> const $mainMenu = $('.mainMenu');
> ```


## C.2. Recoder jQuery ?

1. Maintenant que toute votre application a été "convertie" à jQuery, pour comprendre **pourquoi certains veulent s'en passer, je vous invite à comparer le poids du bundle de votre application** (`build/app.bundle.js`) avec le poids de celui du TP précédent (_TP4 AJAX_).

	Rendez vous le dossier de votre TP4 et lancez la commande `npm run build` (qui déclenche la compilation webpack en mode "production") pour générer un fichier `app.bundle.js`.

	Faites de même dans votre TP5, et comparez les poids des deux fichiers. \
	**Que constatez vous ?**

2. Maintenant **je vous propose de désinstaller `jQuery` (`npm uninstall jquery`) et de coder votre propre fonction `$()`**. Créez-vous un module à part (par exemple dans `src/lib/jqlite.js`) et codez y la fonction `$()` (_n'oubliez pas de l'exporter !_).

	Cette fonction `$()` devra fonctionner **exactement** comme celle de jQuery, c'est à dire que vous ne devez pas avoir à toucher au reste du code de votre appli (_sauf pour changer les `import` bien sûr_).

	Vous pouvez vous aider de http://youmightnotneedjquery.com/ mais gardez à l'esprit que leurs exemples ne gèrent pas le fait qu'un sélecteur peut correspondre à plusieurs balises et qu'il faut parfois "boucler" sur plusieurs éléments !

	Une fois tout ça terminé, comparez le poids du bundle ainsi généré avec celui de jquery. Avez vous réussi à faire mieux ?

## C.3. Conclusion

**Si vous avez terminé ce TP vous pouvez être fiers de vous 👏 !**\
**Gardez quand même à l'esprit que jQuery gère tout un tas de choses que vous n'avez pas codées :**
- une grande quantité de fonctionnalité qu'on a pas utilisé dans notre projet : les animations, les méthodes show/hide, ajax, etc., etc.
- une multitude de cas limites que vous ne gérez pas dans votre code
- et surtout qu'elle garanti que son code fonctionne sur [énormément de navigateurs](https://jquery.com/browser-support/) (ce qui n'est probablement pas le cas de notre lib "maison" :wink: ).
