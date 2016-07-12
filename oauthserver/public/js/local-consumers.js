$(function(){
	$('#consumersForm').addClass('animated fadeInDown');
	$('#consumersForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#consumersForm').removeClass('animated fadeInDown');
	});
});