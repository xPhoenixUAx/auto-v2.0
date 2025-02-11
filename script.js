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
gsap.to(".hero-image", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    scrub: true,
  },
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
    name: "Sports Car",
    description:
      "Feel the thrill of the road with our high-performance sports car. Its aerodynamic design, powerful engine, and precision handling deliver an exhilarating driving experience that will leave you breathless.",
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
gsap.utils
  .toArray(".vehicle-item, .service-item, .about, .contact-form")
  .forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

// Form validation and submission
// Form validation and submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default form submission (page reload)

  // Here, you can add the logic for submitting the form, e.g., via AJAX or other methods.
  alert("Thank you for your message! We will get back to you shortly.");

  // Optionally, reset the form after submission
  contactForm.reset();
});

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.querySelectorAll("a, button, .vehicle-item").forEach((element) => {
  element.addEventListener("mouseenter", () => hoverSound.play());
  element.addEventListener("click", () => clickSound.play());
});

// Testimonial carousel
const testimonialSlider = document.querySelector(".testimonial-slider");
const testimonials = document.querySelectorAll(".testimonial-item");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    if (i === index) {
      testimonial.style.opacity = 1;
      testimonial.style.transform = "translateX(0)";
    } else {
      testimonial.style.opacity = 0;
      testimonial.style.transform = "translateX(100%)";
    }
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Initialize the first testimonial
showTestimonial(currentTestimonial);

// Add navigation buttons
const prevButton = document.createElement("button");
prevButton.textContent = "❮";
prevButton.classList.add("testimonial-nav", "prev");
prevButton.addEventListener("click", prevTestimonial);

const nextButton = document.createElement("button");
nextButton.textContent = "❯";
nextButton.classList.add("testimonial-nav", "next");
nextButton.addEventListener("click", nextTestimonial);

testimonialSlider.parentElement.appendChild(prevButton);
testimonialSlider.parentElement.appendChild(nextButton);

// Animate sections on scroll
gsap.utils.toArray("section").forEach((section, index) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(section, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
  });

  if (index % 2 === 0) {
    tl.from(
      section.querySelectorAll("h2, p, .cta-button"),
      {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
  } else {
    tl.from(
      section.querySelectorAll("h2, p, .cta-button"),
      {
        x: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }
});

// Animate logo on page load
gsap.from(".logo", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power3.out",
  delay: 0.5,
});

// Animate nav links on page load
gsap.from(".nav-links li", {
  opacity: 0,
  y: -20,
  stagger: 0.1,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.8,
});

// Animate hero content on page load
gsap.from(".hero-content", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
  delay: 1,
});

// Animate hero image on page load
gsap.from(".hero-image", {
  opacity: 0,
  x: 100,
  duration: 1.2,
  ease: "power3.out",
  delay: 1.2,
});
