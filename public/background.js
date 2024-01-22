chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ws23InnoPlugin",
    title: "Save Table Data",
    contexts: ["selection"],
  });
});

/* chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "ws23InnoPlugin") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("./index.html")
    })
  }
}); */