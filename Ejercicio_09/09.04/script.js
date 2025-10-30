let popupWindow = null;

function openPopup() {
  const width = 400;
  const height = 300;
  const left = (window.screen.width - width) / 2;
  const top = 50;

  if (!popupWindow || popupWindow.closed) {
    popupWindow = window.open(
      "popup.html",
      "MiPopup",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  } else {
    popupWindow.focus();
  }
}

function closePopup() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}

window.addEventListener("load", () => {
  setTimeout(openPopup, 5000);
});

document.getElementById("openPopup").addEventListener("click", openPopup);
document.getElementById("closePopup").addEventListener("click", closePopup);