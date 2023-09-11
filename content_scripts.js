(function () {
  var isPluginEnabled = true; // Initially, assume the plugin is enabled
  var loggingInterval; // Define the interval variable

  function init() {
    // Retrieve the button state from Chrome Storage
    chrome.storage.sync.get(['isDisabled'], function (result) {
      isPluginEnabled = !result.isDisabled;

      if (isPluginEnabled) {
        // Start the loop only if the plugin is enabled
        startLoggingLoop();
      }
    });
  }

  function startLoggingLoop() {
    // This function logs a message every 1 second until the plugin is disabled
    loggingInterval = setInterval(function () {
      if (!isPluginEnabled) {
        clearInterval(loggingInterval); // Stop the loop when the plugin is disabled
      } else {
        console.log("Logging every 1 second...");
      }
    }, 1000);
  }


  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.disabled) {
      // Handle the case when the plugin is disabled
      console.log("Plugin is disabled");
      isPluginEnabled = false; // Set the flag to indicate that the plugin is disabled
    } else {
      // Handle the case when the plugin is enabled
      console.log("Plugin is enabled");
      isPluginEnabled = true; // Set the flag to indicate that the plugin is enabled
      startLoggingLoop(); // Start or restart the logging loop
    }
  });

  // Initialize based on the initial button state
  init();
})();


