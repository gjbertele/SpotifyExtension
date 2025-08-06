const attachLinks = () => {
    let links = document.querySelectorAll(`link[rel~='icon']`);

    let metadata = navigator.mediaSession.metadata;

    if (metadata && metadata.artwork.length > 0) {
        links.forEach(function(link) {
            link.href = metadata.artwork[0].src;
        });
    }

}

const checkSong = async () => {
    let songList = await postMessageAsync('songListRequest',null);
    let currentSong = spotifyController.getCurrentSong();
    
    if(currentSong == undefined) return;

    for(let i in songList){
        let song = songList[i];
        if(song.title != currentSong.name) continue;
        if(currentSong.artists[0] && song.artist != currentSong.artists[0].name && song.artist != '') continue;

        let songProgress = window.playerAPI._harmony._controller._progressPosition;

        if(songProgress < song.skipTime*1000 && songProgress > currentSong.duration.milliseconds - 1000) continue;
        
        spotifyController.seekForwards(currentSong.duration.milliseconds-songProgress - 1000);

    }
}

const setupCheckSong = () => {
    setInterval(checkSong, 1500);
}

const setupAttachLinks = () => {
    spotifyController.addEventListener('newsong', attachLinks);
}



const spotifyControllerCreated = () => {
    setupAttachLinks();
    setupCheckSong();
}

window.addEventListener('spotifyControllerCreated',spotifyControllerCreated);
