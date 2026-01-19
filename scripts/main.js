// Fallback HTML for the site header, used if header.html cannot be loaded.
// This ensures basic navigation is available even if the main header fails to load.
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
      <a class="nav-link" href="portfolio.html#products" data-page="portfolio">Portfolio</a>
      <a class="nav-link" href="about.html#mission" data-page="about">About Us</a>
      <a class="nav-link" href="contact.html#office-info" data-page="contact">Contacts</a>
    </nav>
    <div class="header-actions">
      <div class="lang-switch" aria-label="Language switch">
        <a class="lang-btn" href="home.html" data-lang="en">EN</a>
        <a class="lang-btn" href="home-pl.html" data-lang="pl">PL</a>
      </div>
      <button class="menu-btn" type="button" aria-label="Open menu">☰</button>
      <div class="fallback-indicator">FB</div> <!-- Fallback indicator -->
    </div>
  </div>
</header>
`;

// Fallback HTML for the site footer, used if footer.html cannot be loaded.
// This provides essential company information and navigation in case of a loading error.
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
          <a class="social-btn" href="#" aria-label="Share">
            <span class="icon" aria-hidden="true">share</span>
          </a>
          <a class="social-btn" href="mailto:office@micpot.pl" aria-label="Mail">
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
          <a href="https://www.google.com/maps/search/ul.+Przemysłowa+12,+00-123+Warszawa,+Poland" target="_blank" rel="noopener noreferrer">
            <span class="icon" aria-hidden="true">location_on</span> MICPOT<br/>ul. Przemysłowa 12<br/>00-123 Warszawa, Poland
          </a>
          <a href="tel:+48123456789">
            <span class="icon" aria-hidden="true">call</span> +48 123 456 789
          </a>
          <a href="mailto:office@micpot.pl">
            <span class="icon" aria-hidden="true">alternate_email</span> office@micpot.pl
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2024</span> MICPOT. Global Industrial Solutions. All rights reserved.</span>
      <div class="footer-links">
        <a href="privacy.html">Privacy &amp; Legal</a>
        <a href="terms.html">Partnership Terms</a>
        <a href="compliance.html">Compliance</a>
      </div>
    </div>
  </div>
</footer>
`;

// Sets the current year in elements with 'data-year' attribute.
const setYear = () => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = year;
  });
};

// Asynchronously loads HTML partials into specified containers.
// If loading fails, it uses a predefined fallback HTML and logs a warning to the console.
const loadPartial = async (targetId, filePath) => {
  const container = document.getElementById(targetId);
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}. Status: ${response.status} ${response.statusText}`);
    }
    container.innerHTML = await response.text();
    console.log(`Successfully loaded ${filePath}`);
  } catch (error) {
    console.error(`ERROR: Failed to load ${filePath}. Reason: ${error.message}`);
    console.warn(`INFO: Using fallback for ${targetId}. This might indicate an issue with file paths, server configuration, or network connectivity.`);
    console.warn(`ACTION: Please ensure that '${filePath}' exists at the specified path and is accessible.`);

    if (targetId === "site-header") {
      container.innerHTML = headerFallback;
      console.log('INFO: Header fallback loaded.');
    } else if (targetId === "site-footer") {
      container.innerHTML = footerFallback;
      console.log('INFO: Footer fallback loaded.');
    } else {
      container.innerHTML = "";
      console.log(`INFO: No fallback available for ${targetId}, clearing content.`);
    }
  } finally {
    // Ensure year is set even if loaded via fallback
    if (targetId === "site-footer") {
      setYear();
    }
  }
};

// Sets the 'is-active' class on the current page's navigation link.
const setActiveNav = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("is-active");
    }
  });
};

// Adjusts language switch links and active state based on the current page's language.
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

// Smooth scrolling for anchor links.
document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer HTML partials.
  await loadPartial("site-header", "header.html");
  await loadPartial("site-footer", "footer.html");

  // Set active navigation link and language links.
  setActiveNav();
  setLanguageLinks();
  
  // This line is redundant as setYear() is called in loadPartial's finally block for site-footer.
  // setYear(); 

  // Add smooth scroll behavior to all anchor links.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
