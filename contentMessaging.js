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
            const temp = (e) => {
                if(e.detail.id != id) return;
                resolve(e.detail);
            }
            window.addEventListener('spotifyExtensionMessageResponse',temp);
            window.dispatchEvent(customEvent);
        });
    
    }
    
    addAlertListener = (callback) => {
        window.addEventListener('spotifyExtensionAlert', callback);
    }

    addEventMessageListener = (callback) => {
        window.addEventListener('spotifyExtensionMessage', callback);
    }

    addRuntimeListener = (callback) => {
        chrome.runtime.onMessage.addListener((message, sender, response) => {
            callback(message, response);
        });
    }
}

window.contentMessagingHandler = MessageHandler;