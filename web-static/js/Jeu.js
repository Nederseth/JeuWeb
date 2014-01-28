var Jeu = function(jsonData){
	
	var self = this;
	var sleep = 1;
	this.localTime = 0;
	this.globalTime = 0;
	
	this.loadEndTime;
	
	this.sequencesJeu = new Array();
	this.cartesJeuInscrites = false;
	this.cartesDefausseInscrites = false;
	
	this.infoEffetCartes = new Array();
	
	//this.sequenceEnCours = false;
	this.sequenceEnCours;
	this.sequenceID;
	this.previousNow = Date.now();
	
	// Création du Deck
	var initCartes = new Array();
	
	// ID des personnages des joueurs
	this.IDP = new Array();
	this.IDP[0] = "P1"; // Joueur
	this.IDP[1] = "P2"; // Adversaire
	
	for(var i in this.IDPersonnages){
		console.log(i + " - " + this.IDPersonnages[i]);
	}
	
	/*for(i=1;i<=5;i++){
		initCartes.push("carteID_200");
		initCartes.push("carteID_300");
		initCartes.push("carteID_210");
	}*/
	
	initCartes.push("carteID_000");
	initCartes.push("carteID_100");
	initCartes.push("carteID_200");
	initCartes.push("carteID_310");
	for(i=1;i<=7;i++){
		initCartes.push("carteID_010");
		initCartes.push("carteID_020");
		initCartes.push("carteID_030");
	}
	for(i=1;i<=5;i++){
		initCartes.push("carteID_040");
		initCartes.push("carteID_300");
	}
	for(i=1;i<=4;i++){
		initCartes.push("carteID_050");
	}
	for(i=1;i<=2;i++){
		initCartes.push("carteID_060");
		initCartes.push("carteID_110");
		initCartes.push("carteID_120");
		initCartes.push("carteID_130");
	}
	initCartes.push("carteID_210");
	initCartes.push("carteID_210");
	initCartes.push("carteID_210");
	initCartes.push("carteID_220");
	initCartes.push("carteID_220");
	initCartes.push("carteID_230");
	
	//Stratégie 1-4F-S 
	/*for(i=1;i<=13;i++){
		initCartes.push("carteID_010");
		initCartes.push("carteID_040");
		initCartes.push("carteID_300");
	}*/
	
	
	//Stratégie "classique"
	/*initCartes.push("carteID_000");
	for(i=1;i<=7;i++){
		initCartes.push("carteID_010");
		initCartes.push("carteID_020");
		initCartes.push("carteID_030");
		initCartes.push("carteID_040");
		initCartes.push("carteID_300");
	}
	for(i=1;i<=4;i++){
		initCartes.push("carteID_050");
	}
	for(i=1;i<=2;i++){
		initCartes.push("carteID_060");
	}*/

	/*$("#gui").append($("<div>").button().css({position: "absolute", top:"5px", left:"5px"}).append("Menu").click(function(){
		$(IntCartes.root).toggle('fade', 200);
	}));
	$(IntCartes.root).hide();*/
	
	
	this.canvas = $(".scene-view")[0];
	this.graphics = this.canvas.getContext("2d");
	
	this.graphics.fillStyle = "rgba(255,0,0,0.5)";
	this.graphics.fillRect(0,0, this.canvas.width, this.canvas.height);
	
	this.graphics.strokeStyle = "blue";
	this.graphics.strokeRect(this.canvas.width/2 -50, this.canvas.height/2 -50,100,100);

	var sleep = 0;
	var baseURL = "/JeuWeb-static/img/getImage.php?url=";
	var imageList = {
		"fond": baseURL + "Scene/fondPlaine.jpg&sleep=" + sleep
	}

	for(var i in this.IDP){
		var p = this.IDP[i];
		imageList[p+"-idle"] = baseURL + "Scene/Personnages/"+p+"_idle_v2.png&sleep=" + sleep;
		imageList[p+"-initSprint"] = baseURL + "Scene/Personnages/"+p+"_initSprint.png&sleep=" + sleep;
		imageList[p+"-sprint"] = baseURL + "Scene/Personnages/"+p+"_sprint.png&sleep=" + sleep;
		imageList[p+"-defense"] = baseURL + "Scene/Personnages/"+p+"_defense.png&sleep=" + sleep;
		imageList[p+"-death"] = baseURL + "Scene/Personnages/"+p+"_death.png&sleep=" + sleep;
		imageList[p+"-hurt"] = baseURL + "Scene/Personnages/"+p+"_hurt.png&sleep=" + sleep;
		imageList[p+"-carteID_000"] = baseURL + "Scene/Personnages/"+p+"_carteID_000.png&sleep=" + sleep;
		imageList[p+"-carteID_001"] = baseURL + "Scene/Personnages/"+p+"_carteID_001.png&sleep=" + sleep;
		imageList[p+"-carteID_002"] = baseURL + "Scene/Personnages/"+p+"_carteID_002.png&sleep=" + sleep;
		imageList[p+"-carteID_010"] = baseURL + "Scene/Personnages/"+p+"_carteID_010.png&sleep=" + sleep;
		imageList[p+"-carteID_020"] = baseURL + "Scene/Personnages/"+p+"_carteID_020.png&sleep=" + sleep;
		imageList[p+"-carteID_030"] = baseURL + "Scene/Personnages/"+p+"_carteID_030.png&sleep=" + sleep;
		imageList[p+"-carteID_040"] = baseURL + "Scene/Personnages/"+p+"_carteID_040.png&sleep=" + sleep;
		imageList[p+"-carteID_050"] = baseURL + "Scene/Personnages/"+p+"_carteID_050.png&sleep=" + sleep;
		imageList[p+"-carteID_060"] = baseURL + "Scene/Personnages/"+p+"_carteID_060.png&sleep=" + sleep;
		imageList[p+"-carteID_100"] = baseURL + "Scene/Personnages/"+p+"_carteID_100.png&sleep=" + sleep;
		imageList[p+"-carteID_101"] = baseURL + "Scene/Personnages/"+p+"_carteID_101.png&sleep=" + sleep;
		imageList[p+"-carteID_102"] = baseURL + "Scene/Personnages/"+p+"_carteID_102.png&sleep=" + sleep;
		imageList[p+"-carteID_110"] = baseURL + "Scene/Personnages/"+p+"_carteID_110.png&sleep=" + sleep;
		imageList[p+"-carteID_120"] = baseURL + "Scene/Personnages/"+p+"_carteID_120.png&sleep=" + sleep;
		imageList[p+"-carteID_130"] = baseURL + "Scene/Personnages/"+p+"_carteID_130.png&sleep=" + sleep;
		imageList[p+"-carteID_200"] = baseURL + "Scene/Personnages/"+p+"_carteID_200.png&sleep=" + sleep;
		imageList[p+"-carteID_201"] = baseURL + "Scene/Personnages/"+p+"_carteID_201.png&sleep=" + sleep;
		imageList[p+"-carteID_202"] = baseURL + "Scene/Personnages/"+p+"_carteID_202.png&sleep=" + sleep;
		imageList[p+"-carteID_210"] = baseURL + "Scene/Personnages/"+p+"_carteID_210.png&sleep=" + sleep;
		imageList[p+"-carteID_220"] = baseURL + "Scene/Personnages/"+p+"_carteID_220.png&sleep=" + sleep;
		imageList[p+"-carteID_230"] = baseURL + "Scene/Personnages/"+p+"_carteID_230.png&sleep=" + sleep;
		imageList[p+"-carteID_300"] = baseURL + "Scene/Personnages/"+p+"_carteID_300.png&sleep=" + sleep;
		imageList[p+"-carteID_310"] = baseURL + "Scene/Personnages/"+p+"_carteID_310.png&sleep=" + sleep;
	}
	
	var soundList = {};
	
	this.assetManager = new AssetManager();
	this.assetManager.startLoading(imageList, soundList);
	
	// Création du personnage joueur
	joueur = new Personnage(this.assetManager,this.IDP[0],true);
	joueur.setPosition(joueur.xRecule, 250);
	
	// Création du personnage ennemi
	ennemi = new Personnage(this.assetManager,this.IDP[1],false);
	ennemi.setPosition(ennemi.xRecule, 250);
	
	// Création de la structure de l'interface des cartes
	sysCartes = new SystemeCartes('systemeCartes', document.getElementById("gui"),initCartes,jsonData,joueur);
	
	// Création de la structure de l'interface des informations
	sysInfos = new SystemeInfos('systemeInfos', document.getElementById("gui"),joueur,ennemi);
	
	
	$scene = $("#main-scene");
		
	// Création des cartes de l'ennemi
	this.cartesEnn0 = new CartesEnnemi('systemeCartesEnnemi0', document.getElementById("gui"),jsonData,"0");
	this.cartesEnn1 = new CartesEnnemi('systemeCartesEnnemi1', document.getElementById("gui"),jsonData,"1");
	this.cartesEnn2 = new CartesEnnemi('systemeCartesEnnemi2', document.getElementById("gui"),jsonData,"2");
	this.cartesEnn3 = new CartesEnnemi('systemeCartesEnnemi3', document.getElementById("gui"),jsonData,"3");
	//this.cartesEnn = this.cartesEnn0;
	var tpsDelai = ((Math.random() * 5) + 10) * 1000;
	setTimeout(function(){self.sequencesJeu.push("cartesJeuEnnemi")},tpsDelai);
	
	// Création du menu replay
	this.menuReplay = new MenuReplay("menuReplay",document.getElementById("gui"));
	
	requestAnimFrame(
		function loop() {
			self.bouclePrincipale();
			requestAnimFrame(loop);
		}					
	);
};

Jeu.prototype.cleanInfoEffetCartes = function(){

	var tabIdx = new Array();
	for(var idx in this.infoEffetCartes){
		if(this.infoEffetCartes[idx].alpha <= 0){
			tabIdx.unshift(idx);
		}
	}
	for(var idx2 in tabIdx){
		this.infoEffetCartes.splice(tabIdx[idx2],1);
	}

}

Jeu.prototype.bouclePrincipale = function(){
	var self = this;
	var now = Date.now();
	var SeqDeltaTime = now - this.previousNow;
	this.previousNow = now;
	var globalTimeDelta = now - this.globalTime;
	var localTimeDelta = Math.min(50, globalTimeDelta);
	this.localTime += localTimeDelta;
	
	//console.log(SeqDeltaTime);
	
	sysCartes.update(localTimeDelta / 1000, joueur);
	joueur.update(localTimeDelta / 1000);
	
	if(sysCartes.cartesJeu.length > 0 && cartesJeuPretes  && !this.cartesJeuInscrites){
		this.sequencesJeu.push("cartesJeu");
		this.cartesJeuInscrites = true;
	}
	
	if(!this.sequenceEnCours && this.sequencesJeu.length > 0 && joueur.PV > 0 && ennemi.PV > 0){
		this.sequenceID = this.sequencesJeu.shift();
		var cartesSequence;
		switch(this.sequenceID){
			case "cartesJeu" :
				
				console.log("cartesJeu");
				
				cartesSequence = sysCartes.cartesJeu;
				sysCartes.cartesJeu = new Array();
				this.sequenceEnCours = new Sequence(cartesSequence,joueur,sysCartes,ennemi);
				break;
			case "cartesJeuEnnemi" :
				
				console.log("cartesJeuEnnemi");
				
				var rdm = Math.random();
				if(rdm < 0.30){
					this.cartesEnn = this.cartesEnn0;
				}else if(rdm < 0.60){
					this.cartesEnn = this.cartesEnn1;
				}else if(rdm < 0.80){
					this.cartesEnn = this.cartesEnn2;
				}else{
					this.cartesEnn = this.cartesEnn3;
				}
				cartesSequence = this.cartesEnn.cartes.slice();
				this.sequenceEnCours = new Sequence(cartesSequence,ennemi,null,joueur);
				break;
			default :
				console.log("default");
				break;
		}
		
	}
	if(this.sequenceEnCours){
		//console.log(localTimeDelta);
		this.sequenceEnCours.update(SeqDeltaTime / 1000);
		if (this.sequenceEnCours.terminee && this.sequenceID == "cartesJeu"){
			delete this.sequenceEnCours;
			console.log("Jeu.js : sequence terminée !!");
			sysCartes.RAZ(this.sequenceID);
			if(joueur.PV <= 0 || ennemi.PV <= 0){
				sysCartes.mainBloquee = true;
				if(joueur.PV <= 0){
					$(".menuReplay .menuReplayTexte")[0].innerHTML = "You loose...";
				}else{
					$(".menuReplay .menuReplayTexte")[0].innerHTML = "You win!";
				}
				$("#menuReplay")[0].setAttribute("affichage","oui");
			}
			this.sequenceID = "";
			this.cartesJeuInscrites = false;
		}else if (this.sequenceEnCours.terminee && this.sequenceID == "cartesJeuEnnemi"){
			delete this.sequenceEnCours;
			console.log("Jeu.js : sequence ennemie terminée !!");
			this.sequenceID = "";
			var tpsDelai = ((Math.random() * 8) + 5) * 1000;
			if(joueur.PV <= 0 || ennemi.PV <= 0){
				sysCartes.mainBloquee = true;
				if(joueur.PV <= 0){
					$(".menuReplay .menuReplayTexte")[0].innerHTML = "You loose...";
				}else{
					$(".menuReplay .menuReplayTexte")[0].innerHTML = "You win!";
				}
				$("#menuReplay")[0].setAttribute("affichage","oui");
			}else{
				setTimeout(function(){self.sequencesJeu.push('cartesJeuEnnemi')},tpsDelai);
			}
		}
	}
	
	// MAJ des informations
	sysInfos.update(SeqDeltaTime / 1000);

	
	// Affichage de la scène
	this.graphics.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.graphics.save();
	if(this.assetManager.isDoneLoading()){
		this.graphics.drawImage(this.assetManager.getImage("fond"),0,0,this.canvas.width,this.canvas.height);
		if(this.sequenceID == "cartesJeu"){
			ennemi.render(this.graphics);
			joueur.render(this.graphics);
		}else{
			joueur.render(this.graphics);
			ennemi.render(this.graphics);
		}
		this.cleanInfoEffetCartes();
		//console.log(this.infoEffetCartes.length);
		for(var idx in this.infoEffetCartes){
			this.infoEffetCartes[idx].render();
		}
	}
	this.graphics.restore();
};