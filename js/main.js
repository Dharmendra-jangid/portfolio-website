const projects = [
  {
    name: "AI Content Creator",
    full: "AI software for creating content",
    summary:
      "A software product for creating content with AI. Built on Laravel 11 and Livewire, with Blade templates, Tailwind CSS 4, and JavaScript through Vite and Axios. Data is stored in MySQL or SQLite.",
    tags: ["PHP 8.3", "Laravel 11", "Livewire", "Tailwind CSS", "Vite"],
  },
  {
    name: "HRMS",
    full: "Human Resource Management System",
    summary:
      "A business system for people operations, built with Laravel, MySQL, and REST APIs.",
    tags: ["Laravel", "MySQL", "REST API"],
  },
  {
    name: "CRM",
    full: "Customer Relationship Management",
    summary:
      "A system for tracking customers and day-to-day business workflows.",
    tags: ["Laravel", "MySQL", "PHP"],
  },
  {
    name: "Stock Management",
    full: "Stock Management System",
    summary:
      "Inventory and stock operations for business teams, backed by a MySQL database.",
    tags: ["Laravel", "MySQL"],
  },
  {
    name: "E-commerce",
    full: "E-commerce Website",
    summary:
      "A web storefront with product flows and payment gateway integration.",
    tags: ["Laravel", "Payment Gateway"],
  },
  {
    name: "Payments",
    full: "Payment Gateway Integration",
    summary:
      "Payment APIs wired into web applications so checkout and collections stay reliable.",
    tags: ["REST API", "Payments"],
  },
];

const projectGrid = document.querySelector("#project-grid");

projectGrid.innerHTML = projects
  .map(
    (project, index) => `
      <article class="project">
        <p class="project-kicker">${String(index + 1).padStart(2, "0")}</p>
        <h3>${project.name}</h3>
        <p class="project-full">${project.full}</p>
        <p>${project.summary}</p>
        <ul class="tags">
          ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
      </article>
    `
  )
  .join("");

const header = document.querySelector(".site-header");
const progressBar = document.querySelector("#progress-bar");
const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navAnchors = [...siteNav.querySelectorAll("a")];
const navLinks = navAnchors.filter((link) => (link.getAttribute("href") || "").startsWith("#"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function onScroll() {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${height > 0 ? (scrolled / height) * 100 : 0}%`;
  header.classList.toggle("is-scrolled", scrolled > 8);

  const marker = scrolled + header.offsetHeight + 40;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section;
  });
  if (!current) return;
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
}

menuToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".menu-label").textContent = "Menu";
  });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message || !email.includes("@")) {
    status.textContent = "Please add your name, a valid email, and a message.";
    return;
  }

  const text = `Hi Dharmendra, I'm ${name}.\nEmail: ${email}\n\n${message}`;
  window.open(`https://wa.me/919660459349?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  status.textContent = "WhatsApp should open with this message. Tap send there.";
  form.reset();
});

const themeButtons = [...document.querySelectorAll(".theme-switch button")];

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === theme);
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

applyTheme(document.documentElement.dataset.theme || "paper");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");

function openLightbox(image, caption) {
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
}

document.querySelectorAll(".shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    openLightbox(shot.querySelector("img"), shot.querySelector("span").textContent);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
