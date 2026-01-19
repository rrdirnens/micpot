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
      <a class="nav-link" href="home.html" data-page="home" data-i18n="nav.home">Home</a>
      <a class="nav-link" href="portfolio.html" data-page="portfolio" data-i18n="nav.portfolio">Portfolio</a>
      <a class="nav-link" href="about.html" data-page="about" data-i18n="nav.about">About Us</a>
      <a class="nav-link" href="contact.html" data-page="contact" data-i18n="nav.contact">Contacts</a>
    </nav>
    <div class="header-actions">
      <div class="lang-switch" aria-label="Language switch">
        <a class="lang-btn" href="home.html?lang=en" data-lang="en">EN</a>
        <a class="lang-btn" href="home.html?lang=pl" data-lang="pl">PL</a>
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
        <p class="card-text" data-i18n="footer.desc">
          A premium industrial and automotive trading entity. We facilitate high-scale technological exchange and procurement for corporate entities worldwide.
        </p>
        <div class="social-row">
          <a class="social-btn" href="mailto:office@micpot.pl" aria-label="Mail">
            <span class="icon" aria-hidden="true">mail</span>
          </a>
        </div>
      </div>
      <div>
        <h4 class="footer-title" data-i18n="footer.nav.title">Navigation</h4>
        <div class="footer-links">
          <a href="home.html" data-i18n="footer.nav.home">Home</a>
          <a href="portfolio.html" data-i18n="footer.nav.portfolio">Portfolio</a>
          <a href="about.html" data-i18n="footer.nav.about">About Us</a>
          <a href="contact.html" data-i18n="footer.nav.contact">Contacts</a>
        </div>
      </div>
      <div>
        <h4 class="footer-title" data-i18n="footer.sectors.title">Global Sectors</h4>
        <div class="footer-links">
          <a href="sector-auto.html" data-i18n="footer.sectors.auto">Auto Parts</a>
          <a href="sector-industrial.html" data-i18n="footer.sectors.industrial">Industrial Parts</a>
          <a href="sector-equipment.html" data-i18n="footer.sectors.equipment">Pro Equipment</a>
          <a href="sector-repair.html" data-i18n="footer.sectors.repair">Repair Kits</a>
        </div>
      </div>
      <div>
        <h4 class="footer-title" data-i18n="footer.contact.title">HQ Contact</h4>
        <div class="footer-links">
          <a href="https://www.google.com/maps/search/ul.+Przemysłowa+12,+00-123+Warszawa,+Poland" target="_blank" rel="noopener noreferrer" data-i18n="footer.address" data-i18n-mode="html">
            <span class="icon" aria-hidden="true">location_on</span> MICPOT<br/>ul. Przemysłowa 12<br/>00-123 Warszawa, Poland
          </a>
          <a href="tel:+48123456789" data-i18n="footer.phone" data-i18n-mode="html">
            <span class="icon" aria-hidden="true">call</span> +48 123 456 789
          </a>
          <a href="mailto:office@micpot.pl" data-i18n="footer.email" data-i18n-mode="html">
            <span class="icon" aria-hidden="true">alternate_email</span> office@micpot.pl
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span data-i18n="footer.copy" data-i18n-mode="html">© <span data-year>2024</span> MICPOT. Global Industrial Solutions. All rights reserved.</span>
      <div class="footer-links">
        <a href="privacy.html" data-i18n="footer.legal.privacy">Privacy &amp; Legal</a>
        <a href="terms.html" data-i18n="footer.legal.terms">Partnership Terms</a>
        <a href="compliance.html" data-i18n="footer.legal.compliance">Compliance</a>
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

// Resolve the page language based on dataset defaults and URL params.
const resolveLanguage = () => {
  let lang = document.body.dataset.lang || "en";
  const urlLang = new URLSearchParams(window.location.search).get("lang");

  if (urlLang === "en" || urlLang === "pl") {
    lang = urlLang;
  }

  document.body.dataset.lang = lang;
  document.documentElement.setAttribute("lang", lang);
  return lang;
};

// Adjusts language switch links and active state based on the current page's language.
const setLanguageLinks = () => {
  const lang = document.body.dataset.lang || "en";
  const path = window.location.pathname.split("/").pop() || "home.html";
  const buildLangUrl = (nextLang) => `${path}?lang=${nextLang}`;
  const homeHref = `home.html?lang=${lang}`;

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

    link.setAttribute("href", buildLangUrl(linkLang));
  });
};

// Updates internal links to include the active language parameter.
const setLocalizedLinks = (lang) => {
  document.querySelectorAll("a[href]").forEach((link) => {
    if (link.classList.contains("lang-btn") || link.dataset.skipLang !== undefined) return;

    const href = link.getAttribute("href");
    if (!href) return;

    if (href.startsWith("#")) return;
    if (/^(mailto|tel|sms|javascript):/i.test(href)) return;
    if (/^https?:\/\//i.test(href)) return;
    if (!href.includes(".html")) return;

    const cleanedHref = href.split("#")[0];
    const url = new URL(cleanedHref, window.location.href);
    url.searchParams.set("lang", lang);

    const relativeHref = `${url.pathname.replace(/^\//, "")}${url.search}`;
    link.setAttribute("href", relativeHref);
  });
};

// Apply translations to elements on the page.
const applyTranslations = (lang) => {
  const pageTranslations = window.TRANSLATIONS?.[lang];
  if (!pageTranslations) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = pageTranslations[key];
    if (!value) return;

    const targetAttr = element.dataset.i18nAttr;
    if (targetAttr) {
      element.setAttribute(targetAttr, value);
      return;
    }

    if (element.dataset.i18nMode === "html") {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  });
};

const setupContactForm = (lang) => {
  const form = document.querySelector('[data-form="contact"]');
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const fields = {
    name: form.querySelector('[name="name"]'),
    company: form.querySelector('[name="company"]'),
    email: form.querySelector('[name="email"]'),
    message: form.querySelector('[name="message"]')
  };

  const messages = window.TRANSLATIONS?.[lang] || {};
  const setStatus = (type, key) => {
    if (!status) return;
    status.textContent = messages[key] || "";
    status.className = `form-status is-visible is-${type}`;
  };

  const clearStatus = () => {
    if (!status) return;
    status.textContent = "";
    status.className = "form-status";
  };

  const setFieldState = (field, isInvalid) => {
    if (!field) return;
    field.classList.toggle("is-invalid", isInvalid);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearStatus();

    const nameValue = fields.name?.value.trim() || "";
    const emailValue = fields.email?.value.trim() || "";
    const messageValue = fields.message?.value.trim() || "";

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const messageLongEnough = messageValue.length >= 20;

    setFieldState(fields.name, nameValue.length === 0);
    setFieldState(fields.email, emailValue.length === 0 || !emailValid);
    setFieldState(fields.message, messageValue.length === 0 || !messageLongEnough);

    if (!nameValue || !emailValue || !messageValue) {
      setStatus("error", "contact.form.status.required");
      return;
    }

    if (!emailValid) {
      setStatus("error", "contact.form.status.email");
      return;
    }

    if (!messageLongEnough) {
      setStatus("warning", "contact.form.status.message");
      return;
    }

    if (!fields.company?.value.trim()) {
      setStatus("warning", "contact.form.status.company");
      return;
    }

    setStatus("success", "contact.form.status.success");
    form.reset();
  });
};

// Smooth scrolling for anchor links.
document.addEventListener("DOMContentLoaded", async () => {
  const resolvedLang = resolveLanguage();

  // Load header and footer HTML partials.
  await loadPartial("site-header", "header.html");
  await loadPartial("site-footer", "footer.html");

  // Set active navigation link and language links.
  setActiveNav();
  setLanguageLinks();
  setLocalizedLinks(resolvedLang);
  
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

  setupContactForm(resolvedLang);
  applyTranslations(resolvedLang);
  setYear();
});
