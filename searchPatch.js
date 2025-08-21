let searchController = {
    'elements':{
        'searchBar':null,
        'hiddenInput':null,
        'visibleInput':null,
        'carouselTemplateElement':null,
        'searchArea':null,
        'rowTemplateElement':null
    },
    'parameters':{
        'query':'',
        'artist':'',
        'genres':[],
    },
    'misc':{
        'shortenedAreaWidth':0,
        'areaWidth':0,
        'initialized':false
    }
}


const patchSearchElement = () => {
    const href = window.location.href;
    if(!href.includes('search') || !href.includes('#advSearch')) return;
    
    searchController.elements.searchBar = document.querySelector('[data-testid=search-input]').parentElement;
    searchController.elements.searchArea = document.querySelector('#searchPage');

    let calculatedWidth  = Math.min(searchController.elements.searchArea.getBoundingClientRect().width, 800);

    searchController.elements.searchArea.style.width = `${calculatedWidth}px`;


    initializeResultRowBuilder();
    initializeCarouselBuilder();
    createHiddenSearchBar();
    initializeAdvancedSearch();


    return;
}

const createHiddenSearchBar = () => {
    let searchbar = searchController.elements.searchBar;

    const originalInputElement = searchbar.querySelector('input');
    const newInputElement = originalInputElement.cloneNode(true);

    modifyOriginalInput(originalInputElement);
    placeNewInput(newInputElement);

    return;
}

const modifyOriginalInput = (elem) => {
    searchController.elements.hiddenInput = elem;
    elem.style.display = 'none';

    return;
}

const placeNewInput = (elem) => {
    let originalElem = searchController.elements.hiddenInput;
    originalElem.parentElement.insertBefore(elem, originalElem);
    searchController.elements.visibleInput = elem;

    return;
}

const initializeAdvancedSearch = () => {
    let searchArea = searchController.elements.searchArea;

    searchArea.innerHTML = '';
    searchArea.style.setProperty('--margin-left','calc(min(100%, 650px) / 25)');

    const mainTitle = createMainTitleElement();
    const mainQueryInput = createMainQueryInputElement();
    const genreInput = createGenreInputElement();
    const genreDisplay = createGenreDisplayElement();
    const artistInput = createArtistInputElement();
    const searchButton = createSearchButton();

    searchController.elements.genreContainer = genreDisplay;

    searchArea.appendChild(mainTitle);
    searchArea.appendChild(mainQueryInput);
    searchArea.appendChild(artistInput);
    searchArea.appendChild(genreInput);
    searchArea.appendChild(genreDisplay);
    searchArea.appendChild(searchButton);

    
    const resultsDisplay = createResultsDisplayElement();

    searchArea.appendChild(resultsDisplay);

    searchController.elements.resultsDisplay = resultsDisplay;

    return;
}

const infillSearchResults = async () => {
    searchController.parameters.query = document.querySelector('#queryInput').value;
    searchController.parameters.artist = document.querySelector('#artistInput').value;

    const results = await spotifyController.search(searchController.parameters);
    const topResults = results.topResults.items;

    console.log(results);

    const resultsHolder = document.querySelector('#resultsHolder');
    resultsHolder.innerHTML = '';

    const resultsDisplay = searchController.elements.resultsDisplay;

    let totalHeight = 3*getDefaultFontSize(resultsDisplay);

    for(let i = 0; i<topResults.length; i++){
        const newElem = buildResultElement(topResults[i]);
        resultsHolder.appendChild(newElem);
        totalHeight += newElem.getBoundingClientRect().height;
    }
    resultsDisplay.style.height = totalHeight+'px';

    return;
}

const createSearchButton = () => {
    const container = document.createElement('div');
    container.style.width = 'min(100%, 650px)';
    container.style.height = '4em';
    container.style.overflow = 'visible';

    const button = buildCarouselElement('Search');
    button.style.color = '#000';
    button.style.background = '#fff';
    button.style.position = 'absolute';
    button.style.transform = 'translateY(1em)';
    button.style.left = 'var(--margin-left)';

    button.onclick = infillSearchResults;

    setButtonCursor(button);

    container.appendChild(button);

    return container;
}

const styleText = (elem) => {
    let targetStyles = getComputedStyle(document.querySelector('[data-encore-id=type]'));

    elem.style.color = targetStyles.color;
    elem.style.fontFamily = targetStyles.fontFamily;

    return;
}

const createMainTitleElement = () => {
    const container = document.createElement('div');
    container.style.width = 'min(100%, 650px)';
    container.style.height = '4em';

    const titleText = document.createElement('h1');
    titleText.textContent = 'Advanced Search';
    titleText.style.fontSize = '2.5em';
    titleText.style.fontWeight = 'bold';
    titleText.style.position = 'absolute';
    titleText.style.left = 'var(--margin-left)';
    styleText(titleText);

    container.appendChild(titleText);

    return container;
}

const styleParameterTitle = (elem) => {
    elem.textContent = 'Title';
    elem.style.position = 'absolute';
    elem.style.left = 'var(--margin-left)';
    elem.style.width = 'calc(min(100%, 650px) / 6)';
    elem.style.height = '3em';
    elem.style.fontSize = '1em';
    elem.style.lineHeight = '3em';
    elem.style.verticalAlign = 'middle';

    styleText(elem);
    return;
}

const styleTextInput = (elem) => {
    elem.value = '';
    elem.removeAttribute('placeholder');
    elem.style.position = 'absolute';
    elem.style.borderRadius = '1.5em';
    elem.style.minBlockSize = '2em';
    elem.style.left = 'calc(min(100%, 650px)/6 + 30px)';
    elem.style.transform = `translateY(0.5em)`;
    elem.style.position = 'absolute';
    elem.style.height = '2em';
    elem.style.width = 'calc(min(100%, 650px)*2/3)';

    return;
}

const createMainQueryInputElement = () => {
    const container = document.createElement('div');
    container.style.width = 'min(100%, 650px)';
    container.style.height = '3em';
    container.style.overflow = 'visible';

    const parameterTitle = document.createElement('span');
    styleParameterTitle(parameterTitle);

    const textInput = searchController.elements.visibleInput.cloneNode(true);
    styleTextInput(textInput);

    textInput.id = 'queryInput';

    container.appendChild(parameterTitle);
    container.appendChild(textInput);
    

    return container;

}

const setButtonCursor = (elem) => {
    elem.addEventListener('mouseover', () => {
        elem.style.cursor = 'pointer';
    });

    elem.addEventListener('mouseout', () => {
        elem.style.cursor = 'auto';
    });

    return;
}

const styleAddButton = (elem) => {
    elem.style.background = '#FFF';
    elem.style.color = '#000'
    elem.style.position = 'absolute';
    elem.style.left = 'calc(min(100%, 650px)*5/6 + 45px)';
    elem.style.transform = 'translateY(0.5em)';

    return;
}


const styleTextInputOverlay = (elem) => {
    styleTextInput(elem);
    elem.style.paddingLeft = '12px';
    elem.style.left = 0;
    elem.style.lineHeight = '2em';
    elem.style.verticalAlign = 'middle';
    elem.style.removeProperty('transform');
    elem.style.color = '#fff';

    return;
}

const createSpoofedTextInput = () => {
    const textInput = searchController.elements.visibleInput.cloneNode(true);
    styleTextInput(textInput);
    textInput.style.left = 0;
    textInput.style.removeProperty('transform');

    const textInputOverlay = document.createElement('span');
    styleTextInputOverlay(textInputOverlay);
    textInputOverlay.style.width = '100%';

    const textInputContainer = document.createElement('div');
    styleTextInput(textInputContainer);
    textInputContainer.style.width = '100%';

    textInputContainer.appendChild(textInput);
    textInputContainer.appendChild(textInputOverlay);

    textInputOverlay.addEventListener('click', () => {
        textInput.focus();
    });

    textInput.addEventListener('keyup', (e) => {
        handleAutoComplete(e, textInput, textInputOverlay);
    })


    return textInputContainer;
}

const handleAutoComplete = (e, input, overlay) => {
    if(input.value == ''){
        overlay.innerHTML = '';
        return;
    }

    let candidates = window.genreList.filter(i => i.startsWith(input.value));

    overlay.innerHTML = '';
    if(candidates.length > 0){
        if(e.key == 'Enter') input.value = candidates[0];

        let firstChild = document.createElement('span');
        firstChild.textContent = input.value;
        let secondChild = document.createElement('span');
        secondChild.textContent = candidates[0].substring(input.value.length);
        secondChild.style.color = '#b3b3b3';
        
        overlay.appendChild(firstChild);
        overlay.appendChild(secondChild);
    }

    


    return;
}

const createGenreInputElement = () => {
    const container = document.createElement('div');
    container.style.width = 'min(100%, 650px)';
    container.style.height = '3em';
    container.style.overflow = 'visible';

    const parameterTitle = document.createElement('span');
    styleParameterTitle(parameterTitle);
    parameterTitle.textContent = 'Genres';

    const textInput = createSpoofedTextInput();
    container.appendChild(parameterTitle);
    container.appendChild(textInput);

    const addButton = buildCarouselElement('Add');
    styleAddButton(addButton)
    setButtonCursor(addButton);

    addButton.addEventListener('click', () => {
        let value = container.querySelector('input').value;
        if(!window.genreList.includes(value.trimEnd())) return;
        searchController.parameters.genres.push(value);
        infillGenreElements();
    });

    container.appendChild(addButton);

    return container;
}

const infillGenreElements = async () => {
    let genres = searchController.parameters.genres;
    let length = genres.length;
    let container = searchController.elements.genreContainer;
    let subContainer = container.querySelector('div');
    let computedHeight = container.getBoundingClientRect();

    subContainer.innerHTML = '';

    let maxHeight = computedHeight.y;

    for(let i = 0; i<length; i++){
        let genre = genres[i];
        let genreElement = buildCarouselElement(genre);
        genreElement.style.margin = '12px';
        genreElement.addEventListener('click', () => {
            searchController.parameters.genres.splice(i, 1);
            infillGenreElements();
        });
        genreElement.addEventListener('mouseover', () => {
            genreElement.style.background = '#fff';
            genreElement.style.color = '#000';
        });
        genreElement.addEventListener('mouseout', () => {
            genreElement.style.background = '#ffffff1a';
            genreElement.style.color = '#fff';
        });

       subContainer.appendChild(genreElement);
        
       maxHeight = Math.max(genreElement.getBoundingClientRect().bottom, maxHeight);
    }


    if(maxHeight == computedHeight.y){
        container.style.height = '3em';
    } else {
        let newHeight = maxHeight - computedHeight.y;
        let emHeight = 3*getDefaultFontSize(container);
        newHeight = Math.ceil(newHeight/emHeight)*emHeight;
        container.style.height = `${newHeight}px`;
    }


    return;
}

const createGenreDisplayElement = () => {
    const container = document.createElement('div');
    container.style.width = 'min(100%, 650px)';
    container.style.height = '3em';
    container.style.overflow = 'wrap';

    const subContainer = document.createElement('div');
    subContainer.style.position = 'absolute';
    subContainer.style.left = 'var(--margin-left)';
    subContainer.style.width = 'calc(100% - var(--margin-left))';
    subContainer.style.height = '100%';

    container.appendChild(subContainer);

    return container;
}

const createArtistInputElement = () => {
    const container = createMainQueryInputElement();
    container.querySelector('span').textContent = 'Artist';
    container.querySelector('input').id = 'artistInput';

    return container;
}

const createResultsDisplayElement = () => {
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '6em';
    container.style.overflow = 'visible';

    const titleElem = document.createElement('h1');
    titleElem.textContent = 'Results';
    titleElem.fontSize = '2.5em';
    titleElem.fontWeigt = 'bold';
    titleElem.style.position = 'absolute';
    titleElem.style.left = 'var(--margin-left)';
    titleElem.style.width = '100%';
    styleText(titleElem);

    const resultsHolder = document.createElement('div');
    resultsHolder.style.width = '100%';
    resultsHolder.id = 'resultsHolder';
    resultsHolder.style.transform = 'translateY(3em)';
    resultsHolder.style.position = 'absolute';
    resultsHolder.style.left = 'var(--margin-left)';

    container.appendChild(titleElem);
    container.appendChild(resultsHolder);

    return container;
}

const buildCarouselElement = (text) => {
    let newElem = searchController.elements.carouselTemplateElement.cloneNode(true);
    newElem.innerHTML = text;

    return newElem;
}

const appendZero = (num) => {
    if(num == 0) return '00';
    if(num < 10) return '0'+num;
    return num.toString();
}

const msToTime = (ms) => {
    let secs = Math.floor(ms/1000);
    return `${Math.floor(secs/60)}:${appendZero(secs % 60)}`;
}

const uriToLink = (uri) => {
    let components = uri.split(':');
    return `/${components[1]}/${components[2]}`;
}

const styleSongTitleElement = (elem, uri) => {
    let chosenColor = '#FFFFFF';
    
    if(spotifyController.getCurrentSong().uri == uri){
        chosenColor = '#1DB954';
    }


    elem.style.color = chosenColor;
    elem.querySelector('div').style.color = chosenColor;

    return;
}

const buildResultElement = (data) => {
    let title = data.name;
    let type = data.type;
    let uri = data.uri;
    let artist = (data.artists ? data.artists.map(i => i = i.name).join(', ') : data.publisher);
    let imagesList = (data.album ? data.album.images : data.images);
    let cover = imagesList[imagesList.length - 1]?.url;
    let duration = ((type == 'track' || type == 'episode') ? msToTime(data.duration.milliseconds) : '');

    const container = document.createElement('div');
    container.style.width = `calc(100% - var(--margin-left))`;
    container.style.height = '3.5em';

    const element = searchController.elements.rowTemplateElement.cloneNode(true);
    element.style.width = `100%`;
    element.style.height = '3em';

    const titleElement = element.querySelector('[aria-colindex="1"] > div > a[draggable=false]');
    titleElement.querySelector('div').textContent = title;
    styleSongTitleElement(titleElement, uri);

    spotifyController.addEventListener('newsong', () => {
        styleSongTitleElement(titleElement, uri);
    });

    element.querySelector('[aria-colindex="1"] > div > a[draggable=false]').href = uriToLink(uri);

    const imgElement = element.querySelector('img');
    imgElement.src = cover;
    imgElement.parentElement.querySelector('button').remove();

    const artistElement = element.querySelector('[aria-colindex="1"] > div > span.standalone-ellipsis-one-line');
    artistElement.textContent = artist;

    const timeElement = element.querySelector('[aria-colindex="2"] > div');
    timeElement.textContent = duration;

    imgElement.addEventListener('click', playURI(uri));

    container.appendChild(element);

    return container;
}

const playURI = (uri) => {
    return () => {
        spotifyController.playURI(uri);
    };
}

const initializeResultRowBuilder = () => {
    if(searchController.elements.rowTemplateElement) return;
    
    const rowElement = document.querySelector('[data-testid="tracklist-row"]');
    const cloned = rowElement.cloneNode(true);


    searchController.elements.rowTemplateElement = cloned;
    
    cloned.querySelector('[aria-checked=true]')?.remove();


    return;
}

const initializeCarouselBuilder = () => {
    let candidates = Array.from(document.querySelectorAll('[data-carousel-item=true] > a > button > span'));
    candidates = candidates.filter(i => !getComputedStyle(i).background.startsWith('rgb(255, 255, 255)'));

    searchController.elements.carouselTemplateElement = candidates[0].cloneNode(true);

    document.querySelector('[data-carousel-item=true]').parentElement.parentElement.parentElement.parentElement.style.display = 'none';

    return;
}

const getDefaultFontSize = (parentElement) => {
    parentElement = parentElement || document.body;
    var div = document.createElement('div');
    div.style.width = "1000em";
    parentElement.appendChild(div);
    var pixels = div.offsetWidth / 1000;
    parentElement.removeChild(div);
    return pixels;
}

window.addEventListener('resize', () => {

})



