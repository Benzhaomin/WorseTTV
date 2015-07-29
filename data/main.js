
chat = require('./chat')
emotes = require('./emotes')
diagnosis = require('./diagnosis')

chat.on_message(function(node) {
  //console.log("will process", node.innerHTML);
  
  message = node.querySelector('span.message');
  text = emotes.to_plain(message);
  
  if (!diagnosis.is_sane(text)) {
    node.style = "font-size: 8px;";
    message.innerHTML = text;
    
    console.log("Cancer cured:", text);
  }
  
});



