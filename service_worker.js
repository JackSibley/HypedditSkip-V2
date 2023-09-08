chrome.action.setIcon({ path: "icons/icon_48.png" });

let originalFilename;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({ response: "Received Download Info" });
  originalFilename = request.filename;
  chrome.downloads.download({
    url: request.downloadURL,
  });
});

// Add an event listener to determine the filename
chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
  // clean filename from invalid characters
  originalFilename = originalFilename.replace(
    /[^a-zA-Z0-9\s.\-%\[\]{}()&]/g,
    ""
  );

  // Extract the file extension from the filename
  const fileExtension = item.filename.split(".").pop();
  console.log(fileExtension);

  // Suggest the modified filename with the original request.filename plus the detected file extension
  suggest({
    filename: originalFilename + "." + fileExtension,
    conflictAction: "overwrite",
  });
});
