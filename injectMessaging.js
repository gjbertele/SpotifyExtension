class MessagingHandler {
    broadcastChannel;

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
        return new Promise((resolve) => {
            window.addEventListener('spotifyExtensionMessageResponse', (e) => {
                if (e.detail.id != id) return;
                window.removeEventListener('spotifyExtensionMessageResponse', this);
                resolve(e.detail.data);
            });

            window.dispatchEvent(newEvent);
        });

    }

    initializeBroadcastHandler = () => {
        if(this.broadcastChannel) return;

        this.broadcastChannel = new BroadcastChannel('spotifyExtensionBroadcast');

        return;
    }

    addBroadcastEventListener(callback){
        if(!this.broadcastChannel) this.initializeBroadcastHandler();
        this.broadcastChannel.addEventListener('message', callback);
    }

    broadcastResponse = (data, id) => {
        if(!this.broadcastChannel) this.initializeBroadcastHandler();

        this.broadcastChannel.postMessage({
            'data': data,
            'id': id
        });

        return;
    }

    broadcastAsync = async (data) => {
        if(!this.broadcastChannel) this.initializeBroadcastHandler();

        let id = Math.random();

        this.broadcastChannel.postMessage({
            'data':data,
            'id':id
        });

        return new Promise((resolve) => {
            this.broadcastChannel.addEventListener('message', (e) => {
                let msg = e.data;
                if(msg.id != id) return;
                this.broadcastChannel.removeEventListener(this);
                resolve(msg.data);
            });
        });
    }
}