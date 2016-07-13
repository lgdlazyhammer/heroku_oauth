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

module.exports.getOAuthResourceOwner = function(ID, PASSWORD, CALLBACK, CALLBACKERROR){	

	var selectSQLString = "SELECT * FROM resourceowner WHERE name = $1 and password = $2";
	var value = [];
	value.push(ID);
	value.push(PASSWORD);
	
	db.select(selectSQLString, value, CALLBACK, function(error){
		logger.error('select consumer info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.getAll = function(CALLBACK, CALLBACKERROR){	

	var selectSQLString = "SELECT * FROM resourceowner";
	var value = [];
	
	db.select(selectSQLString, value, CALLBACK, function(error){
		logger.error('select resourceowner info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.save = function(OAuthConsumer, CALLBACK, CALLBACKERROR){	
    
	var insertSQLString = "insert into resourceowner(name,ip,port,description,createdate,updatedate) values($1,$2,$3,$4,$5,$6)";
	var value = [];
	value.push(OAuthConsumer.getName());
	value.push(OAuthConsumer.getIp());
	value.push(OAuthConsumer.getPort());
	value.push(OAuthConsumer.getDescription());
	value.push(OAuthConsumer.getCreatedate());
	value.push(OAuthConsumer.getUpdatedate());
	
	db.save(insertSQLString, value, CALLBACK, function(error){
		logger.error('save resourceowner info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.remove = function(ID,CALLBACK){	
    
	db.query("DELETE FROM resourceowner WHERE UUID = " + ID, function(result){
		CALLBACK(result);
	});
}