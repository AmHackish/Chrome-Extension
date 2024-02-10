chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectScripts") {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        files: ['scripts/content_injected.js']
      });
    }
  });
  
  chrome.tabs.onCreated.addListener(tab => {
    if (tab.pendingUrl && tab.pendingUrl.startsWith('chrome://')) {
      chrome.tabs.sendMessage(tab.id, { action: "injectScripts" });
    }
  });
  