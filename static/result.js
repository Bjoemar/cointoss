var socket = io();

var innerwidth = 50;

var today = new Date();
 var M = today.getMonth() + 1;
 var D = today.getDate();
 var Y = today.getFullYear();

 if (M < 10) {
 	if (D < 10) {

 		var today_data_date = Y+'-0'+M+'-0'+D;
 	} else {
 		var today_data_date = Y+'-0'+M+'-'+D;
 	}
 } else {
 	if (D < 10) {
 		var today_data_date = Y+'-'+M+'-0'+D;
 	} else {
 		var today_data_date = Y+'-'+M+'-'+D;
 	}
 }

 $('.table-loading').show();



$('#result-limit').change(function(){
	$('.table-loading').show();
	var result_limit = $('#result-limit option:selected').val();
	var result_limit = parseInt(result_limit)
	socket.emit('LoadMoreResult',{'result_limit' : result_limit , 'today_data_date'  : today_data_date});

	innerwidth = 50;

	$('#result-limit').css({
		'pointer-events' : 'none',
	})

});

function process(today_data_date) {

	var result_limit = $('#result-limit option:selected').val();
	// console.log(result_limit)
	var result_limit = parseInt(result_limit)
	socket.emit('LoadMoreResult',{'result_limit' : result_limit , 'today_data_date'  : today_data_date});

	innerwidth = 50;

	$('#result-limit').css({
		'pointer-events' : 'none',
	})
}

$('#sniff_result').click(function(){

	process(today_data_date);

	$('.categ').css({
		'pointer-events' : 'none'
	})
	$('.table-loading').show();
});

$(document).ready(function(){
	socket.emit('newVisitors',{today_data_date});
})

var lastresType = '';
var sizelimiter = 0;
var loading = true;



socket.on('gameData',function(newdata){
	// console.log(newdata)

	setTimeout(function(){

			if (lastresType == newdata.result) {

		  		if (newdata.result == '2') {

			  		lastresType = '2';
			  		$('.innerResult .columns').last().append('<dd><div class="circle-red res-circle">'+newdata.rounds+'</div></dd>');

			  	} else if (newdata.result == '1') {

			  		lastresType = '1';
			  		$('.innerResult .columns').last().append('<dd><div class="circle-blue res-circle">'+newdata.rounds+'</div></dd>');

			  	}

			 } else {

			 	innerwidth = (innerwidth + 35) - 1;

			 	if (newdata.result == '2') {

			 		lastresType = '2';
			 		$('.innerResult').append('<dl class="columns sred"><dt>B</dt><dd><div class="circle-red res-circle">'+newdata.rounds+'</div></dd></dl>');

			 	}else if (newdata.result == '1'){

			 		lastresType = '1';
			 		$('.innerResult').append('<dl class="columns sblue"><dt>R</dt><dd><div class="circle-blue res-circle">'+newdata.rounds+'</div></dd></dl>');

			 	}

			 }


			 if (loading == false) {
			 	$('.innerResult').css({
			 		width : innerwidth,
			 	});
			 	$('.resultHolder').animate({scrollLeft : innerwidth},500);
			 }

	},7500);

});

setTimeout(function(){
	if (loading == true) {
		 // location.reload(true);
	}
	
	var innersizelimiter = $('.columns').length;

	var innerwidthsize = (innersizelimiter * 34) + 500;
	
	if (innerwidth > innerwidthsize) {
		// location.reload(true);
	}

},3000);

socket.on('loadData',function(prevdata){

	loading = false;

	$('innerResult').html('');

	getSecondary(prevdata);

	$('.categ').css({
		'pointer-events' : 'auto',
	});
});

function getSecondary(prevdata) {

	$('.innerResult').css({
		width : 50,
	});

	$('.innerResult').html('');

	var pastLen = prevdata.length;
		
	  for (p = pastLen - 1;  p >= 0 ; p--){

	  	var pastdata = prevdata[p];	
		if (lastresType == pastdata.gameresult) {

	  		if (pastdata.gameresult == '2') {
		  		lastresType = '2';
		  		$('.innerResult .columns').last().append('<dd><div class="circle-red res-circle">'+pastdata.rounds+'</div></dd>');
		  	} else if (pastdata.gameresult == '1') {
		  		lastresType = '1';
		  		$('.innerResult .columns').last().append('<dd><div class="circle-blue res-circle">'+pastdata.rounds+'</div></dd>')
		  	}

		} else {

	  		innerwidth = (innerwidth + 35) - 1;
		  	if (pastdata.gameresult == '2') {
		  		lastresType = '2';
		  		$('.innerResult').append('<dl class="columns sred"><dt>B</dt><dd><div class="circle-red res-circle">'+pastdata.rounds+'</div></dd></dl>');

		  	} else if (pastdata.gameresult == '1') {

		  		lastresType = '1';
		  		$('.innerResult').append('<dl class="columns sblue"><dt>R</dt><dd><div class="circle-blue res-circle">'+pastdata.rounds+'</div></dd></dl>');
	        }
	    }
	} //end forLoop for prevdata

	  $('.innerResult').css({
	  	  width : innerwidth ,
	  });


		$('#result-limit').css({
			'pointer-events' : 'auto',
		})


		$('.resultHolder').animate({scrollLeft : innerwidth},500);

		$('.table-loading').fadeOut();

} //end getSecondary function


$('#goLeft').click(function(){

	$ ('#goLeft').css({
		'pointer-events' : 'none',
	});

	var scrollLen = $('.resultHolder').scrollLeft();
	var movement = scrollLen + 300;
	$('.resultHolder').animate({scrollLeft : movement },function(){
	 	$('#goLeft').css({
			'pointer-events' : 'auto',
		})

	});

})

$('#goRight').click(function(){
	$('#goRight').css({
		'pointer-events' : 'none',
	});

	var scrollLen = $('.resultHolder').scrollLeft();
	var movement = scrollLen - 300;

	$('.resultHolder').animate({scrollLeft : movement },function(){
		$('#goRight').css({
			'pointer-events' : 'auto',
		})
	});
})