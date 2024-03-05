const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let storedPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    storedPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (storedPrompt) {
        storedPrompt.prompt();

        storedPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log ('Accepted install prompt')
            }

            console.log('Rejected install prompt')
        })
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App Installed!')
});
