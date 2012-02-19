var socket = io.connect('http://localhost:80');

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("What's your name?"));
	$('#new_message').focus()
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
	$('#messages').append(
	  '<div class="message">('+getTimestamp()+') <b>'+username+'</b>: '+data+'</div>');
	notify()
});

// on load of page
$(function(){
	// when the client clicks SEND
	$('#send_message').click( function() {
		var message =  $('#new_message').val();
		$('#new_message').val('');
		// tell server to execute 'sendchat' and send along one parameter
		socket.emit('sendchat', message);
		$('#new_message').focus()
	});

	// when the client hits ENTER on their keyboard
	$('#new_message').keypress(function(e) {
	  resetTitle();
		if(e.which == 13) {
			$(this).blur();
			$('#send_message').focus().click();
			$('#new_message').focus()
		}
	});
	
	$(window).focus(function() {
    resetTitle();
  });
  
  $('#new_message').focus(function() {
    resetTitle();
  });
});

function getTimestamp() {
  var timestamp = new Date();
  return  timestamp.getHours() + ':' + 
          timestamp.getMinutes() + ':' +
          timestamp.getSeconds()
}

function notify() {
  $('#ding').html(
    "<embed src='/audio/ding.wav' hidden=true autostart=true loop=false>");
  notifyTitle();
}

function notifyTitle() {
  $(document).attr('title', "New Message");
}

function resetTitle() {
  $(document).attr('title', "Conquest Chat");
}