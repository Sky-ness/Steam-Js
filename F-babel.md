<img src="images/readme/header-small.jpg" >

# F. Compiler avec Babel <!-- omit in toc -->

<img src="images/readme/header-babel.jpg" />

_**Jusque là on ne s'est pas préoccupé de la compatibilité navigateur du code que l'on a tapé.**_

En revanche dans la vraie vie, si l'on veut que tous les internautes puissent utiliser notre application sans encombre, **il faut compiler notre code ES6+ en ES5**. Cette compilation se fait avec [Babel](https://babeljs.io).

## Sommaire <!-- omit in toc -->
- [F.1. Installation et configuration](#f1-installation-et-configuration)
- [F.2. Compilation](#f2-compilation)


## F.1. Installation et configuration
L'installation de Babel se fait avec npm (Node Package Manager - l'outil fourni avec Node et qui permet de télécharger des utilitaires JS).

1. **Tout d'abord, ouvrez un nouveau terminal intégré dans VSCodium** (_vous en avez normalement déjà un qui exécute le serveur http `npx serve -l 8000`_).

	Je vous recommande d'utiliser ici [un terminal splitté](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-splitting) pour afficher deux terminaux côte à côte : tapez <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd> puis **`Terminal: split terminal`** ou **cliquez sur l'icône suivante** :

	<img src="images/readme/split-terminal.png" />

	L'avantage du terminal splitté, c'est que vous pouvez garder un oeil sur les deux terminaux en parallèle. Pratique !

2. **Initialisez votre projet npm :** dans le terminal de VSCodium tapez la commande :
	```bash
	npm init
	```
	Répondez alors aux questions qui vous sont posées (_donnez le nom "pizzaland" au projet, vous pouvez ensuite taper <kbd>Entrée</kbd> pour toutes les autres questions_). À la fin du questionnaire vous verrez qu'un fichier `package.json` a été créé. Celui-ci nous sera utile par la suite.

3. **Installez babel :**
	```bash
	npm install --save-dev @babel/core @babel/cli
	```
	Ouvrez le fichier `package.json` dans VSCodium (<kbd>CTRL</kbd>+<kbd>P</kbd>). Vous noterez que les paquets `@babel/core` et `@babel/cli` ont été rajoutés dans les dépendances du projet !

	Vous pourrez aussi remarquer qu'un dossier `node_modules` a également été créé. C'est lui qui contient le code de toutes les dépendances du projet (toutes les librairies js qu'on a installé avec npm).

4. **Installez le preset `env` :**

	Un **preset** est une sorte de dictionnaire qui indique à babel la syntaxe à compiler (_sans preset, Babel n'applique aucune modification au code source_). Le preset `env` permet de transpiler **toutes les features officielle ES6+ en ES5** (c'est une sorte de dictionnaire de traduction ES6+ -> ES5) :
	```bash
	npm install --save-dev @babel/preset-env
	```

5. **Enfin, créez un fichier `.babelrc` à la racine de votre projet** (_au même niveau que le `index.html` et le `package.json`_) pour dire à Babel d'utiliser le preset `env` que l'on vient d'installer :
	```json
	{
		"presets": ["@babel/env"]
	}
	```
	> _**NB :** le nom du fichier à créer est bien **`.babelrc`**. Si vous êtes sous windows vous ne pourrez pas créer ce fichier avec l'explorateur de fichiers (windows vous oblige à choisir un nom de fichier de la forme `nom-du-fichier.extension`) utilisez donc VSCodium pour ça : <kbd>CTRL</kbd>+<kbd>N</kbd> puis <kbd>CTRL</kbd>+<kbd>S</kbd>_

## F.2. Compilation
1. **Vous pouvez maintenant compiler votre code ES6+ en ES5 à l'aide de la commande** :
	```bash
	./node_modules/.bin/babel src -d build
	```

	<img src="images/readme/babel-build.gif" />

	Cette commande va créer un dossier `build` dans lequel sera placé le fichier `main.js` compilé !

	Vérifiez que le fichier `build/main.js` est bien compilé et qu'il ne reste plus de traces de code ES6 (const, let, ...). Si ce n'est pas le cas (s'il reste des `const`, des template strings ou des arrow functions), c'est que le `.babelrc` est mal configuré ou que vous avez raté une étape !

	Enfin, ajoutez le dossier build à votre `.gitignore` (tout fichier qui peut être généré à partir des fichiers déjà présents dans le repo git ne doit pas être versionné) cf. https://git-scm.com/docs/gitignore

2. **Une fois le fichier `build/main.js` créé, modifiez le fichier `index.html` pour charger ce fichier à la place du `src/main.js`.** Rechargez la page pour vérifier que tout fonctionne toujours correctement !


3. **Pour simplifier le travail et éviter d'avoir à compiler manuellement à chaque modification**, vous pourrez utiliser dans les futurs TP, la commande suivante qui va tourner en tâche de fond et recompiler à chaque sauvegarde du fichier js/main.js :
	```bash
	./node_modules/.bin/babel src -d build --verbose --watch --source-maps
	```

## Étape suivante <!-- omit in toc -->
Si tout fonctionne, vous pouvez passer à l'étape suivante : [G. Filtres et tris](./G-filtres-tri.md)