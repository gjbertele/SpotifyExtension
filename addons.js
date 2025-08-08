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

let playlistHeader = {
    'titleArea': null,
    'imgElement': null,
    'artistArea': null,
    'canvas': null,
    'albumColor': null
}


const patchPlaylistHeader = () => {
    if (!window.location.href.includes('playlist') && !window.location.href.includes('album')) return;

    let mainContainer = document.querySelector('.main-view-container__scroll-node-child > main > section');
    if (!mainContainer) {
        setTimeout(patchPlaylistHeader, 1000);
        return;
    }

    console.log('patched');

    let headerContainer = mainContainer.childNodes[0];
    let playlistContainer = mainContainer.childNodes[1];
    let contentBox = headerContainer.querySelector('.contentSpacing');

    let titleArea = contentBox.childNodes[2];

    headerContainer.firstChild.style.setProperty('--background-base', '#121212FF');
    headerContainer.firstChild.style.setProperty('--background-base-min-contrast', '#121212FF');

    playlistContainer.firstChild.style.setProperty('--background-base-70', '#121212FF');

    titleArea.childNodes[0].remove();
    titleArea.querySelector('figure').remove();

    let clonedChild = titleArea.childNodes[1].childNodes[0].cloneNode(true);
    let artistArea = clonedChild.querySelector('a');

    clonedChild.classList.remove(clonedChild.classList[0]);


    titleArea.querySelector('button').style.width = '30%';
    titleArea.childNodes[1].childNodes.forEach((child) => child.style.display = 'none');
    titleArea.childNodes[1].appendChild(clonedChild);

    const playlistImage = document.querySelector('[data-testid="playlist-image"]');
    playlistHeader.imgElement = playlistImage.querySelector('[draggable="false"] > img');

    spotifyController.addEventListener('newsong', updatePlaylistHeader);

    setInterval(() => {
        document.querySelector('[aria-label="Hide Now Playing view"]')?.click();
    }, 500);

    playlistHeader.titleArea = titleArea;
    playlistHeader.artistArea = artistArea;

    createVisualizerCanvas();

    updatePlaylistHeader();
}

const createVisualizerCanvas = () => {
    let titleArea = playlistHeader.titleArea;

    let canvas = document.createElement('canvas');
    let imgRect = playlistHeader.imgElement.getBoundingClientRect();

    canvas.width = 0.4 * (document.body.clientWidth - imgRect.width - imgRect.x);
    canvas.height = 0;

    canvas.style.width = canvas.width + 'px';

    titleArea.appendChild(canvas);

    playlistHeader.canvas = canvas;
    playlistHeader.ctx = canvas.getContext('2d');

    visualizerDraw();
}

const visualizerDraw = async () => {
    let ctx = playlistHeader.ctx;
    let h = playlistHeader.canvas.height;
    let w = playlistHeader.canvas.width;

    let rawData = await spotifyController.getAudioAmplitudes();

    if(rawData == 'Timeout'){
        requestAnimationFrame(visualizerDraw);
        return;
    }

    let data = [];
    for (let i in rawData) data.push(rawData[i]);

    let length = data.length;

    for (let i = 0; i < length; i++) {
        data[i] = data[i] / 256;
        data[i] = Math.abs(data[i] - 0.5);
        if (data[i] > 1) data[i] = 1;
        data[i] *= h * 3 / 4;
    }

    let smoothedData = new Array(length);
    let windowSize = 5;
    for (let i = 0; i < length; i++) {
        smoothedData[i] = 0;
        for (let j = Math.max(0, i - windowSize); j <= Math.min(i + windowSize, length - 1); j++) {
            smoothedData[i] += data[i] / (2 * windowSize + 1);
        }
    }

    ctx.fillStyle = playlistHeader.albumColor ? rgbToHex(...playlistHeader.albumColor) : '#1db954';
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < length; i++) {
        ctx.fillRect(i * w / length, h / 2 - smoothedData[i], (w - 10) / length, smoothedData[i] * 2);
    }

    requestAnimationFrame(visualizerDraw);
}

const rgbToHex = (r, g, b) => {
    function componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const updatePlaylistHeader = async () => {
    let currentSong = spotifyController.getCurrentSong();
    let songTitle, artistUID, currentArtistName, imageSrc;

    if (currentSong) {
        songTitle = currentSong.name;
        currentArtistName = currentSong.artists[0].name;
        artistUID = currentSong.artists[0].uri.split(':')[2];
        imageSrc = currentSong.images[2].url;
    }


    if (songTitle) playlistHeader.titleArea.childNodes[0].querySelector('h1').textContent = songTitle;

    playlistHeader.artistArea.textContent = currentArtistName;
    playlistHeader.artistArea.href = 'https://open.spotify.com/artist/' + artistUID;

    if (imageSrc) {
        playlistHeader.imgElement.removeAttribute('srcset');
        playlistHeader.imgElement.setAttribute('src', imageSrc);
        playlistHeader.albumColor = await getAverageColor(imageSrc);
    }

    playlistHeader.canvas.height = 0;
    playlistHeader.canvas.style.height = '0px';

    setTimeout(() => {
        let titleRect = playlistHeader.titleArea.querySelector('h1').getBoundingClientRect();
        let imgRect = playlistHeader.imgElement.getBoundingClientRect();

        let diff = titleRect.y - imgRect.y;
        let targetDiff = 0;

        let newHeight = diff - targetDiff;
        playlistHeader.canvas.height = Math.min(Math.max(newHeight, imgRect.height / 5), imgRect.height/3);
        playlistHeader.canvas.style.height = playlistHeader.canvas.height + 'px';
    }, 50);

}

const getAverageColor = async (url) => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    tempCanvas.width = 640;
    tempCanvas.height = 640;
    return new Promise((resolve) => {
            var img = new Image;
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                const data = ctx.getImageData(0, 0, 640, 640).data;
                let averageR = 0;
                let averageG = 0;
                let averageB = 0;
                let count = 0;
                for (let i = 0; i < data.length; i += 4) {
                    averageR += data[i];
                    averageG += data[i + 1];
                    averageB += data[i + 2];
                    count++;
                }
                averageR /= count;
                averageG /= count;
                averageB /= count;
                resolve([parseInt(averageR), parseInt(averageG), parseInt(averageB)]);

        }
        img.src = url;
    });
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
    patchPlaylistHeader();
}

window.addEventListener('spotifyControllerCreated', spotifyControllerCreated);
window.addEventListener('mainAppLoaded', mainAppLoaded)