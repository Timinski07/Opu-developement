let url = "";
var port = null;
let tabNum = 0;


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    tabNum = tabId;
    var tmp = url;
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        url = tabs[0].url;
    });
    if (checkList(url)) {
        removeTab(tabId)
    }
    if (url.search("google") > -1 && url.search("search") > -1) {
        chrome.tabs.executeScript(null, { file: "./content_scripts/foreground.js" }, () => console.log("I injected 2"));
    }
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        removeTab(tabNum);
    }
);

function removeTab(id) {
    chrome.tabs.getCurrent(function (tab) {
        try {
            chrome.tabs.remove(id, function () { console.log("removed") });
        }
        catch (err) {
            console.log(err);
            setTimeout(function () {
                removeTab(id);
            }, 100);
        }
    });
}

function checkList(word) {
    var einArray = ["bing", "ecosia", "yahoo", "duckgo", "ask.com", "baidu", "aol.com", "excite.com", "swisscows.com", "creativecommons", "yandex", "reddit", "instagram"]
    word = word.toLowerCase();
    var included = false
    einArray.forEach(function (einArrayElement) {
        if (word.search(einArrayElement) > -1)
            included = true;
    });
    return included;
}