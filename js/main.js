(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("bg-primary shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("bg-primary shadow-sm").css("top", "-150px");
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    items: 1,
    autoplay: true,
    smartSpeed: 1000,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Language Switcher
  function toggleDropdown() {
    const dropdown = document.getElementById("dropdownContent");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }

  async function loadTranslations() {
    try {
      const response = await fetch("translate.json");
      return response.json();
    } catch (error) {
      console.error("Error loading translations:", error);
      return {};
    }
  }


  async function switchLanguage(lang) {
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', lang);

    const translations = await loadTranslations();

    const langIcon = document
      .getElementById("langDropdown")
      .querySelector("img");
    const dropdown = document.getElementById("dropdownContent");

    const flags = {
      en: { src: "img/usa_flag.png", alt: "English" },
      kh: { src: "img/kh_flag.png", alt: "Khmer" },
    };

    // Update flag
    langIcon.src = flags[lang].src;
    langIcon.alt = flags[lang].alt;

    dropdown.innerHTML =
      lang === "en"
        ? `<a href="#" onclick="switchLanguage('kh')">
             <img class="flag" src="${flags.kh.src}" alt="${flags.kh.alt}" />
           </a>`
        : `<a href="#" onclick="switchLanguage('en')">
             <img class="flag" src="${flags.en.src}" alt="${flags.en.alt}" />
           </a>`;

    // Translate page content
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[key]) {
        element.innerText =
          lang === "kh" ? translations[key][0] : translations[key][1];
      }
    });

    dropdown.style.display = "none";
  }

  // On page load, check localStorage for selected language and apply it
  document.addEventListener('DOMContentLoaded', function() {
    let lang = localStorage.getItem('selectedLanguage') || 'kh';
    switchLanguage(lang);
  });

  window.toggleDropdown = toggleDropdown;
  window.switchLanguage = switchLanguage;

  // Close dropdown if clicking outside
  window.addEventListener("click", (event) => {
    if (!event.target.closest(".language-switcher")) {
      document.getElementById("dropdownContent").style.display = "none";
    }
  });
})(jQuery);

// script.js

// Get elements
const openPopupLinks = document.querySelectorAll(".openPopup"); // Select all video links
const closePopup = document.getElementById("closePopup");
const popup = document.getElementById("popup");
const videoContainer = document.getElementById("videoContainer");

// Open popup and embed video for each link
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
  videoContainer.innerHTML = ""; // Stop the video by removing iframe
});
