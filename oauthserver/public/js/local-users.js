$(function(){
	$('#usersForm').addClass('animated fadeInDown');
	$('#usersForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#usersForm').removeClass('animated fadeInDown');
	});
	//var parseDat = $("#testform").serialize();
	
	var getUserAllOption = {
		type: 'POST',
		url: '/local/userall',
		data: {},
		content: document.getElementById("displayUsers"),
		dataType: 'json',
		success: function(data){
			console.log(data);
			//$('#displayUsers').render(data.users);
			//$(this).render(data.users);
			// or
			Transparency.render(document.getElementById('displayUsers'), data.users);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
			//document.getElementById('confirmUsersGetFailButton').click();
			$('#confirmUsersGetFailButton').click();
			/*var comment = document.getElementById('confirmUsersGetFailButton');

			if (document.all) {
			// For IE

			comment.click();

			} else if (document.createEvent) {
			//FOR DOM2
			var ev = document.createEvent('HTMLEvents');

			ev.initEvent('click', false, true);
			comment.dispatchEvent(ev);
			}*/
		},
		timeout: function(data){
			console.log(data);
			//document.getElementById('confirmUsersGetTimeoutButton').click();
			$('#confirmUsersGetTimeoutButton').click();
		}
	};
	//initialize the page
	$.ajax(getUserAllOption);
	//get user all	
	$("#refreshUsersTable").click(function(){
		console.log("try to refresh page.");
		$.ajax(getUserAllOption);
	});
	
	$("#localUserAddUserForm").submit(function(event){
		event.preventDefault();
		console.log("try to add user.");
		
		var addUserOption = {
			type: 'POST',
			url: '/local/useradd',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('#confirmUserAddSuccessButton').click();	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmUserAddFailButton').click();
			},
			timeout: function(data){
				$('#confirmUserAddTimeoutButton').click();
			}
		};
		//add user request
		$.ajax(addUserOption);
		return false;
	});
	
	
});