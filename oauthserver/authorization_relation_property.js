var oauthauthorizationrelation = OAuthAuthorizationRelation.prototype;

function OAuthAuthorizationRelation(USER, CONSUMER, RESOURCEOWNER, ACTIVE, CREATEDATE, UPDATEDATE){
	this.user = USER;
	this.consumer = CONSUMER;
	this.resourceOwner = RESOURCEOWNER;
	this.active = ACTIVE;
	this.createdate = CREATEDATE;
	this.updatedate = UPDATEDATE;
}

oauthauthorizationrelation.getUser = function(){
	return this.user;
}

oauthauthorizationrelation.getConsumer = function(){
	return this.consumer;
}

oauthauthorizationrelation.getResourceOwner = function(){
	return this.resourceOwner;
}

oauthauthorizationrelation.getActive = function(){
	return this.active;
}

oauthauthorizationrelation.getCreatedate= function(){
	return this.createdate;
}

oauthauthorizationrelation.getUpdatedate = function(){
	return this.updatedate;
}

oauthauthorizationrelation.setUser = function(USER){
	return this.user = USER;
}

oauthauthorizationrelation.setConsumer = function(CONSUMER){
	return this.consumer = CONSUMER;
}

oauthauthorizationrelation.setResourceOwner = function(RESOURCEOWNER){
	return this.resourceOwner = RESOURCEOWNER;
}

oauthauthorizationrelation.setActive = function(ACTIVE){
	return this.active = ACTIVE;
}

oauthauthorizationrelation.setCreatedate= function(CREATEDATE){
	return this.createdate = CREATEDATE;
}

oauthauthorizationrelation.setUpdatedate = function(UPDATEDATE){
	return this.updatedate = UPDATEDATE;
}


module.exports = OAuthAuthorizationRelation;