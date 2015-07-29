
var symptoms = module.exports = {
  
  // message must have a minimum of {count} words
  MinimumWordCount: function(count) {
    return {
      exhibited_by: function(text) {
        return text.split(' ').length < count;
      },
    };
  },
  
  // message must have a maximum of a {ratio} upper to lower characters
  CapsRatio: function(ratio) {
    return {
      exhibited_by: function(text) {
        return text.replace(/[a-z]/g, '').length / text.length > ratio;
      },
    };
  },
  
  // message must have a maximum of {count} emotes
  MaximumEmoteCount: function(count) {
    return {
      exhibited_by: function(text) {
        return count_emotes(text) > count;
      },
    };
  },
}


function count_emotes(text) {
  var emotes = ['4Head','ANELE','ArgieB8','ArsonNoSexy','AsianGlow','AtGL','AthenaPMS','AtIvy','AtWW','BabyRage','BatChest','BCWarrior','BibleThump','BigBrother','BionicBunion','BlargNaut','BloodTrail','BORT','BrainSlug','BrokeBack','BuddhaBar','CoolCat','CorgiDerp','CougarHunt','DAESuppy','DansGame','DatHass','DatSheffy','DBstyle','deExcite','deIlluminati','DendiFace','DogFace','DOOMGuy','EagleEye','EleGiggle','EvilFetus','FailFish','FPSMarksman','FrankerZ','FreakinStinkin','FUNgineer','FunRun','FuzzyOtterOO','GasJoker','GingerPower','GrammarKing','HassanChop','HeyGuys','HeyyyLulu','HotPokket','HumbleLife','ItsBoshyTime','Jebaited','JKanStyle','JonCarnage','KAPOW','Kappa','KappaPride','Keepo','KevinTurtle','Kippa','Kreygasm','KreyGasm','KZskull','Mau5','mcaT','MechaSupes','MrDestructoid','MVGame','NightBat','NinjaTroll','NoNoSpot','NotAtk','OMGScoots','OneHand','OpieOP','OptimizePrime','OSbeaver','OSbury','OSdeo','OSfrog','OSkomodo','OSrob','OSsloth','panicBasket','PanicVis','PazPazowitz','PeoplesChamp','PermaSmug','PicoMause','PipeHype','PJHarley','PJSalt','PMSTwin','PogChamp','Poooound','PraiseIt','PRChase','PunchTrees','PuppeyFace','RaccAttack','RalpherZ','RedCoat','ResidentSleeper','RitzMitz','RuleFive','Shazam','shazamicon','ShazBotstix','ShibeZ','SMOrc','SMSkull','SoBayed','SoonerLater','SriHead','SSSsss','StoneLightning','StrawBeary','SuperVinlin','SwiftRage','tbBaconBiscuit','tbChickenBiscuit','tbQuesarito','tbSausageBiscuit','tbSpicy','tbSriracha','TF2John','TheKing','TheRinger','TheTarFu','TheThing','ThunBeast','TinyFace','TooSpicy','TriHard','TTours','UleetBackup','UncleNox','UnSane','VaultBoy','Volcania','WholeWheat','WinWaker','WTRuck','WutFace','YouWHY','FeelsBadMan','BibleThump','KKona','GabeN','SourPls','ditto','(ditto)','FeelsGoodMan'];
  var count = 0;
  
  emotes.forEach(function(emote) {
    if (text.indexOf(emote) != -1) {
      count = count + occurrences(text, emote);
    }
  });
  
  return count;
}

/** Function count the occurrences of substring in a string;
 * @param {String} string   Required. The string;
 * @param {String} subString    Required. The string to search for;
 * @param {Boolean} allowOverlapping    Optional. Default: false;
 * http://stackoverflow.com/a/7924240/4853199
 */
function occurrences(string, subString, allowOverlapping){

    string+=""; subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
}

