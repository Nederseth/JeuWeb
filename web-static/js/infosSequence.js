var infosSequence = function(id, parent){

	self = this;
	this.id = id;
	this.parent = parent;
	
	this.root = document.createElement("div");
	this.root.setAttribute("id",this.id);
	this.root.className = "infosSequence";
	this.parent.appendChild(this.root);

};

infosSequence.prototype.update = function(deltaTime){

	// ???

};