$(function(){
	$('#resourceOwnersForm').addClass('animated fadeInDown');
	$('#resourceOwnersForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#resourceOwnersForm').removeClass('animated fadeInDown');
	});
	
	var getResourceOwnerAllOption = {
		type: 'POST',
		url: '/local/resourceownerall',
		data: {},
		content: document.getElementById("displayResourceOwners"),
		dataType: 'json',
		success: function(data){
			console.log(data);
			Transparency.render(document.getElementById('displayResourceOwners'), data.resourceOwners);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
			//document.getElementById('confirmUsersGetFailButton').click();
			$('#confirmResourceOwnersGetFailButton').click();
		},
		timeout: function(data){
			console.log(data);
			//document.getElementById('confirmUsersGetTimeoutButton').click();
			$('#confirmResourceOwnersGetTimeoutButton').click();
		}
	};
	//initialize the page
	$.ajax(getResourceOwnerAllOption);
	//get user all	
	$("#refreshResourceOwnersTable").click(function(){
		console.log("try to refresh page.");
		$.ajax(getResourceOwnerAllOption);
	});
	
	
	$("#localUserAddResourceOwnerForm").submit(function(event){
		event.preventDefault();
		console.log("try to add ResourceOwner.");
		
		var addResourceOwnerOption = {
			type: 'POST',
			url: '/local/resourceowneradd',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('#confirmResourceOwnerAddSuccessButton').click();	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmResourceOwnerAddFailButton').click();
			},
			timeout: function(data){
				$('#confirmResourceOwnerAddTimeoutButton').click();
			}
		};
		//add consumer request
		$.ajax(addResourceOwnerOption);
		return false;
	});
	
});