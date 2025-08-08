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
    window.addEventListener('spotifyExtensionAlert', (e) => {
        if(e.detail.type == 'newSong'){
            newSongPlaying(e.detail.songData);
        }
    });

    window.addEventListener('spotifyExtensionMessage', async (e) => {
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

    chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
        if(msg.from != 'popup') return;
        if(msg.forward === true){
            let forwardedResponse = await postMessageToInjectedAsync(msg.subject); 

            response({
                'data':forwardedResponse.data
            });
            return;
        }
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

const postMessageToInjectedAsync = async (type) => {
    let id = Math.random();
    let customEvent = new CustomEvent('spotifyExtensionMessage', {
        'detail':{
            'type':type,
            'id':id
        }
    });
    return new Promise((resolve) => {
        const temp = (e) => {
            if(e.detail.id != id) return;
            resolve(e.detail);
        }
        window.addEventListener('spotifyExtensionMessageResponse',temp);
        window.dispatchEvent(customEvent);
    });

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


