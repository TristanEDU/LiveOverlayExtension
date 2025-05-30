const tabOverlayStatus = {};

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;

  if (tabOverlayStatus[tabId]) {
    // Already injected → remove overlay
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const iframe = document.getElementById("overlay-iframe");
        const panel = document.querySelector(
          'div[style*="Overlay Controls"]'
        )?.parentElement;
        if (iframe) iframe.remove();
        if (panel) panel.remove();
      },
    });
    tabOverlayStatus[tabId] = false;
    chrome.action.setIcon({ tabId, path: "icon-off.png" }); // optional
  } else {
    // Not injected → inject content.js
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
    tabOverlayStatus[tabId] = true;
    chrome.action.setIcon({ tabId, path: "icon-on.png" }); // optional
  }
});
