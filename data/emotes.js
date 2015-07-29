
var WorseTTV = WorseTTV || {};

WorseTTV.emotes = {
  
  // replace emotes <img> by plain text
  to_plain: function(node) {
    var message = node.innerHTML;
  
    // replace each img tag by its alt text
    Array.prototype.slice.call(node.querySelectorAll('img')).forEach(function(image) {
      message = message.replace(image.outerHTML, image.alt)
    });
    
    return message;
  }
}
