var MenuReplay = function(id,parent){

	self = this;
	this.id = id;
	this.parent = parent;
	
	this.root = document.createElement("div");
	this.root.setAttribute("id",this.id);
	this.root.setAttribute("affichage","non");
	this.root.className = "menuReplay";
	this.parent.appendChild(this.root);
	
			this.text = document.createElement("div");
			this.text.setAttribute("id","menuReplayTexte");
			this.text.className = "menuReplayTexte";
			this.root.appendChild(this.text);
			
			this.bouton = document.createElement("div");
			this.bouton.setAttribute("id","menuReplayBouton");
			this.bouton.className = "menuReplayBouton";
			this.bouton.innerHTML = "Replay";
			
			this.bouton.addEventListener("click", function(){
				self.ClicReplay();
			})
			this.root.appendChild(this.bouton);
};

MenuReplay.prototype.ClicReplay = function(){
	location.reload();
}