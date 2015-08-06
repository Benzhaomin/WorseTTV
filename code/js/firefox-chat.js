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
  self.port.emit("worsettv.message.diagnose", msg);
};

self.port.on("worsettv.message.ill", function(msg) {
  // rebuild a message object after it has been deserialized by the port
  message.from_id(msg.id).status('ill');
});

self.port.on("worsettv.message.sane", function(msg) {
  // rebuild a message object after it has been deserialized by the port
  message.from_id(msg.id).status('sane');
});

self.port.on("worsettv.chat.observer.start", function() {
  chat.observer.start(on_chat_message);
});

self.port.on("worsettv.chat.observer.stop", function() {
  chat.observer.stop();
});

self.port.on("detach", function() {
  chat.observer.stop();
});
