// ============================
// ✅ Mobile Navigation Toggle
// ============================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

const toggleMenu = () => {
  if (!navMenu || !hamburger) return;
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
};

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// ============================
// ✅ Smooth Scroll (Simple)
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ============================
// ✅ Active Navbar Highlight
// ============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ============================
// ✅ EmailJS Setup
// ============================
const EMAILJS_PUBLIC_KEY = "hDU9LTsC2dM18-k09";
const EMAILJS_SERVICE_ID = "service_ww30roj";
const EMAILJS_TEMPLATE_ID = "template_kckr2wu";

(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formMessage.style.display = "block";
    formMessage.textContent = "Sending...";
    formMessage.className = "form-message sending";

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        formMessage.textContent =
          "✅ Thank you! Your message has been sent successfully.";
        formMessage.className = "form-message success";

        contactForm.reset();

        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);

        formMessage.textContent =
          "❌ Failed to send message. Please try again later.";
        formMessage.className = "form-message error";
      });
  });
}

// ============================
// ✅ Intersection Observer Animations
// ============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".skill-card, .project-card, .stat-item"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// ============================
// ✅ Navbar UI Optimization
// ============================
let ticking = false;

const optimizedScroll = () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(15, 23, 42, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }
  }
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(optimizedScroll);
      ticking = true;
    }
  },
  { passive: true }
);
