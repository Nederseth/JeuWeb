var Character = function(){

    this.revertDirection = false;

	this.spriteList = {};
	this.currentSprite = false;
	
	this.positionListenerList = [];
};

Character.prototype.createSprite = function(id, url, width, height, frameCount, colCount, rowCount, loop){
	this.spriteList[id] = new Sprite(id, url, width, height, frameCount, colCount, rowCount, loop);
};

Character.prototype.addPositionListener = function(listener){
	// TODO
	this.positionListenerList.push(listener);
};

Character.prototype.setSprite = function(anim, onComplete){
	this.lastAnimId = anim;
	var spriteId = anim ;//+ "-" + (this.revertDirection?"left":"right");
	//console.log("new anim " + spriteId);
	if(this.currentSprite != this.spriteList[spriteId]){
		//if(!this.currentSprite || this.currentSprite.loop || this.currentSprite.currentFrame == this.currentSprite.frameCount - 1){
			if(this.currentSprite){
				this.currentSprite.stop();
				this.currentSprite.hide();
			}
			this.currentSprite = this.spriteList[spriteId];
			this.currentSprite.resetAnim();
			this.currentSprite.play(onComplete);
			this.currentSprite.show();
        //}else{
            this.nextSprite = anim;
        //}
	}
};

/*Character.prototype.setSprite = function(anim, onComplete){
	this.lastAnimId = anim;
	var spriteId = anim ;//+ "-" + (this.revertDirection?"left":"right");
	//console.log("new anim " + spriteId);
	if(this.currentSprite != this.spriteList[spriteId]){
		if(!this.currentSprite || this.currentSprite.loop || this.currentSprite.currentFrame == this.currentSprite.frameCount - 1){
			if(this.currentSprite){
				this.currentSprite.stop();
				this.currentSprite.hide();
			}
			this.currentSprite = this.spriteList[spriteId];
			this.currentSprite.resetAnim();
			this.currentSprite.play(onComplete);
			this.currentSprite.show();
        }else{
            this.nextSprite = anim;
        }
	}
};*/

Character.prototype.setPosition = function(x, y){
	this.x = parseInt(x);
	this.y = parseInt(y);
	//this.$elm.css({left: this.x+"px", top: this.y+"px"});
	
	for(var i in this.positionListenerList){
		this.positionListenerList[i](this.x,this.y);
	}
};

Character.prototype.render = function(g){
	//this.moveTo(1000,1000);
	g.save();
	

	g.translate(this.x,this.y);

	if(this.currentSprite){
		//console.log(g);
		this.currentSprite.render(g, this.revertDirection);	
	}
	
	g.restore();
	
};

Character.prototype.moveTo = function(x, y){
	var self = this;
	if(this.animHandler){
		this.animHandler.stop(false, false);
	}
	this.animHandler = $.ease({
		x: this.x,
		y: this.y
	}, {
		x: x, 
		y: y
	}, function(o){
		self.setPosition(o.x, o.y);
	},
	{
		easing: "easeOutCirc",
		duration: 300
	});
};
Character.prototype.move = function(x, y){
	this.moveTo(this.x + x, this.y + y);
};