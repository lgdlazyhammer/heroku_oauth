$(function(){
	$('#supervisionDealForm').addClass('animated fadeInDown');
	$('#supervisionDealForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#supervisionDealForm').removeClass('animated fadeInDown');
	});
	
	$('#supervisionDealDisplayTable').addClass('animated fadeInDown');
	$('#supervisionDealDisplayTable').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#supervisionDealDisplayTable').removeClass('animated fadeInDown');
	});
	//initialize the bootstrap switch
	$("#supervisionCheckSwitch").bootstrapSwitch();
	//$("[name='local-supervsion-checkbox']").bootstrapSwitch();
	/*$('#submitSupervisionDealFormForm').click(function(event){
		console.log($("#supervisionCheckSwitch > .bootstrap-switch").hasClass('bootstrap-switch-on'));

	});*/
	
	var getSupervisionRelationAllOption = {
		type: 'POST',
		url: '/local/authorizationrelationall',
		data: {},
		content: document.getElementById("displaySupervisionRelations"),
		dataType: 'json',
		success: function(data){
			console.log(data);
			Transparency.render(document.getElementById('displaySupervisionRelations'), data.supervisionRelations);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
			//document.getElementById('confirmUsersGetFailButton').click();
			$('#confirmSupervisionRelationsGetFailButton').click();
		},
		timeout: function(data){
			console.log(data);
			//document.getElementById('confirmUsersGetTimeoutButton').click();
			$('#confirmSupervisionRelationsGetTimeoutButton').click();
		}
	};
	//initialize the page
	$.ajax(getSupervisionRelationAllOption);
	//get user all	
	$("#refreshSupervisionRelationsTable").click(function(){
		console.log("try to refresh page.");
		$.ajax(getSupervisionRelationAllOption);
	});

	 // bind to the form's submit event 
    $('#supervisionDealFormForm').submit(function(event) { 
		event.preventDefault();
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        //$(this).ajaxSubmit(options); 
		var addSupervisionRelationOption = {
			type: 'POST',
			url: '/local/authorizationrelationadd',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('#confirmSupervisionRelationAddSuccessButton').click();	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmSupervisionRelationAddFailButton').click();
			},
			timeout: function(data){
				$('#confirmSupervisionRelationAddTimeoutButton').click();
			}
		};
		//add consumer request
		$.ajax(addSupervisionRelationOption);
 
		return false;
    });
});