var oauthuser = OAuthUser.prototype;

function OAuthUser(NAME, PASSWORD, GENDER, PHONENUMBER, EMAIL, ADDRESS, ISSUPERVISOR, CREATEDATE, UPDATEDATE){
	this.name = NAME;
	this.password = PASSWORD;
	this.gender = GENDER;
	this.phonenumber = PHONENUMBER;
	this.email = EMAIL;
	this.address = ADDRESS;
	this.isSupervisor = ISSUPERVISOR;
	this.createdate = CREATEDATE;
	this.updatedate = UPDATEDATE;
}

oauthuser.getName = function(){
	return this.name;
}

oauthuser.getPassword = function(){
	return this.password;
}

oauthuser.getGender = function(){
	return this.gender;
}

oauthuser.getPhonenumber = function(){
	return this.phonenumber;
}

oauthuser.getEmail = function(){
	return this.email;
}

oauthuser.getAddress = function(){
	return this.address;
}

oauthuser.getIsSupervisor = function(){
	return this.isSupervisor;
}

oauthuser.getCreatedate= function(){
	return this.createdate;
}

oauthuser.getUpdatedate = function(){
	return this.updatedate;
}

oauthuser.setName = function(NAME){
	this.name = NAME;
}

oauthuser.setPassword = function(PASSWORD){
	this.password = PASSWORD;
}

oauthuser.setGender = function(GENDER){
	this.gender = GENDER;
}

oauthuser.setPhonenumber = function(PHONENUMBER){
	this.phonenumber = PHONENUMBER;
}

oauthuser.setEmail = function(EMAIL){
	this.email = EMAIL;
}

oauthuser.setAddress = function(ADDRESS){
	this.address = ADDRESS;
}

oauthuser.setIsSupervisor = function(ISSUPERVISOR){
	this.isSupervisor = ISSUPERVISOR;
}

oauthuser.setCreatedate= function(CREATEDATE){
	this.createdate = CREATEDATE;
}

oauthuser.setUpdatedate = function(UPDATEDATE){
	this.updatedate = UPDATEDATE;
}


module.exports = OAuthUser;