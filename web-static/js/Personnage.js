var Personnage = function(assetManager, idPerso, bJoueur){
	var self = this;
	Character.call(this);
	
	// Caractéristiques
	this.PVMAX = 100;
	this.forceMAX = 30;
	this.forceSeuilLevel2 = 10;
	this.forceSeuilLevel3 = 20;
	this.vitesseDep = 400;
	this.tempsPosDef = 0.3;
	this.bJoueur = bJoueur;
	if(bJoueur){
		this.xRecule = 250;
		this.xAvance = 600;
		this.revertDirection = false;
	}else{
		this.xRecule = 774;
		this.xAvance = 424;
		this.revertDirection = true;
	}
	
	// Caractéristiques évolutives
	this.PV = 75;
	this.level = 1;
	this.force = 0;
	this.position = "reculé";
	this.posDef = false;
	
	// Équipement attaque
	this.EqA = "";
	this.NbEqA = 0;
	// Équipement défense
	this.EqD = "";
	this.NbEqD = 0;
	// Équipement soin
	this.EqS = "";
	this.NbEqS = 0;
	
	// Caractéristiques personnage
	this.idP = idPerso;

	this.vignette = "url(/JeuWeb-static/img/Infos/Vignettes/"+this.idP+".png)";
	
	this.createSprite("idle", assetManager.getImage(this.idP+"-idle"), 1150, 1000, 25, 5, 5, true);
	this.createSprite("initSprint", assetManager.getImage(this.idP+"-initSprint"), 460, 200, 2, 2, 1, false);
	this.createSprite("sprint", assetManager.getImage(this.idP+"-sprint"), 690, 400, 6, 3, 2, true);
	this.createSprite("defense", assetManager.getImage(this.idP+"-defense"), 1150, 200, 5, 5, 1, true);
	this.createSprite("hurt", assetManager.getImage(this.idP+"-hurt"), 920, 400, 7, 4, 2, false);
	this.createSprite("death", assetManager.getImage(this.idP+"-death"), 1380, 400, 12, 6, 2, false);
	
	this.createSprite("carteID_000", assetManager.getImage(this.idP+"-carteID_000"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_001", assetManager.getImage(this.idP+"-carteID_001"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_002", assetManager.getImage(this.idP+"-carteID_002"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_100", assetManager.getImage(this.idP+"-carteID_100"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_101", assetManager.getImage(this.idP+"-carteID_101"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_102", assetManager.getImage(this.idP+"-carteID_102"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_200", assetManager.getImage(this.idP+"-carteID_200"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_201", assetManager.getImage(this.idP+"-carteID_201"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_202", assetManager.getImage(this.idP+"-carteID_202"), 920, 400, 8, 4, 2, false);
	
	this.createSprite("carteID_010", assetManager.getImage(this.idP+"-carteID_010"), 920, 400, 8, 4, 2, false);
	this.createSprite("carteID_020", assetManager.getImage(this.idP+"-carteID_020"), 1150, 400, 10, 5, 2, false);
	this.createSprite("carteID_030", assetManager.getImage(this.idP+"-carteID_030"), 1840, 400, 16, 8, 2, false);
	this.createSprite("carteID_040", assetManager.getImage(this.idP+"-carteID_040"), 1610, 400, 13, 7, 2, false);
	this.createSprite("carteID_050", assetManager.getImage(this.idP+"-carteID_050"), 2070, 600, 23, 9, 3, false);
	this.createSprite("carteID_060", assetManager.getImage(this.idP+"-carteID_060"), 2070, 600, 24, 9, 3, false);
	
	this.createSprite("carteID_110", assetManager.getImage(this.idP+"-carteID_110"), 1150, 200, 5, 5, 1, true);
	this.createSprite("carteID_120", assetManager.getImage(this.idP+"-carteID_120"), 1150, 200, 5, 5, 1, true);
	this.createSprite("carteID_130", assetManager.getImage(this.idP+"-carteID_130"), 1150, 200, 5, 5, 1, true);
	this.createSprite("carteID_210", assetManager.getImage(this.idP+"-carteID_210"), 1150, 1000, 25, 5, 5, false);
	this.createSprite("carteID_220", assetManager.getImage(this.idP+"-carteID_220"), 1150, 1000, 25, 5, 5, false);
	this.createSprite("carteID_230", assetManager.getImage(this.idP+"-carteID_230"), 1150, 1000, 25, 5, 5, false);
	this.createSprite("carteID_300", assetManager.getImage(this.idP+"-carteID_300"), 1150, 1000, 25, 5, 5, false);
	this.createSprite("carteID_310", assetManager.getImage(this.idP+"-carteID_310"), 1150, 1000, 25, 5, 5, false);
	
	
	for(var i in this.spriteList){
		this.spriteList[i].setCenter(109,100);
	}
	
	this.setSprite ("idle");

};
Personnage.prototype = new Character();

Personnage.prototype.update = function(deltaTime){
};

Personnage.prototype.MAJEffetCarte = function(carte,ennemi){
	this.posDef = false;
	switch(carte.getAttribute("ctype")){
		case "EqA":
			//console.log("JOUEUR - Equipement attaque");
			this.EqA = carte.getAttribute("id");
			this.NbEqA = carte.getAttribute("nbutil");
			break;
		case "EqD":
			//console.log("JOUEUR - Equipement defense");
			this.EqD = carte.getAttribute("id");
			this.NbEqD = carte.getAttribute("nbutil");
			break;
		case "EqS":
			//console.log("JOUEUR - Equipement soin");
			this.EqS = carte.getAttribute("id");
			this.NbEqS = carte.getAttribute("nbutil");
			break;
		case "ATT":
			//console.log("JOUEUR - Attaque");
			var coeffPui = 1;
			var gainForce = parseInt(carte.getAttribute("gainpui"));
			if(this.EqA != ""){
				coeffPui = parseFloat($("#"+this.EqA)[0].getAttribute("coeffpui"));
				//console.log("coeffpui Équipement : " + coeffPui);
				this.NbEqA -= 1;
				if(this.NbEqA == 0){
					this.EqA = "";
				}
			}
			if(!ennemi.posDef){
				
				var PVEnleve = Math.round((this.force/this.forceMAX) * coeffPui * parseInt(carte.getAttribute("puissance")));
				ennemi.PV -= PVEnleve;
				ennemi.setSprite ("idle");
				ennemi.setSprite ("hurt", ennemi);
				var infoEC = new infoEffetCarte("ATT",PVEnleve.toString(),ennemi);
				//this.MAJeffetCarteTexte("ATT",PVEnleve.toString(),ennemi);
				
				if(ennemi.PV < 0){
					ennemi.PV = 0;
				}
				
				this.force += gainForce;
				if(this.force > this.forceMAX){
					this.force = this.forceMAX;
				}
				var oldLvl = this.level;
				if(this.force >= this.forceSeuilLevel3){
					this.level = 3;
				}else if(this.force >= this.forceSeuilLevel2){
					this.level = 2;
				}else{
					this.level = 1;
				}
				if(oldLvl != this.level){
					var infoEC = new infoEffetCarte("LVU","Level "+this.level,this);
				}
			}
			break;
		case "DEF":
			//console.log("JOUEUR - Defense");
			if(this.EqD != ""){
				this.NbEqD -= 1;
				if(this.NbEqD == 0){
					this.EqD = "";
				}
			}
			this.posDef = true;
			break;
		case "SOI":
			//console.log("JOUEUR - Soin");
			var gainPV = parseInt(carte.getAttribute("puissance"));
			if(this.EqS != ""){
				gainPV *=  parseFloat($( "#"+this.EqS )[0].getAttribute("coeffpui"));
				this.NbEqS -= 1;
				if(this.NbEqS == 0){
					this.EqS = "";
				}
			}
			gainPV = Math.round(gainPV);
			this.PV += gainPV;
			
			var infoEC = new infoEffetCarte("SOI",gainPV.toString(),this);
			
			if(this.PV > this.PVMAX){
				this.PV = this.PVMAX;
			}
			//console.log("PV : "+this.PV+"/"+this.PVMAX);
			break;
		case "PUI":
			//console.log("JOUEUR - Perte puissance");
			if(this.level != 1){
				var infoEC = new infoEffetCarte("LVD","Level 1",this);
			}
			this.level = 1;
			this.force = 0;
			break;
		default:
			break;
	}
}

Personnage.prototype.onAnimationComplete = function(sprite){
	//console.log(this);
	switch (sprite.id){
		case "initSprint":
			this.setSprite ("sprint");
			break;
		default:
			if(this.currentSprite.id != "sprint"){
				this.setSprite ("idle");
			}
			break;
	}
};