let songList = [];
let lastSkippedTime = Date.now();
let messagingHandler = new window.contentMessagingHandler();
messagingHandler.initialize();

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

const updateSongList = async () => {
    let data = await chrome.storage.sync.get('songs');
    
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
    messagingHandler.addAlertListener((e) => {
        if(e.detail.type == 'newSong'){
            newSongPlaying(e.detail.songData);
        }
    });

    messagingHandler.addEventMessageListener(async (e) => {
        if(e.detail.type == 'songListRequest'){
            let newSongList = await updateSongList();
            let customEvent = new CustomEvent('spotifyExtensionMessageResponse', {
                'detail': {
                    'data':newSongList
                }
            });
            window.dispatchEvent(customEvent);
        }
    });

    messagingHandler.addRuntimeListener(async (msg, response) => {
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

}


const injectjs = (fileName, callback) => {
    let temporaryElement = document.createElement('script');
    temporaryElement.type = 'text/javascript';
    temporaryElement.src = chrome.runtime.getURL(`./${fileName}`);

    if(callback) temporaryElement.onload = callback;

    document.head.insertBefore(temporaryElement, document.head.firstChild);
}

const injectcss = (fileName) => {
    let temporaryElement = document.createElement('style');
    temporaryElement.rel = 'stylesheet';
    temporaryElement.href = chrome.runtime.getURL(`./${fileName}`);

    document.head.insertBefore(temporaryElement, document.head.firstChild);
}

function testInject(){
    injectjs('spotifyController.js');
    injectjs('injectMessaging.js');
    injectjs('inject.js');
    injectjs('playerPatch.js');
    injectjs('lyricsPatch.js');
    injectjs('addons.js');
    
}




document.addEventListener('readystatechange',function(e){
    if(document.readyState == 'interactive') testInject();
    if(document.readyState == 'complete') setup();
});

console.log(chrome.webRequest);