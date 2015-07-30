
var started = false;

// shot the menu on right clicks inside the chat
/*self.on("context", function (node) {
  var chatbox = document.querySelector(".ember-chat");
  return chatbox != null && chatbox.contains(node);
});*/

chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    var activeTab = tabs[0];

    started = !started;

    if (started === true) {
      console.log("started curing");
      chrome.tabs.sendMessage(activeTab.id, {"message": "worsettv.chat.observer.start"});

      // curing is now On
      //this.label = "Restore Cancer";
      //this.image = self.data.url("img/kappa.png");
    }
    else {
      console.log("stopped curing");
      chrome.tabs.sendMessage(activeTab.id, {"message": "worsettv.chat.observer.stop"});

      // curing is now Off
      //this.label = "Cure Cancer";
      //this.image = self.data.url("img/kappa-pride.png");
    }
  });
});
