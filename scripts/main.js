const headerFallback = `
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="home.html" aria-label="MICPOT home" data-home-link>
      <div class="brand-mark">
        <span class="icon" aria-hidden="true">precision_manufacturing</span>
      </div>
      <span class="brand-text">MICPOT</span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      <a class="nav-link" href="home.html" data-page="home">Home</a>
      <a class="nav-link" href="portfolio.html" data-page="portfolio">Portfolio</a>
      <a class="nav-link" href="about.html" data-page="about">About Us</a>
      <a class="nav-link" href="contact.html" data-page="contact">Contacts</a>
    </nav>
    <div class="header-actions">
      <div class="lang-switch" aria-label="Language switch">
        <a class="lang-btn" href="home.html" data-lang="en">EN</a>
        <a class="lang-btn" href="home-pl.html" data-lang="pl">PL</a>
      </div>
      <button class="menu-btn" type="button" aria-label="Open menu">☰</button>
    </div>
  </div>
</header>
`;

const footerFallback = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="stack">
        <a class="brand" href="home.html" aria-label="MICPOT home" data-home-link>
          <div class="brand-mark">
            <span class="icon" aria-hidden="true">precision_manufacturing</span>
          </div>
          <span class="brand-text">MICPOT</span>
        </a>
        <p class="card-text">
          A premium industrial and automotive trading entity. We facilitate high-scale technological exchange and procurement for corporate entities worldwide.
        </p>
        <div class="social-row">
          <a class="social-btn" href="#" aria-label="Public">
            <span class="icon" aria-hidden="true">public</span>
          </a>
          <a class="social-btn" href="#" aria-label="Share">
            <span class="icon" aria-hidden="true">share</span>
          </a>
          <a class="social-btn" href="#" aria-label="Mail">
            <span class="icon" aria-hidden="true">mail</span>
          </a>
        </div>
      </div>
      <div>
        <h4 class="footer-title">Navigation</h4>
        <div class="footer-links">
          <a href="home.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contacts</a>
        </div>
      </div>
      <div>
        <h4 class="footer-title">Global Sectors</h4>
        <div class="footer-links">
          <a href="#">Automotive OEM</a>
          <a href="#">Hydraulic Systems</a>
          <a href="#">Production Robotics</a>
          <a href="#">Technical Software</a>
        </div>
      </div>
      <div>
        <h4 class="footer-title">HQ Contact</h4>
        <div class="footer-links">
          <span><span class="icon" aria-hidden="true">location_on</span> MICPOT<br/>ul. Przemysłowa 12<br/>00-123 Warszawa, Poland</span>
          <span><span class="icon" aria-hidden="true">call</span> +48 123 456 789</span>
          <span><span class="icon" aria-hidden="true">alternate_email</span> office@micpot.pl</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2024</span> MICPOT. Global Industrial Solutions. All rights reserved.</span>
      <div class="footer-links">
        <a href="#">Privacy &amp; Legal</a>
        <a href="#">Partnership Terms</a>
        <a href="#">Compliance</a>
      </div>
    </div>
  </div>
</footer>
`;

const setYear = () => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = year;
  });
};

const loadPartial = async (targetId, filePath) => {
  const container = document.getElementById(targetId);
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}`);
    }
    container.innerHTML = await response.text();
  } catch (error) {
    if (targetId === "site-header") {
      container.innerHTML = headerFallback;
    } else if (targetId === "site-footer") {
      container.innerHTML = footerFallback;
    } else {
      container.innerHTML = "";
    }
    console.warn("Partial load failed, using fallback.", error);
  } finally {
    if (targetId === "site-footer") {
      setYear();
    }
  }
};

const setActiveNav = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("is-active");
    }
  });
};

const setLanguageLinks = () => {
  const lang = document.body.dataset.lang || "en";
  const homeHref = lang === "pl" ? "home-pl.html" : "home.html";

  document.querySelectorAll("[data-home-link]").forEach((link) => {
    link.setAttribute("href", homeHref);
  });

  const homeNav = document.querySelector('.nav-link[data-page="home"]');
  if (homeNav) {
    homeNav.setAttribute("href", homeHref);
  }

  document.querySelectorAll(".lang-btn").forEach((link) => {
    const linkLang = link.dataset.lang;
    link.classList.toggle("is-active", linkLang === lang);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("site-header", "header.html");
  await loadPartial("site-footer", "footer.html");
  setActiveNav();
  setLanguageLinks();
  setYear();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
