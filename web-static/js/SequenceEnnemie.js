var SequenceEnnemie = function(cartes,joueur,ennemi){
	
	// Ici, le joueur EST le NPC
	
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
	this.tempsPosDef = joueur.tempsPosDef;
	joueur.posDef = false;
};

SequenceEnnemie.prototype.update = function(deltaTime){

	//console.log("UPDATE Séquence");
	
	if(!this.carteEnCours && this.cartes.length > 0){
		
		this.carteEnCours = $( "#"+this.cartes.pop() )[0];
		this.tempsCarteEnCours = this.carteEnCours.getAttribute("dureeAction");
		this.delaiEffetCarteEnCours = this.carteEnCours.getAttribute("delaiEffet");
	}
	if(this.carteEnCours){
		
		var xPosDest;
		var positionRequise = this.carteEnCours.getAttribute("positionJoueur");
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
			//console.log(this.tempsCarteEnCours);
			
			if(this.delaiEffetCarteEnCours <= 0 && !this.initEffetCarte){
				this.joueur.MAJEffetCarte(this.carteEnCours,this.ennemi);
				//console.log("Sequence.js : Effet carte !!");
				this.initEffetCarte = true;
			}
			
			if(this.tempsCarteEnCours <= 0){
				//this.reinsertionDeck(this.carteEnCours);
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