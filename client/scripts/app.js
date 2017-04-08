$(document).ready(function (){
  app.fetch();

  $(this).on('change', '#roomselect', function() {
    getMessages(this.value);
  });

  $(this).on('click', '.username', function() {
    app.handleUsernameClick(); 
  })

  $(this).on('submit', '.submit', function() {
    app.handleSubmit(); 
  })
});

var app = {

};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function() {

};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server + message.roomname,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
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
  var $user = $('<div class="username"></div>');
  var $msg = $('<div></div>');
  var $chat = $('<div class="chat"></div>');
  $user.text(message.username);
  $msg.text(escapeRegExp(message.text));
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

function escapeRegExp(str) {
  if (str === undefined) {
    return undefined;
  } else {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
  }
}

// Write a message:
// var message = {
//   username: 'Charles',
//   text: 'Cheap lunch?',
//   roomname: 'lobby'
// };