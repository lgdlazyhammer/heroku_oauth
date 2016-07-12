var oauthresourceowner = OAuthResourceOwner.prototype;

function OAuthResourceOwner(NAME, IP, PORT, DESCRIPTION, CREATEDATE, UPDATEDATE){
	this.name = NAME;
	this.ip = IP;
	this.port = PORT;
	this.description = DESCRIPTION;
	this.createdate = CREATEDATE;
	this.updatedate = UPDATEDATE;
}

oauthresourceowner.getName = function(){
	return this.name;
}

oauthresourceowner.getIp = function(){
	return this.ip;
}

oauthresourceowner.getPort = function(){
	return this.port;
}

oauthresourceowner.getDescription = function(){
	return this.description;
}

oauthresourceowner.getCreatedate= function(){
	return this.createdate;
}

oauthresourceowner.getUpdatedate = function(){
	return this.updatedate;
}

oauthresourceowner.setName = function(NAME){
	return this.name = NAME;
}

oauthresourceowner.setIp = function(IP){
	return this.ip = IP;
}

oauthresourceowner.setPort = function(PORT){
	return this.port = PORT;
}

oauthresourceowner.setDescription = function(DESCRIPTION){
	return this.description = DESCRIPTION;
}

oauthresourceowner.setCreatedate= function(CREATEDATE){
	return this.createdate = CREATEDATE;
}

oauthresourceowner.setUpdatedate = function(UPDATEDATE){
	return this.updatedate = UPDATEDATE;
}


module.exports = OAuthResourceOwner;