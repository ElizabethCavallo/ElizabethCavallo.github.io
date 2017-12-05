
var b = p5.board('COM3', 'arduino'); 
var button;
var startbutton
var hHeight, mHeight, pHeight, rHeight;
var myCanvas;
// var pubKey = "pub-c-99f1bc47-cbb8-4632-870d-79c46af4fbe8";
// var subKey = "sub-c-aac1dc62-d47d-11e7-b83f-86d028961179";
//It only works with the examples sub keys and I'm not sure why
var pubKey = "pub-c-568f9a32-f440-4d58-9cee-e23cd1d12e7a";
var subKey = "sub-c-2e615be4-439b-11e6-971e-02ee2ddab7fe";
var chan = "Spectra";
var mellow = false;
var happy = false;
var pumped = false;
var romantic = false;
var PUBNUB;

var pollOptions = {
    eon: {
        "Happy" : 0.0, 
        "Mellow" :0.01,
        "Pumped" : 0.02,
        "Romantic" : 0.03,
    }
};

var pb = PUBNUB.init({
    publish_key: pubKey,
    subscribe_key: subKey
});

function preload(){


  //Happy Playlist start
    Hsong1 = loadSound("Happy/LA_Hallucinations.mp3", loaded);



  //Mellow Playlist start
    Msong1 = loadSound("Mellow/Little_talks.mp3", loaded);
   


  //Pumped Playlist start
    Psong1 = loadSound("Pumped/Whatever_it_takes.mp3", loaded);



  //Romantic Playlist start
    Rsong1 = loadSound("Romantic/Like_I_Can.mp3", loaded);
}

function setup() {
  myCanvas = createCanvas(600, 50);
    myCanvas.parent('myContainer');

    var buttonColor;   
    for(key in pollOptions.eon) {
        var b = document.createElement('BUTTON');
        b.setAttribute('id', 'button' + key);
        b.setAttribute('style', 'left:10%;width:20%;margin-left:4%;margin-top:4%;margin-bottom:5%;background-color:buttonColor;color:white;'); 
        b.innerHTML = key;
        b.addEventListener("click", voteUp(key)); 
        document.body.appendChild(b);

    } //for

//Happy Playlist
    Hsong2 = loadSound("Happy/All_Night.mp3", loaded);
    Hsong3 = loadSound("Happy/American_Dream.mp3", loaded);
    Hsong4 = loadSound("Happy/Classic.mp3", loaded);
    Hsong5 = loadSound("Happy/Come_Here_to_Dance.mp3", loaded);
    Hsong6 = loadSound("Happy/Counting_Stars.mp3", loaded);
    Hsong7 = loadSound("Happy/Cut_to_the_Feeling.mp3", loaded);
    Hsong8 = loadSound("Happy/Hymn_for_the_Weekend.mp3", loaded)
    // Hsong9 = loadSound("Happy/Summer_air.mp3", loaded);
    // Hsong10 = loadSound("Happy/Hymn_for_the_Weekend.mp3", loaded);
    // Hsong11 = loadSound("Happy/I_Love_it.mp3", loaded);
    // Hsong12 = loadSound("Happy/LA_Hallucinations.mp3", loaded);
    // Hsong13 = loadSound("Happy/Land_Down_Under.mp3", loaded);
    // Hsong14 = loadSound("Happy/Pour_some_sugar_on_me.mp3", loaded);
    // Hsong15 = loadSound("Happy/Summer_air.mp3", loaded);
    // Hsong16 = loadSound("Happy/Whistle_While_You_Work_it.mp3", loaded);
    // Hsong17 = loadSound("Happy/Sweet_Dreams.mp3", loaded);
    // Hsong18 = loadSound("Happy/Mustang_Kids.mp3", loaded);

//Mellow Playlist


        Msong2 = loadSound("Mellow/Happier.mp3", loaded);
        Msong3 = loadSound("Mellow/Castle_on_the_hill.mp3", loaded);
        Msong4 = loadSound("Mellow/Eraser.mp3", loaded);
        Msong5 = loadSound("Mellow/Summer_air.mp3", loaded);
        Msong6 = loadSound("Mellow/Hey_There_Delilah.mp3", loaded);
        Msong7 = loadSound("Mellow/Photograph.mp3", loaded);
        Msong8 = loadSound("Mellow/Pill_in_Ibiza.mp3", loaded);
    // Msong9 = loadSound("Mellow/Rich_love.mp3", loaded);
    // Msong10 = loadSound("Mellow/Summer_air.mp3", loaded);
    // Msong11 = loadSound("Mellow/Summertime_Sadness.mp3", loaded);
    // Msong12 = loadSound("Mellow/Symphony.mp3", loaded);
    // Msong13 = loadSound("Mellow/Wake_Me_Up_Avicii.mp3", loaded);

//Pumped Playlist

    
    Psong2 = loadSound("Pumped/Five_more_hours.mp3", loaded);
    Psong3 = loadSound("Pumped/Freaks.mp3", loaded);
    Psong4 = loadSound("Pumped/Light_it_up.mp3", loaded);
    Psong5 = loadSound("Pumped/Sweet_Dreams.mp3", loaded);
    Psong6 = loadSound("Pumped/Sexy_and_I_Know_it.mp3", loaded);
    Psong7 = loadSound("Pumped/Thunder_ID.mp3", loaded);
    Psong8 = loadSound("Pumped/Watch_Me_Whip.mp3", loaded);
    // Psong9 = loadSound("Pumped/Whatever_it_takes.mp3", loaded);
    // Psong10 = loadSound("Pumped/Sweet_Dreams.mp3", loaded);
    // Psong11 = loadSound("Pumped/Light_em_up.mp3", loaded);
    // Psong12 = loadSound("Pumped/Exs_and_Ohs.mp3", loaded);
    // Psong13 = loadSound("Pumped/Believer_ID.mp3", loaded); 

//Romantic Playlist
    
    Rsong2 = loadSound("Romantic/Rich_love.mp3", loaded);
    Rsong3 = loadSound("Romantic/Boys_In_The_Street.mp3", loaded);
    Rsong4 = loadSound("Romantic/Every_Little_Thing_She_Does.mp3", loaded);
    Rsong5 = loadSound("Romantic/Monaco.mp3", loaded);
    Rsong6 = loadSound("Romantic/Shake_it_out.mp3", loaded);
    Rsong7 = loadSound("Romantic/Shape_of_you.mp3", loaded);
    Rsong8 = loadSound("Romantic/Summer_air.mp3", loaded);

    // Rsong9 = loadSound("Romantic/Summer_air.mp3", loaded);
    // Rsong10 = loadSound("Romantic/Lips_of_an_angel.mp3", loaded);
    // Rsong11 = loadSound("Romantic/Lips_of_an_angel.mp3", loaded);
    // Rsong12 = loadSound("Romantic/Castle_on_the_hill.mp3", loaded);
    // Rsong13 = loadSound("Romantic/Somebody_that_I_used_to_know.mp3", loaded);    


    textAlign(CENTER);
    textSize(50);

} //End of Setup

//get history
function initOlderVotes() {
    pb.history({
        channel: chan,
        count: 1,
        callback: function(msg) {
            console.log("msg is ", msg);
            var voteHistory = msg[0];
            if(voteHistory.length) {
                pollOptions = voteHistory[0];
            }
        }, //callback
    }); //history 
} //initOlderVotes()

initOlderVotes();


//publish -> keeps tally 
function publishResults() {
    pb.publish({
        channel: chan,
        message: pollOptions,
        callback: function(m) {
            console.log("publishing!");
        }
    });
} //publishResults()


function voteUp(pollOptionKey) {
    return function() {
        console.log(pollOptions);
        pollOptions.eon[pollOptionKey] += 1.0;
        publishResults();
        if (pollOptions.eon.Mellow >= pollOptions.eon.Happy && pollOptions.eon.Mellow >= pollOptions.eon.Pumped && 
          pollOptions.eon.Mellow >= pollOptions.eon.Romantic){
        console.log("Mellow");
        mellow = true;
        happy = false;
        pumped = false;
        romantic = false;
//         stopMusic();
//             skipH();
//             skipP();
//             skipR();
//         Mellow();
    }
        if (pollOptions.eon.Happy >= pollOptions.eon.Mellow && pollOptions.eon.Happy >= pollOptions.eon.Pumped && 
          pollOptions.eon.Happy >= pollOptions.eon.Romantic){
        console.log("Happy");
        mellow = false;
        happy = true;
        pumped = false;
        romantic = false;
//             skipM();
//             skipP();
//             skipR();
//          stopMusic();           
//         Happy();
    }
        if (pollOptions.eon.Pumped >= pollOptions.eon.Happy && pollOptions.eon.Pumped >= pollOptions.eon.Mellow && 
          pollOptions.eon.Pumped >= pollOptions.eon.Romantic){
        console.log("Pumped");
        mellow = false;
        happy = false;
        pumped = true;
        romantic = false;
//          stopMusic();
//             skipM();
//             skipH();
//             skipR();
//         Pumped();
    }
       if (pollOptions.eon.Romantic >= pollOptions.eon.Happy && pollOptions.eon.Romantic >= pollOptions.eon.Pumped && 
          pollOptions.eon.Romantic >= pollOptions.eon.Mellow){
        console.log("Romantic");
        mellow = false;
        happy = false;
        pumped = false;
        romantic = true;
//            stopMusic();
//             skipM();
//             skipH();
//            skipP();
//         Romantic();
    } //JS closure each button has unique function 
console.log(pollOptions.eon[pollOptionKey]);
    if (mellow == true){
      console.lo("mellow = true");
        Mellow();
    }
        if(happy == true){
      console.log("happy = true");
            Happy();
    }
        if (pumped == true){
      console.log("pumped = true");
           Pumped();
    }
        if (romantic == true){
      console.log("romantic = true");
            Romantic():
    }
}
}

//embed
function drawChart() {
    eon.chart({
        pubnub: pb, //same pubnub object, gets data from channel
        channel: chan, //same channel
        history: true,
        generate: {
            bindto: '#chart',
            data: {
                labels: true,
                type: 'bar',
                colors: {
                    'Happy': '#3c3c3c',
                    'Mellow': '#f0f0f0',
                    'Pumped': '#787878',
                    'Romantic': '#b4b4b4'     
                }
            },
            bar: {
                width: {
                    ratio: .75
                }
            },
            tooltip: {
                show: false //hover over and see chart of counts
            }
        }
    });
  }

drawChart();

function loaded(){
  console.log("loaded");
}

//Playing Happy
function Happy(){
 if(Hsong1.isPlaying() || Hsong2.isPlaying() || Hsong3.isPlaying() || Hsong4.isPlaying() || Hsong5.isPlaying() || Hsong6.isPlaying() || 
  Hsong7.isPlaying() || Hsong8.isPlaying()){
}
 if(Msong1.isPlaying() || Msong2.isPlaying() || Msong3.isPlaying() || Msong4.isPlaying() || Msong5.isPlaying() || Msong6.isPlaying() || 
  Msong7.isPlaying() || Msong8.isPlaying() || Psong1.isPlaying() || Psong2.isPlaying() || Psong3.isPlaying() || Psong4.isPlaying() || 
   Psong5.isPlaying() || Psong6.isPlaying() || Psong7.isPlaying() || Psong8.isPlaying() || Rsong1.isPlaying() || Rsong2.isPlaying() ||
   Rsong3.isPlaying() || Rsong4.isPlaying() || Rsong5.isPlaying() || Rsong6.isPlaying() || Rsong7.isPlaying() || Rsong8.isPlaying()){
 stopMusic();
 startPlayingH();
 }
 else{
  startPlayingH();
}
}

    function skipH(){
      Hsong1.stop();
      Hsong2.stop();
      Hsong3.stop();
      Hsong4.stop();
      Hsong5.stop();
      Hsong6.stop();
      Hsong7.stop();
      Hsong8.stop();
    }

  function startPlayingH(){
        Hsong1.play();
        Hsong1.onended(nextHsong1);
      }
          function nextHsong1(){
            Hsong2.play();
            Hsong2.onended(nextHsong2);
          }
          function nextHsong2(){
            Hsong3.play();
            Hsong3.onended(nextHsong3);
          }
          function nextHsong3(){
            Hsong4.play();
            Hsong4.onended(nextHsong4);
          }
          function nextHsong4(){
            Hsong5.play();
            Hsong5.onended(nextHsong5);
          }
          function nextHsong5(){
            Hsong6.play();
            Hsong6.onended(nextHsong6);
          }
          function nextHsong6(){
            Hsong7.play();
            Hsong7.onended(nextHsong7);
          }
          function nextHsong7(){
            Hsong8.play();
            Hsong8.onended(stopMusic);
          }
      

//Playing Mellow

function Mellow(){
 if(Msong1.isPlaying() || Msong2.isPlaying() || Msong3.isPlaying() || Msong4.isPlaying() || Msong5.isPlaying() || Msong6.isPlaying() || 
  Msong7.isPlaying() || Msong8.isPlaying()){ 
}
 if( Hsong1.isPlaying() || Hsong2.isPlaying() || Hsong3.isPlaying() || Hsong4.isPlaying() || Hsong5.isPlaying() || Hsong6.isPlaying() || 
  Hsong7.isPlaying() || Hsong8.isPlaying() || Psong1.isPlaying() || Psong2.isPlaying() || Psong3.isPlaying() || Psong4.isPlaying() || 
   Psong5.isPlaying() || Psong6.isPlaying() || Psong7.isPlaying() || Psong8.isPlaying() || Rsong1.isPlaying() || Rsong2.isPlaying() ||
   Rsong3.isPlaying() || Rsong4.isPlaying() || Rsong5.isPlaying() || Rsong6.isPlaying() || Rsong7.isPlaying() || Rsong8.isPlaying()){
 stopMusic();
 startPlayingM();
 }
  else{
    startPlayingM();
}
}
    function skipM(){
      Msong1.stop();
      Msong2.stop();
      Msong3.stop();
      Msong4.stop();
      Msong5.stop();
      Msong6.stop();
      Msong7.stop();
      Msong8.stop();
    }


 function startPlayingM(){
   Msong1.play();
   Msong1.onended(nextMsong1);
    }
    function nextMsong1(){
      Msong2.play();
      Msong2.onended(nextMsong2);
    }
    function nextMsong2(){
      Msong3.play();
      Msong3.onended(nextMsong3);
    }
    function nextMsong3(){
      Msong4.play();
      Msong4.onended(nextMsong4);
    }
    function nextMsong4(){
      Msong5.play();
      Msong5.onended(nextMsong5);
    }
    function nextMsong5(){
      Msong6.play();
      Msong6.onended(nextMsong6);
    }
    function nextMsong6(){
      Msong7.play();
      Msong7.onended(nextMsong7);
    }
    function nextMsong7(){
      Msong8.play();
      Msong8.onended(stopMusic);
    }

//Playing Pumped

function Pumped(){
 if(Psong1.isPlaying() || Psong2.isPlaying() || Psong3.isPlaying() || Psong4.isPlaying() || 
   Psong5.isPlaying() || Psong6.isPlaying() || Psong7.isPlaying() || Psong8.isPlaying()){ 
}
 if( Hsong1.isPlaying() || Hsong2.isPlaying() || Hsong3.isPlaying() || Hsong4.isPlaying() || Hsong5.isPlaying() || Hsong6.isPlaying() || 
  Hsong7.isPlaying() || Hsong8.isPlaying() || Msong1.isPlaying() || Msong2.isPlaying() || Msong3.isPlaying() || Msong4.isPlaying() ||
    Msong5.isPlaying() || Msong6.isPlaying() || Msong7.isPlaying() || Msong8.isPlaying || Rsong1.isPlaying() || Rsong2.isPlaying() ||
   Rsong3.isPlaying() || Rsong4.isPlaying() || Rsong5.isPlaying() || Rsong6.isPlaying() || Rsong7.isPlaying() || Rsong8.isPlaying()){
 stopMusic();
 startPlayingP();
 }
 else{
  startPlayingP();
}
}

    function skipP(){
      Psong1.stop();
      Psong2.stop();
      Psong3.stop();
      Psong4.stop();
      Psong5.stop();
      Psong6.stop();
      Psong7.stop();
      Psong8.stop();
    }

  function startPlayingP(){
    Psong1.play();
    Psong1.onended(nextPsong1);
    }
    function nextPsong1(){
      Psong2.play();
      Psong2.onended(nextPsong2);
    }
    function nextPsong2(){
      Psong3.play();
      Psong3.onended(nextPsong3);
    }
    function nextPsong3(){
      Psong4.play();
      Psong4.onended(nextPsong4);
    }
    function nextPsong4(){
      Psong5.play();
      Psong5.onended(nextPsong5);
    }
    function nextPsong5(){
      Psong6.play();
      Psong6.onended(nextPsong6);
    }
    function nextPsong6(){
      Psong7.play();
      Psong7.onended(nextPsong7);
    }
    function nextPsong7(){
      Psong8.play();
      Psong8.onended(stopMusic);
    
    }

//Playing Romantic
function Romantic(){
 if(Rsong1.isPlaying() || Rsong2.isPlaying() ||
   Rsong3.isPlaying() || Rsong4.isPlaying() || Rsong5.isPlaying() || Rsong6.isPlaying() || Rsong7.isPlaying() || Rsong8.isPlaying()){
}
 if( Hsong1.isPlaying() || Hsong2.isPlaying() || Hsong3.isPlaying() || Hsong4.isPlaying() || Hsong5.isPlaying() || Hsong6.isPlaying() || 
  Hsong7.isPlaying() || Hsong8.isPlaying() || Msong1.isPlaying() || Msong2.isPlaying() || Msong3.isPlaying() || Msong4.isPlaying() ||
    Msong5.isPlaying() || Msong6.isPlaying() || Msong7.isPlaying() || Msong8.isPlaying || Psong1.isPlaying() || Psong2.isPlaying() || 
    Psong3.isPlaying() || Psong4.isPlaying() ||  Psong5.isPlaying() || Psong6.isPlaying() || Psong7.isPlaying() || Psong8.isPlaying()){ 
 stopMusic();
 startPlayingR();
 }
 else{
  startPlayingR();
}
}
    function skipR(){
      Rsong1.stop();
      Rsong2.stop();
      Rsong3.stop();
      Rsong4.stop();
      Rsong5.stop();
      Rsong6.stop();
      Rsong7.stop();
      Rsong8.stop();
    }


  function startPlayingR(){
    Rsong1.play();
    Rsong1.onended(nextRsong1);
    }
    function nextRsong1(){
      Rsong2.play();
      Rsong2.onended(nextRsong2);
    }
    function nextRsong2(){
      Rsong3.play();
      Rsong3.onended(nextRsong3);
    }
    function nextRsong3(){
      Rsong4.play();
      Rsong4.onended(nextRsong4);
    }
    function nextRsong4(){
      Rsong5.setVolume(3)
      Rsong5.play();
      Rsong5.onended(nextRsong5);
    }
    function nextRsong5(){
      Rsong6.play();
      Rsong6.onended(nextRsong6);
    }
    function nextRsong6(){
      Rsong7.play();
      Rsong7.onended(nextRsong7);
    }
    function nextRsong7(){
      Rsong8.play();
      Rsong8.onended(stopMusic);
    }


function stopMusic(){
      Rsong1.pause();
      Rsong2.pause();
      Rsong3.pause();
      Rsong4.pause();
      Rsong5.pause();
      Rsong6.pause();
      Rsong7.pause();
      Rsong8.pause();
      Hsong1.pause();
      Hsong2.pause();
      Hsong3.pause();
      Hsong4.pause();
      Hsong5.pause();
      Hsong6.pause();
      Hsong7.pause();
      Hsong8.pause();
      Msong1.pause();
      Msong2.pause();
      Msong3.pause();
      Msong4.pause();
      Msong5.pause();
      Msong6.pause();
      Msong7.pause();
      Msong8.pause();
      Psong1.pause();
      Psong2.pause();
      Psong3.pause();
      Psong4.pause();
      Psong5.pause();
      Psong6.pause();
      Psong7.pause();
      Psong8.pause();

}
