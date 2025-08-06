let sideCanvas, sideCtx;

const setup = (data) => {
    let songListElem = document.querySelector('.songList');
    let songList = [];

    data.songs.forEach(function(i){
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
                (e) => {
                    sentCallback(e);
                    window.location.reload();
                });
          });

    }

    initializeSidebarCanvas();
}


const sentCallback = (info) => {
    console.log('callback',info);
}

const convertSecondsToTime = (num) => {
    let mins = (Math.floor(num/60)).toString();
    let secs = (num%60).toString();
    if(mins.length == 0) mins = "0"+mins;
    if(secs.length == 0) secs = "0"+secs;
    if(secs.length<2) secs = "0"+secs; 
    return mins+":"+secs;
}

const generateSongElem = (song) => {
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
    removeButton.textContent = 'X'
    elem.appendChild(removeButton);

    removeButton.onclick = function(e){
        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'deleteSong', songData:song},
                (e) => {
                    sentCallback(e);
                    window.location.reload();
                });
          });

      
    }

    let numChildren = 1+document.querySelector('.songList').childElementCount;

    elem.style.top = (numChildren*11 - 8)+"%";

    return elem;
}

const addListeners = () => {
    document.querySelector('.bassInput').addEventListener('change', (e) => {
        let val = document.querySelector('.bassInput').value;
        let str = val;
        if(val >= 0) str = "+"+val;
        document.querySelector('.bassText').textContent = `Bass (${str}db)`;
        console.log('update to ',val);

        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'bassUpdate', bassVal:val},
                sentCallback);
          });
    });
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

    addListeners();


});


const postMessageToInjectedAsync = async (type) => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    from: 'popup', 
                    forward:true, 
                    subject: type
                },
                (response) => {
                    resolve(response.data);
                });
          });
    });
}

const initializeSidebarCanvas = () => {
    sideCanvas = document.querySelector('.sidebarDisplay');
    sideCtx = sideCanvas.getContext('2d');

    sideCanvas.width = 60;
    sideCanvas.height = 70;


    drawSidebarCanvas();
}

const drawSidebarCanvas = async () => {
    let w = sideCanvas.width;
    let h = sideCanvas.height;

    let rawData = await postMessageToInjectedAsync('audioDataRequest');


    sideCtx.clearRect(0,0,w,h);
    

    let data = [];
    for(let i in rawData) data.push(rawData[i]);

    let blocks = 7;
    let length = data.length;
    let blockedData = new Array(blocks);
    
    for(let i = 0; i<blocks; i++) blockedData[i] = 0;

    for(let i = 0; i<length; i++){
        let newIdx = Math.floor(blocks*i/length);
        blockedData[newIdx] += data[i];
    }


    sideCtx.fillStyle = '#1db954';

    let arr = new Array(blocks);

    for(let i = 0; i<blocks; i++){
        blockedData[i] /= length/blocks;

        let transformedData = blockedData[i]*70/256;
        if(transformedData < 0) transformedData = 0;
        if(transformedData > 70) transformedData = 70;

        arr[i] = transformedData;

        let startingX = i*60/blocks;
        sideCtx.fillRect(startingX, h-transformedData, 50/blocks, transformedData);

    }


    requestAnimationFrame(drawSidebarCanvas);
}

  


const convertTime = (str) => {
    let segments = str.split(':');
    let seconds = 0;
    let length = segments.length;
    for (let i = 0; i < length; i++) {
        seconds += parseInt(segments[i]) * Math.pow(60, length - i - 1);
    }
    return seconds;
}
