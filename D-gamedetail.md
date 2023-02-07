<img src="images/readme/header-small.jpg" >

# D. GameDetail <!-- omit in toc -->

**Voilà notre application est connectée à une base de données distante à travers une API REST, c'est super.**

**Pour voir si vous avez bien tout assimilé, voyons dans cet exercice si vous êtes capables de développer une page de détail pour les jeux de notre liste !**


## Sommaire <!-- omit in toc -->
- [D.1. Création de GameDetailView](#d1-création-de-gamedetailview)
- [D.2. Lien GameList / GameDetail et modification du Router](#d2-lien-gamelist-gamedetail-et-modification-du-router)
- [D.2. Appel webservice et affichage](#d2-appel-webservice-et-affichage)


## D.1. Création de GameDetailView
code html à injecter dans la page
création classe GameDetailView
## D.2. Lien GameList / GameDetail et modification du Router
ajout route dans main
	- explication besoin de savoir quel jeu afficher : intégration du slug dans l'URL
modification Router
	accès direct sur l'URL
	injection param de l'URL dans view.show
	affichage slug dans detail
modification href renderGameThumbnail
	- récupérer l'info depuis le JSON retourné par le WS
	- remplacer le href de l'image par celui du slug
modification GameList
	- ajout écouteur d'événement clic
		- porter attention à quel moment le faire (dans le show)
			- soit dans le show + querySelectorAll + addEventListener
			- soit dans le constructeur + querySelector + test sur le target
	- récupération href
## D.2. Appel webservice et affichage
code html à générer
