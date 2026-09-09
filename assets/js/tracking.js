/**
 * EFFEGI — Tracking hooks per il funnel di valutazione.
 *
 * Riusa lo stesso pattern dataLayer.push già presente sul sito live
 * (immobilieffegi.it gira con GTM + Consent Mode v2: window.dataLayer + gtag
 * sono già inizializzati lì). Nessun ID GTM/GA4/Meta Pixel viene inventato qui:
 * questo file predispone solo gli hook, pronti per essere collegati al
 * contenitore GTM reale quando la landing verrà pubblicata.
 *
 * Regola vincolante: MAI PII negli eventi (nome, email, telefono, indirizzo
 * completo, contenuto libero dei campi). "comune" è l'unico dato di
 * localizzazione che passiamo, in forma aggregata (nome comune, non indirizzo).
 */
(function (window) {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var FUNNEL_EVENTS = [
    "landing_view",
    "valuation_start",
    "valuation_step_1_complete",
    "valuation_step_2_complete",
    "valuation_step_3_complete",
    "valuation_form_complete",
    "lead_submit",
    "valuation_abandon"
  ];

  /**
   * Invia un evento al dataLayer. `payload` non deve MAI contenere PII.
   */
  function pushEvent(eventName, payload) {
    if (FUNNEL_EVENTS.indexOf(eventName) === -1) {
      console.warn("[EffegiTracking] evento non previsto dal funnel:", eventName);
    }
    window.dataLayer.push(Object.assign({ event: eventName }, payload || {}));
  }

  window.EffegiTracking = {
    push: pushEvent,
    EVENTS: FUNNEL_EVENTS
  };
})(window);
