console.log("LiveOverlayExtension: content script loaded");

if (!document.getElementById("overlay-iframe")) {
  const iframe = document.createElement("iframe");
  iframe.src = "https://hiousastg.wpengine.com";
  iframe.id = "overlay-iframe";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.zIndex = "9999";
  iframe.style.pointerEvents = "none";
  iframe.style.opacity = "0.5";
  iframe.style.filter = "none";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";
  iframe.setAttribute("scrolling", "no");

  const controls = document.createElement("div");
  controls.style.position = "fixed";
  controls.style.top = "10px";
  controls.style.right = "10px";
  controls.style.zIndex = "10001";
  controls.style.background = "rgba(255, 255, 255, 0.95)";
  controls.style.padding = "10px";
  controls.style.border = "1px solid #ccc";
  controls.style.borderRadius = "5px";
  controls.style.fontSize = "12px";
  controls.style.fontFamily = "sans-serif";
  controls.style.userSelect = "none";
  controls.style.pointerEvents = "auto"; // always allow control panel to be clickable

  const dragHandle = document.createElement("div");
  dragHandle.textContent = "Overlay Controls";
  dragHandle.style.fontWeight = "bold";
  dragHandle.style.marginBottom = "8px";
  dragHandle.style.cursor = "move";
  dragHandle.style.userSelect = "none";
  controls.appendChild(dragHandle);

  const sliderLabel = document.createElement("label");
  sliderLabel.textContent = "Opacity: ";
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 100;
  slider.value = 50;
  slider.style.marginBottom = "5px";
  slider.oninput = (e) => {
    iframe.style.opacity = e.target.value / 100;
  };

  const urlLabel = document.createElement("label");
  urlLabel.textContent = "Overlay URL: ";
  urlLabel.style.display = "block";
  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.value = iframe.src;
  urlInput.style.width = "250px";
  urlInput.style.marginBottom = "5px";
  urlInput.onchange = () => {
    iframe.src = urlInput.value;
  };

  const invertLabel = document.createElement("label");
  invertLabel.textContent = " Invert Colors";
  const invertCheckbox = document.createElement("input");
  invertCheckbox.type = "checkbox";
  invertCheckbox.style.marginLeft = "10px";
  invertCheckbox.onchange = () => {
    iframe.style.filter = invertCheckbox.checked ? "invert(1)" : "none";
  };
  invertLabel.appendChild(invertCheckbox);

  const scrollLabel = document.createElement("label");
  scrollLabel.textContent = " Enable Scrolling";
  const scrollCheckbox = document.createElement("input");
  scrollCheckbox.type = "checkbox";
  scrollCheckbox.style.marginLeft = "10px";
  scrollCheckbox.checked = true;
  scrollCheckbox.onchange = () => {
    const value = scrollCheckbox.checked ? "auto" : "hidden";
    document.body.style.overflow = value;
    document.documentElement.style.overflow = value;
  };
  scrollLabel.appendChild(scrollCheckbox);

  // Overlay Unlock Toggle
  const unlockButton = document.createElement("button");
  unlockButton.textContent = "🔓 Unlock Overlay";
  unlockButton.style.marginTop = "8px";
  unlockButton.style.padding = "6px";
  unlockButton.style.cursor = "pointer";
  unlockButton.style.background = "#444";
  unlockButton.style.color = "white";
  unlockButton.style.border = "1px solid #666";
  unlockButton.style.borderRadius = "4px";
  unlockButton.style.width = "100%";
  unlockButton.id = "unlock-overlay-button";
  controls.appendChild(unlockButton);

  // Add controls
  controls.appendChild(scrollLabel);
  controls.appendChild(document.createElement("br"));
  controls.appendChild(sliderLabel);
  controls.appendChild(slider);
  controls.appendChild(document.createElement("br"));
  controls.appendChild(urlLabel);
  controls.appendChild(urlInput);
  controls.appendChild(document.createElement("br"));
  controls.appendChild(invertLabel);

  document.body.appendChild(iframe);
  document.body.appendChild(controls);
  console.log("Overlay iframe and controls added");

  // Drag logic
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  dragHandle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - controls.getBoundingClientRect().left;
    offsetY = e.clientY - controls.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      controls.style.left = `${e.clientX - offsetX}px`;
      controls.style.top = `${e.clientY - offsetY}px`;
      controls.style.right = "auto";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Unlock toggle logic
  window.overlayUnlocked = false;

  unlockButton.addEventListener("click", () => {
    if (!iframe) return;

    window.overlayUnlocked = !window.overlayUnlocked;

    if (window.overlayUnlocked) {
      iframe.style.pointerEvents = "auto";
      iframe.style.overflow = "auto";
      iframe.setAttribute("scrolling", "yes");

      document.body.style.pointerEvents = "none";
      document.documentElement.style.pointerEvents = "none";
      controls.style.pointerEvents = "auto";

      unlockButton.textContent = "🔒 Lock Overlay";
    } else {
      iframe.style.pointerEvents = "none";
      iframe.style.overflow = "hidden";
      iframe.setAttribute("scrolling", "no");

      document.body.style.pointerEvents = "auto";
      document.documentElement.style.pointerEvents = "auto";
      controls.style.pointerEvents = "auto";

      unlockButton.textContent = "🔓 Unlock Overlay";
    }
  });
}
