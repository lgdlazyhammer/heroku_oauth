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

module.exports.getOAuthAuthorizationRelation = function(USER, CONSUMER, RESOURCEOWNER, CALLBACK, CALLBACKERROR){	

	var selectSQLString = "SELECT * FROM authorizationrelation WHERE user = $1 and consumer = $2 and resourceowner = $3";
	var value = [];
	value.push(USER);
	value.push(CONSUMER);
	value.push(RESOURCEOWNER);
	
	db.select(selectSQLString, value, CALLBACK, function(error){
		logger.error('select consumer info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.getAll = function(CALLBACK, CALLBACKERROR){	

	var selectSQLString = "SELECT * FROM authorizationrelation";
	var value = [];
	
	db.select(selectSQLString, value, CALLBACK, function(error){
		logger.error('select authorizationrelation info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.save = function(OAuthAuthorizationRelation, CALLBACK, CALLBACKERROR){	
    
	var insertSQLString = "insert into authorizationrelation(user,consumer,resourceowner,active,createdate,updatedate) values($1,$2,$3,$4,$5,$6)";
	var value = [];
	value.push(OAuthAuthorizationRelation.getUser());
	value.push(OAuthAuthorizationRelation.getConsumer());
	value.push(OAuthAuthorizationRelation.getResourceOwner());
	value.push(OAuthAuthorizationRelation.getActive());
	value.push(OAuthAuthorizationRelation.getCreatedate());
	value.push(OAuthAuthorizationRelation.getUpdatedate());
	
	db.save(insertSQLString, value, CALLBACK, function(error){
		logger.error('save authorizationrelation info failed!' + error);
		CALLBACKERROR(error);
	});
}

module.exports.remove = function(ID,CALLBACK){	
    
	db.query("DELETE FROM authorizationrelation WHERE UUID = " + ID, function(result){
		CALLBACK(result);
	});
}