console.log("LiveOverlayExtension: content script loaded");

if (!document.getElementById("overlay-iframe")) {
  // Create overlay iframe
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

  // Create control panel
  const controls = document.createElement("div");
  controls.style.position = "fixed";
  controls.style.top = "10px";
  controls.style.right = "10px";
  controls.style.zIndex = "10000";
  controls.style.background = "rgba(255, 255, 255, 0.95)";
  controls.style.padding = "10px";
  controls.style.border = "1px solid #ccc";
  controls.style.borderRadius = "5px";
  controls.style.fontSize = "12px";
  controls.style.fontFamily = "sans-serif";
  controls.style.userSelect = "none";

  // Create drag handle
  const dragHandle = document.createElement("div");
  dragHandle.textContent = "Overlay Controls";
  dragHandle.style.fontWeight = "bold";
  dragHandle.style.marginBottom = "8px";
  dragHandle.style.cursor = "move";
  dragHandle.style.userSelect = "none";
  controls.appendChild(dragHandle);

  // Opacity slider
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

  // URL input
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

  // Invert toggle
  const invertLabel = document.createElement("label");
  invertLabel.textContent = " Invert Colors";
  const invertCheckbox = document.createElement("input");
  invertCheckbox.type = "checkbox";
  invertCheckbox.style.marginLeft = "10px";
  invertCheckbox.onchange = () => {
    iframe.style.filter = invertCheckbox.checked ? "invert(1)" : "none";
  };
  invertLabel.appendChild(invertCheckbox);

  // Scroll toggle
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

  // Assemble controls
  controls.appendChild(scrollLabel);
  controls.appendChild(document.createElement("br"));
  controls.appendChild(sliderLabel);
  controls.appendChild(slider);
  controls.appendChild(document.createElement("br"));
  controls.appendChild(urlLabel);
  controls.appendChild(urlInput);
  controls.appendChild(document.createElement("br"));
  controls.appendChild(invertLabel);

  // Add to page
  document.body.appendChild(iframe);
  document.body.appendChild(controls);

  console.log("Overlay iframe and controls added");

  // Drag logic (only from dragHandle)
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
}
