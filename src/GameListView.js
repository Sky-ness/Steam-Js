import data from './data.js';

import renderGameThumbnail from './renderGameThumbnail.js';
import View from './View.js';

export default class GameListView extends View {
	searchForm;
	toggleSearchButton;

	constructor(element) {
		super(element);
		// détection du clic sur le bouton "loupe" pour afficher/masquer le form de recherche
		this.toggleSearchButton = this.element.querySelector('.toggleSearchButton');
		this.toggleSearchButton.addEventListener('click', event =>
			this.toggleSearchForm(event)
		);
		// détection de la soumission du formulaire de recherche
		this.searchForm = this.element.querySelector('.searchForm');
		this.searchForm.addEventListener('submit', event =>
			this.handleSearchFormSubmit(event)
		);
	}

	show() {
		super.show();
		// affichage initial de la liste des jeux
		this.renderGameList();
	}

	/**
	 * Méthode d'affichage de la liste des jeux.
	 * Utilisée :
	 * - au chargement de la page pour l'affichage initial
	 * - et à chaque fois qu'on soumet le formulaire de recherche
	 * @param {string} search chaîne de caractère recherchée dans le nom des jeux
	 * @param {string} ordering ordre d'affichage des résultats
	 */
	renderGameList(search = '', ordering) {
		// calcul de la fonction de tri selon le paramètre ordering
		let sortingFunction;
		switch (ordering) {
			case '-metacritic':
				sortingFunction = (a, b) => b.metacritic - a.metacritic;
				break;
			case '-released':
				sortingFunction = (a, b) => b.released.localeCompare(a.released);
				break;
		}
		// parcours du tableau + génération du code HTML de la gameList
		let html = '';
		data
			.filter(game => game.name.toLowerCase().includes(search.toLowerCase())) // recherche
			.sort(sortingFunction) // tri
			.forEach(game => (html += renderGameThumbnail(game))); // génération du HTML
		// maj de la page HTML
		this.element.querySelector('.results').innerHTML = html;
	}
	/**
	 * Fonction qui permet d'afficher ou masquer le formulaire de recherche
	 * @param {Event} event événement déclenché par le bouton sur lequel on a cliqué
	 */
	toggleSearchForm(event) {
		const isOpened = this.searchForm.getAttribute('style') !== 'display: none;';
		if (!isOpened) {
			this.searchForm.setAttribute('style', '');
			this.toggleSearchButton.classList.add('opened');
		} else {
			this.searchForm.setAttribute('style', 'display: none;');
			this.toggleSearchButton.classList.remove('opened');
		}
	}
	/**
	 * Méthode déclenchée quand on soumet le formulaire de recherche.
	 * Met à jour l'affichage des résultats.
	 * @param {Event} event événement déclenché par le formulaire de recherche au submit
	 * @see #renderGameList
	 */
	handleSearchFormSubmit(event) {
		event.preventDefault();
		const searchInput = this.searchForm.querySelector('[name=search]'),
			orderingSelect = this.searchForm.querySelector('[name=ordering]');
		this.renderGameList(searchInput.value, orderingSelect.value);
	}
}
