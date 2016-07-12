$(function(){
	$('#usersForm').addClass('animated fadeInDown');
	$('#usersForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#usersForm').removeClass('animated fadeInDown');
	});
});