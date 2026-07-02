const GA_MEASUREMENT_ID = 'G-NH7WSNE7MZ';

(function () {
  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  const consent = localStorage.getItem('vw_cookie_consent');
  if (consent === 'accepted') {
    loadGA();
  }

  window.vwAcceptCookies = function () {
    localStorage.setItem('vw_cookie_consent', 'accepted');
    loadGA();
  };

  window.vwRejectCookies = function () {
    localStorage.setItem('vw_cookie_consent', 'rejected');
  };
})();
