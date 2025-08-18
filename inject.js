let APIList, spotifyController, APIHandler, songPlaying = {},
    messagingHandler, trackerClassInstance;

const resolverProxy = {
    resolve: function(symbol) {
        for (let i = 0; i < APIList.length; i++) {
            if (APIList[i][0] == symbol) return APIList[i][1].instance;
        }
        return;
    }
};


const isTargettedFaultyElement = (elem) => {
    return elem.getAttribute('loading') == 'eager';
}

const isElementVisible = (elem) => {
    if (elem.getAttribute('aria-hidden') == 'true') return false;
    if (getComputedStyle(elem).display == 'none') return false;


    return true;
}


const patchPlayerElement = () => {
    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = function(...args) {
        if (this.parentElement == null && this.src && spotifyController) {
            spotifyController.mediaElement = this;
            insertAudioContext(this);
        }

        return originalPlay.apply(this, args);
    }

}

const patchTrackerClass = async () => {
    const trackerClass = (await playerAPI._harmony._streamer._listPlayer._getTrackPlayer())._tracker.constructor.prototype

    const original = trackerClass._checkPlayedThreshold;

    trackerClass._checkPlayedThreshold = function(...args){
        if(!trackerClassInstance) trackerClassInstance = this;
        return original.apply(this, args);
    }

    return;

}

const isOfNativeType = (obj) => {
    return !obj || typeof obj != 'object' || obj.constructor.toString() == 'function Function() { [native code] }';
}

const crawlObject = (obj, pattern, path = []) => {
    if(path.length > 10) return;
    
    if(obj == pattern){
        console.log(path);
        return;
    }
    
    if(isOfNativeType(obj)) return;
    
    for(let i in obj){
        path.push(i);
        crawlObject(obj[i], pattern, path);
        path.pop();
    }

    return;

}

const getSongDownloadUrl = () => {
    return trackerClassInstance ? Object.keys(trackerClassInstance._trackingData._cdnURLTracker._map)[0] : null;
}

const insertAudioContext = (element) => {
    if (spotifyController.audioCtx) return;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(element);

    const analyzerNode = audioCtx.createAnalyser();
    const biquadNode = audioCtx.createBiquadFilter();

    source.connect(biquadNode);

    biquadNode.connect(analyzerNode);
    biquadNode.type = 'lowshelf';


    analyzerNode.connect(audioCtx.destination);
    analyzerNode.fftSize = 2048;

    spotifyController.audioCtx = audioCtx;
    spotifyController.audioNodes = {
        'analyzerNode': analyzerNode,
        'biquadNode': biquadNode
    }
}

const initializeWebpackAccess = () => {
    window.webpackChunkclient_web = window.webpackChunkclient_web || [];
    window.webpackChunkclient_web.push([
        [Math.random()],
        {},
        (req) => {
            window.webpackRequire = req;
        }
    ]);

    return;
}

const getAPIs = async () => {
    if (APIList) return APIList;
    APIHandler = null;
    for (let id in webpackRequire.m) {
        let mod = webpackRequire(id);
        if (mod.createPlatformWeb) {
            APIHandler = mod;
            break;
        }
    }
    if (APIHandler == null) throw new Error('No API handler found');

    let y = await APIHandler.createPlatformWeb();
    let z = y.getRegistry();
    APIList = Array.from(z._map);
    return APIList;
}

const getPlayerAPI = async () => {
    return (await getAPIs())[19][1].instance;
}

window.getPlayerAPI = getPlayerAPI;

const createPlayerAPI = async () => {
    window.playerAPI = await getPlayerAPI();
    if (window.playerAPI == null) {
        setTimeout(createPlayerAPI, 1000);
    } else {
        playerAPICreated();
    }
    return;
}

document.body.onload = createPlayerAPI;

const playerAPICreated = async () => {
    patchTrackerClass();

    spotifyController = new SpotifyController();
    spotifyController.setPlayerAPI(window.playerAPI);
    spotifyController.setAPIHandler(APIHandler);
    spotifyController.initialize();

    //completelyPatchClass((await playerAPI._harmony._streamer._listPlayer._getTrackPlayer())._audioResolver.constructor)
    //completelyPatchClass(window.playerAPI._harmony._streamer.constructor);

    window.spotifyController = spotifyController;

    window.playerAPI.getEvents().addListener('update', playerUpdated);
    window.playerAPI.getEvents().addListener('update', spotifyController.playerUpdate);

    let newEvent = new CustomEvent('spotifyControllerCreated');
    window.dispatchEvent(newEvent);

    return;
}

const fireMainAppLoad = () => {
    let event = new CustomEvent('mainAppLoaded');
    window.dispatchEvent(event);

    return;
}

const playerUpdated = (e) => {
    if (e.data.item.name == songPlaying.title && e.data.item.artists[0].name == songPlaying.artist) return;

    if (!songPlaying.title) fireMainAppLoad();

    songPlaying.title = e.data.item.name;
    songPlaying.artist = e.data.item.artists[0].name;
    messagingHandler.postAlert({
        'type': 'newSong',
        'songData': songPlaying
    });

    return;
}

const commandHandler = (detail) => {
    if (detail.data == 'seekforwards') {
        spotifyController.seekForwards(detail.time * 1000);
    } else if (detail.data == 'bassboost') {
        spotifyController.bassBoost(detail.dbDiff);
    } else if (spotifyController[detail.data]) {
        spotifyController[detail.data]();
    }

    return;
}



const songDataRequest = (detail) => {
    let newDetail = {}

    if (window.playerAPI != null && window.playerAPI._harmony._controller._state) {
        let controller = window.playerAPI._harmony._controller;
        newDetail.data = {
            'title': controller._state.track_window.current_track.name,
            'artist': controller._state.track_window.current_track.artists[0].name,
            'time': controller._progressPosition,
            'id': detail.id
        }
    }

    messagingHandler.postResponse(newDetail)

    return;
}


window.addEventListener('spotifyExtensionMessage', async (e) => {
    if (e.detail.type == 'command') {
        commandHandler(e.detail)
    } else if (e.detail.data == 'songData') {
        songDataRequest(e.detail)
    } else if (e.detail.type == 'audioDataRequest') {
        let responseData = Array.from(await spotifyController.getAudioAmplitudes());

        messagingHandler.postResponse({
            'forward': true,
            'id': e.detail.id,
            'data': responseData
        });
    }
});


const createMessagingHandler = () => {
    try {
        messagingHandler = new MessagingHandler();
        messagingHandler.initializeConnectionChannel();
        console.log('Created handler');
    } catch (err) {
        console.log(err);
        setTimeout(createMessagingHandler, 10);
    }
}

let globalLoadedList;


const completelyPatchClass = (obj, callback) => {
    let keys = Object.getOwnPropertyNames(obj.prototype)

    for (let idx in keys) {
        let key = keys[idx];

        try {
            if (typeof obj.prototype[key] == 'function') {
                const original = obj.prototype[key];
                console.log('patched function ',key);
                obj.prototype[key] = function(...args) {
                    if(key != '_translatePosition') console.log(`${key} called with args`, args);
                    
                    if(!globalLoadedList) globalLoadedList = this._loadedList;

                    let result = original.apply(this, args);
                    //console.log('result:',result);
                    //console.trace();
                    return result;
                }
            }
        } catch {}

    }

    return;
}

const getCurationAPI = () => {
    return APIList[43][1].factory(resolverProxy);
}

const getShuffleAPI = () => {
    return APIList[29][1].factory(resolverProxy);
}

try {
    patchPlayerElement();
    initializeWebpackAccess();
    createMessagingHandler();
} catch (err) {
    console.log(err);
}