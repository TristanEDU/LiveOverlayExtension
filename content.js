if (!document.getElementById("overlay-iframe")) {
  const iframe = document.createElement("iframe");
  iframe.src = "https://hiousa.com"; // Change to your overlay site
  iframe.id = "overlay-iframe";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.zIndex = "9999";
  iframe.style.pointerEvents = "none";
  iframe.style.opacity = "0.5";

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 100;
  slider.value = 50;
  slider.style.position = "fixed";
  slider.style.top = "10px";
  slider.style.right = "10px";
  slider.style.zIndex = "10000";

  slider.oninput = (e) => {
    iframe.style.opacity = e.target.value / 100;
  };

  document.body.appendChild(iframe);
  document.body.appendChild(slider);
}
