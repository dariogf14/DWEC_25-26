const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => {
  if (window.opener && !window.opener.closed) {
    const mainTitle = window.opener.document.querySelector("h1");
    if (mainTitle) {
      mainTitle.textContent = "El pop-up te saluda 👋";
    }
  }

  window.close();
});