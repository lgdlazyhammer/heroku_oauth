$(function(){
	$('#registerForm').addClass('animated fadeInDown');
	$('#registerForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#registerForm').removeClass('animated fadeInDown');
	});
 });