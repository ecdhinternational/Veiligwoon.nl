(function () {
  var STORAGE_KEY = 'veiligwoon_cookie_consent';
  var GA_MEASUREMENT_ID = ''; // Vul later je GA4 ID in, bijvoorbeeld: G-XXXXXXXXXX

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID) return;
    if (window.gtag) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function removeBanner() {
    var banner = document.querySelector('.cookie-banner');
    if (banner) banner.remove();
  }

  function showBanner() {
    if (document.querySelector('.cookie-banner')) return;

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookievoorkeuren');

    banner.innerHTML = '' +
      '<div class="cookie-banner__text">' +
        '<strong>Cookies op VeiligWoon</strong>' +
        '<span>We gebruiken functionele cookies en, alleen met jouw toestemming, analytische cookies om de site te verbeteren.</span>' +
        '<a href="/privacy/">Lees meer in ons privacybeleid</a>' +
      '</div>' +
      '<div class="cookie-banner__actions">' +
        '<button class="cookie-btn cookie-btn--ghost" type="button" data-cookie-choice="reject">Weigeren</button>' +
        '<button class="cookie-btn cookie-btn--primary" type="button" data-cookie-choice="accept">Accepteren</button>' +
      '</div>';

    document.body.appendChild(banner);

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-cookie-choice]');
      if (!button) return;

      var choice = button.getAttribute('data-cookie-choice');
      setConsent(choice);
      removeBanner();

      if (choice === 'accept') {
        loadAnalytics();
      }
    });
  }

  window.VeiligWoonCookies = {
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      showBanner();
    },
    accept: function () {
      setConsent('accept');
      removeBanner();
      loadAnalytics();
    },
    reject: function () {
      setConsent('reject');
      removeBanner();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();
    if (consent === 'accept') {
      loadAnalytics();
      return;
    }
    if (consent === 'reject') return;
    showBanner();
  });
})();
