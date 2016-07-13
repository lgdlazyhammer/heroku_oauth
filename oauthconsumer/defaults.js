var defaults = module.exports = {
  // database host. defaults to localhost
  //a li cloud server ip
  //host: '120.25.102.53',
  //host: 'localhost',
  //heroku server ip
  host: 'oauthserver.herokuapp.com',

  //a li cloud server port
  //port: '4000'
  //heroku server port
  port: '443'
};

//parse int8 so you can get your count values as actual numbers
module.exports.__defineSetter__("parseInt8", function(val) {
  require('pg-types').setTypeParser(20, 'text', val ? parseInt : function(val) { return val; });
});
