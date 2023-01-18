<img src="images/readme/header-small.jpg" >

# Installations et configuration Linux<!-- omit in toc -->
### (instructions spéciales Université de Lille)<!-- omit in toc -->
- [1. Configuration du proxy](#1-configuration-du-proxy)
- [2. Installation et configuration de Node](#2-installation-et-configuration-de-node)
- [3. Configurer le proxy (_optionnel_)](#3-configurer-le-proxy-optionnel)

## 1. Configuration du proxy
**Les machines des salles de TP sont connectées à internet à travers le proxy de l'Université de Lille.** Pour que les outils qu'on va utiliser soient capables de se connecter à internet, on va utiliser deux **[variables d'environnement](https://fr.wikipedia.org/wiki/Variable_d'environnement)** :

1. **Commencez par ajouter le proxy à votre fichier `~/.bashrc`** -_si ce n'est pas déjà fait_- en y ajoutant les lignes suivantes :
	```bash
	export http_proxy=http://cache.univ-lille.fr:3128
	export https_proxy=http://cache.univ-lille.fr:3128
	```
2. **Une fois le fichier sauvegardé, appliquez les modifications** pour prendre en compte les nouvelles variables d'environnement :
	```bash
	source ~/.bashrc
	```

## 2. Installation et configuration de Node
Les machines des salles TP de l'IUT disposent déjà de Node mais dans une version trop ancienne pour être utilisée dans ce cours.

Vous allez donc avoir besoin d'installer Node vous même, sans droit d'admin, dans votre session : **on va pour cela utiliser [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm).**

1. **Lancez l'install de `nvm`** :
	```bash
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
	```
	puis rechargez les variables d'environnement ajoutées par nvm :
	```bash
	source ~/.bashrc
	```
2. **Téléchargez et installez ensuite la version de Node que l'on souhaite** (_ici la 19_) grâce à nvm :
	```bash
	nvm install 19
	```
	> _**NB :** si la commande `nvm` n'est pas reconnue, tentez de fermer et relancer votre terminal. Si ça ne suffit pas, ajoutez les lignes suivantes à votre `.bashrc` :_
	> ```bash
	> export NVM_DIR="$HOME/.nvm"
	> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
	> [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
	> ```
	> Puis relancez
	> ```bash
	> source ~/.bashrc
	> ```
2. **Vérifiez ensuite que la version de node est correcte** :
	```bash
	node -v
	```
	doit retourner `v19.4.0`

## 3. Configurer le proxy (_optionnel_)
**Cette étape est à priori optionnelle, car par défaut node doit utiliser les variables `http_proxy` et `https_proxy` configurées à l'étape 1.**

Si jamais vous rencontrez des soucis lors de l'utilisation de `npm` ou `npx` dans la suite du TP sachez que vous pouvez forcer l'utilisation du proxy avec la commande suivante :
```bash
npm config set proxy http://cache.univ-lille.fr:3128/
```


## Étape suivante <!-- omit in toc -->
Une fois tout installé, vous pouvez revenir aux préparatifs : [A.2. À propos de ce repo](A-preparatifs.md#a2-à-propos-de-ce-repo)