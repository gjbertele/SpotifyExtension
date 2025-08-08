class MessagingHandler {
    postResponse = (data) => {
        let newEvent = new CustomEvent('spotifyExtensionMessageResponse', {
            'detail': data
        });

        window.dispatchEvent(newEvent);

        return;
    }

    postAlert = (data) => {
        let newEvent = new CustomEvent('spotifyExtensionAlert', {
            'detail': data
        });

        window.dispatchEvent(newEvent);

        return;
    }

    initializeConnectionChannel = async () => {
        window.addEventListener('spotifyExtensionMessage', async (e) => {
            if (e.detail.type == 'command') {
                commandHandler(e.detail)
            } else if (e.detail.data == 'songData') {
                songDataRequest(e.detail)
            } else if (e.detail.type == 'audioDataRequest') {
                let responseData = await spotifyController.getAudioAmplitudes();
                this.postResponse({
                    'forward': true,
                    'id': e.detail.id,
                    'data': responseData
                });
            }
        });

        window.postMessageAsync = this.postMessageAsync;

        return;
    }

    postMessageAsync = async (type, data) => {
        let id = Math.random();
        let newEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail': {
                'type': type,
                'data': data,
                'id': id
            }
        });
        let promise = new Promise((resolve) => {
            window.addEventListener('spotifyExtensionMessageResponse', (e) => {
                if (e.detail.id != id) return;
                window.removeEventListener('spotifyExtensionMessageResponse', this);
                resolve(e.detail.data);
            });
        });

        window.dispatchEvent(newEvent);
        return promise;

    }

    initializeBroadcastHandler = () => {
        this.broadcastChannel = new BroadcastChannel('spotifyExtensionBroadcast');

        return;
    }

    addBroadcastEventListener(callback){
        this.broadcastChannel.addEventListener('message', callback);
    }

    broadcastResponse = (data, id) => {
        this.broadcastChannel.postMessage({
            'data': data,
            'id': id
        });

        return;
    }

    broadcastAsync = async (data) => {
        let id = Math.random();

        this.broadcastChannel.postMessage({
            'data':data,
            'id':id
        });

        return new Promise((resolve) => {
            this.broadcastChannel.addEventListener('message', (e) => {
                let msg = e.data;
                if(msg.id != id) return;
                resolve(msg.data);
            });
        });
    }
}