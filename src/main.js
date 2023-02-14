import AboutView from './AboutView.js';
import GameDetailView from './GameDetailView.js';
import GameListView from './GameListView.js';
import HelpView from './HelpView.js';
import Router from './Router.js';

// Modification du footer
document.querySelector('body > footer > div:nth-of-type(2)').innerHTML +=
	' / CSS inspirée de <a href="https://store.steampowered.com/">steam</a>';

// création des vues de notre application
const helpView = new HelpView(document.querySelector('.viewContent .help'));
const gameListView = new GameListView(
	document.querySelector('.viewContent > .gameList')
);
const aboutView = new AboutView(
	document.querySelector('.viewContent > .about')
);
const gameDetailView = new GameDetailView(
	document.querySelector('.viewContent > .gameDetail')
);

// mise en place du Router
const routes = [
	{ path: '/', view: gameListView, title: 'Magasin' },
	{ path: '/about', view: aboutView, title: 'À propos' },
	{ path: '/help', view: helpView, title: 'Support' },
	{ path: '/detail-*', view: gameDetailView, title: 'Détail jeu' },
];
Router.routes = routes;
// élément dans lequel afficher le <h1> de la vue
Router.titleElement = document.querySelector('.viewTitle');
// gestion des liens du menu (détection du clic et activation/désactivation)
Router.setMenuElement(document.querySelector('.mainMenu'));

// chargement de la vue initiale selon l'URL demandée par l'utilisateur.rice (Deep linking)
Router.navigate(window.location.pathname, true);
// gestion des boutons précédent/suivant du navigateur (History API)
window.onpopstate = () => Router.navigate(document.location.pathname, true);
