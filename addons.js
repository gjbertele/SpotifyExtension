const attachLinks = () => {
    let links = document.querySelectorAll(`link[rel~='icon']`);

    let metadata = navigator.mediaSession.metadata;

    if (metadata && metadata.artwork.length > 0) {
        links.forEach(function(link) {
            link.href = metadata.artwork[0].src;
        });
    }
}

const setupAttachLinks = () => {
    spotifyController.addEventListener('newsong', attachLinks);
}

const spotifyControllerCreated = () => {
    setupAttachLinks();
}

window.addEventListener('spotifyControllerCreated',spotifyControllerCreated);
