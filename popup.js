function setup(songs){
    let songListElem = document.querySelector('.songList');
    let songList = [];

    songs.songs.forEach(function(i){
        songList.push(i);
        let elem = generateSongElem(i);
        songListElem.appendChild(elem);
    });


    const submitButton = document.querySelector('.submit');
    const titleInput = document.querySelector('.titleInput');
    const artistInput = document.querySelector('.artistInput');
    const timeInput = document.querySelector('.timeInput');


    submitButton.onclick = function(){
        
        let newSongObject = {
            'title':titleInput.value,
            'artist':artistInput.value,
            'skipTime':convertTime(timeInput.value)
        }

        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'songUpdate', songData:newSongObject},
                sentCallback);
          });

    }
}


function sentCallback(info){
    console.log('callback',info);
    window.location.reload();
}

function convertSecondsToTime(num){
    let mins = (Math.floor(num/60)).toString();
    let secs = (num%60).toString();
    if(mins.length == 0) mins = "0"+mins;
    if(secs.length == 0) secs = "0"+secs;
    if(secs.length<2) secs = "0"+secs; 
    return mins+":"+secs;
}

function generateSongElem(song){
    let elem = document.createElement('div');

    elem.className = 'songElement';

    let title = document.createElement('span');
    title.textContent = song.title;
    title.className = 'title';
    elem.appendChild(title);
    
    let artist = document.createElement('span');
    artist.textContent = song.artist;
    artist.className = 'artist';
    elem.appendChild(artist);
    
    let skipTime = document.createElement('span');
    skipTime.textContent = convertSecondsToTime(song.skipTime);
    skipTime.className = 'skipTime';
    elem.appendChild(skipTime);
    
    let removeButton = document.createElement('div');
    removeButton.className = 'removeButton';
    elem.appendChild(removeButton);

    removeButton.onclick = function(e){
        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'deleteSong', songData:song},
                sentCallback);
          });
      
    }

    let numChildren = 1+document.querySelector('.songList').childElementCount;

    elem.style.top = (numChildren*11 - 8)+"%";

    return elem;
}

window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'songInfo'},
          setup);
    });


});
  


function convertTime(str) {
    let segments = str.split(':');
    let seconds = 0;
    let length = segments.length;
    for (let i = 0; i < length; i++) {
        seconds += parseInt(segments[i]) * Math.pow(60, length - i - 1);
    }
    return seconds;
}

