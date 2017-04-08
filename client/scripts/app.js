var OBJECTIDS = {};

$(document).ready(function (){
  app.init();
  setInterval(app.fetch, 500);

  $(this).on('change', '#roomselect', function() {
    getMessages(this.value);
  });

  $(this).on('click', '.username', function() {
    app.handleUsernameClick(); 
  })

  $(this).on('submit', '#chatbox', function(event) {
    event.preventDefault();
    app.handleSubmit($('input').val());
    $('input').val('')
  })
});

var app = {

};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/';

app.init = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      data.results.forEach(function(element) {
        app.renderMessage(element);
        OBJECTIDS[element.objectId] = element.objectId;
        console.log(element)
      });
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.send = function(message) {
  $.ajax({
    url: app.server,
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
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      data.results.forEach(function(element) {
        if ((element.objectId in OBJECTIDS) !== true) {
          app.renderMessage(element, 'fetchReverse');
          OBJECTIDS[element.objectId] = element.objectId;
        }
      });
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
}

app.renderMessage = function(message, onFect) {
  var $user = $('<div class="username"></div>');
  var $msg = $('<div></div>');
  var $chat = $('<div class="chat"></div>');
  $user.text(message.username);
  $msg.text(escapeRegExp(message.text));
  $chat.append($user);
  $chat.append($msg);

  if (onFect !== undefined) {
    $('#chats').prepend($chat);
  } else {
    $('#chats').append($chat);
  }
  audio.play();
} 

app.renderRoom = function(name) {
  var $room = $('<option value ="' + name + '">' + name + '</option>');
  $('#roomSelect').append($room);
}

app.handleUsernameClick = function() {

}

app.handleSubmit = function(userMessage) {
  var user = parseQueryString(window.location.search).username;
  app.send({
    username: user,
    text: userMessage,
    roomname: 'lobby'
  });
}

function escapeRegExp(str) {
  if (str === undefined) {
    return undefined;
  } else {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
  }
}

var parseQueryString = function() {
  var str = window.location.search;
  var objURL = {};
  str.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          objURL[ $1 ] = $3;
      }
  );
  return objURL;
};

var audio = new Audio('tone.mp3');

// Write a message:
// var message = {
//   username: 'Charles',
//   text: 'Cheap lunch?',
//   roomname: 'lobby'
// };


// Deleter 
function deleter () {
  var messages = [];
  app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/';

  var fetch = function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        data.results.forEach(function(element) {
          messages.push(element.objectId)
        });
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  fetch();

  var deleteDB = function(contentKey) {
    $.ajax({
        url: app.server + contentKey,
        type: 'DELETE',
        success: function(){console.log('Deleted')},
        error: function(){console.log('Failed')}
    });
  }

  messages.forEach(function(objID) {
    deleteDB(objID);
  });
}