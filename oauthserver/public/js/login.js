 var queue = new createjs.LoadQueue();
 queue.installPlugin(createjs.Sound);
 queue.on("complete", handleComplete, this);
 queue.loadFile({id:"sound", src:"./radio/basketball.mp3"});
 //queue.loadManifest([
 //    {id: "myImage", src:"path/to/myImage.jpg"}
 //]);
 function handleComplete() {
     createjs.Sound.play("sound");
//     var image = queue.getResult("myImage");
//     document.body.appendChild(image);
 }
 
 $(function(){
	$('#loginForm').addClass('animated fadeInDown');
	$('#loginForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#loginForm').removeClass('animated fadeInDown');
	});
	
	$('#submitLoginFormAlertWindow').click(function(){
		console.log("clicked save alert window.");
		//this is useless because the form has been submitted and page refreshed
		//$('#closeLoginFormAlertWindow').click();
		$('#loginFormForm').submit();
	});
 });