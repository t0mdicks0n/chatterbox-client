// // // YOUR CODE HERE:
$(document).ready(function (){

  // function get tweets that get invoked on $('.roomselect').value()

  app.fetch();
  // $('.roomselect').value()

  $(this).on('change', '#roomselect', function() {
    getMessages(this.value);
  });

  $(this).on('click', '.username', function() {
    app.handleUsernameClick(); 
  })

  $(this).on('submit', '.submit', function() {
    app.handleSubmit(); 
  })



})






// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
//   type: 'GET',
//   success: function (data) {
//     console.log(data);
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

var app = {

};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function() {

};

app.send = function(message) {
// Write a message:
// var message = {
//   username: 'Charles',
//   text: 'Cheap lunch?',
//   roomname: 'lobby'
// };

// Post the message above:
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/' + message.roomname,
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
};

app.fetch = function() {
  $.get(app.server, function( data ) {
    data.results.forEach(function(element) {
      app.renderMessage(element);
    });
  });
};

app.clearMessages = function() {
  $('#chats').empty();
}

app.renderMessage = function(message) {
  // debugger;
  var $user = $('<div class="username"></div>');
  var $msg = $('<div></div>');
  var $chat = $('<div class="chat"></div>');

  $user.text(message.username);
  $msg.text(message.text);
  $chat.append($user);
  $chat.append($msg);

  $('#chats').prepend($chat);
} 

app.renderRoom = function(name) {
  var $room = $('<option value ="' + name + '">' + name + '</option>');
  $('#roomSelect').append($room);
}

app.handleUsernameClick = function() {

}

app.handleSubmit = function() {
  
}