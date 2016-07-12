$(function(){
	$('#logsForm').addClass('animated fadeInDown');
	$('#logsForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#logsForm').removeClass('animated fadeInDown');
	});
});