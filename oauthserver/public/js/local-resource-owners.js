$(function(){
	$('#resourceOwnersForm').addClass('animated fadeInDown');
	$('#resourceOwnersForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#resourceOwnersForm').removeClass('animated fadeInDown');
	});
});