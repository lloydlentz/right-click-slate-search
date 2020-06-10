// Saves options to chrome.storage
function save_options() {
    var edudomain = document.getElementById('edudomain').value;
    chrome.storage.sync.set({
        edudomain: edudomain
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved: ' + edudomain;
      chrome.extension.getBackgroundPage().RefreshInfo();
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      edudomain: 'engage.macalester.edu'
    }, function(items) {
      document.getElementById('edudomain').value = items.edudomain;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);

