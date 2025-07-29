let songList = [];
async function setup() {
    let updateIntervalMs = 200;
    let lastSkippedTime = Date.now();

    let songData = {
        'title':'',
        'artist':'',
        'time':0
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

        return {
            'title': songElement.innerText,
            'artist': artistElement.innerText,
            'time': convertTime(timeElement.innerText)
        }
    }

    async function newSongPlaying(data) {
        updateSongList();
        console.log('[SPOTIFY EXTENSION]','new song playing - ', songData);

    }



    function checkSong() {
        try {
            let data = getSongData();

            if(data.title != songData.title || data.artist != songData.artist){
                newSongPlaying(data);
            }

            songData = data;

            songList.forEach(function(song) {
                if (song.title != data.title || song.artist != data.artist) return;
                if (data.time >= song.skipTime && Date.now()-lastSkippedTime > 1500) {
                    console.log('[SPOTIFY EXTENSION]','skip current song');
                    document.querySelector('[aria-label="Next"]').click();
                    lastSkippedTime = Date.now();

                }
            });

        } catch (err) {
            console.log('[SPOTIFY EXTENSION]',err);
        }

        setTimeout(checkSong, updateIntervalMs)
    }

    checkSong();




    async function updateSongList() {
        let data = await chrome.storage.sync.get('songs');
        console.log('[SPOTIFY EXTENSION]','fetched skip list data - ', data);
        songList = data.songs;
        return data.songs;
    }

    async function pushSongList(song) {
        let songs = await updateSongList();
        songs.push(song);
        let data = await chrome.storage.sync.set({
            'songs': songs
        });
        console.log('[SPOTIFY EXTENSION]','pushed to songlist - ', song);
        return data;
    }

    async function deleteFromSongList(song){
        let songs = await updateSongList();

        for(let i = 0; i<songs.length; i++){
            if(songs[i].title == song.title && songs[i].artist == song.artist && songs[i].skipTime == song.skipTime){
                songs.splice(i,1);
                i--;
            }
        }

        let data = await chrome.storage.sync.set({
            'songs': songs
        });
        console.log('[SPOTIFY EXTENSION]','deleted from songlist - ', song);
        return data;
    }

    chrome.runtime.sendMessage({
        from: 'content',
        subject: 'showPageAction',
    });

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

document.body.onload = async function() {
    setup();
}