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

    skip = () => {
        this.#postMessage('command', 'nexttrack');
        return;
    }

    back = () => {
        this.#postMessage('command', 'previoustrack');
        return;
    }

    play = () => {
        this.#postMessage('command', 'play');
        return;
    }

    pause = () => {
        this.#postMessage('command', 'pause');
        return;
    }

    seekForwards = (t) => {
        let newEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail':{
                'type':'command',
                'data':'seekforwards',
                'time':t
            }
        });
        window.dispatchEvent(newEvent);
        return;
    }

    #postMessage = (type, data) => {
        let newEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail':{
                'type':type,
                'data':data
            }
        });
        window.dispatchEvent(newEvent);
        return;
    }


    #postMessageAsync = async (type, data) => {
        let newEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail':{
                'type':type,
                'data':data
            }
        });
        let promise = new Promise((resolve) => {
            window.addEventListener('spotifyExtensionMessageResponse', (e) => {
                resolve(e.detail.data);
            }, {once: true});
        });
        window.dispatchEvent(newEvent);
        return promise;

    }

    getSongData = async () => {
        let songData = await this.#postMessageAsync('dataRequest', 'songData');
        

        let responseObject = {
            'songPlaying':false
        };

        if(songData){
            responseObject['songPlaying'] = true;
            responseObject.title = songData.title;
            responseObject.artist = songData.artist;
            responseObject.time = songData.time/1000;
        }

        return responseObject;
    }
}


async function setup() {
    let spotifyController = new Spotify();
    let songData = {};

    async function newSongPlaying(data) {
        updateSongList();

        let links = document.querySelectorAll(`link[rel~='icon']`);

        let metadata = navigator.mediaSession.metadata;

        if (metadata.artwork.length > 0) {
            links.forEach(function(link) {
                link.href = metadata.artwork[0].src;
            });
        }

        updateSongCount();

        console.log('[SPOTIFY EXTENSION]', 'new song playing - ', data);

        return;
    }


    async function updateSongCount(){
        let data = await chrome.storage.sync.get('songCount');

        console.log('[SPOTIFY EXTENSION]', 'fetched song count data - ', data);

        let count = 1;
        if(data && data.songCount) count = data.songCount + 1;

        chrome.storage.sync.set({
            'songCount': count
        });



    }

    async function checkSong() {
        setTimeout(checkSong, globals.updateIntervalMs);

        let data = await spotifyController.getSongData();

        if (data.songPlaying == false) return;

        if (data.title != songData.title || data.artist != songData.artist) {
            newSongPlaying(data);
        }

        songData = data;


        for(let i = 0; i<songList.length; i++){
            let song = songList[i];

            if (song.title != data.title) continue;
            if (song.artist != data.artist && song.artist != '') continue;

            if (data.time >= song.skipTime && Date.now() - globals.lastSkippedTime > 1500) skipCurrentSong(song);

           break;
        }

        return;
    }

    function skipCurrentSong(song){
        console.log('[SPOTIFY EXTENSION]', 'skip current song');

        globals.lastSkippedTime = Date.now();

        setTimeout(async function(){
            let newData = await spotifyController.getSongData();
            if(newData.title != song.title) return;

            spotifyController.seekForwards(-newData.time);
            spotifyController.skip();
           console.log('[SPOTIFY EXTENSION]','followed through skip');
        },50+Math.random()*50);

        return;
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


//65001.u is just regular e

/*67069 = (0,
            n(65001).u)("PlayerAPI")
            */
//186 returns 15679

//4666 returns (0,15679.N)(67069.H)