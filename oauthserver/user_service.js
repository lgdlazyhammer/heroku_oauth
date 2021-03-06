var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: __dirname+'/logs/cheese.log', category: 'cheese' }
  ]
});
var logger = log4js.getLogger('cheese');
logger.setLevel('INFO');

var db = require('./dbservice.js');

module.exports.getOAuthUser = function(ID, PASSWORD, CALLBACK, CALLBACKERROR){	

	var selectSQLString = "SELECT * FROM users WHERE name = $1 and password = $2";
	var value = [];
	value.push(ID);
	value.push(PASSWORD);
	
	db.select(selectSQLString, value, CALLBACK, function(error){
		logger.error('select user info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.getAll = function(CALLBACK, CALLBACKERROR){	

	var selectSQLString = "SELECT * FROM users";
	var value = [];
	
	db.select(selectSQLString, value, CALLBACK, function(error){
		logger.error('select user info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.save = function(OAuthUser, CALLBACK, CALLBACKERROR){	
    
	var insertSQLString = "insert into users(name,password,gender,phonenumber,email,address,issupervisor,createdate,updatedate) values($1,$2,$3,$4,$5,$6,$7,$8,$9)";
	var value = [];
	value.push(OAuthUser.getName());
	value.push(OAuthUser.getPassword());
	value.push(OAuthUser.getGender());
	value.push(OAuthUser.getPhonenumber());
	value.push(OAuthUser.getEmail());
	value.push(OAuthUser.getAddress());
	value.push(OAuthUser.getIsSupervisor());
	value.push(OAuthUser.getCreatedate());
	value.push(OAuthUser.getUpdatedate());
	
	db.save(insertSQLString, value, CALLBACK, function(error){
		logger.error('save user info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.remove = function(ID,CALLBACK){	
    
	db.query("DELETE FROM users WHERE UUID = " + ID, function(result){
		CALLBACK(result);
	});
}