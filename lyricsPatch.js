const spotifyFontFamily = `SpotifyMixUITitle, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, "Helvetica Neue", helvetica, arial, "Hiragino Kaku Gothic ProN", Meiryo, "MS Gothic"`;
let lyricsController = {
    'currentLyrics':null,
    'scrollY':0, 
    'canvasSize': {
        'width':0,
        'renderedHeight':0
    },
    'autoscroll': true,
    'displayLyrics': false
};

const scrollLyrics = (instant = false) => {
    if(!instant && !lyricsController.autoscroll) return;

    let currentLine = 0;
    let lyrics = lyricsController.currentLyrics;
    let length = lyrics.length;
    let currentTime = spotifyController.playerAPI._harmony._controller._progressPosition;

    while(currentLine < length-1){
        if(lyrics[currentLine+1].time > currentTime + 500) break;
        currentLine++;
    }

    let renderedHeight = lyricsController.canvasSize.renderedHeight;

    let lineHeight = (currentLine+1)*renderedHeight/4;
    let distToScroll = (lineHeight - renderedHeight/2) - lyricsController.scrollY;

    if(distToScroll > 0){
        let scrollDiff = lyricsController.canvasSize.renderedHeight/60 * distToScroll/100;
        let elem = playlistHeader.lyricsArea.querySelector('canvas').parentElement;
       
        elem.scrollBy(0,Math.min(distToScroll,scrollDiff));
    }


    return;
}

const drawLyricsArea = () => {
    requestAnimationFrame(drawLyricsArea);

    let canvas = playlistHeader.lyricsCanvas;
    let ctx = canvas.getContext('2d');
    let w = canvas.width;
    let h = canvas.height;

    ctx.clearRect(0,0,w,h);

    if(!lyricsController.currentLyrics) return;

    scrollLyrics();

    if(!lyricsController.displayLyrics) return;

    let lineCount = lyricsController.currentLyrics.length;

    for(let idx = 0; idx<lineCount; idx++){
        let line = lyricsController.currentLyrics[idx];
        let renderedHeight = (idx+1)*h/8;
        renderLine(line, renderedHeight, ctx, w, h);
    }

    return;
}

const createRgbFromArr = (r,g,b,a = 255) => {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const bump = (x) => {
    if(Math.abs(x) >= 1) return 0;
    return Math.E*Math.exp(1/(x*x-1));
}

const calculateOpacity = (dist) => {
    let val = bump(dist*2.5/lyricsController.canvasSize.renderedHeight);
    if(val > 1) val =1;
    return val;
}

const renderLine = (line, height, ctx, w, h) => {
    let transformedHeight = height - lyricsController.scrollY;
    let renderedHeight = lyricsController.canvasSize.renderedHeight;


    let computedFontSize = renderedHeight/20;
    let distanceFromCenter = Math.abs(transformedHeight - renderedHeight/2);
    let bumpValue = bump(distanceFromCenter/(renderedHeight*2/3));
    let scaledEffect = bumpValue*computedFontSize;
    computedFontSize += scaledEffect;   

    let opacityBump = calculateOpacity(distanceFromCenter);

    ctx.font = `${computedFontSize}px ${spotifyFontFamily}`;
    let created = createRgbFromArr(...line.color,opacityBump);
    ctx.fillStyle = created;

    let predictedWidth = ctx.measureText(line.content).width;

    if(predictedWidth > 0.8*w){
        let scaleFactor = 0.8*w/predictedWidth;
        computedFontSize *= scaleFactor;

        ctx.font = `${computedFontSize}px ${spotifyFontFamily}`;
        predictedWidth = ctx.measureText(line.content).width;
    }

    ctx.fillText(line.content, (w - predictedWidth)/2, transformedHeight + lyricsController.canvasSize.renderedHeight*0.6);

    return;

}

const getLyricsMaxHeight = () => {
    return lyricsController.currentLyrics ? lyricsController.currentLyrics.length*lyricsController.canvasSize.renderedHeight/4 : 1e9;
}

const onCanvasScroll = () => {
    let targetElement = playlistHeader.lyricsArea.querySelector('canvas').parentElement;

    let newScrollHeight = targetElement.scrollTop - lyricsController.canvasSize.renderedHeight/2;
    targetElement.scrollTo(0, lyricsController.canvasSize.renderedHeight*2/4);

    //if(lyricsController.displayLyrics && newScrollHeight > 10) lyricsController.autoscroll = false;

    let maxHeight = getLyricsMaxHeight();

    if(lyricsController.scrollY < 0 && newScrollHeight < 0) newScrollHeight *= Math.pow(0.7, -lyricsController.scrollY/5);
    if(lyricsController.scrollY >  maxHeight && newScrollHeight > 0) newScrollHeight *= Math.pow(0.7, (lyricsController.scrollY - maxHeight)/5);

    lyricsController.scrollY += newScrollHeight;

    playlistHeader.lyricsArea.querySelectorAll('.os-scrollbar-auto-hide').forEach((elem) => {
        elem.style.display = 'none';
    });

    return;
}

const attachListenersToLyricsArea = (lyricsArea) => {
    let targetElement = lyricsArea.querySelector('canvas').parentElement;
    
    targetElement.addEventListener('scroll', (e) => {
        e.preventDefault();
        onCanvasScroll();
    });

    return;
}


const createLyricsArea = () => {
    const lyricsArea = document.createElement('div');
    playlistHeader.lyricsArea = lyricsArea;

    styleLyricsArea(lyricsArea);

    const lyricsCanvasContainer = document.createElement('div');
    const lyricsCanvas = document.createElement('canvas');


    let rect = playlistHeader.canvas.getBoundingClientRect();
    lyricsCanvasContainer.style.width = (document.body.clientWidth - rect.width - rect.x - 70)+'px';
    lyricsCanvas.width = (document.body.clientWidth - rect.width - rect.x - 70);
    lyricsCanvas.style.width = lyricsCanvas.width + 'px';


    playlistHeader.lyricsCanvas = lyricsCanvas;


    setTimeout(() => {
        let mainRect = playlistHeader.titleArea.getBoundingClientRect();
        lyricsCanvas.height = mainRect.height*2;
        
        lyricsCanvasContainer.style.maxHeight = mainRect.height+'px';
        lyricsCanvasContainer.style.overflowY = 'scroll';
        lyricsCanvasContainer.style.overflowX = 'visible';
        lyricsCanvasContainer.style.scrollbarWidth = 'none';

        lyricsController.canvasSize.renderedHeight = mainRect.height;
        lyricsController.canvasSize.width = lyricsCanvas.width;
    },50);

    
    lyricsArea.appendChild(lyricsCanvasContainer);
    lyricsCanvasContainer.appendChild(lyricsCanvas);
    playlistHeader.titleArea.appendChild(lyricsArea);

    attachListenersToLyricsArea(lyricsArea);

    updateSongLyrics();
    drawLyricsArea();
    
    window.addEventListener('resize', updateCanvasScaling)

    return;
}

const updateCanvasScaling = () => {
    let rect = playlistHeader.canvas.getBoundingClientRect();
    playlistHeader.lyricsCanvas.parentElement.style.width = (document.body.clientWidth - rect.width - rect.x - 70)+'px';
    playlistHeader.lyricsCanvas.width = (document.body.clientWidth - rect.width - rect.x - 70);
    playlistHeader.lyricsCanvas.style.width = playlistHeader.lyricsCanvas.width + 'px';
}



const updateSongLyrics = async () => {
    lyricsController.autoscroll = true;

    let currentSong = spotifyController.getCurrentSong();
    let lyrics = currentSong ? await spotifyController.getSongLyrics(currentSong.uri) : null;

    let lines = lyrics ? lyrics.lyrics.lines : [];
    lyricsController.currentLyrics = [];


    for(let idx = 0; idx < lines.length; idx++){
        let line = lines[idx];
        let lineObject = {
            'content': line.words,
            'time': parseInt(line.startTimeMs),
            'color': [255,255,255]
        }

        lyricsController.currentLyrics.push(lineObject);
    }

    lyricsController.scrollY = 0;
    onCanvasScroll();

    return;
}

const styleLyricsArea = (div) => {
    let rect = playlistHeader.canvas.getBoundingClientRect();

    div.style.width = (document.body.clientWidth - rect.width - rect.x - 50) + 'px';
    div.style.height = '100%';
    div.style.position = 'absolute';
    div.style.right = '0%';
    div.style.top = '0%';
    div.style.setProperty('scrollbar-width','none !important');


    div.querySelectorAll('.os-scrollbar-auto-hide').forEach((elem) => {
        elem.style.display = 'none';
    });

    return;
}

const lyricsIconOnClick = () => {
    lyricsController.displayLyrics = !lyricsController.displayLyrics;
    if(lyricsController.displayLyrics) scrollLyrics(true);
    lyricsController.autoscroll = true;

    return;
}

const createLyricsIcon = () => {
    const originalSVG = document.querySelector('[data-testid="lyrics-button"]').querySelector('svg');
    const copiedSVG = originalSVG.cloneNode(true);

    const lyricsIcon = document.createElement('button');
    playlistHeader.lyricsIcon = lyricsIcon;

    styleLyricsIcon(copiedSVG);

    playlistHeader.lyricsArea.appendChild(lyricsIcon);

    document.querySelector('[data-testid="lyrics-button"]').remove();

    lyricsIcon.onclick = lyricsIconOnClick;

    return;
}

const styleLyricsIcon = (svg) => {
    const lyricsIcon = playlistHeader.lyricsIcon;

    lyricsIcon.className = 'e-91000-overflow-wrap-anywhere e-91000-button-tertiary--icon-only spotifyExtLyrics';
    lyricsIcon.appendChild(svg);

    lyricsIcon.style.position = 'absolute';
    lyricsIcon.style.right = '5%';
    lyricsIcon.style.bottom = '5%';

    let height = lyricsIcon.getBoundingClientRect().height;
    lyricsIcon.style.width = height+'px';

    lyricsIcon.style.background = 'transparent';
    lyricsIcon.style.border = 'none';
    
    const cssText = `.spotifyExtLyrics:hover { cursor:pointer; }`
    const cssElem = document.createElement('style');
    cssElem.innerHTML = cssText;
    document.head.appendChild(cssElem);

    return;
}

const initializeLyricsArea = () => {
    createLyricsArea();
    createLyricsIcon();

    spotifyController.addEventListener('newsong', updateSongLyrics);

    return;
}


if(window.playlistHeader && playlistHeader.initialized) initializeLyricsArea();
else window.addEventListener('playerAreaPatched', initializeLyricsArea);