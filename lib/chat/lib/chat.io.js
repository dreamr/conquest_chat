var userNames = {};
var rooms = ['Lobby','Ops'];
var defaultRoom = "Lobby"

exports.socketCalls = function (io) {  
  io.sockets.on('connection', function (socket) {

  	// when the client emits 'sendChat', this listens and executes
  	socket.on('sendChat', function (data) {
  		// we tell the client to execute 'updateChat' with 2 parameters
  		io.sockets.in(socket.room).emit(
  		  'updateChat', socket.userName, data
  		);
  	});

  	// when the client emits 'addUser', this listens and executes
  	socket.on('addUser', function(userName){
  		// we store the userName in the socket session for this client
  		socket.userName = userName;
  		// store the default room name
  		socket.room = defaultRoom;
  		// add the client's userName to the global list
  		userNames[userName] = userName;
  		// Send them to the room
  		socket.join(defaultRoom);
  		// echo to client they've connected
  		socket.emit('updateChat', 'SERVER', 'you have connected');
  		// echo globally (all clients) that a person has connected
  		socket.broadcast.to(defaultRoom).emit(
  		  'updateChat', 'SERVER', userName + ' has connected'
  		);
  		// update the list of users in chat, client-side
  		io.sockets.to(defaultRoom).emit('updateChatterList', userNames);
  		socket.emit('updateRooms', rooms, defaultRoom);
  	});

  	socket.on('switchRoom', function(newRoom){
  		// leave the current room (stored in session)
  		socket.leave(socket.room);
  		// join new room, received as function parameter
  		socket.join(newRoom);
  		socket.emit(
  		  'updateChat', 'SERVER', 'you have connected to '+ newRoom
  		);
  		// sent message to OLD room
  		socket.broadcast.to(socket.room).emit(
  		  'updateChat', 'SERVER', socket.userName+' has left this room'
  		);
  		// update socket session room title
  		socket.room = newRoom;
  		socket.broadcast.to(newRoom).emit(
  		  'updateChat', 'SERVER', socket.userName+' has joined this room'
  		);
  		socket.emit('updateRooms', rooms, newRoom);
  		io.sockets.to(defaultRoom).emit('updateChatterList', userNames);
  	});


    // when the user disconnects.. perform this
  	socket.on('disconnect', function(){
  		// remove the userName from global userNames list
  		delete userNames[socket.userName];
  		// update list of users in chat, client-side
  		io.sockets.to(defaultRoom).emit('updateChatterList', userNames);
  		// echo globally that this client has left
  		socket.broadcast.emit(
  		  'updateChat', 'SERVER', socket.userName + ' has disconnected'
  		);
  		socket.leave(socket.room);
  	});
  });
  
}
