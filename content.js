let songList = [];
let globals = {
    'updateIntervalMs':200,
    'lastSkippedTime':Date.now(),
    'injected':false
}

class Spotify {
    Spotify(){
        return this;
    }

    skip = function(){
        let newEvent = new CustomEvent('spotifyExtensionMessage', {'detail':{'commandType':'nexttrack'}});
        window.dispatchEvent(newEvent);
    }

    play = function(){
        let newEvent = new CustomEvent('spotifyExtensionMessage', {'detail':{'commandType':'play'}});
        window.dispatchEvent(newEvent);
    }

    pause = function(){
        let newEvent = new CustomEvent('spotifyExtensionMessage', {'detail':{'commandType':'pause'}});
        window.dispatchEvent(newEvent);
    }

    back = function(){
        let newEvent = new CustomEvent('spotifyExtensionMessage', {'detail':{'commandType':'previoustrack'}});
        window.dispatchEvent(newEvent);
    }
}


async function setup() {
    let spotifyController = new Spotify();
    let songData = {
        'title': '',
        'artist': '',
        'time': 0
    };

    function convertTime(str) {
        let segments = str.split(':');
        let seconds = 0;
        let length = segments.length;
        for (let i = 0; i < length; i++) {
            seconds += parseInt(segments[i]) * Math.pow(60, length - i - 1);
        }
        return seconds;
    }

    function getSongData() {
        let songElement = document.querySelector('[data-testid="context-item-link"]');
        let artistElement = document.querySelector('[data-testid="context-item-info-subtitles"]');
        let timeElement = document.querySelector('[data-testid="playback-position"]');

        let returnObject = {
            'title': '',
            'artist': '',
            'time': 0,
            'songPlaying': false
        }

        if (songElement && artistElement && timeElement) returnObject = {
            'title': songElement.innerText,
            'artist': artistElement.innerText,
            'time': convertTime(timeElement.innerText),
            'songPlaying': true
        }

        return returnObject;
    }

    async function newSongPlaying(data) {
        updateSongList();

        let links = document.querySelectorAll(`link[rel~='icon']`);
        let song = document.querySelector('[data-testid="cover-art-image"]');
        if (song) {
            links.forEach(function(link) {
                link.href = song.src;
            });
        }

        console.log('[SPOTIFY EXTENSION]', 'new song playing - ', data);

    }



    function checkSong() {
        setTimeout(checkSong, globals.updateIntervalMs);

        let data = getSongData();

        if (data.songPlaying == false) return;

        if (data.title != songData.title || data.artist != songData.artist) {
            newSongPlaying(data);
        }

        songData = data;


        for(let i = 0; i<songList.length; i++){
            let song = songList[i];

            if (song.title != data.title) continue;
            if (song.artist != data.artist && song.artist != '') continue;

            if (data.time >= song.skipTime && Date.now() - globals.lastSkippedTime > 1500) {
                console.log('[SPOTIFY EXTENSION]', 'skip current song');

                //for(let i = 0; i<=data.time/15; i++) backButton.click();

                globals.lastSkippedTime = Date.now();

                setTimeout(function(){
                    let newData = getSongData();
                    if(newData.title != song.title) return;
                    if(globals.injected){
                        spotifyController.skip();
                        console.log('[SPOTIFY EXTENSION]','followed through skip');
                    } else {
                        console.log('[SPOTIFY EXTENSION]','uninjected, cannot skip');
                    }
                },50+Math.random()*50);

                break;
            }
        }
    }

    checkSong();




    async function updateSongList() {
        let data = await chrome.storage.sync.get('songs');
        console.log('[SPOTIFY EXTENSION]', 'fetched skip list data - ', data);
        songList = data.songs;
        return data.songs;
    }

    async function pushSongList(song) {
        let songs = await updateSongList();
        songs.push(song);
        let data = await chrome.storage.sync.set({
            'songs': songs
        });
        console.log('[SPOTIFY EXTENSION]', 'pushed to songlist - ', song);
        return data;
    }

    async function deleteFromSongList(song) {
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
        console.log('[SPOTIFY EXTENSION]', 'deleted from songlist - ', song);
        return data;
    }

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if ((msg.from === 'popup') && (msg.subject === 'songInfo')) {
            response({
                songs: songList
            });
        }
        if ((msg.from === 'popup') && (msg.subject === 'songUpdate')) {
            pushSongList(msg.songData);
            response(true);
        }
        if ((msg.from === 'popup') && (msg.subject === 'deleteSong')) {
            deleteFromSongList(msg.songData);
            response(true);
        }
    });

}


function testInject(){
    let temporaryElement = document.createElement('script');
    temporaryElement.type = 'text/javascript';
    temporaryElement.src = chrome.runtime.getURL('./inject.js');

    temporaryElement.onload = function(){
        globals.injected = true;
    }

    document.head.insertBefore(temporaryElement, document.head.firstChild);

}


document.addEventListener('readystatechange',function(e){
    if(document.readyState == 'interactive'){
        testInject();
    }

    if(document.readyState == 'complete') setup();
});
