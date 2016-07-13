$(function(){
	$('#consumersForm').addClass('animated fadeInDown');
	$('#consumersForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#consumersForm').removeClass('animated fadeInDown');
	});
	
	var getConsumerAllOption = {
		type: 'POST',
		url: '/local/consumerall',
		data: {},
		content: document.getElementById("displayConsumers"),
		dataType: 'json',
		success: function(data){
			console.log(data);
			Transparency.render(document.getElementById('displayConsumers'), data.consumers);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
			//document.getElementById('confirmUsersGetFailButton').click();
			$('#confirmConsumersGetFailButton').click();
		},
		timeout: function(data){
			console.log(data);
			//document.getElementById('confirmUsersGetTimeoutButton').click();
			$('#confirmConsumersGetTimeoutButton').click();
		}
	};
	//initialize the page
	$.ajax(getConsumerAllOption);
	//get user all	
	$("#refreshConsumersTable").click(function(){
		console.log("try to refresh page.");
		$.ajax(getConsumerAllOption);
	});
	
	
	$("#localUserAddConsumerForm").submit(function(event){
		event.preventDefault();
		console.log("try to add consumer.");
		
		var addConsumerOption = {
			type: 'POST',
			url: '/local/consumeradd',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('#confirmConsumerAddSuccessButton').click();	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmConsumerAddFailButton').click();
			},
			timeout: function(data){
				$('#confirmConsumerAddTimeoutButton').click();
			}
		};
		//add consumer request
		$.ajax(addConsumerOption);
		return false;
	});
});