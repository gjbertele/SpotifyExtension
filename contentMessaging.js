class MessageHandler {
    postMessageToInjectedAsync = async (type) => {
        let id = Math.random();
        let customEvent = new CustomEvent('spotifyExtensionMessage', {
            'detail':{
                'type':type,
                'id':id
            }
        });

        return new Promise((resolve) => {
            window.addEventListener('spotifyExtensionMessageResponse',(e) => {
                if(e.detail.id != id) return;

                window.removeEventListener('spotifyExtensionMessageResponse', this);
                resolve(e.detail);
            });
            window.dispatchEvent(customEvent);
        });
    
    }
    
    addAlertListener = (callback) => {
        window.addEventListener('spotifyExtensionAlert', callback);
    }

    addEventMessageListener = (callback) => {
        window.addEventListener('spotifyExtensionMessage', callback);
    }

    addRuntimeListener = (callback, overrideForward = false) => {
        chrome.runtime.onMessage.addListener((msg, sender, response) => {
            if(msg.from != 'popup') return;
            if(msg.forward == overrideForward || (!msg.forward && !overrideForward)) callback(msg, response);
        });
    }

    sendRuntimeMessage = async (data) => {
        chrome.runtime.sendMessage({
                from: 'content',
                ...data
            });
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
    }
}

window.contentMessagingHandler = MessageHandler;