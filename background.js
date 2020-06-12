// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var contexts = ["selection"];
  var title = "Search Slate for Info";
    var id = chrome.contextMenus.create({"title": title, "contexts":contexts,
                                          "id": "contextlloyd" });
});

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  if(!sText){
    alert(info.pageUrl);
    sText = info.pageUrl;
  }
//  console.log("domain: " + rtClickDomain);
  if (rlClickDomain){
//    var punctuation = '!"#$%&\'()*+,-./:;<=>?[\\]^_`{|}~';
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    var cleanString = sText.replace(regex, '');

    console.log('Slate user domain for Right-Click extension currently is ' + rlClickDomain);
    var url = 'https://' + rlClickDomain + '/manage/lookup/search#{%22q%22:%22'  + encodeURIComponent(cleanString) + '%22,%22pg%22:%220%22,%22sort%22:%22%22,%22filter%22:[]}';
    window.open(url, '_blank');
  } else {
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
  }  
};

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

var rlClickDomain;

function RefreshInfo(){
  chrome.storage.sync.get(['edudomain'], function(items) {
    rlClickDomain = items.edudomain;
  });  
}

RefreshInfo();
