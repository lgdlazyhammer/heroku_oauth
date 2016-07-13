require('./initdb.js').initdb();
require('./alterdb.js').alterdb();
require('./insertsuperuser.js').insertSuperUser();

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: __dirname+'/logs/cheese.log', category: 'cheese' }
  ]
});
var logger = log4js.getLogger('cheese');
logger.setLevel('INFO');

// set variables for environment
var express = require('express');
var engine = require('ejs-locals');
var app = express();
//use default express session store
var session = require('express-session');

//use cookie parser to get request cookies value
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var path = require('path');
//generate a random unique string
var rs = require('random-strings');
var http = require('http');
var querystring = require('querystring');
//parse post parameters
var bodyParser = require("body-parser");
//get the request ip address
var requestIp = require('request-ip');
//get server ip
var serverIp = require('ip');
//os is native for nodejs
var os = require( 'os' );
var networkInterfaces = os.networkInterfaces( );
//require fs to deal with files and folders
var fs = require("fs");

var sessionService = require('./session_service');
var OAuthSession = require('./session_property');

var OAuthUser = require('./user_property');
var userService = require('./user_service');

var OAuthConsumer = require('./consumer_property');
var consumerService = require('./consumer_service');

var OAuthResourceOwner = require('./resource_owner_property');
var resourceOwnerService = require('./resource_owner_service');

var OAuthAuthorizationRelation = require('./authorization_relation_property');
var authorizationRelationService = require('./authorization_relation_service');
//set port for heroku
app.set('port', (process.env.PORT || 4000));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// use either jade or ejs 
app.set('view engine', 'ejs');
// instruct express to server up static assets
app.use(express.static( path.join(__dirname, 'public')));     
// instruct express to server up static assets
app.use(express.static( path.join(__dirname, 'css')));
// Set server port
app.listen(app.get('port'), function() {
	
	console.log( networkInterfaces );
	logger.info('Node app is running on ip ' + JSON.stringify(networkInterfaces));
	logger.info('Node app is running on ip ' + serverIp.address());
    logger.info('Node app is running on port ' + app.get('port'));
    console.log('Node app is running on port', app.get('port'));
});

//set new route
app.use('/login', function(req, res) {
    res.render('login');
});

app.use('/register', function(req, res) {
    res.render('register');
});

app.use('/logs', function(req, res) {
	
    fs.readdir(__dirname+"/public/logs/",function(err, files){
		if (err) {
			logger.error('read logs failed! ' + err);
			//res.status(500).send("read logs failed");
			var locals = { error : err, process : 'logs file get error ' };
			res.render('error',locals);
		   return console.error(err);
		}
		
		var locals = [];
		files.forEach( function (file){
		   console.log( file );
		   var temp = { name:'' };
		   temp.name = file;
		   locals.push(temp);
		});
		
		var params = { paramFiles: locals };
		res.render('logs',params);
	});
});

app.use('/local/login', function(req, res) {
    res.render('local-login');
});

app.use('/local/main', function(req, res) {
    res.render('local-main');
});

app.use('/local/users', function(req, res) {
	res.render('local-users');
});

app.use('/local/consumers', function(req, res) {
    res.render('local-consumers');
});

app.use('/local/resourceowners', function(req, res) {
    res.render('local-resource-owners');
});

app.use('/local/supervisiondeal', function(req, res) {
    res.render('local-supervision-deal');
});

// set routes
app.use('/local/loginform', function(req, res) {
	
	userService.getOAuthUser(req.body.name, req.body.password, function(results){
		logger.info('get users info ' + JSON.stringify(results));
		console.log("user results :" + JSON.stringify(results));

		if(results.rows.length > 0){
			res.redirect(301, '/local/local-main');
		}
	},function(error){
		logger.error('local login get userinfo failed ' + error);
		console.log("local user login error :" + JSON.stringify(error));
		//res.status(403).send("unauthorized");
		var locals = { error : error, process : 'oauth login ' };
		res.render('error',locals);
	});

});

// set routes
app.use('/local/userall', function(req, res) {
	
	//response a normal 
	//res.json({users:[{username:'username',email:'email',password:'password',gender:'male',phonenumber:'phonenumber',address:'address',createdate:'createdate',updatedate:'updatedate'},
	//				 {username:'username',email:'email',password:'password',gender:'male',phonenumber:'phonenumber',address:'address',createdate:'createdate',updatedate:'updatedate'}]});
	//return;
	
	userService.getAll(function(results){
		logger.info('get users info ' + JSON.stringify(results));
		console.log("user results :" + JSON.stringify(results));

		// 数据以json形式返回
		var temp = { users: results.rows };
		console.log("get users info send response:  "+JSON.stringify(temp));
		logger.info('get users info load success.');
		//set return type json
		res.json(temp);
	},function(error){
		logger.error('get users info failed ' + error);
		console.log("get users error :" + JSON.stringify(error));
		//res.status(500).send("get users information failed. " + error);
		// 数据以json形式返回
		var temp = { error: error };
		//set return type json
		res.writeHead(500, {"Content-Type": "application/json"});
		//res.status(200).send(JSON.stringify(temp));
		res.end(JSON.stringify(temp));
	});

});

// set routes
app.use('/local/consumerall', function(req, res) {
	
	consumerService.getAll(function(results){
		logger.info('get consumer info ' + JSON.stringify(results));
		console.log("consumer results :" + JSON.stringify(results));

		// 数据以json形式返回
		var temp = { consumers: results.rows };
		console.log("get consumers info send response:  "+JSON.stringify(temp));
		logger.info('get consumers info load success.');
		//res.status(200).send(JSON.stringify(temp));
		res.status(200).send(temp);
	},function(error){
		logger.error('get consumers info failed ' + error);
		console.log("get consumers error :" + JSON.stringify(error));
		//res.status(500).send("get users information failed. " + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});

});

// set routes
app.use('/local/resourceownerall', function(req, res) {
	
	resourceOnwerService.getAll(function(results){
		logger.info('get consumer info ' + JSON.stringify(results));
		console.log("consumer results :" + JSON.stringify(results));

		// 数据以json形式返回
		var temp = { resourceOwners: results.rows };
		console.log("get resourceOwners info send response:  "+JSON.stringify(temp));
		logger.info('get resourceOwners info load success.');
		//res.status(200).send(JSON.stringify(temp));
		res.status(200).send(temp);
	},function(error){
		logger.error('get resourceOwners info failed ' + error);
		console.log("get resourceOwners error :" + JSON.stringify(error));
		//res.status(500).send("get users information failed. " + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});

});

// set routes
app.use('/local/authorizationrelationall', function(req, res) {
	
	authorizationRelationService.getAll(function(results){
		logger.info('get authorizationRelation info ' + JSON.stringify(results));
		console.log("authorizationRelation results :" + JSON.stringify(results));

		// 数据以json形式返回
		var temp = { authorizationRelation: results.rows };
		console.log("get authorizationRelation info send response:  "+JSON.stringify(temp));
		logger.info('get authorizationRelation info load success.');
		//res.status(200).send(JSON.stringify(temp));
		res.status(200).send(temp);
	},function(error){
		logger.error('get authorizationRelation info failed ' + error);
		console.log("get authorizationRelation error : " + JSON.stringify(error));
		//res.status(500).send("get users information failed. " + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});

});

// set routes
app.use('/local/useradd', function(req, res) {
	
    var name = req.body.name;
	var password = req.body.password;
	var gender = req.body.gender;
	var phoneNumber = req.body.phonenumber;
	var email = req.body.email;
	var address = req.body.address;
	var isSupervisor = req.body.issupervisor;
	
	var createDate = Math.floor(Date.now() / 1000);
	var updateDate = Math.floor(Date.now() / 1000);
	
	console.log("register info: " +name+"*****"+password+"*****"+gender+"*****"+phoneNumber+"*****"+email+"*****"+createDate+"*****"+updateDate);
	
	var addUser = new OAuthUser(name,password,gender,phoneNumber,email,address,isSupervisor,createDate,updateDate);
	userService.save(addUser,function(result){
		logger.info('user add success. user ' + result);
		
		// 数据以json形式返回
		var temp = { result: true };
		//set return type json
		res.json(temp);
	},function(error){
		logger.error('user add failed! ' + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});
	
});

// set routes
app.use('/local/consumeradd', function(req, res) {
	
    var name = req.body.name;
	var ip = req.body.ip;
	var port = req.body.port;
	var description = req.body.description;
	
	var createDate = Math.floor(Date.now() / 1000);
	var updateDate = Math.floor(Date.now() / 1000);
	
	var addConsumer = new OAuthConsumer(name,ip,port,description,createDate,updateDate);
	consumerService.save(addConsumer,function(result){
		logger.info('Consumer add success. ' + result);
		
		// 数据以json形式返回
		var temp = { result: true };
		//set return type json
		res.json(temp);
	},function(error){
		logger.error('Consumer add failed! ' + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});
	
});

// set routes
app.use('/local/resourceowneradd', function(req, res) {
	
    var name = req.body.name;
	var ip = req.body.ip;
	var port = req.body.port;
	var description = req.body.description;
	
	var createDate = Math.floor(Date.now() / 1000);
	var updateDate = Math.floor(Date.now() / 1000);
	
	var addResourceOwner = new OAuthResourceOwner(name,ip,port,description,createDate,updateDate);
	resourceOwnerService.save(addResourceOwner,function(result){
		logger.info('ResourceOwner add success. ' + result);
		
		// 数据以json形式返回
		var temp = { result: true };
		//set return type json
		res.json(temp);
	},function(error){
		logger.error('ResourceOwner add failed! ' + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});
	
});


// set routes
app.use('/local/authorizationrelationadd', function(req, res) {
	
    var user = req.body.user;
	var consumer = req.body.consumer;
	var resourceowner = req.body.resourceowner;
	var active = req.body.active;
	
	var createDate = Math.floor(Date.now() / 1000);
	var updateDate = Math.floor(Date.now() / 1000);
	
	var addAuthorizationRelation = new OAuthAuthorizationRelation(user,consumer,resourceowner,active,createDate,updateDate);
	authorizationRelationService.save(addAuthorizationRelation,function(result){
		logger.info('AuthorizationRelation add success. user ' + result);
		
		// 数据以json形式返回
		var temp = { result: true };
		//set return type json
		res.json(temp);
	},function(error){
		logger.error('AuthorizationRelation add failed! ' + error);
		// 数据以json形式返回
		var temp = { error: error };
		//res.status(200).send(JSON.stringify(temp));
		res.status(500).send(temp);
	});
	
});

// set routes
app.use('/oauth/register', function(req, res) {
	
    var name = req.body.name;
	var password = req.body.password;
	var gender = req.body.gender;
	var phoneNumber = req.body.phonenumber;
	var email = req.body.email;
	var address = req.body.address;
	
	var createDate = Math.floor(Date.now() / 1000);
	var updateDate = Math.floor(Date.now() / 1000);
	
	console.log("register info: " +name+"*****"+password+"*****"+gender+"*****"+phoneNumber+"*****"+email+"*****"+createDate+"*****"+updateDate);
	
	var registerUser = new OAuthUser(name,password,gender,phoneNumber,email,address,false,createDate,updateDate);
	userService.save(registerUser,function(result){
		logger.info('user register success. user ' + name);
		var locals = { name : name, password : password, gender : gender, phoneNumber : phoneNumber, email : email, createDate : createDate, updateDate : updateDate };
		res.render('register_success',locals);
	},function(error){
		logger.error('user register failed! ' + error);
		var locals = { error : error, process : 'register user information' };
		res.render('error',locals);
	});
	
});

// set routes
app.use('/oauth/login', function(req, res) {
    
    /*var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
    
     console.log(ip);*/
    var sess;
    
    sessionService.getOAuthSession(req.query.consumer_token,function(result){
        
        console.log("data from the session **************************");
        console.log(JSON.stringify(result.rows));
        sess = JSON.parse(result.rows[0].session);
        
        var locals = { consumer_token : req.query.consumer_token };
        
        if(result.rows != null && result.rows != undefined && result.rows.length > 0){
			logger.info('consumer authorize success redirect to login page.');
            res.render('login',locals);
        }else{
			logger.info('consumer authorize failed can not find consumer in session.');
            //res.send(403, "unauthorized");
			var locals = { error : 'unauthorized', process : 'oauth login ' };
			res.render('error',locals);
        }
    },function(error){
		logger.error('user login failed! ' + error);
		var locals = { error : error, process : 'get consumer session to login'  };
		res.render('error',locals);
	});

});

// set routes
app.use('/oauth/authorize', function(req, res) {
   
    //generate a consumer token
    var session_id = rs.alphaLower(30);
    
    if (req.method == 'POST'){
        
        var key = req.body.key;
        var secret = req.body.secret;
		var clientIpParam = req.body.ip;
		var port = req.body.port;
        var callback_url = req.body.callback_url;
        
        //check the consumer
        var consumerExist = true;
        if(consumerExist){
            var clientIp = requestIp.getClientIp(req);
			logger.info('consumer authorize ip from params ' + clientIpParam);
			logger.info('consumer authorize ip from server check method ' + clientIp);
            //sess.callback_url = clientIp+callback_url;
            //sess.consumer_token = token;
            var oauthSessionInfo = JSON.stringify({ consumer: key, callback_ip: clientIpParam, callback_port:port, callback_url: callback_url });
            var expiresDate = Math.floor(Date.now() / 1000);
            console.log(oauthSessionInfo +"********"+expiresDate+"***date tostring****"+Date.now().toString());
            var oauthSession = new OAuthSession(session_id,oauthSessionInfo,expiresDate);
            
            sessionService.save(oauthSession,function(result){
					console.log("result " +  result);
                    // 数据以json形式返回
                    var temp = { consumer_token: session_id };
                    console.log("send response:  "+JSON.stringify(temp));
					logger.info('consumer authorize success save information in session.');
                    res.status(200).send(JSON.stringify(temp));
            },function(error){
				logger.error('save consumer session failed! ' + error);
				//var temp = { error: error, process:'save consumer session' };
                //res.status(500).send(JSON.stringify(temp));
				var locals = { error : error, process : 'save consumer session' };
				res.render('error',locals);
			});
        }else{
            //res.status(403).send("unauthorized");
			var locals = { error : 'unauthorized', process : 'oauth login ' };
			res.render('error',locals);
        }
        
    }
    
    if (req.method == 'GET'){
        console.log(req.query);
        
        var key = req.query.key;
        var secret = req.query.secret;
		var clientIpParam = req.query.ip;
		var port = req.query.port;
        var callback_url = req.query.callback_url;

         //check the consumer
        var consumerExist = true;
        if(consumerExist){
			logger.info('consumer authorize ip from params ' + clientIpParam);
			logger.info('consumer authorize ip from server check method ' + clientIp);
            //sess.callback_url = clientIp+callback_url;
            //sess.consumer_token = token;
            var oauthSessionInfo = JSON.stringify({ consumer: key , callback_ip: clientIpParam, callback_port:port, callback_url: callback_url });
            var expiresDate = Math.floor(Date.now() / 1000);
            console.log(oauthSessionInfo +"********"+expiresDate);
            var oauthSession = new OAuthSession(session_id,oauthSessionInfo,expiresDate);
            
            sessionService.save(oauthSession,function(result){
					console.log("result " +  result);
                    // 数据以json形式返回
                    var temp = { consumer_token: session_id };
                    console.log("send response:  "+JSON.stringify(temp));
					logger.info('consumer authorize success save information in session.');
                    res.status(200).send(JSON.stringify(temp));
            },function(error){
				logger.error('save consumer session failed! ' + error);
				//var temp = { error: error, process:'save consumer session' };
                //res.status(500).send(JSON.stringify(temp));
				
				var locals = { error : error, process : 'oauth login ' };
				res.render('error',locals);
			});
        }else{
            //res.status(403).send("unauthorized");
			var locals = { error : 'unauthorized', process : 'oauth login ' };
			res.render('error',locals);
        }
    }
    
});

// set routes
app.use('/oauth/token', function(req, res) {
    
    var session_id = rs.alphaLower(30);
	
	var redirect_url = null;
    
	//somehow the parsed string add a \ in it's end
	console.log("****req body*****"),
	console.log(req.body.consumer_session + "*****"),
	console.log(req.body.consumer_session.substring(0,req.body.consumer_session.length-1) + "*****"),
    console.log(req.body);
	
	userService.getOAuthUser(req.body.username, req.body.password, function(results){
		logger.info('get users info ' + JSON.stringify(results));
		console.log("user results :" + JSON.stringify(results));

		if(results.rows.length > 0){
			sessionService.getOAuthSession(req.body.consumer_session.substring(0,req.body.consumer_session.length-1),function(results){
				console.log("callback url info*******"),
				console.log(results);
				console.log(results.rows[0].session);
				console.log(JSON.parse(results.rows[0].session).callback_ip);
				//res.end(rs.alphaLower(20));
				var consumerKey = JSON.parse(results.rows[0].session).consumer;
				var callbackIp = JSON.parse(results.rows[0].session).callback_ip;
				var start = callbackIp.lastIndexOf(":")+1;
				var end = callbackIp.length;
				console.log(callbackIp.substring(start,end));
				
				redirect_url = "http://"+ callbackIp.substring(start,end)+ ':' + JSON.parse(results.rows[0].session).callback_port + JSON.parse(results.rows[0].session).callback_url;
				
				var oauthSession = new OAuthSession(session_id,JSON.stringify({ user: req.body.username , consumer:consumerKey }),Math.floor(Date.now() / 1000));
				sessionService.save(oauthSession,function(save_results){
					logger.info('resource token succesfully generated redirect to consumer server.');
					res.redirect(301, redirect_url + '?resource_token='+session_id);	
				},function(error){
					logger.error('save resource token session failed! ' + error);
					var locals = { error : error, process:'save resource token' };
					res.render('error',locals);
				});
			},function(error){
					logger.error('get consumer session to save resource session failed! ' + error);
					var locals = { error : error, process:'get consumer session to save resource session' };
					res.render('error',locals);
			});
		}else{
			logger.error('login get user info failed ');
			console.log("user login didn't register");
			//res.status(403).send("unauthorized");
			var locals = { error : 'unauthorized', process : 'oauth login failed did not register. ' };
			res.render('error',locals);
		}
	},function(error){
		logger.error('login get user info failed ' + error);
		console.log("user login error :" + JSON.stringify(error));
		//res.status(403).send("unauthorized");
		
		var locals = { error : error, process : 'oauth login ' };
		res.render('error',locals);
	});

});

app.use('/oauth/resource', function(req, res) {
    
    if (req.method == 'POST'){
        console.log(req.body);
        var resource_token = req.body.resource_token;
        
        sessionService.getOAuthSession(resource_token,function(data){
        
            console.log("data from the session **************************");
            console.log(data);
            
            //this part do the permission check
            
            
            var temp = { check : true };
            console.log("send response:  "+JSON.stringify(temp));
            res.status(200).send(JSON.stringify(temp));


        },function(error){
			var locals = { error : error };
			res.render('error',locals);
		});

    }
    
    if (req.method == 'GET'){
        console.log(req.query);
        var resource_token = req.query.resource_token;
        
        sessionService.getOAuthSession(resource_token,function(data){
        
            console.log("data from the session **************************");
            console.log(data);
            
            //this part do the permission check
            
            
            var temp = { check : true };
            console.log("send response:  "+JSON.stringify(temp));
            res.status(200).send(JSON.stringify(temp));


        });
    }
    
});