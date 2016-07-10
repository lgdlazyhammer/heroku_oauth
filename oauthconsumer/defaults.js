var defaults = module.exports = {
  // database host. defaults to localhost
  host: '120.25.102.53',

  //database user's name
  port: '4000'
};

//parse int8 so you can get your count values as actual numbers
module.exports.__defineSetter__("parseInt8", function(val) {
  require('pg-types').setTypeParser(20, 'text', val ? parseInt : function(val) { return val; });
});
