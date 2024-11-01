

const playPause = document.getElementById("play-pause");
const previous = document.getElementById("previous");
const next = document.getElementById("next");


const thumbnail = document.getElementById("thumbnail");
const download = document.getElementById("download");
const songName = document.querySelector(".songname");
const artistName = document.querySelector(".artistname");
let myObj = {}; // Initialize an empty object for the JSON data
let idx = 0;


const volume = document.getElementById("volume");
volume.addEventListener("input",()=>{
  var audio = document.getElementById('audio');
console.log(volume.value);
  audio.volume = volume.value;
})

const songDuration= document.getElementById("song-duration");
audio.addEventListener("timeupdate",()=>{
  let audio = document.getElementById("audio");
  songDuration.value= Math.round((audio.currentTime/audio.duration)*100);
});
songDuration.addEventListener("input",()=>{
  let audio = document.getElementById("audio");
  audio.currentTime = songDuration.value * audio.duration/100;
});


playPause.addEventListener("click", () => {
  let src = playPause.getAttribute('src');
  var audio = document.getElementById('audio');

  if (src == "./svg/play.svg") {
    playPause.setAttribute("src", "./svg/pause.svg");
    // audio.volume = 0.2;
    audio.pause();
  } else{
    playPause.setAttribute("src", "./svg/play.svg");
    audio.play(); 
    }
});

previous.addEventListener("click", () => {
  if (idx != 0) { idx = idx - 1 }
  else { idx = 5 }
  thumbnail.setAttribute("src", myObj.songs[idx].thumbnail);
  songName.innerHTML = myObj.songs[idx].songname;
  artistName.innerHTML = myObj.songs[idx].artistname;
  download.setAttribute("href", myObj.songs[idx].file);
  changeAudioSource(myObj.songs[idx].file);


});

next.addEventListener("click", () => {
  if (idx != 5) { idx = idx + 1 }
  else { idx = 0 }
  thumbnail.setAttribute("src", myObj.songs[idx].thumbnail);
  songName.innerHTML = myObj.songs[idx].songname;
  artistName.innerHTML = myObj.songs[idx].artistname;
  download.setAttribute("href", myObj.songs[idx].file);
  changeAudioSource(myObj.songs[idx].file);

});





// ------------------------json file fetch----------------------
fetch('./rawData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    myObj = data;
    console.log(myObj); // Use the JSON data here



    thumbnail.setAttribute("src", myObj.songs[1].thumbnail);
    songName.innerHTML = myObj.songs[1].songname;
    artistName.innerHTML = myObj.songs[1].artistname;


    download.setAttribute("href", myObj.songs[1].file);


    changeAudioSource(myObj.songs[1].file);



  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



function changeAudioSource(newSrc) {
  var audio = document.getElementById('audio');
  var source = document.getElementById('audio-source');

  audio.pause(); // Pause the audio if it's playing
  source.src = newSrc; // Change the source
  audio.load(); // Load the new source
  audio.play(); // Play the new audio
 
}




