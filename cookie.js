(function () {
  'use strict';

  var GA_MEASUREMENT_ID = 'G-NH7WSNE7MZ';
  var STORAGE_KEY = 'veiligwoonCookieConsent';

  function loadGoogleAnalytics() {
    if (!GA_MEASUREMENT_ID || window.__veiligwoonGaLoaded) return;
    window.__veiligwoonGaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true
    });
  }

  function removeBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.remove();
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {}
  }

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function createBanner() {
    if (document.getElementById('cookie-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie melding');

    banner.innerHTML = '' +
      '<div class="cookie-banner__text">' +
        '<strong>Cookies op VeiligWoon</strong>' +
        '<p>We gebruiken functionele cookies en, alleen met jouw toestemming, analytische cookies om de site te verbeteren.</p>' +
        '<a href="/privacy/">Lees meer in ons privacybeleid</a>' +
      '</div>' +
      '<div class="cookie-banner__actions">' +
        '<button type="button" class="btn btn--secondary" id="cookie-decline">Weigeren</button>' +
        '<button type="button" class="btn" id="cookie-accept">Accepteren</button>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      saveConsent('accepted');
      removeBanner();
      loadGoogleAnalytics();
    });

    document.getElementById('cookie-decline').addEventListener('click', function () {
      saveConsent('declined');
      removeBanner();
    });
  }

  function initCookieConsent() {
    var consent = getConsent();

    if (consent === 'accepted') {
      loadGoogleAnalytics();
      return;
    }

    if (consent === 'declined') {
      return;
    }

    createBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
