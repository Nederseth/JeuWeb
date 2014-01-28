var infoEffetCarte = function(typeEffet, info, personnage){
	var self = this;

	if(personnage.revertDirection){
		var xOffset = 75;
	}else{
		var xOffset = -75;
	}
	var yOffset = -25;
	
	this.info = info;
	this.alpha = 1.700;

	switch(typeEffet){
	
		case "ATT":
			this.font = "bold 25pt Myriad Pro";
			this.fillStyle = "white";
			this.strokeStyle = "black";
			this.x = personnage.x + xOffset;
			this.y = personnage.y + yOffset;
			this.yTarget = this.y - 30;
			break;
		case "SOI":
			this.font = "bold 25pt Myriad Pro";
			this.fillStyle = "green";
			this.strokeStyle = "black";
			this.x = personnage.x + xOffset;
			this.y = personnage.y + yOffset;
			this.yTarget = this.y - 30;
			break;
		case "LVU":
			this.font = "bold italic 30pt Myriad Pro";
			this.fillStyle = "yellow";
			this.strokeStyle = "brown";
			this.x = personnage.x - 50;
			this.y = personnage.y + 80;
			this.yTarget = this.y - 30;
			break;
		case "LVD":
			this.font = "bold italic 20pt Myriad Pro";
			this.fillStyle = "yellow";
			this.strokeStyle = "brown";
			this.x = personnage.x - 50;
			this.y = personnage.y + 50;
			this.yTarget = this.y + 30;
			break;
		default:
			this.font = "bold 30px Myriad Pro";
			this.fillStyle = "white";
			this.strokeStyle = "black";
			this.x = personnage.x + xOffset;
			this.y = personnage.y + yOffset;
			this.yTarget = this.y - 30;
			break;
	}
	
	jeu.infoEffetCartes.push(self);
};

infoEffetCarte.prototype.update = function(){
	
	this.y += (this.yTarget - this.y) / 7;
	this.alpha -= 0.02;
	this.alpha = Math.max(0,this.alpha);
	
}

infoEffetCarte.prototype.render = function(){
	
	this.update();
	jeu.graphics.globalAlpha = this.alpha;
	jeu.graphics.font = this.font;
	jeu.graphics.fillStyle = this.fillStyle;
	jeu.graphics.strokeStyle = this.strokeStyle;
	jeu.graphics.fillText(this.info,this.x,this.y);
	jeu.graphics.strokeText(this.info,this.x,this.y);
	jeu.graphics.globalAlpha = 1;
	
}