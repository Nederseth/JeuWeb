var AssetManager = function(){
	this.images = {};
	this.sounds = {};
	this.imagesError = {};
	this.imagesToLoad = {};
	this.soundsToLoad = {};
	this.loadingStarted = false;
};
AssetManager.prototype.loadImage = function(url, id){
	var _this = this;
	if(!id){
		id = url;
	}
	var img = this.images[id];
	if(!img){
		this.imagesToLoad[id] = url;
		img = new Image();
		img.onload = function(){
			delete _this.imagesToLoad[id];
			_this.assetLoaded();
		};
		img.onerror = function(){
			delete _this.imagesToLoad[id];
			_this.imagesError[id] = id;
			_this.assetLoaded();
		};
		img.src = url;
		this.images[id] = img;
	}else{
		this.assetLoaded();
	}
	return img;
};
AssetManager.prototype.loadSound = function(url, id, onload){
	var _this = this;
	if(!id){
		id = url;
	}
	if(this.sounds[id]){
		this.assetLoaded();
	}else{
		this.soundsToLoad[id] = url;
		var sound = soundManager.createSound({
			id: id,
			url: url,
			autoLoad: true,
			autoPlay: false,
			onload: function() {
				delete _this.soundsToLoad[id];
				_this.assetLoaded();
				if(onload){
					onload(sound);
				}
			},
			volume: 100
		});
		
		sound.playLoop = function(){
			this.play({			
				onfinish: function() {
					if(!this._play || user.data.soundEnabled){
						this.playLoop();
					}
				}
			});
		};
		this.sounds[id] = sound;
	}
	return this.sounds[id];
};

AssetManager.prototype.assetLoaded = function(){
	this.totalAssetLoaded++;
	this.loadingTime = Date.now() - this.loadingStartTime;
	this.loadingEndTime = Date.now();
};
AssetManager.prototype.renderLoadingProgress = function(g){
	
	g.fillStyle = "rgba("+parseInt(255-(255*this.getLoadingProgress()))+","+parseInt(255*this.getLoadingProgress())+",0,1)";
	g.fillRect(g.canvas.width/2-200,g.canvas.height/2-25, 400*this.getLoadingProgress(), 50);
	
	g.strokeStyle = "black";
	g.strokeRect(g.canvas.width/2-200,g.canvas.height/2-25, 400, 50);
	
	g.fillStyle = "black";
	g.fillText("chargement : " + parseInt(this.getLoadingProgress()*100) + "%", g.canvas.width/2-190,g.canvas.height/2);
	g.font = "20px gunship";
};

AssetManager.prototype.isDoneLoading = function(){
	return this.totalAssetCount == this.totalAssetLoaded;
};

AssetManager.prototype.startLoading = function(loadingList, soundLoadingList){
	this.loadingStartTime = Date.now();
	
	this.totalAssetLoaded = 0;
	this.totalAssetCount = 0;
	for(var i in loadingList){
		this.totalAssetCount++;
	}
	for(var i in soundLoadingList){
		this.totalAssetCount++;
	}
	this.loadingStarted = true;
	for(var i in soundLoadingList){
		this.loadSound(soundLoadingList[i], i);
	}
	for(var i in loadingList){
		this.loadImage(loadingList[i], i);
	}
};
AssetManager.prototype.getLoadingProgress = function(){
	if(this.totalAssetCount == 0){
		return 0;
	}else{
		return this.totalAssetLoaded / this.totalAssetCount;
	}
};

AssetManager.prototype.getImage = function(id){
	return this.images[id];
};

AssetManager.prototype.getSound = function(id){
	return this.sounds[id];
};