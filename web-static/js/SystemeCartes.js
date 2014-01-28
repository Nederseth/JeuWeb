var vitesseCarteMain = 200;
var vitesseCarteChoisie = 600;
var vitesseCarteJeu = 600;

var nbCartesMain = 0;

var carteChoisieID = 0;
var carteMainID = 1;
var carteJeuID = 2;

var carteJeuTop = (136-100);
var carteJeuLeft = (102*9)+(26*2);
var carteJeuWidth = 75;
var carteJeuHeight = 100;

var carteChoisieTop = (136-100);
var carteChoisieLeft = (102*7)+(26*2);
var carteChoisieWidth = 75;
var carteChoisieHeight = 100;

var carteMainTop = 0;
var carteMainLeft = 102+26;
var carteMainWidth = 102;
var carteMainHeight = 136;

var carteNextTop = 34;
var carteNextLeft = 26;
var carteNextWidth = 75;
var carteNextHeight = 100;

var cartesMainPretes = false;
var cartesChoisiesPretes = false;
var cartesJeuPretes = false;

var SystemeCartes = function(id, parent, iCartes, jsonData, joueur){
	
	var self = this;
	var idxTmp = 0;
	
	this.id = id;
	this.parent = parent;
	
	this.root = document.createElement("div");
	this.root.className = "systemeCartes";
	this.root.setAttribute("id",this.id);
	this.parent.appendChild(this.root);
	
	// Caractéristiques du système
	this.mainBloquee = true;
	this.levelActuel = 1;
	this.levelActuelSys = 1;
		
	// Définition du personnage
	this.personnage = joueur;
	
	// Création du deck
	this.deck = new Deck(iCartes);
	var carteJSON;
	for(var i=1;i<=this.deck.nbCartes;i++){
		carteJSON = jsonData[this.deck.cartes[i-1]];
		this.carteDeck = document.createElement("div");
		this.carteDeck.className = "carteDeck";
		// Attributs du système
		this.carteDeck.setAttribute("id","Carte"+i);
		this.carteDeck.setAttribute("jouable","oui");
		if(carteJSON.level1 == "non" || carteJSON.cType == "REL"){ // doit être en accord avec this.levelActuel !!
			this.carteDeck.setAttribute("valide","non");
		}else{
			this.carteDeck.setAttribute("valide","oui");
		}
		// Attributs de la carte
		this.carteDeck.setAttribute("carteID",this.deck.cartes[i-1]);
		this.carteDeck.setAttribute("cType",carteJSON.cType);
		this.carteDeck.setAttribute("level1",carteJSON.level1);
		this.carteDeck.setAttribute("level2",carteJSON.level2);
		this.carteDeck.setAttribute("level3",carteJSON.level3);
		this.carteDeck.setAttribute("number",carteJSON.number);
		this.carteDeck.setAttribute("finish",carteJSON.finish);
		this.carteDeck.setAttribute("dureeAction",carteJSON.dureeAction);
		this.carteDeck.setAttribute("delaiEffet",carteJSON.delaiEffet);
		//this.carteDeck.setAttribute("level",1);
		// Attributs facultatifs ("null" si absent)
		this.carteDeck.setAttribute("coeffPui",carteJSON.coeffPui);
		this.carteDeck.setAttribute("gainPui",carteJSON.gainPui);
		this.carteDeck.setAttribute("nbUtil",carteJSON.nbUtil);
		this.carteDeck.setAttribute("puissance",carteJSON.puissance);
		// Apparence des cartes
		this.carteDeck.setAttribute("style", "background-image : url("+carteJSON.carteImg+")");
		// Attributs du joueur
		this.carteDeck.setAttribute("positionJoueur",carteJSON.positionJoueur);
		// Ajout de l'évènement "clic"
		this.carteDeck.addEventListener("click", function(){
			if(!self.mainBloquee){
				self.MAJClicCarte(this);
			}/*else{
				console.log("BLOQUÉE");
			}*/
		})
		// Changement de la valeur dans le deck => ID de la div dans laquelle se trouve la carte
		this.deck.cartes[i-1] = "Carte"+i;
		this.root.appendChild(this.carteDeck);
	}
	
	// Définition du nombre de cartes dans la main selon la taille du deck
	// 10 cartes minimum / 50 cartes maximum
	if(this.deck.nbCartes < 20){
		nbCartesMain = 3;
	}else if(this.deck.nbCartes < 30){
		nbCartesMain = 4;
	}else if(this.deck.nbCartes < 40){
		nbCartesMain = 5;
	}else{
		nbCartesMain = 6;
	}
	
	// Création des cartes choisies
	this.choisies = new Array();
	
	// Création des cartes de la main
	this.main = new Array();
	for(var i=1;i<=nbCartesMain;i++){
		this.main.unshift(this.deck.cartes.shift());
		this.deck.nbCartes -= 1;
		
		this.carteMain = $( "#Carte"+i );
		this.carteMain.css({top: carteNextTop+"px", left:carteNextLeft+"px", width: carteNextWidth+"px", height : carteNextHeight+"px", visibility:"visible", "z-index" : 0});
		this.carteMain[0].className = "carteCourante";
		
		if(this.carteMain[0].getAttribute("jouable") == "oui" && this.carteMain[0].getAttribute("valide") == "oui"){
			this.mainBloquee = false;
		}
	}
	
	// Création de la carte suivante	
	this.next = $( "#"+this.deck.cartes.shift());
	this.next[0].className = "carteSuivante";
	this.next.css({top: carteNextTop+"px", left:carteNextLeft+"px", width: carteNextWidth+"px", height : carteNextHeight+"px", visibility:"visible", "z-index" : 0});
	this.deck.nbCartes -= 1;
	
	// Création du texte "Next" de la carte suivante
	this.infoCarteSuivante = document.createElement("div");
	this.infoCarteSuivante.innerHTML = "Next";
	this.infoCarteSuivante.className = "texteInfoCartes";
	this.infoCarteSuivante.setAttribute("id","texteInfoCarteSuivante");
	this.root.appendChild(this.infoCarteSuivante);
	
	// Création du texte "Selected cards" des cartes choisies
	this.infoCartesChoisies = document.createElement("div");
	this.infoCartesChoisies.innerHTML = "Selected cards";
	this.infoCartesChoisies.className = "texteInfoCartes";
	this.infoCartesChoisies.setAttribute("id","texteInfoCartesChoisies");
	this.root.appendChild(this.infoCartesChoisies);
	
	// Création des cartes jeu et défausse
	this.cartesJeu = new Array();
	this.cartesDefausse = new Array();
	
	// Création du switch action/défausse
	/*this.bSwitch = document.createElement("div");
	this.bSwitch.className = "switchAD";
	this.bSwitch.setAttribute("id","switchAD");
	this.bSwitch.setAttribute("valswitch","action");
	
	this.bSwitch.addEventListener("click", function(){
		self.switchAD(this);
	})
	
	this.root.appendChild(this.bSwitch);
	
	// Création de l'icone switch action/défausse
	this.bSwitchIcon = document.createElement("div");
	this.bSwitchIcon.className = "iSwitchAD";
	this.bSwitchIcon.setAttribute("id","iSwitchAD");
	this.bSwitchIcon.setAttribute("valswitch","defausse");
	this.root.appendChild(this.bSwitchIcon);*/

};

SystemeCartes.prototype.switchAD = function(switchAD){

		if(switchAD.getAttribute("valswitch") == "action"){
			if(this.choisies.length == 0){
				switchAD.setAttribute("valswitch","defausse");
				$("#iSwitchAD")[0].setAttribute("valswitch","action");
			}
		}else{
			if(this.choisies.length == 0){
				switchAD.setAttribute("valswitch","action");
				$("#iSwitchAD")[0].setAttribute("valswitch","defausse");
			}
		}
}

SystemeCartes.prototype.MAJCarteValideLevel = function(carte,level){
	//console.log(carte);
	if (carte.getAttribute("ctype") != "REL"){
		carte.setAttribute("valide","oui");
	}
	if(level == 1){
		if(carte.getAttribute("level1") == "non"){
			carte.setAttribute("valide","non");
		}
	}else if(level == 2){
		if(carte.getAttribute("level2") == "non"){
			carte.setAttribute("valide","non");
		}
	}else{
		if(carte.getAttribute("level3") == "non"){
			carte.setAttribute("valide","non");
		}
	}
}

SystemeCartes.prototype.update = function(deltaTime,joueur){

	cartesMainPretes = true;
	cartesChoisiesPretes = true;
	cartesJeuPretes = true;
	var carteMainPrete;
	var carteChoisiePrete;
	var carteJeuPrete;
	
	// MAJ validité des cartes selon le niveau du joueur
	if(this.levelActuel != joueur.level){
		var self = this;
		
		$(".systemeCartes [carteID]").each(function() {
			self.MAJCarteValideLevel($(this)[0],joueur.level);
		});
		
		this.levelActuel = joueur.level;
		this.levelActuelSys = this.levelActuel;
	}
	
	// MAJ des cartes en main
	if(this.main.length > 0){
		for(var idx = (this.main.length-1); idx>=0; idx--){
			this.carteMain = $( "#"+this.main[idx] );
			carteMainPrete = this.MAJPosTailleCarte(this.carteMain, idx, carteMainID, deltaTime);
			if(!carteMainPrete){
				cartesMainPretes = false;
			}
		}
	}
	// MAJ des cartes choisies
	if(this.choisies.length > 0){
		for(idx = (this.choisies.length-1); idx>=0; idx--){
			this.carteChoisie = $( "#"+this.choisies[idx] );
			carteChoisiePrete = this.MAJPosTailleCarte(this.carteChoisie, idx, carteChoisieID, deltaTime);
			if(!carteChoisiePrete){
				cartesChoisiesPretes = false;
			}
		}
		if(this.mainBloquee && cartesChoisiesPretes){
			this.cartesJeu = this.choisies.slice();
			this.choisies = new Array();
			
			for(idx = (this.cartesJeu.length-1); idx>=0; idx--){
				$( "#"+this.cartesJeu[idx] )[0].className = "carteJeu";
			}
		}
	}
	
	// MAJ des cartes jeu
	if(this.cartesJeu.length > 0){
		for(idx = (this.cartesJeu.length-1); idx>=0; idx--){
			this.carteJeu = $( "#"+this.cartesJeu[idx] );
			carteJeuPrete = this.MAJPosTailleCarte(this.carteJeu, idx, carteJeuID, deltaTime);
			if(!carteJeuPrete){
				cartesJeuPretes = false;
			}
		}
		if(cartesJeuPretes){
			$(".carteJeu").css({visibility:"hidden"});
		}
	}
	
}

SystemeCartes.prototype.MAJClicCarte = function(carte){
	
	if(carte.className == "carteChoisie" && cartesChoisiesPretes == true){
		
		this.cartesJeu = this.choisies.slice();
		this.choisies = new Array();
		
		for(idx = (this.cartesJeu.length-1); idx>=0; idx--){
			$( "#"+this.cartesJeu[idx] )[0].className = "carteJeu";
		}
		for(var id in this.main){
			$("#"+this.main[id])[0].setAttribute("jouable","non");
		}
		if(this.next){
			$(".carteSuivante")[0].setAttribute("jouable","non");
		}
		this.mainBloquee = true;
	}
	
	if(carte.className == "carteCourante" && cartesMainPretes == true){

		if(carte.getAttribute("jouable") == "oui" && carte.getAttribute("valide") == "oui"){
			
			var nombreJoue = parseInt(carte.getAttribute("number"));
			var finishJoue = carte.getAttribute("finish");
			var typeJoue = carte.getAttribute("cType");
			var MAJCarte;/*, MAJCarteNombre, MAJCarteType;*/
			
			// Carte courante cliquée => carte choisie
			carte.className = "carteChoisie";
			this.choisies.unshift(this.main.splice(jQuery.inArray(carte.id, this.main),1)[0]);
			
			// Carte suivante => carte courante
			this.carteSuivante = $(".carteSuivante");
				if(this.carteSuivante.length > 0){
				var topPosTmp = this.carteSuivante.position().top;
				var leftPosTmp = this.carteSuivante.position().left;
				this.carteSuivante[0].className = "carteCourante";
				this.main.unshift(this.carteSuivante[0].id);
				this.carteSuivante.css({top : topPosTmp+"px", left : leftPosTmp+"px", visibility:"visible", "z-index" : 1});
			}
			
			// Première carte du Deck => carte suivante
			if(this.deck.nbCartes > 0){
				this.next = $("#"+this.deck.cartes.shift());
				this.next[0].className = "carteSuivante";
				this.next.css({top: carteNextTop+"px", left:carteNextLeft+"px", width: carteNextWidth+"px", height : carteNextHeight+"px", visibility:"visible", "z-index" : 0});
				this.deck.nbCartes -= 1;
			}else{
				this.next = null;
			}
			
			// Si le joueur choisit de perdre sa puissance => RAZ du level (côté système uniquement)
			if(typeJoue == "PUI"){
				this.levelActuelSys = 1;
			}
			
			// MAJ des status "jouable" et "valide" des cartes de la main (cartes courantes)
			// + Test si la séquence peut continuer (s'il reste au moins une carte valide et jouable)
			this.mainBloquee = true;
			for(var id in this.main){
				
				MAJCarte = $("#"+this.main[id])[0];
				this.MAJJouableValide(MAJCarte,nombreJoue,finishJoue,typeJoue);
				
				//Reste-t-il au moins une carte jouable et valide ?
				if(MAJCarte.getAttribute("valide") == "oui" && MAJCarte.getAttribute("jouable") == "oui"){
					this.mainBloquee = false;
				}
			}
			if(this.next){
				MAJCarte = $(".carteSuivante")[0];
				this.MAJJouableValide(MAJCarte,nombreJoue,finishJoue,typeJoue);
			}
			
			if(this.mainBloquee){
				for(var id in this.main){
					$("#"+this.main[id])[0].setAttribute("jouable","non");
				}
				if(this.next){
					$(".carteSuivante")[0].setAttribute("jouable","non");
				}
			}
		}
		
	}
	
}

SystemeCartes.prototype.MAJJouableValide = function(MAJCarte,nombreJoue,finishJoue,typeJoue){

	var MAJCarteNombre = MAJCarte.getAttribute("number");
	var MAJCarteType = MAJCarte.getAttribute("cType");
	
	if(typeJoue != "PUI"){
		// MAJ "jouable"
		MAJCarte.setAttribute("jouable","non");
		if(typeJoue == "REL"){
			MAJCarte.setAttribute("jouable","oui");
		}else if(parseInt(MAJCarteNombre) > nombreJoue){
			if(MAJCarte.getAttribute("ctype") == typeJoue || typeJoue == "Eq" + MAJCarte.getAttribute("ctype").charAt(0) || MAJCarte.getAttribute("ctype") == "PUI" || MAJCarte.getAttribute("ctype") == "REL"){
				if((typeJoue != "DEF" && typeJoue != "EqD") || MAJCarte.getAttribute("ctype") != "PUI"){
					MAJCarte.setAttribute("jouable","oui");
				}
			}
		}
	}
	// MAJ "valide"
	if(MAJCarteType == "REL"){
		if(finishJoue == "oui"){
			MAJCarte.setAttribute("valide","oui");
		} else if(finishJoue == "non") {
			MAJCarte.setAttribute("valide","non");
		}
	}else{
		if(MAJCarteType != "PUI"){
			this.MAJCarteValideLevel(MAJCarte,this.levelActuelSys);
		}
	}
	/*}else{
		// MAJ "valide" des cartes après une perte de puissance
		this.MAJCarteValideLevel(MAJCarte,this.levelActuelSys);
	}*/


}

SystemeCartes.prototype.MAJPosTailleCarte = function(carte, idx, ID, deltaTime){
	
	var cartePrete = true;
	var xPosDest;
	var yPosDest;
	var wTailleDest;
	var hTailleDest;
	var vitesseCarte;
	var zIndex;
	
	if(ID == carteMainID){
		xPosDest = carteMainLeft + (idx * 102);
		yPosDest = carteMainTop;
		wTailleDest = carteMainWidth;
		hTailleDest = carteMainHeight;
		zIndex = (((this.main.length-1) - idx)+10);
		vitesseCarte = vitesseCarteMain;
	}else if(ID == carteChoisieID){
		xPosDest = carteChoisieLeft + (idx * 10);
		yPosDest = carteChoisieTop;
		wTailleDest = carteChoisieWidth;
		hTailleDest = carteChoisieHeight;
		zIndex = (((this.choisies.length-1) - idx)+100);
		vitesseCarte = vitesseCarteChoisie;
	}else if(ID == carteJeuID){
		xPosDest = carteJeuLeft + (idx * 10);
		yPosDest = carteJeuTop;
		wTailleDest = carteJeuWidth;
		hTailleDest = carteJeuHeight;
		zIndex = (((this.cartesJeu.length-1) - idx)+100);
		vitesseCarte = vitesseCarteJeu;
	}
	
	dep = vitesseCarte * deltaTime;
	
	// MAJ position x de la carte
	xPosCarte = carte.position().left;
	xDiffPos = xPosDest - xPosCarte;
	if(xDiffPos != 0){
		if(xDiffPos < 0){
			dep *= -1;
		}
		if((xDiffPos > 0 && xDiffPos < dep) || (xDiffPos < 0 && xDiffPos > dep)){
			dep = xDiffPos;
		}
		carte.css({left:(xPosCarte+dep)+"px", "z-index":zIndex});
	}
	
	// MAJ position y de la carte
	if(xDiffPos != 0){
		yPosCarte = carte.position().top;
		yDiffPos = yPosDest - yPosCarte;
		if(dep < 0){
			dep *= -1;
		}
		carte.css({top:(yPosCarte+(yDiffPos/xDiffPos*dep))+"px"});
	}
	
	// MAJ taille de la carte
	if(xDiffPos != 0){
		wTailleCarte = carte.width();
		hTailleCarte = carte.height();
		wDiffTaille = wTailleDest - wTailleCarte;
		hDiffTaille = hTailleDest - hTailleCarte;
		if(dep < 0){
			dep *= -1;
		}
		carte.css({width:(wTailleCarte+(wDiffTaille/xDiffPos*dep))+"px", height:(hTailleCarte+(hDiffTaille/xDiffPos*dep))+"px"});
		cartePrete = false;
	}
	
	return cartePrete;
}

// Fonction appelée par Jeu.js à la fin d'une séquence
SystemeCartes.prototype.RAZ = function(sequenceID){

	if(sequenceID == "cartesJeu"){
		
		if(!this.next){
			// Tant qu'il manque des cartes dans la main du joueur
			while(this.main.length < nbCartesMain){
				if(this.deck.cartes.length > 0){
					this.main.unshift(this.deck.cartes.shift());
					var newCarteMain = $( "#"+this.main[0] );
					newCarteMain.css({top: carteNextTop+"px", left:carteNextLeft+"px", width: carteNextWidth+"px", height : carteNextHeight+"px", visibility:"visible", "z-index" : 0});		
					newCarteMain[0].className = "carteCourante";
					this.deck.nbCartes -= 1;
				}else{
					console.log("main incomplète et plus de cartes dans le deck ???");
				}
			}
			if(this.deck.cartes.length > 0){
				this.next = $( "#"+this.deck.cartes.shift());
				this.next[0].className = "carteSuivante";
				this.next.css({top: carteNextTop+"px", left:carteNextLeft+"px", width: carteNextWidth+"px", height : carteNextHeight+"px", visibility:"visible", "z-index" : 0});
				this.deck.nbCartes -= 1;
			}
		}
	
		// MAJ des cartes
		if(this.main.length > 0){
			for(var idx = (this.main.length-1); idx>=0; idx--){
				$( "#"+this.main[idx] )[0].setAttribute("jouable","oui");
				if($( "#"+this.main[idx] )[0].getAttribute("ctype") == "REL"){
					$( "#"+this.main[idx] )[0].setAttribute("valide","non");
				}
				this.mainBloquee = false;
			}
			if(this.next){
				$(".carteSuivante")[0].setAttribute("jouable","oui");
				if($(".carteSuivante")[0].getAttribute("ctype") == "REL"){
					$(".carteSuivante")[0].setAttribute("valide","non");
				}
			}
		}
	}
}