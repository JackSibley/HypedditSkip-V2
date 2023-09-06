if (window.location.href.startsWith("https://hypeddit.com/")) {
  // Find the existing button you want to insert a new button below
  const existingDLButton = document.querySelector("#downloadProcess");

  const downloadName = document.querySelector("h2").innerText;
  const downloadLink =
    "https://hypeddit-gates-prod.s3.amazonaws.com/" +
    document.querySelector("#current_download_file_listner").value +
    "_main";

  if (existingDLButton) {
    // Create a new button element
    const newDLButton = document.createElement("button");
    newDLButton.textContent = "Skip DL Gate";

    // Add an ID or any other attributes you need for the new button
    newDLButton.id = "newDownloadProcess";

    // Apply CSS to center align the new button
    newDLButton.style.display = "block";
    newDLButton.style.margin = "0 auto";
    newDLButton.style.width = "100%";
    newDLButton.style.fontSize = "20px";

    // Insert the new button below the existing button
    existingDLButton.parentNode.insertBefore(
      newDLButton,
      existingDLButton.nextSibling
    );

    // Send Download Info when Button is pressed
    newDLButton.addEventListener("click", function () {
      (async () => {
        const response = await chrome.runtime.sendMessage({
          downloadURL: downloadLink,
          filename: downloadName,
        });
        console.log(response);
      })();
    });
  }
}
