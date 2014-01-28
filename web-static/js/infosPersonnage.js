var infosPersonnage = function(id, parent, personnage){

	self = this;
	this.id = id;
	this.parent = parent;
	this.personnage = personnage;
	
	this.root = document.createElement("div");
	this.root.setAttribute("id",this.id);
	this.root.className = "infosPersonnage";
	this.parent.appendChild(this.root);
	
		this.vignettePersonnage = document.createElement("div");
		this.vignettePersonnage.setAttribute("id","vignettePersonnage");
		this.vignettePersonnage.className = "vignettePersonnage";
		this.vignettePersonnage.setAttribute("style","background-image:"+ this.personnage.vignette);
		this.root.appendChild(this.vignettePersonnage);
		
		// Barre de vie
		this.infoVie = document.createElement("div");
		this.infoVie.className = "infoVie";
		this.infoVieBarre = document.createElement("div");
		this.infoVieBarre.className = "infoVieBarre";
		this.infoVie.appendChild(this.infoVieBarre);
		this.infoVieTexte = document.createElement("div");
		this.infoVieTexte.className = "infoVieTexte";
		this.infoVie.appendChild(this.infoVieTexte);
		this.root.appendChild(this.infoVie);
		
		this.root.appendChild(this.infoVie);
		
		// Barre de puissance
		this.infoPuissance = document.createElement("div");
		this.infoPuissance.className = "infoPuissance";
		this.infoPuissanceBarre = document.createElement("div");
		this.infoPuissanceBarre.className = "infoPuissanceBarre";
		this.infoPuissance.appendChild(this.infoPuissanceBarre);
		this.root.appendChild(this.infoPuissance);

};

infosPersonnage.prototype.update = function(deltaTime){
	
	// MAJ Barre de vie
	var vie100 = this.personnage.PV / this.personnage.PVMAX * 100;
	this.infoVieBarre.style.width = vie100+"%";
	this.infoVieTexte.innerHTML = this.personnage.PV;
	
	// MAJ Barre de puissance
	var puissance100 = this.personnage.force / this.personnage.forceMAX * 100;
	this.infoPuissanceBarre.style.width = puissance100+"%";

};