var socket = io();


socket.on('sec',function(seconds){

	if(seconds <= 10){

		$('.coinAnimation').show();
		resetGame();
	}

	if (seconds < 10 ) {
		$('#bet-time').html('00 : 0'+seconds);
	}else {
		$('#bet-time').html('00 : '+seconds);
	}
	if (seconds == 10) {
		$('#loading').css('width','90%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('10 초');

	} else if (seconds == 9) {
		$('#loading').css('width','80%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('9 초');

	}else if (seconds == 8) {
		$('#loading').css('width','70%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('8 초');

	}else if (seconds == 7) {
		$('#loading').css('width','60%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('7 초');

	}else if (seconds == 6) {
		$('#loading').css('width','50%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('6 초');

	}else if (seconds == 5) {
		$('#loading').css('width','40%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('5 초');

	}else if (seconds == 4) {
		$('#loading').css('width','30%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('4 초');

	}else if (seconds == 3) {
		$('#loading').css('width','20%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('3 초');

	}else if (seconds == 2) {
		$('#loading').css('width','10%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('2 초');

	}else if (seconds == 1) {
		$('#loading').css('width','0%')
		$('#loading').css('transition','width 1s linear')
		$('#timer').html('1 초');
		

	}else if (seconds == 59) {
		$('#loading').css('width','100%')
		$('#loading').css('transition','none')
		$('#timer').html('오프닝');

	}else if (seconds == 55){

	}

});

socket.emit('newVisitors');
  


socket.on('loadData', function(data){

	
	$('#topRounds').html(data[0].rounds + 1 );
	$('.lvl span').html(data[0].rounds);
	$('.hashCode span').html(data[0].hash);

	$('.coinAnimation').hide();

	if(data[0].gameresult == 1){

		$('.r-res').show();

	} else if(data[0].gameresult == 2){

		$('.b-res').show();
	}

		$('.hands').show();

		$('.hand-bottom').css({
			'top' : '50px',
		},250);

		$('.hand-top').css({
			'left' : '100px',
			'top' : '-237px',
		},250);


});






	socket.on('gameData',function(data){


		setTimeout(function(){
			$('#topRounds').html(data.rounds + 1);
			$('.lvl span').html(data.rounds);
		},1000);

			

		setTimeout(function(){

			$('.coinAnimation').attr('src','assets/images/coin-flip.gif');

			setTimeout(function(){

				$('.coinAnimation').attr('src','assets/images/coin-flip.jpg');
				$('.coinAnimation').hide();

					setTimeout(function(){
						if(data.result == 1){

							$('.r-res').show();
							
						} else if(data.result == 2){

							$('.b-res').show();
						}
					},1000);


					$('.hands').show();


					$('.hand-bottom').animate({
						'top' : '50px',
					},250);

					$('.hand-top').animate({
						'left' : '80px',
					},250);

						setTimeout(function(){
							$('.hand-top').animate({
								'top' : '-230px',
							},2000);

						},2000)

				},2000);

		},1000);
	});


function resetGame(){
	$('.coin-middle').hide();
	$('.hands').hide();
	$('.hand-bottom').css('top' , '618px');
	$('.hand-top').css('top' , '90px');
	$('.hand-top').css('left' , '854px');
}



$('#resultDirect').click(function(){

	$('#round-history').modal('show');
	$('#resultIframe').attr('src',$('#resultIframe').attr('src'));
	
});