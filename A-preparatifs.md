<img src="images/readme/header-small.jpg" >

# A. Préparatifs <!-- omit in toc -->

## Sommaire <!-- omit in toc -->
- [A.1. Récupération du projet](#a1-récupération-du-projet)
- [A.2. Lancement de l'application](#a2-lancement-de-lapplication)
- [A.3. Solution du TP2](#a3-solution-du-tp2)

## A.1. Récupération du projet

**Ce repo contient une solution commentée du précédent TP.** <br>
Il va vous servir de base pour ce nouveau TP.

1. **Commencez par faire un fork du TP en vous rendant directement sur https://gitlab.univ-lille.fr/js/tp3/-/forks/new**

	Pour le `namespace` choisissez de placer le fork dans votre profil utilisateur.\
	Pour `Visibility Level` sélectionnez le **mode "private"**

	> _**NB :** Comme ce nouveau TP est lui-même un fork du TP précédent, vous êtes obligé.e de passer par le lien que j'ai fourni ci-dessus, le bouton "Fork"/"Créer une divergence" ne fonctionnera pas dans ce cas et vous redirigera bêtement sur votre propre fork du précédent TP._

2. **Ajoutez-votre encadrant de TP en tant que "reporter" pour qu'il ait accès à votre code :**
	- dans le menu de gauche, cliquez sur **`Project information`** > **`Members`**
	- cliquez sur le bouton en haut à droite **`"Invite members"`**
	- entrez comme **nom d'utilisateur** celui de votre encadrant de TP (`@patricia.everaere-caillier` ou `@thomas.fritsch`)
	- ... et `"reporter"` comme **rôle**.

3. **Ouvrez ensuite un terminal et récupérez les fichiers de ce TP grâce à Git en clonant votre fork dans un dossier de votre choix** (_dans mon exemple ~/tps-js_) :
	```bash
	mkdir ~/tps-js
	git clone https://gitlab.univ-lille.fr/<votre-username>/tp3.git ~/tps-js/tp3
	```

	> _**NB1 :** si ce n'est pas déjà fait, il faut que vous renseigniez un mot de passe dans votre compte gitlab ([`Preferences` > `Password`](https://gitlab.univ-lille.fr/-/profile/password/edit)) pour pouvoir cloner en http_

	> _**NB2 :** ici je clone dans mon dossier `/home/thomas/tps-js/tp3`. **Si vous êtes sous windows faites attention au sens des slashs et au caractère `"~"`** qui représente le dossier de l'utilisateur sur système unix : utilisez **Git bash** (qui comprend cette syntaxe) ou si vous tenez vraiment à utiliser **cmd** ou **powershell** pensez à adapter la commande !_

	> _**NB3 :** si vous préférez **cloner en SSH** pour ne pas avoir à taper votre mot de passe à chaque fois que vous clonerez un TP, renseignez votre clé SSH dans votre [compte utilisateur gitlab](https://gitlab.univ-lille.fr/-/profile/keys) et clonez à partir de cette URL : `git@gitlab-ssh.univ-lille.fr:votre-username/tp3.git`_


4. **Ouvrez le projet dans VSCodium/VSCode** (pour les différentes façon d'ouvrir le projet relisez les [instructions du TP1](https://gitlab.univ-lille.fr/js/tp1/-/blob/main/A-preparatifs.md#a5-ouvrir-le-projet-dans-vscodium) )
	```bash
	codium ~/tps-js/tp3
	```

5. **Installez les paquets npm nécessaires au projet** notamment le compilateur [Babel](https://babeljs.io).<br>
	Ouvrez un terminal intégré à VSCodium (<kbd>CTRL</kbd>+<kbd>J</kbd> *(PC)* / <kbd>CMD</kbd>+<kbd>J</kbd> *(Mac)*) et tapez juste :
	```bash
	npm install
	```

	> _**NB :** Vous noterez qu'on ne précise pas les paquets à installer comme on l'avait fait dans le précédent TP (`npm install @babel/core`, `@babel/cli`, etc.). npm va en effet tous les récupérer **automatiquement** en parcourant le fichier `package.json` et plus particulièrement les sections `"dependencies"` et `"devDependencies"` qui indiquent quels sont les paquets qui ont été installés précédemment._
	>
	> **Magique !** 🙌

## A.2. Lancement de l'application

Comme dans le précédent TP lancez un serveur HTTP et la compilation du projet **dans deux terminaux côte à côte** ([terminaux splittés](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-splitting)) :

1. **Lancez un serveur http** dans un terminal intégré de VSCodium (<kbd>CTRL</kbd>+<kbd>J</kbd> *(PC)* / <kbd>CMD</kbd>+<kbd>J</kbd> *(Mac)*) :
	```bash
	npx serve -l 8000
	```

2. **Lancez la compilation de votre projet** dans un **deuxième** [terminal splitté](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-splitting) (*le `watch` et `npx serve` doivent tourner en parallèle*) :
	```bash
	npm run watch
	```

3. **Vérifiez dans le navigateur que la page `index.html` s'affiche correctement** en ouvrant l'url http://localhost:8000.

	Le résultat attendu est le suivant :

	<img src="images/readme/screen-00.png" >

	> _**NB : Si la page ne s'affiche pas correctement**, vérifiez que vous avez bien lancé le serveur http dans le dossier du projet, c'est à dire celui où se trouve le fichier `index.html`. Puis vérifiez dans la `Console` ou dans l'onglet `Sources` (Chrome) ou `Debugger` (Firefox) qu'l n'y a pas d'erreur JS lorsque la page se charge._

## A.3. Solution du TP2

**Avant de vous lancer dans ce TP, prenez 5 à 10 minutes pour lire le code contenu dans le fichier `main.js`** et comparez le avec votre code du précédent TP.

**C'est important de bien comprendre le code qui vous est fourni car vous allez avoir à le modifier dans ce TP** : si des points ne sont pas clairs interrogez votre encadrant.e de TP !

**Attention : si vous n'aviez pas eu le temps de terminer le TP2**, portez une attention toute particulière à la fonction `renderGameList` en toute fin du fichier `main.js` ([l.132-160](https://gitlab.univ-lille.fr/js/tp3/-/blob/main/src/main.js#L132-160)): c'est cette fonction qui est appelée au chargement du site ([l.163](https://gitlab.univ-lille.fr/js/tp3/-/blob/main/src/main.js#L163)) mais aussi lorsque l'utilisateur.rice soumet le formulaire de recherche ([l.114](https://gitlab.univ-lille.fr/js/tp3/-/blob/main/src/main.js#L114)).

## Étape suivante <!-- omit in toc -->
Maintenant que votre code compile, vous pouvez passer à l'étape suivante : [B. Les bases de l'API DOM](B-les-bases.md)