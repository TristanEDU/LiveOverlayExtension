const tabOverlayStatus = {};

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;

  // First, always attempt to remove any existing overlay from this tab
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const iframe = document.getElementById("overlay-iframe");
      const controls = Array.from(document.querySelectorAll("div")).find(
        (el) =>
          el.textContent?.includes("Overlay Controls") &&
          el.style?.position === "fixed"
      );
      if (iframe) iframe.remove();
      if (controls) controls.remove();
    },
  });

  // If the overlay was already active, we just removed it above
  if (tabOverlayStatus[tabId]) {
    tabOverlayStatus[tabId] = false;
    chrome.action.setIcon({ tabId, path: "icon-off.png" }); // optional
  } else {
    // If not active, inject the overlay
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
    tabOverlayStatus[tabId] = true;
    chrome.action.setIcon({ tabId, path: "icon-on.png" }); // optional
  }
});
