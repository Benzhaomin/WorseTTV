/**
  Twitch No Cancerino, a browser extension to filter cancer out of Twitch's chat.
  Copyright (C) 2015 Benjamin Maisonnas

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/gpl-3.0.en.html>.
*/

var chat = require('./modules/chat');
var message = require('./modules/message');

var on_chat_message = function(msg) {
  //console.log("[chrome-chat] emit(worsettv.diagnose): " + msg + ' ' + msg.text);

  chrome.runtime.sendMessage({
    "message": "worsettv.message.diagnose",
    "msg": msg
  });
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log('[chrome-chat] ' + request.message);

    if (request.message === "worsettv.message.ill") {
      // rebuild a message object after it has been deserialized by message passing
      message.from_id(request.msg.id).status("ill");
    }
    else if (request.message === "worsettv.message.sane") {
      // rebuild a message object after it has been deserialized by message passing
      message.from_id(request.msg.id).status("sane");
    }
    else if (request.message === "worsettv.chat.observer.start") {
      chat.observer.start(on_chat_message);
    }
    else if (request.message === "worsettv.chat.observer.stop") {
      chat.observer.stop();
    }
  }
);

/*
self.port.on("detach", function() {
  worsettv.chat.observer.stop();
});
*/
