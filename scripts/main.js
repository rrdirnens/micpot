// Fallback HTML for the site header, used if header.html cannot be loaded.
// This ensures basic navigation is available even if the main header fails to load.
const headerFallback = `
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="MICPOT home" data-home-link>
      <div class="brand-mark">
        <span class="icon" aria-hidden="true">precision_manufacturing</span>
      </div>
      <span class="brand-text">MICPOT</span>
    </a>
  <nav class="site-nav" aria-label="Primary">
      <a class="nav-link" href="index.html" data-page="home" data-i18n="nav.home">Home</a>
      <a class="nav-link" href="portfolio.html" data-page="portfolio" data-i18n="nav.portfolio">Portfolio</a>
      <a class="nav-link" href="about.html" data-page="about" data-i18n="nav.about">About Us</a>
      <a class="nav-link" href="contact.html" data-page="contact" data-i18n="nav.contact">Contacts</a>
    </nav>
    <div class="header-actions">
      <div class="lang-switch" aria-label="Language switch">
        <a class="lang-btn" href="index.html?lang=en" data-lang="en">EN</a>
        <a class="lang-btn" href="index.html?lang=pl" data-lang="pl">PL</a>
      </div>
      <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">☰</button>
      <div class="fallback-indicator">FB</div> <!-- Fallback indicator -->
    </div>
  </div>

  <!-- Mobile drawer menu (populated by JS from .site-nav for language-aware links). -->
  <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
    <button class="mobile-nav__backdrop" type="button" data-mobile-close aria-label="Close menu"></button>
    <div class="mobile-nav__panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="mobile-nav__top">
        <div class="mobile-nav__title" data-i18n="mobileMenu.title">Menu</div>
        <button class="mobile-nav__close" type="button" data-mobile-close aria-label="Close menu">✕</button>
      </div>
      <div class="mobile-nav__links" data-mobile-links></div>
      <div class="mobile-nav__lang lang-switch" aria-label="Language switch">
        <a class="lang-btn" href="index.html?lang=en" data-lang="en">EN</a>
        <a class="lang-btn" href="index.html?lang=pl" data-lang="pl">PL</a>
      </div>
      <div class="mobile-nav__meta">
        <a class="mobile-nav__meta-link" href="tel:+48123456789">
          <span class="icon" aria-hidden="true">call</span>
          <span data-i18n="mobileMenu.phone">+48 123 456 789</span>
        </a>
        <a class="mobile-nav__meta-link" href="mailto:office@micpot.pl">
          <span class="icon" aria-hidden="true">alternate_email</span>
          <span data-i18n="mobileMenu.email">office@micpot.pl</span>
        </a>
      </div>
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
        <a class="brand" href="index.html" aria-label="MICPOT home" data-home-link>
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
          <a href="index.html" data-i18n="footer.nav.home">Home</a>
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
        <a href="cookies.html" data-i18n="footer.legal.cookies">Cookie Policy</a>
        <a href="terms.html" data-i18n="footer.legal.terms">Partnership Terms</a>
        <a href="compliance.html" data-i18n="footer.legal.compliance">Compliance</a>
      </div>
    </div>
  </div>
</footer>
`;

// Ensure the site has a favicon even though we load header/footer as partials.
// (We inject it via JS so we don't have to duplicate <link rel="icon"> into every HTML <head>.)
const ensureFavicon = () => {
  const existing = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "icon";
  link.href = "favicon.svg";
  link.type = "image/svg+xml";
  document.head.appendChild(link);
};

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
  let lang = document.body.dataset.lang || "pl";
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
  const lang = document.body.dataset.lang || "pl";
  const path = window.location.pathname.split("/").pop() || "index.html";
  const buildLangUrl = (nextLang) => `${path}?lang=${nextLang}`;
  const homeHref = `index.html?lang=${lang}`;

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

// Cookie consent banner (very basic): shows once and stores acceptance.
const COOKIE_CONSENT_STORAGE_KEY = "micpot.cookieConsent";
const COOKIE_CONSENT_COOKIE = "micpot_cookie_consent";

const getCookie = (name) => {
  const parts = document.cookie.split(";").map((part) => part.trim());
  const hit = parts.find((part) => part.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.split("=").slice(1).join("=")) : null;
};

const hasCookieConsent = () => {
  try {
    if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "1") return true;
  } catch {
    // ignore storage errors
  }
  return getCookie(COOKIE_CONSENT_COOKIE) === "1";
};

const setCookieConsent = () => {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "1");
  } catch {
    // ignore storage errors
  }
  // 365 days
  document.cookie = `${COOKIE_CONSENT_COOKIE}=1; Max-Age=31536000; Path=/; SameSite=Lax`;
};

const setupCookieConsentBanner = (lang) => {
  if (hasCookieConsent()) return;
  if (document.querySelector(".cookie-banner")) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");

  // Note: we build the privacy link with the current language, because this banner is injected
  // after the first run of setLocalizedLinks().
  const cookiePolicyHref = `cookies.html?lang=${encodeURIComponent(lang)}`;

  banner.innerHTML = `
    <div class="container">
      <div class="cookie-banner__inner">
        <div class="cookie-banner__text" data-i18n="cookie.text">
          We use cookies to ensure basic site functionality and improve your experience.
        </div>
        <div class="cookie-banner__actions">
          <a class="btn btn-ghost" href="${cookiePolicyHref}" data-i18n="cookie.learnMore">Learn more</a>
          <button class="btn btn-primary" type="button" data-cookie-accept data-i18n="cookie.accept">Accept</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(banner);
  document.body.classList.add("has-cookie-banner");

  const acceptBtn = banner.querySelector("[data-cookie-accept]");
  acceptBtn?.addEventListener("click", () => {
    setCookieConsent();
    banner.remove();
    document.body.classList.remove("has-cookie-banner");
  });
};

// Mobile hamburger menu: clones the existing header links so they stay language-aware.
const setupMobileMenu = () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    console.warn("[mobile-menu] No .site-header found; menu not initialized.");
    return;
  }

  const menuBtn = header.querySelector(".menu-btn");
  // Important: AOS/animations may apply transforms to the header, which would cause
  // position: fixed elements inside it to behave like they're fixed to the header.
  // So we mount the drawer under <body> to guarantee full-viewport positioning.
  const drawer = document.getElementById("mobile-nav") || header.querySelector("#mobile-nav");
  const desktopNav = header.querySelector(".site-nav");
  const linksHost = drawer?.querySelector("[data-mobile-links]");
  const closeEls = drawer?.querySelectorAll("[data-mobile-close]") || [];
  const closeBtn = drawer?.querySelector(".mobile-nav__close");

  if (!menuBtn || !drawer || !desktopNav || !linksHost) {
    console.warn("[mobile-menu] Missing required elements.", {
      hasMenuBtn: Boolean(menuBtn),
      hasDrawer: Boolean(drawer),
      hasDesktopNav: Boolean(desktopNav),
      hasLinksHost: Boolean(linksHost)
    });
    return;
  }

  if (drawer.parentElement !== document.body) {
    document.body.appendChild(drawer);
  }

  // Populate drawer links from desktop nav (idempotent).
  linksHost.innerHTML = "";
  desktopNav.querySelectorAll("a.nav-link").forEach((link) => {
    const cloned = link.cloneNode(true);
    cloned.addEventListener("click", () => closeMenu());
    linksHost.appendChild(cloned);
  });

  if (drawer.dataset.bound === "true") return;
  drawer.dataset.bound = "true";
  console.info("[mobile-menu] Bound mobile menu events.");

  const openMenu = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-menu-open");
    (closeBtn || drawer).focus?.();
    console.debug("[mobile-menu] Opened.");
  };

  const closeMenu = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
    menuBtn.focus?.();
    console.debug("[mobile-menu] Closed.");
  };

  const toggleMenu = () => {
    if (drawer.classList.contains("is-open")) closeMenu();
    else openMenu();
  };

  menuBtn.addEventListener("click", toggleMenu);
  closeEls.forEach((el) => el.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeMenu();
    }
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

// Loads AOS assets if they are not yet present.
const loadAosAssets = () => {
  if (window.AOS) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("AOS failed to load"));
    document.head.appendChild(script);
  });
};

// Adds default AOS attributes to section blocks.
const applyAosAttributes = () => {
  document.querySelectorAll("section.section").forEach((section) => {
    if (section.dataset.aos) return;
    section.dataset.aos = "fade-up";
    section.dataset.aosDuration = "800";
  });
};

// Adds a one-time AOS animation to the header when it first becomes sticky.
const setupStickyHeaderAos = () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const activateHeaderAos = () => {
    if (window.scrollY < 10) return;
    if (!header.dataset.aos) {
      header.dataset.aos = "fade-down";
      header.dataset.aosDuration = "600";
      window.AOS?.refreshHard();
    }
    window.removeEventListener("scroll", activateHeaderAos);
  };

  window.addEventListener("scroll", activateHeaderAos, { passive: true });
  activateHeaderAos();
};

const initAos = async () => {
  try {
    await loadAosAssets();
  } catch (error) {
    console.warn("AOS assets could not be loaded.", error);
    return;
  }

  applyAosAttributes();
  setTimeout(() => {
    document.documentElement.classList.add("aos-ready");
    window.AOS.init({
      once: true,
      duration: 800,
      offset: 120,
      easing: "ease-out-cubic"
    });
    window.AOS.refreshHard();
    requestAnimationFrame(() => {
      window.AOS.refresh();
      window.dispatchEvent(new Event("scroll"));
    });
    setupStickyHeaderAos();
  }, 1000);
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

  form.addEventListener("submit", async (event) => {
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

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    setStatus("warning", "contact.form.status.sending");

    const payload = {
      name: nameValue,
      company: fields.company?.value.trim() || "",
      email: emailValue,
      message: messageValue,
      website: form.querySelector('[name="website"]')?.value || ""
    };

    try {
      const response = await fetch("api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        if (response.status === 429) {
          setStatus("error", "contact.form.status.rate");
        } else {
          setStatus("error", "contact.form.status.server");
        }
        return;
      }

      setStatus("success", "contact.form.status.success");
      form.reset();
    } catch (error) {
      console.error("[contact-form] Submit failed.", error);
      setStatus("error", "contact.form.status.server");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
};

// Smooth scrolling for anchor links.
document.addEventListener("DOMContentLoaded", async () => {
  ensureFavicon();
  const resolvedLang = resolveLanguage();

  // Load header and footer HTML partials.
  await loadPartial("site-header", "header.html");
  await loadPartial("site-footer", "footer.html");

  // Set active navigation link and language links.
  setupMobileMenu();
  setActiveNav();
  setLanguageLinks();
  setLocalizedLinks(resolvedLang);
  setupCookieConsentBanner(resolvedLang);
  initAos();
  
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
