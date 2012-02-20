var socket = io.connect('http://localhost:80');

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'addUser' and send one parameter (value of prompt)
	socket.emit('addUser', prompt("What's your name?"));
	$('#new_message').focus()
});

// listener, whenever the server emits 'updateChat', this updates the chat body
socket.on('updateChat', function (userName, data) {
	$('#messages').append(
	  '<div class="message">('+getTimestamp()+') <b>'+userName+'</b>: '+data+'</div>');
	notify()
});

socket.on('updateChatterList', function (userNames) {
  $('#chatter-list').html('&nbsp;');
  userNames = keys(userNames).sort();
  $.each(userNames, function(key, value) {
  	$('#chatter-list').append(
  	  '<div class="chatter">'+value+'</div>');
	});
});

socket.on('updateRooms', function(rooms, current_room) {
	$('#room-list').empty();
	$.each(rooms, function(key, value) {
		if(value == current_room){
			$('#room-list').append('<div>' + value + '</div>');
		}
		else {
			$('#room-list').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
		}
	});
});

// on load of page
$(function(){
	// when the client clicks SEND
	$('#send_message').click( function() {
		var message =  $('#new_message').val();
		$('#new_message').val('');
		// tell server to execute 'sendChat' and send along one parameter
		socket.emit('sendChat', message);
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

function switchRoom(room){
	socket.emit('switchRoom', room);
}


function keys(obj){
  var keys = [];
  for(var key in obj) {
    keys.push(key);
  }
  return keys;
}