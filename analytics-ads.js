// Google Analytics e Google AdSense
// Sostituisci 'G-XXXXXXXXXX' con il tuo ID di misurazione GA4
// Sostituisci 'ca-pub-XXXXXXXXXXXXXXX' con il tuo publisher ID AdSense

// Google Analytics
(function(){
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
})();

// Google AdSense
(function(){
  var adsScript = document.createElement('script');
  adsScript.async = true;
  adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  adsScript.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXX');
  document.head.appendChild(adsScript);
})();
