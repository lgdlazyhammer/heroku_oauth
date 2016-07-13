var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: __dirname+'/logs/cheese.log', category: 'cheese' }
  ]
});
var logger = log4js.getLogger('cheese');
logger.setLevel('INFO');

var pg = require('pg');
var defaults = require('./defaults.js');
//db connection string
var conString = null;
if(process.env.DATABASE_URL != null && process.env.DATABASE_URL != "" && process.env.DATABASE_URL != undefined){
	conString = process.env.DATABASE_URL;
	//pg open ssl which is must be done for heroku
	pg.defaults.ssl = true;
}else{
	conString = "postgres://"+defaults.user+":"+defaults.password+"@"+defaults.host+"/"+defaults.database;
}
//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 10 (also configurable)
module.exports = {
	insertSuperUser: function(){
		pg.connect(conString, function(err, client, done) {
			if(err) {
				logger.error('alter connect database failed! ' + err);
				return console.error('error fetching client from pool', err);
			}				
		  
			client.query('CREATE SCHEMA IF NOT EXISTS admin', function(err, result) {

				if(err) {
					logger.error('alter create schema failed!' + err);
					done();
				  return console.error('error running create schema', err);
				}else{
					logger.info('alter create schema success.');
					client.query('SET search_path = admin', function(err, result) {

						if(err) {
							logger.error('alter set default schema failed!' + err);
							done();
						  return console.error('set default search path', err);
						}else{
							logger.info('alter set default schema success.');
							client.query("IF ( NOT EXISTS (SELECT * FROM users WHERE name='jason' and password='123456')) INSERT INTO users(name,password,issupervisor) VALUES('jason','123456',true)", function(err, result) {
							
								if(err) {
									logger.error('set supervisor failed.' + err);
									done();
								  return console.error('alter table err', err);
								}else{
									logger.info('set supervisor  success.');
									done();
								}
								console.log(result);
							});
						}
						console.log(result);
					});
				}
				console.log(result);
			});
		});
		
	}
}