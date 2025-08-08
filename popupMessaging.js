class MessagingHandler {
    postMessageToInjectedAsync = async (type) => {
        return new Promise(async (resolve) => {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            console.log('got tab',tab);

            let responseID = Math.random();


            chrome.runtime.onMessage.addListener((msg) => {
                if(msg.id != responseID) return;
                chrome.runtime.onMessage.removeListener(this);
                resolve(msg.data);
            });

            chrome.tabs.sendMessage(
                tab.id, {
                    from: 'popup',
                    forward: true,
                    subject: type,
                    id:responseID
                });
        });
    }

    postTabMessage = async (data, callback) => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        chrome.tabs.sendMessage(
                tab.id, {
                    from: 'popup',
                    ...data
                },
                callback);
    }
}