
if (document.querySelector('.chat-lines') != null) {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.slice.call(mutation.addedNodes).forEach(function(node) {
        if (node instanceof Element) {
          // extract a plain text message from the node
          text = get_plain_text_message(node);
          
          //console.log("calling the doctor:", text);
          
          // send the node to the add-on code for diagnosis
          self.port.emit("worsettv.diagnose", node.id, text);
        }
      });
    });
  });
    
  console.log("observing on", document.title, document.URL);

  observer.observe(document.querySelector('.chat-lines'), { childList: true });
}

// treat cancerous messages
self.port.on("worsettv.ill", function(node_id, text) {
  var node = document.getElementById(node_id); 
  
  node.className = node.className + " ill";
  console.log("cancer cured:", text);
});

// sane messages
self.port.on("worsettv.sane", function(node_id, text) {
  var node = document.getElementById(node_id);
  
  node.className = node.className + " sane";
});

// extract the content of a chat line, emotes are replaced by their title
function get_plain_text_message(node) {
  var message = node.querySelector('span.message');
  var text = message.innerHTML;

  // replace each img tag by its alt text
  Array.prototype.slice.call(message.querySelectorAll('img')).forEach(function(image) {
    text = text.replace(image.outerHTML, image.alt)
  });
  
  return text;
}
