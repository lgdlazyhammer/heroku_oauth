var oauthuser = OAuthUser.prototype;

function OAuthUser(NAME, PASSWORD, GENDER, PHONENUMBER, EMAIL, ADDRESS, CREATEDATE, UPDATEDATE){
	this.name = NAME;
	this.password = PASSWORD;
	this.gender = GENDER;
	this.phonenumber = PHONENUMBER;
	this.email = EMAIL;
	this.address = ADDRESS;
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

oauthuser.getCreatedate= function(){
	return this.createdate;
}

oauthuser.getUpdatedate = function(){
	return this.updatedate;
}

oauthuser.setName = function(NAME){
	return this.name = NAME;
}

oauthuser.setPassword = function(PASSWORD){
	return this.password = PASSWORD;
}

oauthuser.setGender = function(GENDER){
	return this.gender = GENDER;
}

oauthuser.setPhonenumber = function(PHONENUMBER){
	return this.phonenumber = PHONENUMBER;
}

oauthuser.setEmail = function(EMAIL){
	return this.email = EMAIL;
}

oauthuser.setAddress = function(ADDRESS){
	return this.address = ADDRESS;
}

oauthuser.setCreatedate= function(CREATEDATE){
	return this.createdate = CREATEDATE;
}

oauthuser.setUpdatedate = function(UPDATEDATE){
	return this.updatedate = UPDATEDATE;
}


module.exports = OAuthUser;