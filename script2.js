// Form validation and submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default form submission (page reload)

  // Here, you can add the logic for submitting the form, e.g., via AJAX or other methods.
  alert("Thank you for your message! We will get back to you shortly.");

  // Optionally, reset the form after submission
  contactForm.reset();
});
// Menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});
