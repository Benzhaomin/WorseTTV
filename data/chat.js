
var WorseTTV = WorseTTV || {};

WorseTTV.chat = {
  
  on_message: function(callback) {
    var callthis = callback;
    console.log("! chat.on_message");
    
    if (document.querySelector('.chat-lines') != null) {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          Array.prototype.slice.call(mutation.addedNodes).forEach(function(node) {
            if (node instanceof Element) {
              callthis(node);
            }
          });
        });
      });
        
      console.log("observing on", document.title, document.URL);

      observer.observe(document.querySelector('.chat-lines'), { childList: true });
    }
  },
}

