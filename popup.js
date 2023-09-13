document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('disable-btn');

    // Load the button state from Chrome Storage and set the initial button text accordingly
    chrome.storage.sync.get(['isDisabled'], function (result) {
        var isDisabled = result.isDisabled === true;
        toggleButton.innerText = isDisabled ? 'Enable' : 'Disable';

        // Set the button's ID based on the state
        toggleButton.id = isDisabled ? 'disable-btn' : 'enable-btn';
    });

    toggleButton.addEventListener('click', function () {
        var thisButton = this;
        var disable = thisButton.innerText === 'Disable' ? true : false;
        thisButton.innerText = disable ? 'Enable' : 'Disable';

        // Set the button's ID based on the state
        toggleButton.id = disable ? 'disable-btn' : 'enable-btn';

        // Save the button state to Chrome Storage
        chrome.storage.sync.set({ isDisabled: disable });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { disabled: disable });
        });
    });
}, false);



