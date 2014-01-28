var Sequence = function(cartes,joueur,sysCartes,ennemi){
	
	var self = this;
	this.cartes = cartes;
	this.joueur = joueur;
	this.ennemi = ennemi;
	this.carteEnCours;
	this.tempsCarteEnCours;
	this.delaiEffetCarteEnCours;
	this.terminee = false;
	this.initSprint = false;
	this.initAction = false;
	this.initEffetCarte = false;
	this.tempsPosDef = this.joueur.tempsPosDef;
	this.joueur.posDef = false;
	this.sysCartes = sysCartes;
	
	//console.log(cartes); => ordre inverse => utiliser pop() pour retirer les cartes
};

Sequence.prototype.update = function(deltaTime){

	//console.log("UPDATE Séquence");
	
	// S'il n'y a aucune carte en cours et que le tableau des cartes de la séquence n'est pas vide
	if(!this.carteEnCours && this.cartes.length > 0){
		this.carteEnCours = $( "#"+this.cartes.pop() )[0];
		//console.log(this.carteEnCours);
		this.tempsCarteEnCours = this.carteEnCours.getAttribute("dureeAction");
		this.delaiEffetCarteEnCours = this.carteEnCours.getAttribute("delaiEffet");
	}
	// Si une carte est en cours de traitement
	if(this.carteEnCours){
		
		var xPosDest;
		var positionRequise = this.carteEnCours.getAttribute("positionJoueur");
		// Si le personnage n'est pas dans la position requise par la carte, déplacement du personnage
		if(this.joueur.position != positionRequise && positionRequise != ""){
			if(!this.initSprint){
				this.joueur.setSprite ("initSprint",this.joueur);
				this.initSprint = true;
			}
			if(positionRequise == "avancé"){
				xPosDest = this.joueur.xAvance;	
			}else{
				xPosDest = this.joueur.xRecule;
				this.joueur.revertDirection = this.joueur.bJoueur;
			}
			dep = this.joueur.vitesseDep * deltaTime;
			xPosJoueur = this.joueur.x;
			xDiffPos = xPosDest - xPosJoueur;
			if(xDiffPos != 0){
				if(xDiffPos < 0){
					dep *= -1;
				}
				if((xDiffPos > 0 && xDiffPos < dep) || (xDiffPos < 0 && xDiffPos > dep)){
					dep = xDiffPos;
				}
				this.joueur.setPosition(xPosJoueur+dep,this.joueur.y);
			}else{
				this.joueur.position = positionRequise;
				this.joueur.setSprite ("idle");
				this.joueur.revertDirection = !this.joueur.bJoueur;
				this.initSprint = false;
			}
		// La carte est une carte de défense
		}else if(this.carteEnCours.getAttribute("ctype") == "DEF" && this.joueur.posDef == false){
			if(this.tempsPosDef > 0){
				this.joueur.setSprite("defense");
				this.tempsPosDef -= deltaTime;
			}else{
				this.joueur.posDef = true;
			}
		// La carte peut être utilisée
		}else{
			if(!this.initAction){
				this.joueur.setSprite(this.carteEnCours.getAttribute("carteid"),this.joueur);
				this.initAction = true;
			}
			this.tempsCarteEnCours -= deltaTime;
			this.delaiEffetCarteEnCours -= deltaTime;
			
			// Application de l'effet de la carte
			if(this.delaiEffetCarteEnCours <= 0 && !this.initEffetCarte){
				this.joueur.MAJEffetCarte(this.carteEnCours,this.ennemi);
				//console.log("Sequence.js : Effet carte !!");
				this.initEffetCarte = true;
			}
			// Si le temps d'utilisation de la carte est dépassé
			if(this.tempsCarteEnCours <= 0){
				// Si le personnage est contrôlé par le joueur, réinsertion de la carte jouée dans son deck
				if(this.joueur.bJoueur){
					this.reinsertionDeck(this.carteEnCours);
				}
				this.carteEnCours = null;
				//console.log("Sequence.js : temps carte écoulé - carte suivante !!");
				this.initAction = false;
				this.initEffetCarte = false;
			}
		
		
		}
		
	// Fin de la séquence
	}else{
		if(this.ennemi.PV == 0){
			this.ennemi.setSprite("death");
		}
		// SI le personnage n'est pas en position "reculé" (position au repos), déplacement du personnage
		if(this.joueur.position != "reculé"){
			this.joueur.revertDirection = this.joueur.bJoueur;
			if(!this.initSprint){
				this.joueur.setSprite ("initSprint",this.joueur);
				this.initSprint = true;
			}
			xPosDest = this.joueur.xRecule;
			dep = this.joueur.vitesseDep * deltaTime;
			xPosJoueur = this.joueur.x;
			xDiffPos = xPosDest - xPosJoueur;
			if(xDiffPos != 0){
				if(xDiffPos < 0){
					dep *= -1;
				}
				if((xDiffPos > 0 && xDiffPos < dep) || (xDiffPos < 0 && xDiffPos > dep)){
					dep = xDiffPos;
				}
				this.joueur.setPosition(xPosJoueur+dep,this.joueur.y);
			}else{
				this.joueur.position = "reculé";
				this.joueur.setSprite ("idle");
				this.joueur.revertDirection = !this.joueur.bJoueur;
				this.initSprint = false;
			}
		}
		if(this.joueur.position == "reculé"){
			this.terminee = true;
		}
	}
}

Sequence.prototype.reinsertionDeck = function(carte){
	var insertIdx = Math.ceil(Math.pow(Math.random() * Math.pow(this.sysCartes.deck.nbCartes,3), 1/3));
	this.sysCartes.deck.cartes.splice(insertIdx,0,carte.id);
	this.sysCartes.deck.nbCartes += 1;
	$( "#"+carte.id )[0].className = "carteDeck";
}