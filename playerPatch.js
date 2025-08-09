const allowedToPatchPlaylist = async () => {
    if(window.location.href.includes('playlist')) return true;
    if(!window.location.href.includes('album')) return false;
    let currentTrack = (await spotifyController.getQueuePrivate()).current_track;

    if(!currentTrack.metadata?.entity_uri) return false;

    let songURI = currentTrack.metadata.entity_uri.split(':')[2];
    let albumURI = window.location.href.split('/');
    albumURI = albumURI[albumURI.length - 1];

    return songURI == albumURI;
}

const getPlaylistContainer = (mainContainer) => {
    let greaterReturn;
    mainContainer.childNodes.forEach((child) => {
        if(greaterReturn) return;
        if(child.style.getPropertyValue('--background-base-70') != ''){
            greaterReturn = child;
        }
        if(child.firstChild && child.firstChild.style.getPropertyValue('--background-base-70') != ''){
            greaterReturn = child.firstChild;
        }
    });

    return greaterReturn;
}

const recolorHeaderContainer = (headerContainer) => {
    headerContainer.firstChild.style.setProperty('--background-base', '#121212FF');
    headerContainer.firstChild.style.setProperty('--background-base-min-contrast', '#121212FF');

    return;
}

const removeRepeatableExcessElements = () => {
    document.querySelector('[data-testid="edit-image-button"]')?.parentElement.parentElement.remove();
    playlistHeader.titleArea.querySelector('figure')?.remove();
    let removed = false;
    playlistHeader.titleArea.querySelectorAll('[data-encore-id="text"]').forEach((elem) => {
        if(!removed && elem.tagName.toLowerCase() == 'span'){
            elem.remove();
            removed = true;
        }
    });
}

const getChildWithStyleAttribute = (elem, attribute) => {
    let greaterReturn;

    elem.childNodes.forEach((child) => {
        if(!greaterReturn && child.style.getPropertyValue(attribute) != ''){
            greaterReturn = child;
        }
    });

    return greaterReturn;
}

const removeExcessElements = (artistBar) => {
    removeRepeatableExcessElements();
    artistBar.parentElement.childNodes.forEach((child) => child.style.display = 'none');
    
    return;
}

const patchPlaylistHeader = async () => {
    if (!(await allowedToPatchPlaylist())) return;


    let mainContainer = document.querySelector('.main-view-container__scroll-node-child > main > section');
    if (!mainContainer) {
        setTimeout(patchPlaylistHeader, 1000);
        return;
    }

    let headerContainer = mainContainer.childNodes[0];
    let playlistContainer = getPlaylistContainer(mainContainer);

    let titleArea = document.querySelector('[data-testid="entityTitle"]').parentElement;
    playlistHeader.titleArea = titleArea;

    recolorHeaderContainer(headerContainer);

    playlistContainer.style.setProperty('--background-base-70', '#121212FF');

    let artistBar = titleArea.querySelector('[data-testid="creator-link"]').parentElement.parentElement;
    let clonedChild = artistBar.cloneNode(true);
    let artistArea = clonedChild.querySelector('a');
    playlistHeader.artistArea = artistArea;

    clonedChild.classList.remove(clonedChild.classList[0]);
    clonedChild.removeAttribute('data-encore-id');
    removeExcessElements(artistBar);

    artistBar.parentElement.appendChild(clonedChild);

    setImgElement();
    spotifyController.addEventListener('newsong', updatePlaylistHeader);
    createVisualizerCanvas();
    updatePlaylistHeader();
}

const setImgElement = () => {
    playlistHeader.imgElement = Array.from(document.querySelectorAll('[sizes]')).filter((i) => i.loading == 'lazy' || i.loading == 'eager')[0];
}

const createVisualizerCanvas = () => {
    if(playlistHeader.imgElement == null || playlistHeader.imgElement == undefined) setImgElement();

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

const smoothArray = (data, windowSize) => {
    let length = data.length;
    let smoothedData = new Array(length);

    for (let i = 0; i < length; i++) {
        smoothedData[i] = 0;
        for (let j = Math.max(0, i - windowSize); j <= Math.min(i + windowSize, length - 1); j++) {
            smoothedData[i] += data[i] / (2 * windowSize + 1);
        }
    }

    return smoothedData;
}

const convertRawToTransformed = (rawData, rescaleH) => {
    let data = [];
    for (let i in rawData) data.push(rawData[i]);

    let length = data.length;

    for (let i = 0; i < length; i++) {
        data[i] = data[i] / 256;
        data[i] = Math.abs(data[i] - 0.5);
        if (data[i] > 1) data[i] = 1;
        data[i] *= rescaleH * 3 / 4;
    }

    return data;
}

const taperArray = (arr, taperRange) => {
    let smoothedData = new Array(arr.length);

    for(let i = 0; i<arr.length; i++) smoothedData[i] = arr[i];

    for(let i = 0; i<taperRange; i++){
        let smoothFactor = Math.pow(0.5, i);
        smoothedData[taperRange - i - 1] *= smoothFactor;
        smoothedData[arr.length - taperRange + i] *= smoothFactor;
    }

    return smoothedData;
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


    let data = convertRawToTransformed(rawData, h);
    let smoothedData = smoothArray(data, 15);
    let taperedData = taperArray(smoothedData, 5);

    let length = data.length;

    ctx.clearRect(0, 0, w, h);

    let chosenColor = playlistHeader.albumColor ? rgbToHex(...playlistHeader.albumColor) : '#1db954';
    ctx.fillStyle = chosenColor;

    for (let i = 0; i < length; i++) {
        ctx.fillRect(i * w / length, h / 2 - taperedData[i], (w - 10) / length, taperedData[i] * 2);
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

const rescaleTitleElem = () => {
    let titleElem = playlistHeader.titleArea.querySelector('h1');
    titleElem.parentElement.style.width = '50%';
    titleElem.parentElement.style.setProperty('overflow','wrap !important');

    return;
}

const rescaleCanvasElem = () => {
    let titleRect = playlistHeader.titleArea.querySelector('h1').getBoundingClientRect();
    let imgRect = playlistHeader.imgElement.getBoundingClientRect();

    let diff = titleRect.y - imgRect.y;
    let targetDiff = 0;

    let newHeight = diff - targetDiff;
    playlistHeader.canvas.height = Math.min(Math.max(newHeight, imgRect.height / 5), imgRect.height/3);
    playlistHeader.canvas.style.height = playlistHeader.canvas.height + 'px';

    playlistHeader.canvas.width = 0.4 * (document.body.clientWidth - imgRect.width - imgRect.x);
    playlistHeader.canvas.style.width = playlistHeader.canvas.width + 'px';

    return;
}

const updateTitleElem = (songTitle) => {
    let titleElem = playlistHeader.titleArea.querySelector('h1');
    titleElem.textContent = songTitle;
    setTimeout(rescaleTitleElem,50);

    return;
}

const updateArtistArea = (currentArtistName, artistUID) => {
    playlistHeader.artistArea.textContent = currentArtistName;
    playlistHeader.artistArea.href = 'https://open.spotify.com/artist/' + artistUID;

    return;
}

const updateTopbar = () => {
    let topbar = document.querySelector('[data-testid=topbar]');
    let topbarElem = getChildWithStyleAttribute(topbar, '--background-base');

    topbarElem?.style.setProperty('--background-base',rgbToHex(...playlistHeader.albumColor));

    return;
}

const updatePlaylistHeader = async () => {
    if(!(await allowedToPatchPlaylist())) return;

    let currentSong = spotifyController.getCurrentSong();
    let songTitle, artistUID, currentArtistName, imageSrc;

    setImgElement();
    removeRepeatableExcessElements();
    rescaleCanvasElem();

    if (currentSong) {
        songTitle = currentSong.name;
        currentArtistName = currentSong.artists[0].name;
        artistUID = currentSong.artists[0].uri.split(':')[2];
        imageSrc = currentSong.images[2].url;

        updateTitleElem(songTitle);
        updateArtistArea(currentArtistName, artistUID);

        playlistHeader.imgElement.removeAttribute('srcset');
        playlistHeader.imgElement.setAttribute('src', imageSrc);
        playlistHeader.albumColor = await getAverageColor(imageSrc);
    }

    playlistHeader.canvas.height = 0;
    playlistHeader.canvas.style.height = '0px';

    setTimeout(rescaleCanvasElem, 50);
    updateTopbar();

    return;
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

                let bucketSize = 10;
                let counts = {};


                for(let i = 0; i<data.length; i+=4){
                    let [r,g,b] = [data[i], data[i+1], data[i+2]];
                    let [rBucket, gBucket, bBucket] = [Math.floor(r/bucketSize), Math.floor(g/bucketSize), Math.floor(b/bucketSize)];

                    let idx = rBucket*255*255+gBucket*255+bBucket;

                    if(!counts[idx])  counts[idx]=0;
                    counts[idx]++;
                }
                
                let keys = Object.keys(counts);
                keys.sort((a,b) => {
                    return counts[b] - counts[a];
                });


                let mappedKeys = keys.map(i => i = parseInt(i));


                for(let idx = 0; idx<mappedKeys.length; idx++){
                    let val = mappedKeys[idx];
                    
                    let r = bucketSize * Math.floor(val / (255 * 255));
                    let g = bucketSize * Math.floor((val % (255 * 255)) / 255);
                    let b = bucketSize * (val % 255);
                    
                    let brightness = 0.2126*r + 0.7152*g + 0.0722*b;
                    if(brightness <= 80) continue;
                    resolve([r,g,b]);
                    break;
                }
        }
        img.src = url;
    });
}