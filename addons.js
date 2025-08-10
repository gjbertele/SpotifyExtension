let mouse = {
    x: 0,
    y: 0
};
let bassBarMouseDown = false;
let volumeBar, bassBar, progressBar, bassDiff = 0;

const lightningSVGString = `M 9.59375 3.503906 C 9.621094 3.40625 9.585938 3.304688 9.507812 3.242188 C 9.429688 3.183594 9.320312 3.171875 9.234375 3.222656 L 8.15625 3.816406 C 6.554688 4.699219 5.097656 5.824219 3.839844 7.15625 C 3.8125 7.183594 3.789062 7.222656 3.777344 7.265625 C 3.742188 7.398438 3.820312 7.535156 3.957031 7.570312 L 6.03125 8.125 L 5.101562 11.585938 C 5.078125 11.683594 5.109375 11.785156 5.1875 11.847656 C 5.265625 11.90625 5.371094 11.917969 5.457031 11.871094 L 5.933594 11.625 C 7.601562 10.765625 9.121094 9.644531 10.4375 8.304688 L 10.785156 7.949219 C 10.847656 7.882812 10.871094 7.792969 10.847656 7.707031 C 10.824219 7.621094 10.757812 7.554688 10.671875 7.53125 L 8.660156 6.992188 Z M 9.59375 3.503906 `;

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
    let songList = await postMessageAsync('songListRequest', null);
    let currentSong = spotifyController.getCurrentSong();

    if (currentSong == undefined) return;

    for (let i in songList) {
        let song = songList[i];
        if (song.title != currentSong.name) continue;
        if (currentSong.artists[0] && song.artist != currentSong.artists[0].name && song.artist != '') continue;

        let songProgress = window.playerAPI._harmony._controller._progressPosition;

        if (songProgress < song.skipTime * 1000 && songProgress > currentSong.duration.milliseconds - 1000) continue;

        spotifyController.seekForwards(currentSong.duration.milliseconds - songProgress - 1000);

    }
}

const setupCheckSong = () => {
    setInterval(checkSong, 1500);
}

const setupAttachLinks = () => {
    spotifyController.addEventListener('newsong', attachLinks);
}

const setupBassBar = () => {
    volumeBar = document.querySelector('[data-testid=volume-bar]');
    bassBar = volumeBar?.cloneNode(true);
    progressBar = bassBar?.querySelector('[data-testid=progress-bar]');

    const iconElement = bassBar.querySelector('svg');

    if (volumeBar == undefined) {
        setTimeout(setupBassBar, 1000);
        return;
    }

    volumeBar.parentElement.insertBefore(bassBar, volumeBar.nextSibling);

    iconElement.querySelector('path').setAttribute('d', lightningSVGString);

    iconElement.style.transform = 'scale(1.5)';
    
    let children = iconElement.childNodes;
    for(let idx = 1; idx<children.length; idx++) children[idx].remove();

    progressBar.style.setProperty('--is-active-fg-color', '#B9541D');

    progressBar.onmousedown = () => {
        bassBarMouseDown = true;
    }

    document.documentElement.onmouseup = () => {
        if (bassBarMouseDown) finalizeBassBarValue();
        bassBarMouseDown = false;
    }

    setBassBarValue(0.5);

    checkProgressBarUpdate();
}

const checkProgressBarUpdate = () => {
    if (bassBarMouseDown == true) {
        let rect = progressBar.getBoundingClientRect();

        let transformedX = (mouse.x - rect.left) / rect.width;
        if (transformedX < 0) transformedX = 0;
        if (transformedX > 1) transformedX = 1;

        if (Math.abs(transformedX - 0.5) < 0.05) transformedX = 0.5;

        setBassBarValue(transformedX);
    }
    requestAnimationFrame(checkProgressBarUpdate);
}

const finalizeBassBarValue = () => {
    spotifyController.bassBoost(bassDiff);
}

const setBassBarValue = (value) => {
    progressBar.style.setProperty('--progress-bar-transform', (value * 100) + '%');
    bassDiff = value * 20 - 10;
}

document.body.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}


const spotifyControllerCreated = () => {
    setupAttachLinks();
    setupCheckSong();
}

const mainAppLoaded = () => {
    setupBassBar();

    setInterval(() => {
        document.querySelector('[aria-label="Hide Now Playing view"]')?.click();
    });

    evaluateFunctionOnLoad(patchPlaylistHeader);
}

const evaluateFunctionOnLoad = (func) => {
    try {
        func();
    } catch (err){
        console.log(`Error loading ${func.name}`,err);
        setTimeout(() => { evaluateFunctionOnLoad(func); }, 10);
    }
}

window.addEventListener('spotifyControllerCreated', spotifyControllerCreated);
window.addEventListener('mainAppLoaded', mainAppLoaded);
