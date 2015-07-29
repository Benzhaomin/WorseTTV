
var WorseTTV = WorseTTV || {};

WorseTTV.diagnosis = {
  
  // checks whether a message has cancer
  is_sane: function(text) {
    if (text.indexOf("Kappa") != -1) {
      return false;
    }
    return true;
  }
}
