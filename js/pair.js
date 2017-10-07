
//  constant declration
var imagesArray = ["d.jpg", "246736.966855.jpg", "Pair.gif", "sku_468885_6.jpg", "imagesdddd.jpg", "images-5.jpg","imagesdd.jpg", "imagess.jpg", "imgs.jpg", "images-4.jpg", "download.jpg", "246736.966855.jpg", "gg.jpeg", "im.jpg", "images-1.jpg", "parrot.jpg", "images-2.jpg", "images-3.jpg" , "images.jpg"];

// variables
var images = [];
var totalScore  = 0;
var matchCounter = 0;
var output ;
var counterPair =0;
var totalSeconds;
var minutesLabel ;
var secondsLabel;
// sound file object  
 var gameSound = new Howl({
  urls: ['https://raw.githubusercontent.com/goldfire/howler.js/master/tests/audio/sound1.mp3']
})
var incorrectPairSound = new Howl({
  urls: ['./audio/Wrong-answer-sound-effect.mp3']
})
var correctPairSound = new Howl({
  urls: ['./audio/button-3.wav']
})
var timeOutSound = new Howl({
  urls: ['./audio/sega_rally_-_15_game_over_yeah__2.mp3']
})
var winnerSound = new Howl({
  urls: ['./audio/savant.mp3']
})
var lossPairSound = new Howl({
  urls: ['./audio/your_team_lost_162.mp3']
})
var buttonSound = new Howl({
  urls: ['./audio/Button-SoundBible.com-1420500901.wav']
})
var levelcrossSound = new Howl({
  urls: ['./audio/Winning-sound-effect.mp3']
})

//  on page load default pop-up calling 
 $(window).load(function(){        
   $('#myModal').modal('show');
    }); 

var exit;
function startGame(){
      lossPairSound.stop(); counterPair =0;
      images =[];
      matchCounter = 0;
      titleLimit = 0;
      winnerSound.stop();
      timeOutSound.stop();
      gameSound.play();
      if(document.getElementById('levelno').innerHTML == '0'){
          document.getElementById('levelno').innerHTML = '1';
      }
      document.getElementById('score').innerHTML = '0';
      for (var i = 0; i < 8; i++) { 
        var rand = Math.floor(Math.random() * (18 - 9 + 1) + 9); 
        images.push(imagesArray[rand]);
        images.push(imagesArray[rand]);
      }

      randomizeImages();

      // output images then hide them
      output = "<ol>"; 
      for (var i = 0; i < 16; i++) { 
        output += "<li>";
        output += "<img src = './Images/" + images[i] + "' id = '" + "img_"+i + "'/>";
        output += "</li>";
      }
      output += "</ol>";
      document.getElementById("container").innerHTML = output;
      $("img").hide();

      minutesLabel = document.getElementById("minutes");
      secondsLabel = document.getElementById("seconds");
      totalSeconds = 0;
      exit=  setInterval(setTime, 1000);

 
// get images, place them in an array & randomize the order


    var guess1 = "";
    var guess2 = "";
    var guess1_id = "";
    var guess2_id = "";
    var count = 0;

$("li").click(function() {
    buttonSound.play();
    if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {
    var score = document.getElementById('score');
    // increment guess count, show image, mark it as face up
    count++;
    $(this).children("img").show();
    $(this).children("img").addClass("face-up");
    
    //guess #1
    if (count === 1 ) { 
      guess1 = $(this).children("img").attr("src"); 
      guess1_id = $(this).children("img").attr("id");
     
    }   
    //guess #2
    else { 
      guess2 = $(this).children("img").attr("src"); 
      guess2_id = $(this).children("img").attr("id");
    
      // since it's the 2nd guess check for match
      if (guess1 === guess2) { 
          ++matchCounter;
          correctPairSound.play();
          ++counterPair;
          score.innerHTML = (parseInt(score.innerHTML) + 20).toString(); 
          $("li").children("img[src='" + guess2 + "']").addClass("match");
          document.getElementById(guess1_id).src = "./Images/images--1.png";
          document.getElementById(guess2_id).src = "./Images/images--1.png";
      } 
      // else it's a miss
      else { 
         incorrectPairSound.play();
         score.innerHTML = (parseInt(score.innerHTML) - 5).toString(); 
         setTimeout(function() {
            $("#"+guess1_id).hide();
            $("#"+guess2_id).hide();
            $("#"+guess2_id).removeClass("face-up");
            $("#"+guess1_id).removeClass("face-up");
            guess1_id = "";
            guess2_id = "";
           
        }, 100);
      }
      
      // reset
      count = 0; 
      setTimeout(function() { console.clear(); }, 60000);      
    }
  }
}); 
}

// randomize array of images
function randomizeImages(){
  Array.prototype.randomize = function()
  {
    var i = this.length, j, temp;
    while ( --i )
    {
      j = Math.floor( Math.random() * (i - 1) );
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
  };
  
  images.randomize();
}

function setTime(){
           if(counterPair == 8 && document.getElementById('levelno').innerHTML == '3'){
              winnerSound.play();
              gameSound.stop();
              totalScore = totalScore + parseInt(document.getElementById('score').innerHTML);
              document.getElementById('level-msg').innerHTML = "CONGRATULATIONS !!!";
              document.getElementById('message').innerHTML = "Total score for all levels is " + totalScore;
              document.getElementById("btn-start").innerHTML = "New Game";
              document.getElementById('levelno').innerHTML = '0'; 
              $('#myModal').modal('show');
              clearInterval(exit);
           }
            else if(counterPair == 8){
              gameSound.stop();
              levelcrossSound.play();
                totalScore = totalScore + parseInt(document.getElementById('score').innerHTML);
              document.getElementById('level-msg').innerHTML = "Level complete!";
              document.getElementById('message').innerHTML = "Total score for all levels is " + totalScore; 
              document.getElementById('levelno').innerHTML = (parseInt(document.getElementById('levelno').innerHTML) + 1).toString(); 
              document.getElementById("btn-start").innerHTML =  "Next Level";
              $('#myModal').modal('show');
              clearInterval(exit);
           } if((parseInt(document.getElementById('score').innerHTML)) <= 120 && matchCounter == 8 ){
              gameSound.stop();
              lossPairSound.play();
              totalScore = totalScore + parseInt(document.getElementById('score').innerHTML);
              document.getElementById('level-msg').innerHTML = "PLEASE TRY AGAIN...!!!";
              document.getElementById('message').innerHTML = "Total score is " + document.getElementById('score').innerHTML + ">=120" ;
              document.getElementById("btn-start").innerHTML = "RE-START";
              document.getElementById('levelno').innerHTML = '0'; 
              $('#myModal').modal('show');
              clearInterval(exit);
           }
            if(totalSeconds == 59){
              gameSound.stop();
              timeOutSound.play();
              document.getElementById('message').innerHTML = "Level incomplete"
              document.getElementById("btn-start").innerHTML = "Try Again";
              document.getElementById('levelno').innerHTML = '1';
              $('#myModal').modal('show');
              clearInterval(exit);
            }
             ++totalSeconds;
             secondsLabel.innerHTML = counter(totalSeconds%60);
             minutesLabel.innerHTML = counter(parseInt(totalSeconds/60));
        }
function counter(val){
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }

 
