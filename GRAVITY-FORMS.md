# Quiz di valutazione — configurazione Gravity Forms

Questo documento serve a chi porta la landing dentro WordPress. La pagina in
questo repository è la resa statica del form: il markup e le classi sono già
quelli di Gravity Forms, quindi il CSS di `assets/css/style.css` funziona così
com'è una volta creato il form vero.

---

## 1. Requisito critico: raccolta dati a ogni step

Gravity Forms **non** salva niente a ogni cambio pagina: un form multi-pagina
tiene i dati in sessione e scrive l'entry solo all'invio finale. Il requisito
del cliente ("i dati vengono raccolti progressivamente ad ogni step, non solo
alla fine") si soddisfa con il **Partial Entries Add-On**, incluso nella
licenza **Elite** — confermata disponibile.

Configurazione:

1. Installare e attivare *Gravity Forms Partial Entries Add-On*.
2. Form → Impostazioni → **Partial Entries** → `Enable partial entries`.
3. `Partial Entry Warning` disattivato (non serve all'utente, serve a noi).
4. **Capture rules**: lasciare la cattura su ogni pagina. Il filtro dei
   partial "senza contatto" si fa a valle, non qui: perdere lo step 1 di chi
   poi non arriva in fondo è esattamente ciò che si vuole evitare.

Il salvataggio scatta al clic su **Avanti** e **Indietro**. L'entry parziale
ha `partial_entry_id` e viene promossa a entry completa all'invio finale:
lo stesso record, non due.

### Identificativo del lead

Campo nascosto (ID 20 nella resa statica) popolato lato server, così i tre
step restano riconducibili alla stessa persona anche prima di avere email:

```php
add_filter( 'gform_field_value_effegi_lead_uid', function () {
    if ( ! session_id() ) { session_start(); }
    if ( empty( $_SESSION['effegi_lead_uid'] ) ) {
        $_SESSION['effegi_lead_uid'] = wp_generate_uuid4();
    }
    return $_SESSION['effegi_lead_uid'];
} );
```

Nel campo nascosto: *Allow field to be populated dynamically* →
parametro `effegi_lead_uid`.

### Se un domani la licenza non fosse Elite

L'alternativa è l'hook `gform_post_paging`, che scrive a ogni cambio pagina
senza add-on. Va mantenuto a mano, quindi con Elite non conviene:

```php
add_action( 'gform_post_paging', function ( $form, $source_page, $current_page ) {
    if ( 1 !== (int) $form['id'] ) { return; }
    // $_POST contiene i campi della pagina appena lasciata.
    // Scrivere su tabella custom o CRM usando effegi_lead_uid come chiave.
}, 10, 3 );
```

---

## 2. Struttura del form

Form ID 1, tre pagine, indicatore di avanzamento = **Progress Bar**.

### Pagina 1 — Dove si trova

Ricalca lo step 1 del form Effegi oggi online su
`immobilieffegi.it/vendita-immobili`.

| ID | Campo | Tipo GF | Note |
|----|-------|---------|------|
| 2 | Comune | Single Line Text | obbligatorio |
| 3 | Indirizzo | Single Line Text | obbligatorio, larghezza 2/3 |
| 4 | Civico | Single Line Text | obbligatorio, larghezza 1/3 |

Pulsante: **Scopri ora**.

### Pagina 2 — Caratteristiche

Ricalca lo step 2 del form Effegi.

| ID | Campo | Tipo GF | Note |
|----|-------|---------|------|
| 1 | Tipologia | Drop Down | voci da verificare: la tenda era chiusa nello screenshot |
| 8 | Numero di locali | Number | contatore meno/piu (i pulsanti sono JS nostro, vedi sezione 3) |
| 5 | Numero di bagni | Number | contatore meno/piu |
| 6 | Superficie | Number | suffisso m2 |
| 7 | Classe energetica | Drop Down | classi APE da A4 a G + "Non lo so"; da verificare sul form originale |
| 9 | Condizione dell.immobile | Radio Buttons | Nuovo/Ristrutturato · Buono/Abitabile · Da ristrutturare |
| 10 | L.immobile dispone di: | Checkboxes | Arredamento · Impianto di riscaldamento · Giardino privato · Posto auto/Garage · Aria condizionata · Balcone/Terrazzo |
| 16 | Quando vuoi mettere l.immobile sul mercato? | Radio Buttons | Il piu presto possibile · Entro 6 mesi · Entro 12 mesi · Non ora, voglio solo una valutazione |

Pulsante: **Avanti**.

### Pagina 3 — I tuoi dati

Ricalca il modulo contatti Effegi: un solo campo per nome e cognome.

| ID | Campo | Tipo GF | Note |
|----|-------|---------|------|
| 11 | Nome e Cognome | Single Line Text | obbligatorio |
| 13 | Email | Email | obbligatorio |
| 14 | Telefono | Phone | formato internazionale |
| 15 | Consenso privacy | Consent | non e. nel modulo originale; resta per liceita. del trattamento |
| 20 | Lead UID | Hidden | popolato dinamicamente (§1) |

Pulsante: **Invia**.

### Provenienza dei campi

- **Comune, Indirizzo, Civico** → campi reali dello step 1 del form oggi
  online su `immobilieffegi.it/valuta-il-tuo-immobile/`.
- **Nome, Cognome, Email, Telefono, consenso** → campi reali del modulo
  contatti Effegi sulla stessa pagina.
- **Tutti i campi dello step 2** → campi reali dello step 2 del form Effegi,
  trascritti dagli screenshot forniti dal cliente.

> Restano da verificare due sole liste chiuse, che negli screenshot erano
> tende non aperte: le voci di **Tipologia** e di **Classe energetica**.

---

## 3. CSS: cosa si può e cosa no

Gravity Forms genera markup proprio e non modificabile. Si stila quello che
produce lui:

- Tema del form: **Orbital** (default da GF 2.9). Le variabili `--gf-*` si
  dichiarano su `.gform-theme--framework`, che è lo scope dove GF le consuma.
  Il ponte con la palette Effegi è già scritto in `style.css`.
- Se il CSS di Orbital dà fastidio si disattiva per form
  (Impostazioni → Form Theme) o globalmente con `gform_disable_css`.
- **Le "card" cliccabili non sono un tipo di campo**: sono radio button di cui
  si stila la `<label>` dentro `.gchoice`, con l'input nativo reso invisibile
  ma lasciato nel DOM per tastiera e screen reader. Già fatto.
- **L'avanzamento automatico alla selezione non esiste in GF**: è JS nostro.
  Va riagganciato dopo ogni cambio pagina, perché GF ridisegna il DOM:

```js
jQuery( document ).on( 'gform_page_loaded', function ( event, formId, currentPage ) {
    if ( 1 !== formId ) { return; }
    // riagganciare qui i listener delle card e l'aggiornamento della barra
} );
```

---

## 4. Tracking

Gli eventi sono già definiti in `assets/js/tracking.js` e coprono uno a uno i
punti chiesti dal brief:

| Evento | Quando |
|--------|--------|
| `landing_view` | caricamento pagina |
| `valuation_start` | prima interazione col form |
| `valuation_step_1_complete` | uscita dalla pagina 1 |
| `valuation_step_2_complete` | uscita dalla pagina 2 |
| `valuation_step_3_complete` | invio validato |
| `valuation_form_complete` | form completo |
| `lead_submit` | lead registrato |
| `valuation_abandon` | uscita dopo l'avvio, senza completamento; porta con sé `ultimo_step` |

In WordPress gli step vanno emessi da `gform_page_loaded`, e `lead_submit`
dalla **Confirmation** del form, non dal click sul pulsante: solo lì si sa che
il lead è stato davvero scritto.

**Regola vincolante:** mai PII nel dataLayer. Il payload porta solo tipologia,
superficie, anno, locali, stato e comune. Nome, cognome, email, telefono e
indirizzo sono esclusi per costruzione — verificato a schermo sul funnel
completo.

---

## 5. Cosa resta da decidere

- Notifiche: a quale indirizzo per ciascuna delle tre agenzie (Cernusco,
  Melzo, Vignate). Si può instradare con la logica condizionale sul comune.
- Conferma: messaggio in pagina (attuale) o redirect a una thank-you page
  dedicata, che renderebbe più pulito il tracciamento della conversione.
- Doppio opt-in marketing separato dal consenso privacy, se serve.
