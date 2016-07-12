var oauthconsumer = OAuthConsumer.prototype;

function OAuthConsumer(NAME, IP, PORT, DESCRIPTION, CREATEDATE, UPDATEDATE){
	this.name = NAME;
	this.ip = IP;
	this.port = PORT;
	this.description = DESCRIPTION;
	this.createdate = CREATEDATE;
	this.updatedate = UPDATEDATE;
}

oauthconsumer.getName = function(){
	return this.name;
}

oauthconsumer.getIp = function(){
	return this.ip;
}

oauthconsumer.getPort = function(){
	return this.port;
}

oauthconsumer.getDescription = function(){
	return this.description;
}

oauthconsumer.getCreatedate= function(){
	return this.createdate;
}

oauthconsumer.getUpdatedate = function(){
	return this.updatedate;
}

oauthconsumer.setName = function(NAME){
	return this.name = NAME;
}

oauthconsumer.setIp = function(IP){
	return this.ip = IP;
}

oauthconsumer.setPort = function(PORT){
	return this.port = PORT;
}

oauthconsumer.setDescription = function(DESCRIPTION){
	return this.description = DESCRIPTION;
}

oauthconsumer.setCreatedate= function(CREATEDATE){
	return this.createdate = CREATEDATE;
}

oauthconsumer.setUpdatedate = function(UPDATEDATE){
	return this.updatedate = UPDATEDATE;
}


module.exports = OAuthConsumer;