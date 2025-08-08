class SpotifyController {
    playerAPI;
    mediaElement;
    APIHandler;
    audioNodes;
    audioCtx;
    #lastSongPlaying;

    #eventListeners = {};

    skip = () => {
        if(this.playerAPI) this.playerAPI.skipToNext();
        
        return;
    }

    back = () => {
        if(this.playerAPI) this.playerAPI.skipToPrevious();
        
        return;
    }

    pause = () => {
        if(this.playerAPI) this.playerAPI.pause();
        
        return;
    }

    play = () => {
        if(this.playerAPI) this.playerAPI.resume();

        return;
    }

    seekForwards = (t) => {
        if(this.playerAPI) this.playerAPI.seekForward(t);

        return;
    }

    bassBoost = (db) => {
        if(this.audioNodes){
            this.audioNodes['biquadNode'].frequency.value = 120;
            this.audioNodes['biquadNode'].gain.value = db;
        } else {
            this.messagingHandler.broadcastAsync({
                'type':'dataUpdate',
                'data':'bassUpdate',
                'bassVal':db
            });
        }
        return;

    }

    getAudioAmplitudes = async () => {
        if(this.audioNodes){
            const analyzerNode = this.audioNodes['analyzerNode'];

            const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
            analyzerNode.getByteTimeDomainData(dataArray);

            return dataArray;
        } else {
            let awaitedData = await this.messagingHandler.broadcastAsync({
                'type':'dataRequest',
                'data':'audioAmplitudes'
            });
            return awaitedData;
        }
    }

    getComputedVolume = () => {
        if(!this.audioNodes) return;
        const analyzerNode = this.audioNodes['analyzerNode'];

        const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
        analyzerNode.getByteFrequencyData(dataArray);

        let sum = 0;
        for(let i = 0; i<dataArray.length/2; i++) sum += dataArray[i]/255;

        return sum*2/dataArray.length;
    }

    getQueuePrivate = async () => {
        return await this.playerAPI._queue._queueManager.getInternalPlayerQueue();
    }

    getQueue = async () => {
        return (await this.getQueuePrivate()).next_items;
    }

    getCurrentSong = () => {
        return this.playerAPI._queue.getQueue().current;
    }

    clearQueue = async () => {
        this.playerAPI._queue.clearQueue();

        return;
    }

    setAPIHandler = (handler) => {
        this.APIHandler = handler;

        return;
    }

    setPlayerAPI = (api) => {
        this.playerAPI = api;

        return;
    }

    addEventListener = (event, callback) => {
        if(!this.#eventListeners[event]) this.#eventListeners[event] = [];

        this.#eventListeners[event].push(callback);

        return;
    }

    #triggerEvent = (eventName, data) => {
        if(!this.#eventListeners[eventName]) return;
        for(let i in this.#eventListeners[eventName]) this.#eventListeners[eventName][i](data);

        return;
    }

    playerUpdate = (event) => {
        const item = event.data.item;
        if(!this.#lastSongPlaying || item.name != this.#lastSongPlaying.name) this.#triggerEvent('newsong', event.data);
        
        this.#lastSongPlaying = this.getCurrentSong();

        return;
    }

    #updatePlayerAPI = async () => {
        this.playerAPI = await window.getPlayerAPI();
        this.#lastSongPlaying = this.getCurrentSong();

        return;
    }

    #dataRequestHandler = async (msg) => {
        if(msg.data.data == 'audioAmplitudes'){
            if(!this.audioNodes) return;
            let responseData = await this.getAudioAmplitudes();
            
            messagingHandler.broadcastResponse(responseData, msg.id);
        }

        return;
    }

    #dataUpdateHandler = async (msg) => {
        if(msg.data.data == 'bassUpdate'){
            if(!this.audioNodes) return;
            this.bassBoost(msg.data.bassVal);
            this.messagingHandler.broadcastResponse({},msg.id);
        }
    }

    initialize = () => {
        this.messagingHandler = new MessagingHandler();
        this.messagingHandler.initializeBroadcastHandler();

        this.messagingHandler.addBroadcastEventListener((e) => {
            if(e.data.data.type == 'dataRequest') this.#dataRequestHandler(e.data);
            if(e.data.data.type == 'dataUpdate') this.#dataUpdateHandler(e.data);
        });

        return;
    }


}