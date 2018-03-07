import React from 'react';

export default class AdSense extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;

    const iifeScript = document.createElement('script');
    iifeScript.innerHTML = `
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-8515288565890752",
      enable_page_level_ads: true
    });
    `;
    document.body.appendChild(script);
    document.body.appendChild(iifeScript);
  }
  render() {
    return null;
  }
}
