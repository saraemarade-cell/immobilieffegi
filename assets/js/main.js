/**
 * EFFEGI — Landing "Valuta il tuo immobile"
 * Motion system + CurrentEffegiForm (wrapper del form di valutazione esistente)
 *
 * ============================================================================
 * NOTA SULL'INTEGRAZIONE DEL FORM — leggere prima di modificare
 * ============================================================================
 * Il repository di partenza non conteneva alcun form, endpoint o codice del
 * flusso di valutazione: il form reale vive nel tema WordPress del sito
 * (immobilieffegi.it), costruito su plugin Estatik + un modulo custom
 * "Effegi" (submit via `window.effegi_ajax.ajax_url` → wp-admin/admin-ajax.php,
 * con campi dello Step 1 offuscati anti-spam: name="enumoc" = Comune,
 * name="transit" = Indirizzo, name="civico" = Civico). Questo codice PHP/JS
 * non è presente in questo repository e non è stato possibile accedervi.
 *
 * Step 1 (Comune, Indirizzo, Civico) è quindi un'implementazione NATIVA
 * 1:1 dei campi reali — confermati sia dal brief che ispezionando il DOM
 * del sito live — con piena UI Effegi (focus/hover/error/loading/responsive).
 *
 * Step 2 e 3 NON sono stati ricostruiti: non esiste, in questo repository,
 * alcuna fonte verificata per le domande successive, e inventarle avrebbe
 * violato il vincolo esplicito "non inventare nulla". Per preservare al 100%
 * il comportamento reale (compresa la raccolta progressiva), lo Step 2-3
 * viene quindi caricato come embed live del form esistente
 * (https://immobilieffegi.it/valuta-il-tuo-immobile/#valuta), montato
 * SOLO dopo che l'utente ha già completato lo Step 1 — quindi in lazy-load,
 * senza alcun impatto sulle performance del primo paint above-the-fold.
 *
 * Limite tecnico dichiarato: essendo un iframe cross-origin, non è possibile
 * ristilizzarne l'interno né ricevere eventi di step-complete precisi da
 * esso (nessun bridge postMessage lato WordPress). Gli eventi
 * valuation_step_2_complete / valuation_step_3_complete / lead_submit /
 * valuation_form_complete sono quindi predisposti ma NON vengono emessi
 * automaticamente in Fase 1: la Fase 2 (InteractiveValuationQuiz) risolve
 * questo limite possedendo l'intero flusso.
 *
 * Il form è presentato come un modulo standard di raccolta lead (nessuna
 * cornice/numerazione a "step" visibile): tecnicamente resta comunque un
 * primo invio + handoff live, perché non è possibile ricostruire i campi
 * successivi senza inventarli — vedi sopra.
 *
 * Punto di sostituzione futuro: per passare a InteractiveValuationQuiz,
 * sostituire il contenuto di #current-effegi-form mantenendo lo stesso
 * mount point e lo stesso EffegiTracking già predisposto qui.
 * ============================================================================
 */
(function () {
  "use strict";

  var LIVE_FORM_URL = "https://immobilieffegi.it/valuta-il-tuo-immobile/#valuta";
  var STORAGE_KEY = "effegi_valuation_v1";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    setFooterYear();
    initRevealMotion();
    initHeroLens();
    initValuationForm();
    initVideoTestimonials();
    initStatCounters();
    initManifestoPillars();
    initProcessStepper();
    initInstagramFeed();
    initContactForm();
    initHeroLinks();
    initTipografia();
    EffegiTracking.push("landing_view");
  });

  /* ---------------------------------------------------------------------
   * Lente d'ingrandimento della hero
   * ---------------------------------------------------------------------
   * Il riquadro .lens-layer è più grande del form e sta dietro di esso:
   * nella cornice che resta visibile si vede la STESSA porzione di sfondo
   * che sta dietro la lente, ma ingrandita. Perché l'effetto sia una
   * lente vera e non una texture decorativa, background-size e
   * background-position vanno calcolati: si replica il ritaglio che
   * `object-fit: cover` applica all'immagine di sfondo della hero, lo si
   * moltiplica per il fattore di zoom e si ancora il centro della lente
   * al punto dell'immagine che le sta esattamente dietro.
   * ------------------------------------------------------------------- */
  var LENS_IMG_W = 2000;   // dimensioni naturali di residential-facade.jpg
  var LENS_IMG_H = 1331;
  var LENS_ZOOM = 2.1;          // fattore di ingrandimento (fisso)

  function initHeroLens() {
    var lens = document.querySelector(".lens-layer");
    var hero = document.querySelector(".hero");
    if (!lens || !hero) return;

    // Lente statica: l'ingrandimento resta, il movimento no. Nessuna
    // animazione d'ingresso e nessun inseguimento del puntatore, quindi
    // nessun rAF in esecuzione: la lente e' solo un riquadro otticamente
    // allineato sullo sfondo.
    applyLens(lens, hero, LENS_ZOOM);

    /* L.ottica va ricalcolata a ogni cambio di dimensioni: il ritaglio
       "cover" dello sfondo e la posizione della lente cambiano entrambi, e
       senza ricalcolo la porzione ingrandita non corrisponde piu. a quella
       che sta dietro il riquadro. Si osserva la hero invece del solo evento
       resize: con un debounce sull.evento il ricalcolo poteva cadere prima
       che il layout fosse assestato, lasciando lo zoom sfasato. */
    if (window.ResizeObserver) {
      new ResizeObserver(function () { applyLens(lens, hero, LENS_ZOOM); }).observe(hero);
    } else {
      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { applyLens(lens, hero, LENS_ZOOM); }, 150);
      });
    }
  }

  function applyLens(lens, hero, zoom) {
    var heroRect = hero.getBoundingClientRect();
    var lensRect = lens.getBoundingClientRect();
    if (!heroRect.width || !lensRect.width) return;

    // Come object-fit: cover ritaglia l'immagine dentro la hero
    var scale = Math.max(heroRect.width / LENS_IMG_W, heroRect.height / LENS_IMG_H);
    var renderedW = LENS_IMG_W * scale;
    var renderedH = LENS_IMG_H * scale;
    var imgOffsetX = (heroRect.width - renderedW) / 2;
    var imgOffsetY = (heroRect.height - renderedH) / 2;

    // Centro della lente in coordinate hero
    var cx = (lensRect.left - heroRect.left) + lensRect.width / 2;
    var cy = (lensRect.top - heroRect.top) + lensRect.height / 2;

    lens.style.backgroundSize = (renderedW * zoom) + "px " + (renderedH * zoom) + "px";
    lens.style.backgroundPosition =
      (lensRect.width / 2 - (cx - imgOffsetX) * zoom) + "px " +
      (lensRect.height / 2 - (cy - imgOffsetY) * zoom) + "px";
  }

  /* ---------------------------------------------------------------------
   * Contatori animati (sezione Recensioni) — contano da 0 al valore reale
   * (data-count-to, verificato sul sito live) quando entrano in viewport.
   * Parte al primo attraversamento e non si ripete.
   * ------------------------------------------------------------------- */
  function initStatCounters() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) { setCounterValue(el, parseInt(el.getAttribute("data-count-to"), 10)); });
      return;
    }

    var pending = Array.prototype.slice.call(counters);

    function resolve(el, animate) {
      var i = pending.indexOf(el);
      if (i === -1) return; // già gestito
      pending.splice(i, 1);
      io.unobserve(el);
      if (animate) animateCounter(el);
      else setCounterValue(el, parseInt(el.getAttribute("data-count-to"), 10));
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) resolve(entry.target, true);
        });
      },
      // threshold: 0 — con uno scroll rapido una soglia alta può non essere
      // mai campionata e il contatore resterebbe a zero.
      { threshold: 0 }
    );

    // Rete di sicurezza indipendente dall'observer. Con threshold 0, se un
    // elemento passa da "sotto il viewport" a "sopra il viewport" tra due
    // campionamenti (flick veloce), il rapporto di intersezione resta 0 e
    // NESSUN callback viene emesso: il contatore resterebbe fermo a "0%",
    // cioè mostrerebbe un dato falso. Qui, a ogni scroll, i contatori già
    // oltrepassati vengono portati direttamente al valore reale.
    function onScroll() {
      pending.slice().forEach(function (el) {
        if (el.getBoundingClientRect().bottom < 0) resolve(el, false);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    counters.forEach(function (el) { io.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    var duration = 1400;
    var start = null;

    function tick(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCounterValue(el, Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  function setCounterValue(el, value) {
    var suffix = el.getAttribute("data-suffix") || "";
    el.textContent = value + suffix;
  }

  /* ---------------------------------------------------------------------
   * Video-testimonianze reali (sezione Recensioni) — facade pattern:
   * l'iframe YouTube viene creato solo al click, mai al caricamento
   * della pagina (niente peso/autoplay above-the-fold).
   * ------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------
   * Video-testimonianze — player grande + rail di miniature.
   * Facade YouTube: nessun iframe (e nessun cookie YouTube) viene caricato
   * finché l'utente non preme play sul player.
   * ------------------------------------------------------------------- */
  function initVideoTestimonials() {
    var stage = document.querySelector("[data-video-stage]");
    if (!stage) return;

    var player = stage.querySelector(".video-card--stage");
    var stageImg = stage.querySelector("[data-stage-img]");
    var stageIndex = stage.querySelector("[data-stage-index]");
    var thumbs = Array.prototype.slice.call(stage.querySelectorAll(".video-thumb"));
    if (!player || !stageImg) return;

    function clearFrame() {
      var frame = player.querySelector("iframe");
      if (frame) frame.parentNode.removeChild(frame);
    }

    function play() {
      var videoId = player.getAttribute("data-yt");
      if (!videoId || player.querySelector("iframe")) return;
      var iframe = document.createElement("iframe");
      iframe.className = "video-card__frame";
      iframe.src = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0";
      iframe.title = "Video-testimonianza cliente Effegi";
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      player.appendChild(iframe);
    }

    function select(thumb) {
      var videoId = thumb.getAttribute("data-yt");
      var index = thumb.getAttribute("data-index");
      // Un eventuale video già in riproduzione va rimosso, altrimenti
      // continuerebbe sotto la miniatura appena scelta.
      clearFrame();
      player.setAttribute("data-yt", videoId);
      stageImg.src = "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
      if (stageIndex) stageIndex.textContent = index;
      player.setAttribute("aria-label", "Riproduci la video-testimonianza " + index + " di " + thumbs.length);
      thumbs.forEach(function (other) {
        var active = other === thumb;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () { select(thumb); });
    });
    player.addEventListener("click", play);

    /* Dimensione del player. Deve tenere il 16:9 e, quando c'e' spazio,
       far stare l'intera sezione in una schermata.

       Il calcolo sta in JS e non in CSS perche' i due vincoli si mordono la
       coda: la larghezza dipende dall'altezza (16:9) e l'altezza dipende da
       quanto spazio lascia il testo sopra. Lasciato al CSS, il player prima
       si stirava in un rettangolo lungo e basso, poi — tolta l'altezza
       fissa alla sezione — si gonfiava fino all'altezza naturale
       dell'immagine, portando la sezione a 1423px su un viewport da 768.

       Qui si parte dal budget verticale realmente disponibile e si prende
       il piu' piccolo fra vincolo di altezza e vincolo di larghezza, con un
       minimo sotto il quale il player non scende: su schermi molto bassi la
       sezione diventa piu' alta di una schermata, ma il video resta
       guardabile e nulla viene tagliato. */
    var MIN_PLAYER_H = 200;
    var rail = stage.querySelector(".video-rail");
    var RAIL_GAP = 12;

    function sizeVideoStage() {
      // clientWidth e non innerWidth: esclude la scrollbar, cioe' misura lo
      // spazio davvero disponibile.
      var wide = document.documentElement.clientWidth >= 860;
      if (!wide) { player.style.width = ""; player.style.height = ""; return; }

      var section = stage.closest("section");

      /* L.ingombro di tutto cio. che non e. il player va misurato, non
         sommato pezzo per pezzo (sommando restavano fuori margini e gap, e
         la sezione sforava di ~55px). Ma misurarlo con il player alla sua
         dimensione corrente e. circolare: l.altezza del player dipende
         dall.ingombro e l.ingombro dal player, e il valore non converge.
         Quindi si porta prima il player al minimo, si misura, e solo dopo
         si calcola la dimensione definitiva. */
      player.style.height = MIN_PLAYER_H + "px";
      player.style.width = Math.round(MIN_PLAYER_H * 16 / 9) + "px";
      var chrome = section.scrollHeight - stage.offsetHeight;

      var header = document.querySelector(".site-header");
      var joint = section.previousElementSibling;
      var viewportBudget = document.documentElement.clientHeight -
                           (header ? header.offsetHeight : 0) -
                           (joint ? joint.offsetHeight : 0);

      var byHeight = Math.max(MIN_PLAYER_H, viewportBudget - chrome);
      var byWidth = (stage.clientWidth - rail.offsetWidth - RAIL_GAP) * 9 / 16;
      var h = Math.max(MIN_PLAYER_H, Math.min(byHeight, byWidth));

      function apply(px) {
        player.style.height = Math.round(px) + "px";
        player.style.width = Math.round(px * 16 / 9) + "px";
      }
      apply(h);

      /* Passata di correzione: il calcolo sopra puo. sottostimare l.ingombro
         (il contenitore del video assorbe lo spazio libero, quindi misurarlo
         non restituisce sempre il valore giusto). Qui si guarda l.altezza
         REALE della sezione e, se supera il budget, si toglie l.eccesso al
         player — mai sotto il minimo: in quel caso la sezione cresce, ma
         nulla viene tagliato. */
      var excess = section.scrollHeight - viewportBudget;
      if (excess > 1 && h > MIN_PLAYER_H) apply(Math.max(MIN_PLAYER_H, h - excess));
    }

    // Il ricalcolo modifica l.altezza della sezione, che rifa. scattare
    // l.observer: il flag evita il rimbalzo infinito.
    var sizing = false;
    function scheduleSize() {
      if (sizing) return;
      sizing = true;
      window.requestAnimationFrame(function () { sizeVideoStage(); sizing = false; });
    }
    sizeVideoStage();
    window.addEventListener("resize", scheduleSize);
    if (window.ResizeObserver) new ResizeObserver(scheduleSize).observe(stage.parentNode);
  }

  /* ---------------------------------------------------------------------
   * Feed Instagram — embed ufficiali del profilo Effegi.
   *
   * Ogni post è un iframe verso www.instagram.com/p/<shortcode>/embed:
   * è l'unico modo di mostrare contenuti reali del profilo senza token
   * (l'endpoint oEmbed di Meta e la Graph API richiedono le credenziali di
   * un'app Facebook, che non vengono inventate qui) e senza caricare lo
   * script di embed di Instagram.
   *
   * Gli shortcode arrivano da data-ig-posts nel markup. Se l'attributo è
   * vuoto il contenitore viene rimosso: meglio nessun blocco che un blocco
   * vuoto o, peggio, dei post finti.
   * ------------------------------------------------------------------- */
  var IG_SHORTCODE = /^[A-Za-z0-9_-]{5,30}$/;
  // Accetta sia lo shortcode nudo sia l'URL completo copiato dal browser,
  // post o reel, con o senza parametri: chi compila non deve ritagliare
  // nulla a mano.
  var IG_URL = /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]{5,30})/;

  function toShortcode(value) {
    var match = value.match(IG_URL);
    if (match) return match[1];
    return IG_SHORTCODE.test(value) ? value : null;
  }


  /* ---------------------------------------------------------------------
   * Form contatti — stessi campi del form Elementor di
   * immobilieffegi.it/valuta-il-tuo-immobile/.
   *
   * LIMITE TECNICO DICHIARATO: l'action reale del form vive sul sito
   * WordPress e non e' raggiungibile da un dominio diverso; non viene
   * inventato nessun endpoint. Qui i dati vengono validati lato client e
   * l'utente viene rimandato al modulo ufficiale. Pubblicando la landing
   * dentro il sito basta collegare questi campi alla stessa action: i
   * name= sono gia' quelli reali.
   *
   * Nessun evento di tracking viene emesso: gli 8 eventi del funnel sono
   * quelli della valutazione, e non ne invento di nuovi.
   * ------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var handoff = form.querySelector("[data-contact-handoff]");

    function setError(field, message) {
      var slot = field.closest(".field").querySelector(".field__error");
      if (slot) slot.textContent = message || "";
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function validate() {
      var firstInvalid = null;

      Array.prototype.forEach.call(form.querySelectorAll("input, textarea"), function (field) {
        var message = "";
        var value = (field.value || "").trim();

        if (field.type === "checkbox") {
          if (field.required && !field.checked) message = "Campo obbligatorio.";
        } else if (field.required && !value) {
          message = "Campo obbligatorio.";
        } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          message = "Inserisci un indirizzo email valido.";
        } else if (field.type === "tel" && value && !/^[0-9()#&+*\-=. ]{6,}$/.test(value)) {
          message = "Inserisci un numero di telefono valido.";
        }

        setError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });

      return firstInvalid;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var firstInvalid = validate();
      if (firstInvalid) {
        firstInvalid.focus();
        if (handoff) handoff.hidden = true;
        return;
      }
      if (handoff) handoff.hidden = false;
    });

    // Il messaggio d'errore sparisce appena l'utente corregge il campo.
    form.addEventListener("input", function (event) {
      if (event.target.getAttribute("aria-invalid") === "true") setError(event.target, "");
    });
  }
  function initInstagramFeed() {
    var feed = document.querySelector("[data-ig-feed]");
    if (!feed) return;

    var codes = (feed.getAttribute("data-ig-posts") || "")
      .split(",")
      .map(function (entry) { return toShortcode(entry.trim()); })
      // Il filtro non è cosmetico: impedisce che un valore arbitrario
      // finisca dentro l'URL dell'iframe.
      .filter(function (code) { return !!code; });

    if (!codes.length) {
      feed.parentNode.removeChild(feed);
      return;
    }

    codes.forEach(function (code, i) {
      var cell = document.createElement("div");
      cell.className = "ig-feed__item";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.instagram.com/p/" + code + "/embed/";
      iframe.title = "Post Instagram di Effegi Gruppo Immobiliare";
      iframe.loading = "lazy";
      iframe.setAttribute("scrolling", "no");
      iframe.allowFullscreen = true;
      cell.appendChild(iframe);
      feed.appendChild(cell);
      if (i === 0) feed.setAttribute("aria-label", "Ultimi post da Instagram");
    });
  }

  /* ---------------------------------------------------------------------
   * "Perché scegliere Effegi" — accordion dei tre differenzianti, che
   * comanda anche l'immagine affiancata. Senza JS i pannelli restano tutti
   * aperti (aria-expanded="true" nel markup): il contenuto è sempre
   * leggibile, l'interazione è un miglioramento progressivo.
   * ------------------------------------------------------------------- */
  function initManifestoPillars() {
    var list = document.querySelector("[data-pillars]");
    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll(".manifesto-item"));
    var triggers = Array.prototype.slice.call(list.querySelectorAll(".manifesto-item__trigger"));
    var images = document.querySelectorAll("[data-pillar-img]");
    var tag = document.querySelector("[data-pillar-tag]");
    if (!triggers.length) return;

    function activate(id) {
      items.forEach(function (item) {
        var trigger = item.querySelector(".manifesto-item__trigger");
        var active = trigger && trigger.getAttribute("data-pillar") === id;
        item.classList.toggle("is-active", active);
        if (trigger) trigger.setAttribute("aria-expanded", active ? "true" : "false");
        if (active && tag) {
          var title = item.querySelector(".manifesto-item__title");
          var num = item.querySelector(".num-square");
          if (title && num) tag.textContent = num.textContent + " — " + title.textContent;
        }
      });
      swapImages(images, function (img) { return img.getAttribute("data-pillar-img") === id; });
    }

    triggers.forEach(function (trigger, i) {
      trigger.addEventListener("click", function () {
        activate(trigger.getAttribute("data-pillar"));
      });
      // Frecce su/giù per scorrere i punti da tastiera.
      trigger.addEventListener("keydown", function (event) {
        var delta = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
        if (!delta) return;
        event.preventDefault();
        var next = triggers[(i + delta + triggers.length) % triggers.length];
        next.focus();
        activate(next.getAttribute("data-pillar"));
      });
    });

    activate("1");
  }



  /* ---------------------------------------------------------------------
   * Tipografia italiana: niente "a capo" sbagliati.
   *
   * Due regole della composizione italiana:
   *  1. una riga non finisce con articolo, preposizione o congiunzione:
   *     quelle parole restano attaccate a cio' che introducono;
   *  2. un paragrafo non finisce con una parola isolata sull'ultima riga
   *     (la "vedova"): le ultime due parole restano insieme.
   *
   * Si agisce sostituendo lo spazio con uno spazio unificatore (U+00A0),
   * che il browser non usa mai come punto di ritorno a capo. Il testo NON
   * viene modificato: cambia solo il tipo di spazio.
   *
   * Si lavora sui nodi di testo, non su innerHTML, per non toccare i tag:
   * uno spazio unificatore in fondo a un nodo lega comunque la parola al
   * <strong> che segue.
   * ------------------------------------------------------------------- */
  var PAROLE_DA_LEGARE = (
    // articoli
    "il lo la i gli le un uno una " +
    // preposizioni semplici
    "di a da in con su per tra fra " +
    // preposizioni articolate
    "del dello della dei degli delle " +
    "dal dallo dalla dai dagli dalle " +
    "al allo alla ai agli alle " +
    "nel nello nella nei negli nelle " +
    "sul sullo sulla sui sugli sulle col coi " +
    // congiunzioni e monosillabi
    "e ed o od ma se che ne non come ci si ti vi mi li"
  ).split(" ");

  var INSIEME_LEGATE = {};
  PAROLE_DA_LEGARE.forEach(function (p) { INSIEME_LEGATE[p] = true; });

  var SPAZIO_UNIFICATORE = "\u00A0";

  /* Si sostituisce l'INTERA sequenza di spazi che segue la parola con un
     solo spazio unificatore. E' la chiave del problema: una sequenza di
     spazi e a capo del sorgente viene resa dal browser come un solo spazio,
     mentre lo spazio unificatore non si comprime. Aggiungerlo accanto alla
     sequenza produceva quindi uno spazio in piu' visibile; sostituendola
     del tutto la larghezza resta identica e l'a capo viene impedito.
     Il lookahead su \S evita di toccare gli spazi finali del nodo. */
  function legaParole(testo) {
    return testo.replace(/(\S+)(\s+)(?=\S)/g, function (tutto, parola) {
      var pulita = parola.toLowerCase().replace(/[^a-zàèéìòùç']/g, "");
      return INSIEME_LEGATE[pulita] ? parola + SPAZIO_UNIFICATORE : tutto;
    });
  }

  function nodiDiTesto(radice) {
    var out = [];
    var walker = document.createTreeWalker(radice, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        // Fuori: campi, script/stile e tutto cio' che non e' testo di lettura.
        if (node.parentElement.closest("script, style, input, textarea, select, .num-square")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) out.push(n);
    return out;
  }

  function initTipografia() {
    /* Vanno inclusi anche i blocchi di testo che non sono <p> o <li>: le
       didascalie delle statistiche, l'etichetta del player e gli indirizzi
       del footer sono <span>, e restavano fuori — infatti mostravano ancora
       una parola isolata sull'ultima riga. */
    var blocchi = document.querySelectorAll(
      "main p, main li, main h1, main h2, main h3, main figcaption, main label," +
      " .stat__label, .video-card__label," +
      " .site-footer p, .site-footer a, .site-footer strong, .site-footer__address"
    );

    Array.prototype.forEach.call(blocchi, function (blocco) {
      var nodi = nodiDiTesto(blocco);
      if (!nodi.length) return;

      /* Regola 1 — articoli, preposizioni e congiunzioni non restano a fine
         riga. Oltre agli spazi interni al nodo va gestito il confine fra un
         nodo e l'elemento che segue: in "e la <strong>consulenza…" la parola
         "la" chiude il nodo di testo e "consulenza" sta dentro un altro
         elemento, quindi non e' visibile dentro lo stesso nodo. Anche qui si
         SOSTITUISCE la sequenza finale di spazi, non se ne aggiunge una. */
      nodi.forEach(function (nodo, indice) {
        nodo.nodeValue = legaParole(nodo.nodeValue);
        if (indice === nodi.length - 1) return;
        var coda = nodo.nodeValue.match(/(\S+)(\s+)$/);
        if (!coda) return;
        var pulita = coda[1].toLowerCase().replace(/[^a-zàèéìòùç']/g, "");
        if (INSIEME_LEGATE[pulita]) {
          nodo.nodeValue = nodo.nodeValue.slice(0, -coda[2].length) + SPAZIO_UNIFICATORE;
        }
      });

      /* Regola 2 — niente parola isolata sull'ultima riga del blocco.
         Anche qui si sostituisce l'intera sequenza di spazi, non se ne
         aggiunge una: altrimenti comparirebbe uno spazio doppio.

         I titoli sono esclusi. Sono brevi, e legare le ultime due parole
         rende la coda inseparabile: la prima parola finisce da sola su una
         riga, che e' il difetto opposto (succedeva a "Valorizzazione /
         reale dell'immobile"). Per loro basta text-wrap: balance. */
      if (blocco.tagName.charAt(0) === "H" && blocco.tagName.length === 2) return;

      var ultimo = nodi[nodi.length - 1];
      var parti = ultimo.nodeValue.match(/^([\s\S]*?)(\S+)(\s+)(\S+)(\s*)$/);
      /* Si lega solo se le ultime DUE parole insieme restano corte. Guardare
         solo l'ultima non basta: su una colonna stretta un blocco finale
         lungo non entra piu' in riga e spinge la prima parola da sola in
         cima — lo stesso difetto, spostato all'inizio. Succedeva a
         "Appuntamenti / di vendita settimanali". */
      if (parti && (parti[2] + parti[4]).length <= 22) {
        ultimo.nodeValue = parti[1] + parti[2] + SPAZIO_UNIFICATORE + parti[4] + parti[5];
      }
    });
  }
  /* ---------------------------------------------------------------------
   * Scambio dell'immagine attiva (manifesto e "Come funziona").
   *
   * L'immagine che esce viene marcata "is-previous": resta sotto, intera,
   * mentre quella nuova si scopre sopra di lei. Senza questo passaggio,
   * nell'istante del cambio l'uscente spariva prima che l'entrante fosse
   * comparsa e il riquadro restava vuoto — molto visibile su tablet e
   * telefono, dove l'immagine e' grande e in cima alla sezione.
   * ------------------------------------------------------------------- */
  function swapImages(images, isNext) {
    var list = Array.prototype.slice.call(images);
    var uscente = null;

    list.forEach(function (img) {
      if (img.classList.contains("is-active") && !isNext(img)) uscente = img;
      img.classList.remove("is-previous");
    });

    list.forEach(function (img) { img.classList.toggle("is-active", isNext(img)); });
    if (uscente) uscente.classList.add("is-previous");
  }
  /* ---------------------------------------------------------------------
   * "Come funziona" — stepper percorribile: i binari verdi si riempiono
   * fino al passo scelto e l'inquadratura dell'immagine scorre.
   * ------------------------------------------------------------------- */
  function initProcessStepper() {
    var list = document.querySelector("[data-steps]");
    if (!list) return;

    var steps = Array.prototype.slice.call(list.querySelectorAll(".process-step"));
    var triggers = Array.prototype.slice.call(list.querySelectorAll(".process-step__trigger"));
    var stepImages = document.querySelectorAll("[data-step-img]");
    var marker = document.querySelector("[data-step-marker]");
    if (!triggers.length) return;

    function activate(index) {
      steps.forEach(function (step, i) {
        var trigger = step.querySelector(".process-step__trigger");
        step.classList.toggle("is-active", i === index);
        // "Raggiunto" = questo passo e tutti i precedenti: il binario
        // racconta l'avanzamento, non solo la posizione corrente.
        step.classList.toggle("is-reached", i <= index);
        if (trigger) {
          if (i === index) trigger.setAttribute("aria-current", "step");
          else trigger.removeAttribute("aria-current");
        }
      });
      // Un.immagine per passo: cambia il soggetto, non l.inquadratura.
      swapImages(stepImages, function (img) { return Number(img.getAttribute("data-step-img")) === index + 1; });
      if (marker) marker.textContent = "0" + (index + 1);
    }

    triggers.forEach(function (trigger, i) {
      trigger.addEventListener("click", function () { activate(i); });
      trigger.addEventListener("mouseenter", function () { activate(i); });
      trigger.addEventListener("focus", function () { activate(i); });
      trigger.addEventListener("keydown", function (event) {
        var delta = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
        if (!delta) return;
        event.preventDefault();
        triggers[(i + delta + triggers.length) % triggers.length].focus();
      });
    });

    activate(0);
  }

  /* ---------------------------------------------------------------------
   * Link alla hero (loghi header/footer e CTA "Valuta il tuo immobile").
   *
   * Con il solo href="#hero" il browser non rifa' lo scroll se l'hash e'
   * gia' quello: dopo il primo clic, scendendo e ricliccando la CTA non
   * succedeva nulla. Qui lo scroll viene comandato sempre, e si va a 0
   * (non alla posizione dell'elemento) perche' la hero sta sotto l'header
   * sticky per via del suo margin-top negativo: mirare all'elemento
   * lascerebbe la cima della hero coperta.
   * ------------------------------------------------------------------- */
  function initHeroLinks() {
    document.querySelectorAll('a[href="#hero"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        // L'hash resta aggiornato per coerenza con la barra degli indirizzi.
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#hero");
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Footer year
   * ------------------------------------------------------------------- */
  function setFooterYear() {
    var el = document.querySelector("[data-current-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------
   * Motion: reveal above-the-fold on load, reveal below-the-fold on scroll
   * ------------------------------------------------------------------- */
  function initRevealMotion() {
    var REVEAL_SELECTOR = "[data-reveal], [data-reveal-block], .section-joint";
    var allReveal = document.querySelectorAll("[data-reveal]");
    allReveal.forEach(function (el) {
      var order = parseInt(el.getAttribute("data-reveal-order") || "0", 10);
      el.style.setProperty("--reveal-delay", (order * 90) + "ms");
    });

    var aboveFold = document.querySelectorAll(".site-header[data-reveal], .hero [data-reveal]");
    var belowFoldEls = [];
    document.querySelectorAll(REVEAL_SELECTOR).forEach(function (el) {
      if (!el.closest(".hero") && !el.closest(".site-header")) belowFoldEls.push(el);
    });

    // Above the fold: reveal shortly after load (plain setTimeout, NOT
    // requestAnimationFrame — rAF is paused by browsers on hidden/backgrounded
    // tabs, e.g. a landing opened in a background tab from an ad, which would
    // leave the hero permanently at opacity:0 and kill conversion. setTimeout
    // still fires when the tab regains visibility, so it degrades safely.
    setTimeout(function () {
      aboveFold.forEach(function (el) { el.classList.add("is-visible"); });
    }, reduceMotion ? 0 : 60);

    // Below the fold: reveal on scroll intersection
    // Serve a distinguere "observer che non e. mai partito" da "observer
    // che funziona ma l.utente non e. ancora arrivato li.".
    var observerFired = false;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries, obs) {
          // L.observer emette un callback iniziale per OGNI elemento
           // osservato, anche non intersecante: e. qui che si capisce se
           // funziona. Metterlo dentro il ramo isIntersecting significava
           // considerarlo "rotto" per il solo fatto che l.utente non aveva
           // ancora scrollato, e la rete di sicurezza rivelava tutto.
          observerFired = true;
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
              revealPairedWipe(entry.target, obs);
            }
          });
        },
        // threshold basso (invece di es. 0.15) perché con scroll veloci
        // (flick su mobile) un elemento basso come un titolo di sezione può
        // attraversare interamente la soglia tra due frame campionati e non
        // essere mai rilevato "abbastanza visibile" — con threshold: 0 basta
        // che entri anche di un solo pixel per attivare il reveal.
        { threshold: 0, rootMargin: "0px 0px -10% 0px" }
      );
      belowFoldEls.forEach(function (el) { io.observe(el); });
    } else {
      belowFoldEls.forEach(function (el) { el.classList.add("is-visible"); });
    }


    /* Barra di transizione e immagine della sezione che introduce devono
       partire nello stesso istante: osservate separatamente si attivavano
       a qualche frame di distanza e lo sfasamento si vedeva. Quando la
       barra marcata --synced entra in campo accendiamo subito anche la
       figura con la tendina che sta nella sezione sotto. */
    function revealPairedWipe(joint, obs) {
      if (!joint.classList.contains("section-joint")) return;
      var section = joint.nextElementSibling;
      if (!section) return;

      // La linietta laterale della sezione parte con la sua barra, sempre:
      // osservate separatamente si accendevano a qualche frame di distanza.
      if (section.hasAttribute("data-reveal-block") && !section.classList.contains("is-visible")) {
        section.classList.add("is-visible");
        obs.unobserve(section);
      }

      // Solo per le sezioni sincronizzate: parte con la barra anche lo
      // slide dell'immagine, cosi' i due movimenti coincidono.
      if (!joint.classList.contains("section-joint--synced")) return;
      var figure = section.querySelector('[data-reveal="wipe"]');
      if (!figure || figure.classList.contains("is-visible")) return;
      figure.classList.add("is-visible");
      obs.unobserve(figure);
    }
    /* Rete di sicurezza — mirata, non indiscriminata.
       Prima forzava lo stato finale su TUTTO cio' che dopo 4s era ancora
       nascosto: bastava restare sulla pagina piu' di 4 secondi prima di
       scorrere e le sezioni piu' in basso risultavano gia' rivelate, quindi
       le loro barre non si animavano piu' allo scroll (sembravano
       funzionare "solo al refresh").
       Ora si distinguono i due casi:
       - l'observer non ha mai reagito -> e' rotto o non parte (tab in
         background, browser insolito): si forza tutto, perche' contenuto
         bloccato a opacity:0 su una landing ADV e' il male peggiore;
       - l'observer funziona -> si sblocca solo cio' che e' gia' entrato in
         campo senza essere stato rivelato, lasciando intatto tutto quello
         che l'utente non ha ancora raggiunto. */
    function revealIfPassed() {
      var vh = document.documentElement.clientHeight;
      document.querySelectorAll(REVEAL_SELECTOR + ":not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top <= vh) el.classList.add("is-visible");
      });
    }

    // Secondo livello: se un callback dell'observer si perde (scroll molto
    // rapido), lo scroll stesso recupera gli elementi gia' oltrepassati.
    window.addEventListener("scroll", revealIfPassed, { passive: true });

    setTimeout(function () {
      if (!observerFired) {
        document.querySelectorAll(REVEAL_SELECTOR + ":not(.is-visible)").forEach(function (el) {
          el.classList.add("is-visible");
        });
        return;
      }
      revealIfPassed();
    }, 4000);
  }

  /* ---------------------------------------------------------------------
   * CurrentEffegiForm — wrapper dello step 1 nativo + handoff live step 2-3
   * ------------------------------------------------------------------- */
  function initValuationForm() {
    var root = document.getElementById("current-effegi-form");
    if (!root) return;

    var step1Panel = root.querySelector('[data-step-panel="1"]');
    var handoffPanel = root.querySelector('[data-step-panel="2-3"]');
    var backBtn = root.querySelector("[data-step-back]");
    var mount = root.querySelector("[data-live-form-mount]");

    var fields = {
      comune: step1Panel.querySelector("#v-comune"),
      indirizzo: step1Panel.querySelector("#v-indirizzo"),
      civico: step1Panel.querySelector("#v-civico")
    };

    var state = restoreState();
    if (state.values) {
      Object.keys(fields).forEach(function (key) {
        if (state.values[key]) fields[key].value = state.values[key];
      });
    }

    var startFired = false;
    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener("focus", function () {
        if (!startFired) {
          startFired = true;
          EffegiTracking.push("valuation_start");
          markAbandonWatch(true);
        }
      });
      fields[key].addEventListener("input", function () {
        clearFieldError(fields[key]);
      });
    });

    step1Panel.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      Object.keys(fields).forEach(function (key) {
        if (!fields[key].value.trim()) {
          setFieldError(fields[key], "Campo obbligatorio.");
          valid = false;
        }
      });
      if (!valid) return;

      var submitBtn = step1Panel.querySelector('button[type="submit"]');
      submitBtn.classList.add("btn--loading");
      submitBtn.disabled = true;

      var values = {
        comune: fields.comune.value.trim(),
        indirizzo: fields.indirizzo.value.trim(),
        civico: fields.civico.value.trim()
      };
      persistState({ values: values, step: 2 });

      // Nessuna chiamata di rete reale è disponibile per lo Step 1 in questo
      // repository (vedi nota in testa al file): il breve delay simula solo
      // il feedback di caricamento dell'interazione, non una submission reale.
      setTimeout(function () {
        submitBtn.classList.remove("btn--loading");
        submitBtn.disabled = false;
        goToHandoff(values);
        EffegiTracking.push("valuation_step_1_complete", { comune: values.comune });
      }, reduceMotion ? 0 : 420);
    });

    backBtn.addEventListener("click", function () {
      handoffPanel.hidden = true;
      step1Panel.hidden = false;
      persistState({ values: getCurrentValues(), step: 1 });
    });

    if (state.step === 2 && state.values) {
      goToHandoff(state.values, true);
    }

    function getCurrentValues() {
      return {
        comune: fields.comune.value.trim(),
        indirizzo: fields.indirizzo.value.trim(),
        civico: fields.civico.value.trim()
      };
    }

    function goToHandoff(values, silent) {
      handoffPanel.querySelector('[data-recap="comune"]').textContent = values.comune || "—";
      handoffPanel.querySelector('[data-recap="indirizzo"]').textContent = values.indirizzo || "—";
      handoffPanel.querySelector('[data-recap="civico"]').textContent = values.civico || "—";

      step1Panel.hidden = true;
      handoffPanel.hidden = false;
      mountLiveForm(mount);

      if (!silent) {
        handoffPanel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    }

    function setFieldError(input, msg) {
      var field = input.closest(".field");
      field.classList.add("has-error");
      field.querySelector(".field__error").textContent = msg;
      input.setAttribute("aria-invalid", "true");
    }
    function clearFieldError(input) {
      var field = input.closest(".field");
      field.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
    }

    function persistState(partial) {
      try {
        var current = restoreState();
        var next = Object.assign({}, current, partial);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) { /* storage non disponibile: degradazione silenziosa */ }
    }
    function restoreState() {
      try {
        var raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (err) {
        return {};
      }
    }
  }

  /* ---------------------------------------------------------------------
   * Mount lazy dell'iframe live (Step 2-3) — nessun impatto sulle
   * performance above-the-fold: viene istanziato solo dopo l'azione utente.
   * ------------------------------------------------------------------- */
  function mountLiveForm(mount) {
    if (!mount || mount.querySelector("iframe")) return;

    var iframe = document.createElement("iframe");
    iframe.src = LIVE_FORM_URL;
    iframe.title = "Modulo di valutazione Effegi Gruppo Immobiliare — passi 2 e 3";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    iframe.addEventListener("load", function () {
      var skeleton = mount.querySelector("[data-live-form-skeleton]");
      if (skeleton) skeleton.remove();
      // Proxy di interazione: quando il focus passa dentro l'iframe cross-origin,
      // il documento padre riceve "blur" con document.activeElement === iframe.
      // È l'unico segnale di engagement disponibile senza un bridge postMessage
      // lato WordPress; non equivale a un vero step_2_complete/step_3_complete.
      window.addEventListener("blur", function onBlur() {
        if (document.activeElement === iframe) {
          EffegiTracking.push("valuation_step_2_complete", { note: "heuristic_iframe_focus" });
          window.removeEventListener("blur", onBlur);
        }
      });
    });

    mount.appendChild(iframe);
  }

  /* ---------------------------------------------------------------------
   * Abbandono — logica dichiarata (brief §17):
   * - "abandon" viene valutato SOLO se l'utente ha già interagito col form
   *   (valuation_start emesso) e NON ha ancora completato lo Step 1.
   * - Si aggancia a `visibilitychange` (hidden) e `pagehide`, non a un
   *   semplice reload/refresh, ed è idempotente per sessione (un solo evento).
   * ------------------------------------------------------------------- */
  var abandonState = { watching: false, reported: false };

  function markAbandonWatch(active) {
    abandonState.watching = active;
  }

  function maybeReportAbandon() {
    if (!abandonState.watching || abandonState.reported) return;
    var reachedStep2 = false;
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      reachedStep2 = raw && JSON.parse(raw).step === 2;
    } catch (err) { /* storage non disponibile: trattiamo come non completato */ }
    if (reachedStep2) return; // ha completato almeno lo step 1: non è abbandono
    abandonState.reported = true;
    EffegiTracking.push("valuation_abandon");
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") maybeReportAbandon();
  });
  window.addEventListener("pagehide", maybeReportAbandon);
})();
