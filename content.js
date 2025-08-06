let songList = [];
let lastSkippedTime = Date.now();
const spotifyController = new Spotify();

const log = (...args) => {
    console.log('%c [SPOTIFY-EXTENSION]', 'color: #1DB954',...args);
}

const newSongPlaying = async (data) => {
    updateSongList();

    updateSongCount();

    log('New song playing - ', data);

    return;
}

const skipCurrentSong = (song) => {
    lastSkippedTime = Date.now();
    log('Skip current song');
    setTimeout(async function(){
        let newData = await spotifyController.getSongData();
        if(newData.title != song.title) return;

        spotifyController.seekForwards(-newData.time);
        spotifyController.skip();
        log('Followed through skip');
    },50+Math.random()*50);

    return;
}

const checkSong = async () => {
    let data = await spotifyController.getSongData();

    if (data.songPlaying == false) return;
    
    for(let i = 0; i<songList.length; i++){
        let song = songList[i];
        
        if (song.title != data.title) continue;
        if (song.artist != data.artist && song.artist != '') continue;

        if (data.time >= song.skipTime && Date.now() - lastSkippedTime > 1500) skipCurrentSong(song);

        break;
    }

    return;
}

const updateSongList = async () => {
    let data = await chrome.storage.sync.get('songs');
    log('Fetched skip list data - ', data);
    songList = data.songs;
    return data.songs;
}

const pushSongList = async (song) => {
    let songs = await updateSongList();
    songs.push(song);
    let data = await chrome.storage.sync.set({
        'songs': songs
    });
    log('Pushed to songlist - ', song);
    return data;
}

const deleteFromSongList = async (song) => {
    let songs = await updateSongList();

    for (let i = 0; i < songs.length; i++) {
        if (songs[i].title == song.title && songs[i].artist == song.artist && songs[i].skipTime == song.skipTime) {
            songs.splice(i, 1);
            i--;
        }
    }

    let data = await chrome.storage.sync.set({
        'songs': songs
    });
    log('Deleted from songlist - ', song);
    return data;
}


const updateSongCount = async () => {
    let data = await chrome.storage.sync.get('songCount');

    log('Fetched song count data - ', data);

    let count = 1;
    if(data && data.songCount) count = data.songCount + 1;

    chrome.storage.sync.set({
        'songCount': count
    });
}

const setup = async () => {
    window.addEventListener('spotifyExtensionAlert', (e) => {
        if(e.detail.type == 'newSong'){
            newSongPlaying(e.detail.songData);
        }
    });

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if(msg.from != 'popup') return;

        if (msg.subject === 'songInfo') {
            response({
                songs: songList
            });
        }
        if (msg.subject === 'songUpdate') {
            pushSongList(msg.songData);
            response(true);
        }
        if (msg.subject === 'deleteSong') {
            deleteFromSongList(msg.songData);
            response(true);
        }
        if(msg.subject == 'bassUpdate'){
            spotifyController.bassBoost(msg.bassVal);
            response(true);
        }
    });

    setInterval(checkSong, 1000);

}


const injectFile = (fileName, callback) => {

    let temporaryElement = document.createElement('script');
    temporaryElement.type = 'text/javascript';
    temporaryElement.src = chrome.runtime.getURL(`./${fileName}`);

    if(callback) temporaryElement.onload = callback;

    document.head.insertBefore(temporaryElement, document.head.firstChild);
}


function testInject(){
    injectFile('spotifyController.js');
    injectFile('inject.js');
    injectFile('addons.js')
    
}


document.addEventListener('readystatechange',function(e){
    if(document.readyState == 'interactive') testInject();
    if(document.readyState == 'complete') setup();
});


