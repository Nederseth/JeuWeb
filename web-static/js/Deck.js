var Deck = function(iCartes){
	var self = this;
	var idxTmp = 0;

	this.nbCartes = 0;
	
	this.nbCartes = iCartes.length;
	
	this.cartes = new Array();

	while(iCartes.length > 0){
		
		idxTmp = Math.floor(Math.random() * iCartes.length);
		if(idxTmp == iCartes.length){
			idxTmp -= 1;
		}
		this.cartes.push(iCartes[idxTmp]);
		iCartes.splice(idxTmp,1);
	}
	
	console.log("Deck créé : " + this.nbCartes);
};