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
app.use(session({ secret: 'keyboard cat' , cookie: { maxAge: 60000 }}));
app.set('port', (process.env.PORT || 3000));
//use cookie parser to get request cookies value
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var path = require('path');
//generate a random unique string
var rs = require('random-strings');
var http = require('http');

const https = require('https');
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

var fs = require("fs");

var defaults = require('./defaults.js');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// use either jade or ejs
app.set('view engine', 'ejs');   
// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));    
// instruct express to server up static assets
app.use(express.static( path.join(__dirname, 'public')));
app.use(express.static( path.join(__dirname, 'js')));
app.use(express.static( path.join(__dirname, 'logs')));
// Set server port
app.listen(app.get('port'),function(){
	
	console.log( networkInterfaces );
	logger.info('Node app is running on ip ' + JSON.stringify(networkInterfaces));
	logger.info('Node app is running on ip ' + serverIp.address());
	logger.info('Node app remote server ip ' + defaults.host);
	logger.info('Node app is running on port ' + app.get('port'));
	console.log('Node app is running on port', app.get('port'));
});

// set routes
app.use('/logs', function(req, res) {
	
	fs.readdir(__dirname+"/logs/",function(err, files){
		if (err) {
			logger.error('read logs failed! ' + err);
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


// set routes
app.use('/oauth/login', function(req, response) {
    
    var consumer_info="", consumer_token="";
    
    var postData = querystring.stringify({
      'key' : 'adfsa', 'secret':'fsdfs', 'ip':serverIp.address(), 'port':app.get('port'), 'callback_url':'/oauth/callback'
    });

	var options = {
		hostname: defaults.host,
		port: defaults.port,
		path: '/',
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
		}
	};

	var req = https.request(options, (res) => {
		console.log('statusCode: ', res.statusCode);
		console.log('headers: ', res.headers);

		res.on('data', (d) => {
			console.log(`BODY: ${d}`);
            consumer_info += d;
		});
		res.on('end', () => {
			//parse the consumer
			if(res.statusCode == 200){
				logger.info('oauth authorize request successed. ');
				console.log("received consumer info:  "+consumer_info);
				consumer_token = JSON.parse(consumer_info).consumer_token;
				console.log('No more data in response.');
				//get the response set-cookie value and set to the new request
				//response["set-cookie"] = res.headers["set-cookie"];
				response.redirect(301, 'http://'+defaults.host+':'+ defaults.port+'/oauth/login?consumer_token='+consumer_token);
			}
		});
	});
	req.write(postData);
	req.end();
	
	req.on('error', (err) => {
	  logger.error('oauth authorize request failed. ' + JSON.stringify(err));
		console.log(`problem with request: ${err.message}`);
		var locals = { error : err, process : 'oauth login' };
		response.render('error',locals);
	});
    
    /*var options = {
        hostname: defaults.host,
        port: defaults.port,
        path: '/oauth/authorize',
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
        }
    };

    var req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);        
        //console.log(res.headers["set-cookie"]);
        
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            consumer_info += chunk;
        });
        res.on('end', () => {
            //parse the consumer
            if(res.statusCode == 200){
				logger.info('oauth authorize request successed. ');
                console.log("received consumer info:  "+consumer_info);
                consumer_token = JSON.parse(consumer_info).consumer_token;
                console.log('No more data in response.');
                //get the response set-cookie value and set to the new request
                //response["set-cookie"] = res.headers["set-cookie"];
				response.redirect(301, 'http://'+defaults.host+':'+ defaults.port+'/oauth/login?consumer_token='+consumer_token);
            }
        })
    });
    
    req.on('error', (err) => {
		logger.error('oauth authorize request failed. ' + JSON.stringify(err));
		console.log(`problem with request: ${err.message}`);
		var locals = { error : err, process : 'oauth login' };
		response.render('error',locals);
    });

    // write data to request body
    req.write(postData);
    req.end();*/
});

app.use('/oauth/callback', function(req, res) {
    
    if (req.method == 'POST'){
        console.log(req.body);
        var locals = { resource_token: req.body.resource_token };
        
        res.render('index',locals);
    }
    
    if (req.method == 'GET'){
        console.log(req.query);
        var locals = { resource_token: req.query.resource_token };
        
        res.render('index',locals);
    }
    
});

app.use('/oauth/resource', function(req, response) {
    
    if (req.method == 'POST'){
        console.log(req.body);
        var locals = { resource_token: req.body.resource_token };
        
        res.render('index',locals);
    }
    
    if (req.method == 'GET'){
        console.log(req.query);
        var resource_token = req.query.resource_token;
        var resource_approval = '';
        
        var postData = querystring.stringify({'resource_token' : resource_token });
    
        var options = {
            hostname: '',
            port: 5000,
            path: '/oauth/resource',
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
            }
        };

        var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);        
            //console.log(res.headers["set-cookie"]);

            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                resource_approval += chunk;
            });
            res.on('end', () => {
                //parse the consumer
                if(res.statusCode == 200){
                    //consumer_token = JSON.parse(resource_approval).consumer_token;
                    // 数据以json形式返回
                    console.log(JSON.parse(resource_approval).resource_url);
                    var locals = { resource_url : JSON.parse(resource_approval).resource_url };
                    response.render('resource',locals);
                }
            })
        });

        req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(postData);
        req.end();
        
    }
    
});