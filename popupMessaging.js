class MessagingHandler {
    postMessageToInjectedAsync = async (type) => {
        return new Promise((resolve) => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        from: 'popup', 
                        forward:true, 
                        subject: type
                    },
                    (response) => {
                        resolve(response.data);
                    });
              });
        });
    }
    postTabMessage = (data, callback) => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', ...data},
                callback);
          });
    }
}