// // // YOUR CODE HERE:


// Write a message:
var message = {
  username: 'Charles',
  text: 'Cheap lunch?',
  roomname: 'lobby'
};

// Post the message above:
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby/',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

// Get data:
$.get( "http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby/", function( data ) {
  console.log(data);
  alert( "Load was performed." );
});


$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  success: function (data) {
    console.log(data);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});