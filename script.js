// Popup modal interactivity
const addBtn = document.getElementById("add-btn");
const addPopup = document.getElementById("add-popup");
const closeBtn = document.getElementById("close-popup");

addBtn.addEventListener("click", () => {
  addPopup.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === addPopup) {
        addPopup.style.display = "none";
    }
});

closeBtn.addEventListener("click", () => {
    addPopup.style.display = "none";
});

