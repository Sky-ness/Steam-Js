<img src="images/readme/header-small.jpg" >

# D. La gestion des formulaires <!-- omit in toc -->

_**Dans cette partie du TP, nous allons travailler sur les formulaires et créer la page d'ajout de pizza (`pizzaForm`)**_

## Sommaire <!-- omit in toc -->
- [D.1. Un peu de théorie](#d1-un-peu-de-théorie)
- [D.2. Préparatifs : La classe `Page`](#d2-préparatifs-la-classe-page)
- [D.3. Le formulaire d'ajout de pizza](#d3-le-formulaire-dajout-de-pizza)
- [D.4. La validation de la saisie](#d4-la-validation-de-la-saisie)

## D.1. Un peu de théorie
_**Comme vu en cours, on utilise généralement l'API DOM avec les formulaires pour 2 choses :**_
1. **Récupérer les valeurs saisies par l'utilisateur** (_et afficher des messages d'erreur par exemple_)
2. **Détecter la soumission du formulaire** (_pour envoyer des données en AJAX à un webservice par exemple_)

En imaginant le formulaire suivant :
```html
<form>
    <input type="text" name="message">
    <input type="submit" value="Valider">
</form>
```
On peut lire la valeur tapée par l'utilisateur dans le champ `"message"` avec la propriété [`.value`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input#value) de l'élément `<input type="text">`, et l'événement [`submit`](https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement/submit_event_) de la balise `<form>` :
```js
const form = document.querySelector('form'), // balise form
	input = form.querySelector('input[name=message]'); // balise <input name="message">

form.addEventListener('submit', event => { // détection de la soumission
	event.preventDefault(); // on empêche la page de se recharger
	console.log('Le formulaire a été soumis avec la valeur :'+input.value);
});
```

## D.2. Préparatifs : La classe `Page`

**Avant que vous ne codiez, il faut qu'on parle !**

**Vous allez coder votre formulaire d'ajout de pizza dans une classe à part, `PizzaForm` (comme on l'a fait pour la `PizzaList`). Et dans cette nouvelle classe il faudra détecter la soumission du formulaire grâce à l'évènement `submit`** (_comme dans l'exemple ci-dessus_).

Or pour le moment, les "pages" de notre application (_comme la `PizzaList`, ou notre future `PizzaForm`_) **ne sont pas capables d'ajouter des écouteurs d'événements** sur le code HTML qu'elles génèrent. \
**Pourquoi ?** Et bien parce que leur méthode `render()` ne fait que retourner une chaîne de caractères et c'est le `Router` qui se charge de l'ajouter dans le DOM. La page n'a donc aucune connaissance ni du DOM, ni du moment à partir duquel le code HTML qu'elle a généré est ajouté à l'écran. 😢

Ce que je vous propose c'est d'ajouter une nouvelle méthode (`mount(element)`) qui va permettre au `Router` d'indiquer à chaque page quelle est la balise HTML (_l'élément du DOM_) dans laquelle elle vient de s'afficher : **de cette manière les pages auront d'un seul coup deux infos : le fait qu'elles viennent d'être affichée à l'écran, et aussi dans quelle balise HTML !**

C'est grâce à ces deux infos que nos pages pourront enfin **ajouter des écouteurs d'événement !**

1. **Pour commencer, créez une classe `src/pages/Page.js` qui servira de base à chaque page de l'application :**
	> _**NB1 :** On aurait pu mettre ça dans la classe `Component` mais ça n'est pas une super idée d'alourdir cette classe avec une méthode qui va servir à quelques instances seulement. Autant en faire une à part._
	```js
	import Component from '../components/Component';

	export default class Page extends Component {
		element;

		constructor(className, children) {
			super('section', { name: 'class', value: className }, children);
		}
		mount(element) {
			this.element = element;
		}
	}
	```
	> _**NB2 :** Comme vous le voyez la classe `Page` ajoute à la classe `Component` :_
	> - _une **propriété `element`**_
  	> - _une **méthode `mount()`** qui se contente de stocker la valeur de `element`_\
	> _C'est cette méthode qui pourra être surchargée par les différentes pages de notre application pour y ajouter des écouteurs d'événements par exemple._

2. **Faites hériter la `PizzaList` de la classe `Page`, et adaptez le constructeur pour respecter le nouveau constructeur parent** (_celui de `Page` désormais_) :

	```js
	import Page from './Page';
	import PizzaThumbnail from '../components/PizzaThumbnail';

	export default class PizzaList extends Page {
		#pizzas;

		constructor(pizzas) {
			super('pizzaList');// on pase juste la classe CSS souhaitée
			this.pizzas = pizzas;
		}
		//.. suite de la classe
	}
	```
3. **Dans le `Router`, juste APRÈS avoir fait le `render()` de la page, appelez la méthode `mount()` en lui envoyant l'élément HTML dans lequel elle vient de s'afficher :**
	```js
	route.page.mount?.(this.contentElement);
	```

	> _**NB :** Vous remarquerez qu'on utilise un **opérateur un peu particulier : `?.`**_
	>
	> _Il s'agit de l'**[optional chaining operator (mdn)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Optional_chaining)** qui permet d'éviter de tester manuellement si ce qui se trouve avant l'opérateur existe. C'est d'ailleurs un concept qui existe dans beaucoup de langages (C#, Python, PHP, Ruby, ...), parfois sous le nom de ["Safe navigation operator" (wikipedia)](https://en.wikipedia.org/wiki/Safe_navigation_operator)._
	>
	> _Cette notation est en fait un raccourci pour écrire :_
	> ```js
	> if (route.page.mount) {
	> 	route.page.mount(this.contentElement)
	> }
	> ```

**Ces modifications faites, nous sommes maintenant prêts à passer à la création du formulaire d'ajout de pizza.**

## D.3. Le formulaire d'ajout de pizza
1. **Créez la classe `PizzaForm`** (dans un module `src/pages/PizzaForm.js`) :
	```js
	import Page from './Page.js';

	export default class PizzaForm extends Page {
		render() {
			return /*html*/ `
				<form class="pizzaForm">
					<label>
						Nom :
						<input type="text" name="name">
					</label>
					<button type="submit">Ajouter</button>
				</form>`;
		}

		mount(element) {
			super.mount(element);
		}

		submit(event) {}
	}
	```

	> _**NB1 :** Vous remarquez qu'ici **la méthode `render()` retourne directement le code HTML sous forme de template string** sans utiliser d'autres `Component`._ \
	> _C'est en effet beaucoup plus simple que d'imbriquer des Component dans des Component dans des Component, comme on a pu le faire dans le précédent TP avec la classe `PizzaThumbnail` par exemple : le but était à l'époque juste de vous faire travailler les notions de composition et d'héritage, maintenant on privilégie la lisibilité du code._

	> _**NB2 :** avant la template string, j'ai mis un commentaire `/*html*/`. Le but est de permettre à l'extension vscode [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) de faire de la **coloration syntaxique du code HTML contenu à l'intérieur de votre chaîne JS** !!_ \
	> _Si ça vous intéresse n'hésitez pas à l'installer (_<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>X</kbd>_)_

2. **Utilisez cette classe pour créer la constante `pizzaForm` dans le `main.js`.** À la place de :
	```js
	const pizzaList = new PizzaList(data),
		aboutPage = new Component('p', null, 'ce site est génial'),
		pizzaForm = new Component('p', null, 'ici vous pourrez ajouter une pizza');
	```
	vous aurez maintenant :
	```js
	const pizzaList = new PizzaList(data),
		aboutPage = new Component('p', null, 'ce site est génial'),
		pizzaForm = new PizzaForm();
	```

	À ce stade, si vous cliquez sur le bouton "Ajouter une pizza" du menu, vous devez voir le formulaire s'afficher :

	<img src="images/readme/pizzaform.png" >

3. **Dans la méthode `mount()` de la classe `PizzaForm`, détectez la soumission du formulaire à l'aide des méthodes `this.element.querySelector()` et `addEventListener`**. Cet écouteur d'événement devra déclencher l'appel à la méthode `submit()` de `PizzaForm`.

	> _**NB :** Souvenez vous de la méthode `event.preventDefault()` et vérifiez que la soumission du formulaire n'entraîne pas un rechargement de page en utilisant l'onglet "Network"/"Réseau" des devtools_

4. Au submit, **affichez dans la console la valeur saisie par l'utilisateur dans l'input "name"**.

	> _**NB :** pour sélectionner un champ de formulaire, en général on s'appuie sur le [sélecteur d'attributs](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) pour sélectionner le champ en fonction de son attribut `name="..."` (comme dans l'exemple vu au chapitre [D.1. Un peu de théorie](#d1-un-peu-de-théorie))._

## D.4. La validation de la saisie
1. **Si le champ "name" est vide, affichez un message d'erreur** à l'aide de la fonction [`alert()`](https://developer.mozilla.org/fr/docs/Web/API/Window/alert)

3. **Si le champ "name" n'est pas vide, affichez une alerte "La pizza xxxxx a été ajoutée"** (où "xxxxx" correspond au nom qu'a saisi l'utilisateur) **et videz le champ de saisie** pour permettre à l'utilisateur de saisir une nouvelle pizza.

	> _**NB :** pour modifier la valeur d'un champ, sachez que la propriété [`.value`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input#value) de l'élément input est accessible aussi en écriture !_

## Étape suivante <!-- omit in toc -->
Pour terminer ce TP, voyons comment améliorer la navigation dans notre application à l'aide de la History API : [E. Navigation avancée](./E-navigation-avancee.md).