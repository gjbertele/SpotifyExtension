let songList = [];
let lastSkippedTime = Date.now();
let messagingHandler = new window.contentMessagingHandler();
messagingHandler.initialize();

const spotifyController = new Spotify();

const log = (...args) => {
    console.log('%c [SPOTIFY-EXTENSION]', 'color: #1DB954', ...args);
}

const newSongPlaying = async (data) => {
    updateSongCount();

    log('New song playing - ', data);

    return;
}


const updateSongCount = async () => {
    let data = await chrome.storage.sync.get('songCount');

    log('Fetched song count data - ', data);

    let count = 1;
    if (data && data.songCount) count = data.songCount + 1;

    chrome.storage.sync.set({
        'songCount': count
    });
}

const setup = async () => {
    messagingHandler.addAlertListener((e) => {
        if (e.detail.type == 'newSong') {
            newSongPlaying(e.detail.songData);
        }
    });
}


const injectjs = (fileName, callback) => {
    let temporaryElement = document.createElement('script');
    temporaryElement.type = 'text/javascript';
    temporaryElement.src = chrome.runtime.getURL(`./${fileName}`);

    if (callback) temporaryElement.onload = callback;

    document.head.insertBefore(temporaryElement, document.head.firstChild);
}

const injectcss = (fileName) => {
    let temporaryElement = document.createElement('style');
    temporaryElement.rel = 'stylesheet';
    temporaryElement.href = chrome.runtime.getURL(`./${fileName}`);

    document.head.insertBefore(temporaryElement, document.head.firstChild);
}

const testInject = () => {
    injectjs('spotifyController.js');
    injectjs('injectMessaging.js');
    injectjs('inject.js');
    injectjs('genreList.js');
    injectjs('playerPatch.js');
    injectjs('lyricsPatch.js');
    injectjs('searchPatch.js');
    injectjs('addons.js');


    return;
}


document.addEventListener('readystatechange', (e) => {
    if (document.readyState == 'interactive') testInject();
    if (document.readyState == 'complete') setup();
});
