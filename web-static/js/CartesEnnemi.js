var CartesEnnemi = function(id,parent,jsonData, nombre){
	var self = this;
	
	this.id = id;
	this.parent = parent;
	
	this.root = document.createElement("div");
	this.root.className = "systemeCartesEnnemi";
	this.root.setAttribute("id",this.id);
	this.parent.appendChild(this.root);
	
	this.cartes = new Array();
	
	switch(nombre){
		case "0":
			this.cartes.unshift("carteID_020");
			this.cartes.unshift("carteID_030");
			this.cartes.unshift("carteID_040");
			break;
		case "1":
			this.cartes.unshift("carteID_010");
			this.cartes.unshift("carteID_020");
			this.cartes.unshift("carteID_030");
			this.cartes.unshift("carteID_040");
			break;
		case "2":
			this.cartes.unshift("carteID_020");
			this.cartes.unshift("carteID_030");
			this.cartes.unshift("carteID_060");
			this.cartes.unshift("carteID_110");
			this.cartes.unshift("carteID_120");
			this.cartes.unshift("carteID_130");
			break;
		case "3":
			this.cartes.unshift("carteID_010");
			this.cartes.unshift("carteID_020");
			this.cartes.unshift("carteID_050");
			this.cartes.unshift("carteID_210");
			this.cartes.unshift("carteID_220");
			this.cartes.unshift("carteID_230");
			break;
		default:
			this.cartes.unshift("carteID_000");
			break;
	}
	
	var carteJSON;
	for(var i=1;i<=this.cartes.length;i++){
		carteJSON = jsonData[this.cartes[i-1]];
		this.carteDeck = document.createElement("div");
		this.carteDeck.className = "carteDeckEnnemi";
		// Attributs du système
		this.carteDeck.setAttribute("id","CarteEnnemi"+nombre+i);
		this.carteDeck.setAttribute("jouable","oui");
		// Attributs de la carte
		this.carteDeck.setAttribute("carteID",this.cartes[i-1]);
		this.carteDeck.setAttribute("cType",carteJSON.cType);
		this.carteDeck.setAttribute("level1",carteJSON.level1);
		this.carteDeck.setAttribute("level2",carteJSON.level2);
		this.carteDeck.setAttribute("level3",carteJSON.level3);
		this.carteDeck.setAttribute("dureeAction",carteJSON.dureeAction);
		this.carteDeck.setAttribute("delaiEffet",carteJSON.delaiEffet);

		// Attributs facultatifs ("null" si absent)
		this.carteDeck.setAttribute("coeffPui",carteJSON.coeffPui);
		this.carteDeck.setAttribute("gainPui",carteJSON.gainPui);
		this.carteDeck.setAttribute("nbUtil",carteJSON.nbUtil);
		this.carteDeck.setAttribute("puissance",carteJSON.puissance);
		// Attributs du joueur
		this.carteDeck.setAttribute("positionJoueur",carteJSON.positionJoueur);
		// Changement de la valeur dans le deck => ID de la div dans laquelle se trouve la carte
		this.cartes[i-1] = "CarteEnnemi"+nombre+i;
		this.root.appendChild(this.carteDeck);
	}
	
};