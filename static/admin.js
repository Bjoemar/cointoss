var socket = io();
var result;

$('#coin-btn').click(function(){
	result = 1;
	socket.emit('game_administrator',result);
});
$('#coin-btn2').click(function(){
	result = 2;
	socket.emit('game_administrator',result);
});

$('#coin-btn').click(function(){
	$('#coin').show();
	$('#coin2').hide();
})
$('#coin-btn2').click(function(){
	$('#coin2').show();
	$('#coin').hide();
})