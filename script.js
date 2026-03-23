// Typing Animation
const typingElement = document.getElementById("typing");
const typingTexts = ["Frontend Developer", "Backend Developer", "Web Designer", "Problem Solver"];
let typingIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < typingTexts[typingIndex].length) {
    typingElement.textContent += typingTexts[typingIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    typingIndex = (typingIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 500);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkModeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Smooth Scroll
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// Fade-in on Scroll
const fadeElements = document.querySelectorAll(".fade-in");
function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
});
}
window.addEventListener("scroll", checkFade);
checkFade();

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});
