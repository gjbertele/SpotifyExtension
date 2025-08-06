class Spotify {
    Spotify(){
        return this;
    }

    skip = () => {
        this.#postMessage('command', 'skip');
        return;
    }

    back = () => {
        this.#postMessage('command', 'back');
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

    bassBoost = (db) => {
        let newEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail':{
                'type':'command',
                'data':'bassboost',
                'dbDiff':db
            }
        });
        window.dispatchEvent(newEvent);
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