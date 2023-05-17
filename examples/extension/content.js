function addExampleBanner() {
  const exampleBanner = document.createElement("div");
  exampleBanner.id = "example-banner";
  exampleBanner.style.position = "fixed";
  exampleBanner.style.top = "0";
  exampleBanner.style.left = "0";
  exampleBanner.style.right = "0";
  exampleBanner.style.padding = "20px";
  exampleBanner.style.backgroundColor = "#4CAF50";
  exampleBanner.style.color = "white";
  exampleBanner.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  exampleBanner.style.fontSize = "24px";
  exampleBanner.style.textAlign = "center";
  exampleBanner.style.zIndex = "9999";
  exampleBanner.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  const bannerMessage = document.createElement("span");
  bannerMessage.innerText = "Bears, beets, Battlestar Galactica!";
  exampleBanner.appendChild(bannerMessage);

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.marginLeft = "10px";
  closeButton.style.padding = "5px";
  closeButton.style.fontSize = "18px";
  closeButton.style.cursor = "pointer";
  closeButton.style.backgroundColor = "#f44336";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "4px";
  closeButton.style.minWidth = "128px";
  closeButton.onclick = () => {
    exampleBanner.style.display = "none";
  };
  exampleBanner.appendChild(closeButton);

  const testButton = document.createElement("button");
  testButton.innerText = "Test";
  testButton.style.marginLeft = "10px";
  testButton.style.padding = "5px";
  testButton.style.fontSize = "18px";
  testButton.style.cursor = "pointer";
  testButton.style.backgroundColor = "#2196F3";
  testButton.style.color = "white";
  testButton.style.border = "none";
  testButton.style.borderRadius = "4px";
  testButton.style.minWidth = "128px";
  testButton.onclick = () => {
    bannerMessage.innerText = "Passed but, I declare BANKRUPTCY!";
  };
  exampleBanner.appendChild(testButton);

  document.body.appendChild(exampleBanner);

  let timeRemaining = 30;
  const countdown = setInterval(() => {
    timeRemaining -= 1;
    closeButton.innerText = `Close (${timeRemaining})`;

    if (timeRemaining === 0) {
      exampleBanner.style.display = "none";
      clearInterval(countdown);
    }
  }, 1000);
}

addExampleBanner();
