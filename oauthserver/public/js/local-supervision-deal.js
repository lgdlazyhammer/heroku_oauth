$(function(){
	$('#supervisionDealForm').addClass('animated fadeInDown');
	$('#supervisionDealForm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#supervisionDealForm').removeClass('animated fadeInDown');
	});
	//initialize the bootstrap switch
	$("[name='local-supervsion-checkbox']").bootstrapSwitch();
	$('#submitSupervisionDealFormForm').click(function(event){
		console.log($("#supervisionCheckSwitch > .bootstrap-switch").hasClass('bootstrap-switch-on'));

	});
	//
	 // bind to the form's submit event 
    $('#supervisionDealFormForm').submit(function(event) { 
		event.preventDefault();
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        //$(this).ajaxSubmit(options); 
 
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        //return false; 
		return false;
    });
});