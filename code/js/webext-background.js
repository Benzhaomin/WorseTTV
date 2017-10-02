/**
  Twitch No Cancerino, a browser extension to filter cancer out of Twitch's chat.
  Copyright (C) 2015-2017 Benjamin Maisonnas

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

var diagnosis = require('./modules/diagnosis');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log('[webext-background] ' + request.message);
    if (request.message === "worsettv.message.diagnose") {
      var tab_message = {"msg": request.msg};

      //console.log('[webext-background] diagnosis request for text ' + request.msg.text + ' on node ' + request.msg.id);

      if (!diagnosis.cancer(request.msg)) {
        //console.log('[webext-background] sane message here');
        tab_message.message = "worsettv.message.sane";
      }
      else {
        //console.log('[webext-background] ill message here');
        tab_message.message = "worsettv.message.ill";
      }

      chrome.tabs.sendMessage(sender.tab.id, tab_message);
    }
  }
);
