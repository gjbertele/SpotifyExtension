let sideCanvas, sideCtx, messagingHandler;

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

        messagingHandler.postTabMessage({
            'subject':'songUpdate',
            'songData': newSongObject
        }, window.location.reload);
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
          messagingHandler.postTabMessage({
            'subject':'deleteSong',
            'songData':song
          }, window.location.reload);
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

        messagingHandler.postTabMessage({
            'subject':'bassUpdate',
            'bassVal':val
        })
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initializeMessagingHandler();

    messagingHandler.postTabMessage({'subject': 'songInfo'}, setup);

    addListeners();


});

const initializeMessagingHandler = () => {
    messagingHandler = new MessagingHandler();
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

    let rawData = await messagingHandler.postMessageToInjectedAsync('audioDataRequest');

    sideCtx.clearRect(0,0,w,h);
    

    let data = [];
    for(let i in rawData) data.push(rawData[i]);

    let blocks = 60;
    let length = data.length;
    let blockedData = new Array(blocks);
    let blockedCounts = new Array(blocks);

    for(let i = 0; i<blocks; i++){
        blockedData[i] = 0;
        blockedCounts[i] = 0;
    }

    let firstWindow = length;

    for(let i = 0; i<firstWindow; i++){
        let newIdx = Math.floor(blocks*i/firstWindow);
        blockedData[newIdx] += data[i];
        blockedCounts[newIdx]++;
    }

    for(let i = 0; i<blocks; i++){
        blockedData[i] = (blockedData[i]/blockedCounts[i])/256;
        blockedData[i] = Math.abs(blockedData[i] - 0.5);
        if(blockedData[i] > 1) blockedData[i] = 1;
        blockedData[i] *= h*3/4;
    }

    let smoothedData = new Array(blocks);
    let windowSize = 5;
    for(let i = 0; i<blocks; i++){
        smoothedData[i] = 0;
        for(let j = Math.max(0,i-windowSize); j<=Math.min(i+windowSize,blocks-1); j++){
            smoothedData[i] += blockedData[i]/(2*windowSize+1);
        }
    }

    sideCtx.fillStyle = '#1db954';

    for(let i = 0; i<blocks; i++){
        sideCtx.fillRect(i*w/blocks, h/2-smoothedData[i], (w-10)/blocks, smoothedData[i]*2);

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
