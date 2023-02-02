const data = [
	{
		name: 'Mario Kart 8 Deluxe',
		released: '2017-04-27',
		metacritic: 92,
		background_image: 'images/mario-kart-8-deluxe.jpg',
	},
	{
		name: 'God of War Ragnarok',
		released: '2022-11-09',
		metacritic: 94,
		background_image: 'images/god-of-war-ragnarok.jpg',
	},
	{
		name: 'The Last of Us Part 2',
		released: '2020-06-19',
		metacritic: 95, // note modifiée pour E. Formulaire de recherche et tri par note
		background_image: 'images/the-last-of-us-part-2.jpg',
	},
];

/* TP2 / B.2. Modifier des éléments */
// Activation du lien du menu
// const gameListLink = document.querySelector('.mainMenu .gameListLink');
// gameListLink.setAttribute(
// 	'class',
// 	gameListLink.getAttribute('class') + ' active'
// );
// ou
document.querySelector('.mainMenu .gameListLink').classList.add('active');
// Affichage du titre h1
document.querySelector('.viewTitle').innerHTML = '<h1>MAGASIN</h1>';
// Modification du footer
document.querySelector('body > footer > div:nth-of-type(2)').innerHTML +=
	' / CSS inspirée de <a href="https://store.steampowered.com/">steam</a>';
// ou
// document.querySelectorAll('body > footer > div')[1].innerHTML +=
// 	' / CSS inspirée de <a href="https://store.steampowered.com/">steam</a>';

/* TP2 / C.3.4. Afficher la bonne page */
// On affiche la gameList par défaut
document.querySelector('.gameList').classList.add('active');

/* TP2 / C.3. Navigation en JS : le menu */
/**
 * Fonction déclenchée au clic sur les liens du menu
 * Permet de mettre à jour le titre de la page (.viewTitle)
 * et d'afficher la vue correspondante (.viewContent)
 * @param {Event} event
 */
function handleMenuLinkClick(event) {
	event.preventDefault();
	const linkText = event.currentTarget.innerHTML;
	// console.log(linkText);

	/* C.3.2. Modifier le titre */
	document.querySelector('.viewTitle').innerHTML = `<h1>${linkText}</h1>`;

	/* C.3.3. Activer le lien cliqué */
	const previousMenuLink = document.querySelector('.mainMenu a.active'),
		newMenuLink = event.currentTarget;
	previousMenuLink.classList.remove('active'); // on retire la classe "active" du précédent menu
	newMenuLink.classList.add('active'); // on ajoute la classe CSS "active" sur le nouveau lien

	/* C.3.4. Afficher la bonne vue */
	const linkHref = event.currentTarget.getAttribute('href');
	// console.log(linkHref);
	const cssClass = linkHref === '/' ? '.gameList' : linkHref.replace('/', '.');
	const previousView = document.querySelector('.viewContent .active'),
		newView = document.querySelector(`.viewContent ${cssClass}`);
	previousView.classList.remove('active');
	newView.classList.add('active');
}
// on écoute le clic sur tous les liens du menu
const menuLinks = document.querySelectorAll('.mainMenu a');
menuLinks.forEach(link => link.addEventListener('click', handleMenuLinkClick));

/* TP2 / C.2. Afficher/masquer un élément */
const toggleSearchButton = document.querySelector(
	'.gameList .toggleSearchButton'
);
const searchForm = document.querySelector('.gameList .searchForm');
// comme on aura besoin plusieurs fois de ce querySelector searchForm
// (cf. fonction toggleSearchForm) on le stocke dans une constante.
// C'est plus léger au niveau du code et c'est aussi plus performant
// (on ne scanne le document qu'une seule fois)
/**
 * Fonction qui permet d'afficher ou masquer le formulaire de recherche
 * @param {Event} event événement déclenché par le bouton sur lequel on a cliqué
 */
function toggleSearchForm(event) {
	console.log('on a cliqué sur le bouton de recherche');
	const isOpened = searchForm.getAttribute('style') !== 'display: none;';
	if (!isOpened) {
		searchForm.setAttribute('style', '');
		toggleSearchButton.classList.add('opened');
	} else {
		searchForm.setAttribute('style', 'display: none;');
		toggleSearchButton.classList.remove('opened');
	}
}
// Au clic sur le bouton "loupe" on appelle la fonction toggleSearchForm
// NB: on passe une "référence" vers la fonction (son nom) pour qu'elle
// puisse être appelée par le bouton quand on cliquera dessus,
// on ne l'exécute pas nous même c'est à dire qu'on ne met pas `toggleSearchForm()`
toggleSearchButton.addEventListener('click', toggleSearchForm);

/* TP2 / E. Formulaire de recherche */
// Soumission du formulaire de recherche
function handleSearchFormSubmit(event) {
	event.preventDefault();
	const searchInput = searchForm.querySelector('[name=search]'),
		orderingSelect = searchForm.querySelector('[name=ordering]');
	renderGameList(searchInput.value, orderingSelect.value);
}
searchForm.addEventListener('submit', handleSearchFormSubmit);

function renderGameThumbnail({ name, background_image, released, metacritic }) {
	const releasedDate = new Date(released);
	return `<a href="${background_image}">
				<img src="${background_image}" />
				<footer>
					<h3>${name}</h3>
					<div class="infos">
					<time datetime="${released}">${releasedDate.toLocaleDateString()}</time>
					<span class="metacritic">${metacritic}</span>
					</div>
				</footer>
			</a>`;
}

/**
 * Fonction d'affichage de la liste des jeux.
 * Utilisée :
 * - au chargement de la page pour l'affichage initial
 * - et à chaque fois qu'on soumet le formulaire de recherche
 * @param {string} search chaîne de caractère recherchée dans le nom des jeux
 * @param {string} ordering ordre d'affichage des résultats
 */
function renderGameList(search = '', ordering) {
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
		.forEach(name => (html += renderGameThumbnail(name))); // génération du HTML
	// maj de la page HTML
	document.querySelector('.gameList .results').innerHTML = html;
}

// rendu initial de la liste des jeux
renderGameList();

/* TP2 / D.2. Le formulaire de contact */
/**
 * Fonction déclenchée au submit du formulaire de la page "Support"
 * Vérifie si les champs sont correctement renseignés et lance la rédaction
 * d'un email prérempli avec les infos saisies par l'utilisateur.rice
 * @param {*} event
 */
function handleHelpFormSubmit(event) {
	event.preventDefault();
	// récupération des 2 champs du formulaire
	const subjectInput = document.querySelector('input[name=subject]');
	const bodyTextarea = document.querySelector('textarea[name=body]');
	// récupération du texte saisi par l'utilisateur.rice
	const subject = subjectInput.value,
		body = bodyTextarea.value;
	// vérification des champs obligatoires
	if (subject === '') {
		alert('le champ "SUJET" est obligatoire');
		return;
	}
	if (body === '') {
		alert('le champ "VOTRE MESSAGE" est obligatoire');
		return;
	}
	// ouverture du client mail pour rédaction d'un email
	window.location.href = `mailto:help@jsteam.fr?subject=${encodeURIComponent(
		subject
	)}&body=${encodeURIComponent(body)}`;
	// on vide les champs
	subjectInput.value = '';
	bodyTextarea.value = '';
	// on aurait aussi pu faire : form.reset();
}
// on écoute la soumission du formulaire de contact
const helpForm = document.querySelector('.helpForm');
helpForm.addEventListener('submit', handleHelpFormSubmit);

/*
Solution des exercices précédents désormais plus utiles pour le fonctionnement de l'app :
*/

/* TP2 / B.1. Sélectionner des éléments */
// console.log(document.querySelector('body > header img'));
// console.log(document.querySelector('.mainMenu .aboutLink'));
// console.log(document.querySelector('.gameList .metacritic'));
// console.log(document.querySelectorAll('.mainMenu a'));
// console.log(document.querySelectorAll('.gameList time'));

/* TP2 / B.2. Modifier des éléments */
// console.log(document.querySelectorAll('.gameList h3')[2].innerHTML);
// /* ou */
// console.log(document.querySelector('.gameList a:nth-of-type(3) h3').innerHTML);

/* TP2 / C.3.1. Détecter le clic */
// const aboutLink = document.querySelector('.mainMenu .aboutLink');
// aboutLink.addEventListener('click', event => {
// 	event.preventDefault();
// 	console.log('À PROPOS');
// });
// gameListLink.addEventListener('click', event => {
// 	event.preventDefault();
// 	console.log('MAGASIN');
// });
// const helpLink = document.querySelector('.mainMenu .helpLink');
// helpLink.addEventListener('click', event => {
// 	event.preventDefault();
// 	console.log('SUPPORT');
// });
