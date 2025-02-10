import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Howl } from "howler";

gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { duration: 0.2, left: e.clientX, top: e.clientY });
  gsap.to(cursorBlur, {
    duration: 0.3,
    left: e.clientX - 200,
    top: e.clientY - 200,
  });
});

document.querySelectorAll("a, button, .vehicle-item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, { duration: 0.3, scale: 1.5 });
    gsap.to(cursorBlur, { duration: 0.3, scale: 1.5, opacity: 0.5 });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, { duration: 0.3, scale: 1 });
    gsap.to(cursorBlur, { duration: 0.3, scale: 1, opacity: 1 });
  });
});

// Menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 3D Hero Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("hero-canvas").appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffd5,
  wireframe: true,
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-image");
  parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Vehicle showcase interaction
const vehicleItems = document.querySelectorAll(".vehicle-item");
const vehicleDetails = document.getElementById("vehicle-details");
const vehicleName = document.getElementById("vehicle-name");
const vehicleDescription = document.getElementById("vehicle-description");
const vehicleSpecs = document.getElementById("vehicle-specs");

const vehicleData = {
  sedan: {
    name: "Luxury Sedan",
    description:
      "Experience unparalleled comfort and performance with our flagship luxury sedan. Featuring advanced driver assistance systems and a whisper-quiet cabin, it's the perfect blend of technology and refinement.",
    specs: [
      { label: "0-60 mph", value: "4.5 sec" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Range", value: "400 miles" },
    ],
  },
  suv: {
    name: "Executive SUV",
    description:
      "Conquer any terrain in style with our executive SUV. With its spacious interior, advanced off-road capabilities, and state-of-the-art entertainment system, it's the ultimate family vehicle for the discerning driver.",
    specs: [
      { label: "Seating", value: "7" },
      { label: "Cargo Space", value: "80 cu ft" },
      { label: "Towing", value: "7,500 lbs" },
    ],
  },
  sports: {
    name: "Sports Coupe",
    description:
      "Feel the thrill of the road with our high-performance sports coupe. Its aerodynamic design, powerful engine, and precision handling deliver an exhilarating driving experience that will leave you breathless.",
    specs: [
      { label: "0-60 mph", value: "3.2 sec" },
      { label: "Top Speed", value: "205 mph" },
      { label: "Horsepower", value: "600 hp" },
    ],
  },
};

vehicleItems.forEach((item) => {
  item.addEventListener("click", () => {
    const vehicleType = item.getAttribute("data-vehicle");
    vehicleName.textContent = vehicleData[vehicleType].name;
    vehicleDescription.textContent = vehicleData[vehicleType].description;

    vehicleSpecs.innerHTML = vehicleData[vehicleType].specs
      .map(
        (spec) => `
            <div class="spec-item">
                <div class="spec-value">${spec.value}</div>
                <div class="spec-label">${spec.label}</div>
            </div>
        `
      )
      .join("");

    gsap.fromTo(
      vehicleDetails,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  });
});

// Reveal animations
const revealElements = document.querySelectorAll(
  ".service-item, .vehicle-item, .testimonial-item"
);

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("revealed");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Testimonial slider
const testimonialSlider = document.querySelector(".testimonial-slider");
let isDown = false;
let startX;
let scrollLeft;

testimonialSlider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - testimonialSlider.offsetLeft;
  scrollLeft = testimonialSlider.scrollLeft;
});

testimonialSlider.addEventListener("mouseleave", () => {
  isDown = false;
});

testimonialSlider.addEventListener("mouseup", () => {
  isDown = false;
});

testimonialSlider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonialSlider.offsetLeft;
  const walk = (x - startX) * 2;
  testimonialSlider.scrollLeft = scrollLeft - walk;
});

// Form validation and submission
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Basic form validation
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // If validation passes, you can submit the form or perform further actions
  alert("Form submitted successfully!");
  contactForm.reset();
});

// Add hover effect to service and vehicle items
const hoverItems = document.querySelectorAll(".service-item, .vehicle-item");

hoverItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px)";
    item.style.boxShadow = "0 10px 20px rgba(255, 51, 51, 0.2)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0)";
    item.style.boxShadow = "none";
  });
});

// Animate the hero content on page load
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  heroContent.style.opacity = "0";
  heroContent.style.transform = "translateY(50px)";

  setTimeout(() => {
    heroContent.style.transition = "opacity 1s ease, transform 1s ease";
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";
  }, 500);
});

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Sound effects
const hoverSound = new Howl({
  src: ["hover.mp3"],
});

const clickSound = new Howl({
  src: ["click.mp3"],
});

document.querySelectorAll("a, button, .vehicle-item").forEach((element) => {
  element.addEventListener("mouseenter", () => hoverSound.play());
  element.addEventListener("click", () => clickSound.play());
});
