
module.exports = (function() {

  // plain list of global emotes
  var _emotes = ['4Head','ANELE','ArgieB8','ArsonNoSexy','AsianGlow','AtGL','AthenaPMS','AtIvy','AtWW','BabyRage','BatChest','BCWarrior','BibleThump','BigBrother','BionicBunion','BlargNaut','BloodTrail','BORT','BrainSlug','BrokeBack','BuddhaBar','CoolCat','CorgiDerp','CougarHunt','DAESuppy','DansGame','DatHass','DatSheffy','DBstyle','deExcite','deIlluminati','DendiFace','DogFace','DOOMGuy','EagleEye','EleGiggle','EvilFetus','FailFish','FPSMarksman','FrankerZ','FreakinStinkin','FUNgineer','FunRun','FuzzyOtterOO','GasJoker','GingerPower','GrammarKing','HassanChop','HeyGuys','HeyyyLulu','HotPokket','HumbleLife','ItsBoshyTime','Jebaited','JKanStyle','JonCarnage','KAPOW','Kappa','KappaPride','Keepo','KevinTurtle','Kippa','Kreygasm','KreyGasm','KZskull','Mau5','mcaT','MechaSupes','MrDestructoid','MVGame','NightBat','NinjaTroll','NoNoSpot','NotAtk','OMGScoots','OneHand','OpieOP','OptimizePrime','OSbeaver','OSbury','OSdeo','OSfrog','OSkomodo','OSrob','OSsloth','panicBasket','PanicVis','PazPazowitz','PeoplesChamp','PermaSmug','PicoMause','PipeHype','PJHarley','PJSalt','PMSTwin','PogChamp','Poooound','PraiseIt','PRChase','PunchTrees','PuppeyFace','RaccAttack','RalpherZ','RedCoat','ResidentSleeper','RitzMitz','RuleFive','Shazam','shazamicon','ShazBotstix','ShibeZ','SMOrc','SMSkull','SoBayed','SoonerLater','SriHead','SSSsss','StoneLightning','StrawBeary','SuperVinlin','SwiftRage','tbBaconBiscuit','tbChickenBiscuit','tbQuesarito','tbSausageBiscuit','tbSpicy','tbSriracha','TF2John','TheKing','TheRinger','TheTarFu','TheThing','ThunBeast','TinyFace','TooSpicy','TriHard','TTours','UleetBackup','UncleNox','UnSane','VaultBoy','Volcania','WholeWheat','WinWaker','WTRuck','WutFace','YouWHY','FeelsBadMan','BibleThump','KKona','GabeN','SourPls','ditto','(ditto)','FeelsGoodMan'];

  // long string with all emotes concatenated
  // TODO: needed?
  //var _emotes_string = _emotes.join('');

  // checks the word against our local emotes list
  var _is_emote = function(word) {
    return _emotes.some(function(emote) {
      return emote === word;
    });
  };

  // reverse _is_emote to ease text filtering
  var _is_not_emote = function(word) {
    return !_is_emote(word);
  };

  // checks whether a word looks like an emote
  // TODO: develop the fuzzy checks further
  /*var _quacks_like_emote = function(word) {
    return /[A-Z][a-z]*[A-Z0-9]/.test(word);
  };*/

  // returns true if the text contains at least one emote
  var any_in = function(text) {
    return text.split(' ').some(_is_emote);
  };

  // returns the number of emotes found in the text
  var count = function(text) {
    return text.split(' ').filter(_is_emote).length;
  };

  // removes all emotes found in the text
  var strip = function(text) {
    return text.split(' ').filter(_is_not_emote).join(' ');
  };

  // public API
  return {
    any_in: any_in,
    count: count,
    strip: strip,
  };

})();
