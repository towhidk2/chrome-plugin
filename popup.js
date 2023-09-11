document.addEventListener('DOMContentLoaded', function() {
  var enableButton = document.getElementById('enable-extension');

  // Load the button state from Chrome Storage and set the initial button text accordingly
  chrome.storage.sync.get(['isDisabled'], function(result) {
      var isDisabled = result.isDisabled === true;
      enableButton.innerText = isDisabled ? 'Enable' : 'Disable';
  });

  enableButton.addEventListener('click', function() {
      var thisButton = this;
      var disable = thisButton.innerText === 'Disable' ? true : false;
      thisButton.innerText = disable ? 'Enable' : 'Disable';

      // Save the button state to Chrome Storage
      chrome.storage.sync.set({ isDisabled: disable });

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { disabled: disable });
      });
  });
}, false);



