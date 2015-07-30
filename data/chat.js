
var worsettv = worsettv || {};

worsettv.chat = (function () {
  
  // extract the content of a chat line, emotes are replaced by their title
  var _get_plain_text_message = function(node) {
    var message = node.querySelector('span.message');
    var text = message.innerHTML;

    // replace each img tag by its alt text
    Array.prototype.slice.call(message.querySelectorAll('img')).forEach(function(image) {
      text = text.replace(image.outerHTML, image.alt);
    });
    
    return text;
  };
  
  // observe the DOM and report addition of nodes
  var _observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.slice.call(mutation.addedNodes).forEach(function(node) {
        if (node instanceof Element) {
          _on_new_node(node);
        }
      });
    });
  });
  
  // react to the addition of a single new node
  var _on_new_node = function(node) {
    
    // extract a plain text message from the node
    text = _get_plain_text_message(node);
    
    //console.log("calling the doctor:", text);
    
    // send the node to the add-on code for diagnosis
    //console.log(callback);
    _callback(node.id, text);
  };
  
  // function to be called for node processing
  var _callback = function(node_id, text) { return true; };
  
  // change the opacity of chat messages
  var _set_message_opacity = function(opacity) {
    _inject_css('.ember-chat .chat-messages .chat-line { opacity: '+opacity+'; }');
  };
  
  // inject css rules in the document
  var _inject_css = function(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  };
  
  // observe addition to the chat's DOM, run a callback for each new message
  var observe = function(callback) {
      
    // abort if there's no chat to observe
    if (document.querySelector('.chat-lines') == null) {
      console.log("[chat.js] nothing to be observer on", document.title, document.URL);
      return;
    }
    
    // register the callback
    _callback = callback;
    
    // start observing the DOM
    _observer.observe(document.querySelector('.chat-lines'), { childList: true });
    console.log("[chat] starting to observe", document.title, document.URL);
    
    // hide messages starting now, we will show the sane ones after diagnosis
    _set_message_opacity(0.2);
  };
  
  // changes a DOM message to the ill status
  var ill_message = function(node_id, text) {
    var node = document.getElementById(node_id); 
    
    // abort on bogus nodess
    if (!node) return;
    
    node.className = node.className + " ill";
    //console.log("cancer cured:", text);
  };
  
  // changes a DOM message to the sane status  
  var sane_message = function(node_id, text) {
    var node = document.getElementById(node_id);
    
    // abort on bogus nodess
    if (!node) return;
    
    node.className = node.className + " sane";
  };
  
  // public API
  return {
    observe: observe,
    ill_message: ill_message,
    sane_message: sane_message,
  };

})();
