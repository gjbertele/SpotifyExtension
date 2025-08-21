class MessageHandler {
    postMessageToInjectedAsync = async (type) => {
        let id = Math.random();
        let customEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail':{
                'type':type,
                'id':id
            }
        });

        const fastPromise = new Promise((resolve) => {
            window.addEventListener('spotifyExtensionMessageResponse',(e) => {
                if(e.detail.id != id) return;

                window.removeEventListener('spotifyExtensionMessageResponse', this);
                resolve(e.detail);
            });
            window.dispatchEvent(customEvent);
        });

        return Promise.race([fastPromise, this.#generateRace(2000)]);
    
    }
    
    #generateRace = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Timeout');
            }, ms);
        });
    }
    
    addAlertListener = (callback) => {
        window.addEventListener('spotifyExtensionAlert', callback);
        
        return;
    }

    addEventMessageListener = (callback) => {
        window.addEventListener('spotifyExtensionMessage', callback);

        return;
    }

    addRuntimeListener = (callback, overrideForward = false) => {
        chrome.runtime.onMessage.addListener((msg, sender, response) => {
            if(msg.from != 'popup') return;
            if(msg.forward == overrideForward || (!msg.forward && !overrideForward)) callback(msg, response);
        });

        return;
    }

    sendRuntimeMessage = async (data) => {
        chrome.runtime.sendMessage({
                from: 'content',
                ...data
        });

        return;
    }

    initialize = () => {
        this.addRuntimeListener(async (msg, response) => {
            if(msg.forward === true){
                let forwardedResponse = await messagingHandler.postMessageToInjectedAsync(msg.subject); 

                this.sendRuntimeMessage({
                    id:msg.id,
                    data:forwardedResponse.data
                });
            }

            return;
        }, true);

        return;
    }
}

window.contentMessagingHandler = MessageHandler;