var SystemeInfos = function(id, parent, joueur){
	
	var self = this;
	
	this.id = id;
	this.parent = parent;
	
	this.root = document.createElement("div");
	this.root.className = "systemeInfos";
	this.root.setAttribute("id",this.id);
	this.parent.appendChild(this.root);
	
	this.infosJoueur = new infosPersonnage("infosJoueur",this.root,joueur);
	this.infosSequence = new infosSequence("infosSequence",this.root);
	this.infosEnnemi = new infosPersonnage("infosEnnemi",this.root,ennemi);
};

SystemeInfos.prototype.update = function(deltaTime){
	
	this.infosJoueur.update(deltaTime);
	this.infosSequence.update(deltaTime);
	this.infosEnnemi.update(deltaTime);

};