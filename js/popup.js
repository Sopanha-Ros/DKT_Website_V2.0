// popup.js

// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create Popup Structure (if not present)
  if (!document.querySelector(".popup-overlay")) {
    const popupHTML = `
        <div class="popup-overlay" id="popup">
          <div class="popup-card">
            <span id="closePopup" class="close-btn">&times;</span>
            <div id="videoContainer"></div>
          </div>
        </div>
      `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
  }

  // Get elements
  const openPopupLinks = document.querySelectorAll(".openPopup");
  const closePopup = document.getElementById("closePopup");
  const popup = document.getElementById("popup");
  const videoContainer = document.getElementById("videoContainer");

  // Open popup and embed video
  openPopupLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Get YouTube video ID from data attribute
      const videoId = link.getAttribute("data-video-id");

      // Embed YouTube video iframe
      videoContainer.innerHTML = `
          <iframe 
            width="100%" 
            height="450" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>`;

      // Show the popup
      popup.style.display = "flex";
    });
  });

  // Close popup and stop video
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    videoContainer.innerHTML = ""; // Stop video playback
  });
});
