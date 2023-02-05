/**
 * Classe Router qui permet de gérer la navigation dans l'application sans rechargement de page.
 * (Single Page Application)
 */
export default class Router {
	/**
	 * Tableau des routes/vues de l'application.
	 * @example `Router.routes = [{ path: '/help', view: helpView, title: 'Support' }]`
	 */
	static routes = [];
	static currentRoute;

	static titleElement;
	static #menuElement; // propriété statique et privée (#...)

	/**
	 * Setter qui indique au `Router` la balise HTML contenant le menu de navigation.
	 * Écoute le clic sur chaque lien et déclenche la méthode `Router.navigate`.
	 * @param {Element} menuElement
	 * @see Router.handleMenuLinkClick
	 * @see Router.navigate
	 */
	static setMenuElement(menuElement) {
		this.#menuElement = menuElement;
		// on écoute le clic sur tous les liens du menu
		const menuLinks = this.#menuElement.querySelectorAll('a');
		menuLinks.forEach(link =>
			link.addEventListener('click', event => {
				event.preventDefault();
				// on récupère le href du lien cliqué pour déclencher navigate(...)
				const linkHref = event.currentTarget.getAttribute('href');
				Router.navigate(linkHref);
			})
		);
	}
	/**
	 * Affiche la view correspondant à `path` dans le tableau `routes`
	 * @param {String} path URL de la page à afficher
	 * @param {Boolean} skipPushState active/désactive le pushState (gestion des boutons précédent/suivant du navigateur)
	 */
	static navigate(path, skipPushState = false) {
		const route = this.routes.find(route => route.path === path);
		if (route) {
			// on masque la vue précédente
			if (this.currentRoute) {
				this.currentRoute.view.hide();
			}
			this.currentRoute = route;
			// on affiche la nouvelle vue
			route.view.show();
			this.titleElement.innerHTML = `<h1>${route.title}</h1>`;

			// Activation/désactivation des liens du menu
			const previousMenuLink = this.#menuElement.querySelector('a.active'),
				newMenuLink = this.#menuElement.querySelector(`a[href="${path}"]`);
			previousMenuLink?.classList.remove('active'); // on retire la classe "active" du précédent menu
			newMenuLink?.classList.add('active'); // on ajoute la classe CSS "active" sur le nouveau lien
			// NB: on utilise ici le optional chaining operator `?.` : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
			// cet opérateur permet d'éviter d'avoir à tester si la constante `previousMenuLink` n'est pas nulle
			// et donc d'éviter d'avoir à faire un `if` comme ceci :
			// if (previousMenuLink) {
			// 	previousMenuLink.classList.remove('active');
			// }

			// History API : ajout d'une entrée dans l'historique du navigateur
			// pour pouvoir utiliser les boutons précédent/suivant
			if (!skipPushState) {
				window.history.pushState(null, null, path);
			}
		}
	}
}
