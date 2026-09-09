# EFFEGI — Landing Page “Valuta il tuo immobile”
## Brief operativo per Claude Code

> **Obiettivo:** progettare e sviluppare una nuova landing page Effegi dedicata alla **valutazione degli immobili**, destinata principalmente a campagne Meta Ads e Google Ads con finalità di **lead generation**.
>
> **Importante:** implementa realmente la landing nel progetto. Non limitarti a proporre una struttura o a descrivere cosa faresti.

---

# 1. Materiali da analizzare PRIMA di sviluppare

Prima di scrivere codice, analizza tutti i materiali forniti e il repository esistente.

## Allegati

### Documento di progetto
`Effegi Gruppo Immobiliare - Strategia Operativa.pdf`

Usalo per comprendere:

- Visual Identity;
- palette;
- font;
- linguaggio grafico;
- posizionamento;
- tono di voce;
- target;
- fattori differenzianti;
- impostazione ADV;
- stile generale del brand.

### NON considerare queste pagine del PDF

Ignora completamente le pagine:

- 5
- 6
- 7
- 27
- 31
- 32
- 33

Non utilizzare quelle pagine come riferimento per:

- layout;
- visual;
- contenuti;
- UX;
- indicazioni strategiche;
- componenti;
- struttura della landing.

---

### Video motion reference
`Proposta video palestra(1).mp4`

Il video **NON deve essere inserito nella landing**.

Va utilizzato come **motion reference del brand**, soprattutto per capire:

- stile delle forme;
- entrata e uscita degli elementi;
- ritmo;
- transizioni;
- animazione di rettangoli e quadrati;
- reveal dei testi;
- alternanza tra fondi chiari e scuri;
- comportamento degli elementi grafici.

## Lettura del motion style da replicare digitalmente

Il linguaggio del video è costruito principalmente attraverso:

- rettangoli e quadrati con spigoli netti;
- blocchi che entrano da bordi diversi della viewport;
- elementi che scorrono verticalmente e orizzontalmente;
- grandi forme che funzionano come **wipe / maschere di transizione**;
- comparsa progressiva e sfalsata degli elementi;
- testi associati a bande rettangolari colorate;
- cambi scena basati sul movimento e sulla trasformazione delle forme;
- alternanza netta tra **antracite** e **fondo chiaro**;
- utilizzo dell’avorio e dei grigi come livelli intermedi;
- composizioni geometriche rigorose;
- assenza di forme morbide o decorative casuali.

### Da evitare

Non trasformare questo linguaggio in:

- gradienti vistosi;
- blob;
- forme organiche;
- bordi molto arrotondati;
- glassmorphism;
- glow;
- animazioni elastiche/cartoon;
- parallax pesante;
- fade generici applicati a tutto;
- effetti puramente decorativi.

Le animazioni devono sembrare una **estensione digitale naturale della VI Effegi**.

---

# 2. Reference web

## Reference creativa / strutturale / UX principale

https://www.engelvoelkers.com/it/it/vendita/valuta-il-tuo-immobile

Usa questa pagina come punto di partenza per:

- centralità della valutazione;
- immediatezza dell’ingresso nel percorso;
- struttura del funnel;
- presentazione progressiva delle informazioni;
- UX mobile;
- percezione di percorso guidato;
- chiarezza delle CTA;
- riduzione dell’attrito;
- progressione del quiz;
- modalità di compilazione;
- navigazione tra gli step.

### IMPORTANTE

Non copiare:

- visual;
- font;
- colori;
- componenti proprietari;
- testi;
- immagini;
- layout in modo letterale.

Devi trasferire **la logica dell’esperienza** nel linguaggio Effegi.

---

## Landing Effegi attuale

https://immobilieffegi.it/valuta-il-tuo-immobile/

Questa è invece la reference tecnica e contenutistica principale per il form.

Serve per recuperare:

- domande;
- campi;
- ordine delle informazioni;
- logica di raccolta;
- comportamento step-by-step;
- contenuti già approvati;
- elementi di fiducia eventualmente riutilizzabili.

### Dati che risultano già visibili nella landing attuale

L’inizio del percorso presenta:

- titolo: **“Scopri il Valore del tuo Immobile”**
- CTA/label: **“INIZIA LA VALUTAZIONE”**
- testo: **“Ottieni in 3 semplici step una valutazione professionale e gratuita del tuo immobile.”**
- primo gruppo visibile:
  - Comune
  - Indirizzo
  - Civico

Questi elementi possono essere riutilizzati perché già presenti nella landing esistente.

Per gli step successivi **non inventare nulla**: recupera i campi direttamente dal form attuale o dal codice/integratore che lo gestisce.

---

# 3. Obiettivo della nuova landing

La landing deve intercettare utenti interessati a sapere:

> **Quanto vale il proprio immobile?**

e accompagnarli verso la compilazione con un’esperienza:

- semplice;
- veloce;
- progressiva;
- chiara;
- rassicurante;
- più interattiva rispetto alla pagina attuale.

Il percorso ideale finale sarà:

```text
ADV
↓
Landing
↓
Quiz
↓
Raccolta progressiva dei dati
↓
Lead
↓
Contatto commerciale
```

La landing non deve sembrare una pagina corporate generica.

Deve essere progettata come **strumento di conversione dedicato**.

---

# 4. FASE 1 — requisito fondamentale

## PER ORA NON SVILUPPARE IL NUOVO QUIZ

Il nuovo quiz interattivo sarà realizzato in una fase successiva.

### In questa fase devi:

- costruire la nuova landing;
- creare la nuova UX/UI;
- utilizzare il **form attuale della landing Effegi esistente**;
- preservarne il funzionamento;
- preservarne le domande;
- preservarne i 3 step;
- preservarne la raccolta progressiva dei dati.

### NON devi:

- inventare un nuovo form;
- creare domande diverse;
- simulare uno pseudo-form statico;
- creare endpoint fittizi;
- cambiare la logica backend;
- perdere la raccolta progressiva;
- sostituire il form funzionante con un mockup.

Se il form è già disponibile nel repository, integralo direttamente.

Se è disponibile tramite:

- shortcode;
- embed;
- script;
- iframe;
- componente;
- API;
- plugin;
- codice custom;

riutilizza l’integrazione reale.

Se non hai accesso alla logica necessaria per incorporarlo correttamente, **non inventare il backend**. Prepara un wrapper/componente chiaramente identificato per il form reale e segnala il limite tecnico.

---

# 5. Raccolta progressiva dei lead

Il comportamento esistente è fondamentale.

Il form è diviso in 3 step.

La logica da mantenere è:

```text
STEP 1
Compilazione
↓
Invio / salvataggio dei dati disponibili

STEP 2
Compilazione
↓
Invio / aggiornamento dei dati del lead

STEP 3
Compilazione + dati finali di contatto
↓
Invio / aggiornamento del lead completo
```

Non dobbiamo perdere i dati nel caso in cui l’utente:

- completi solo il primo step;
- completi il secondo step e poi abbandoni;
- chiuda la pagina prima del submit finale.

Quando il nuovo quiz verrà sviluppato, dovrà essere possibile collegare i diversi salvataggi alla stessa persona/sessione attraverso un identificativo univoco quando tecnicamente necessario.

### Prima di modificare il form

Verifica nel codice:

- quando avviene ogni invio;
- quali endpoint vengono utilizzati;
- quali dati vengono inviati a ogni step;
- se esiste già un `lead_id`, token o ID sessione;
- come vengono aggiornati i dati;
- come vengono gestiti errori e retry;
- se ci sono callback/eventi già utilizzabili per tracking.

**Non rompere questa logica.**

---

# 6. Visual Identity Effegi

## Palette obbligatoria

### Primary

```css
--effegi-anthracite: #2B3131;
--effegi-white: #FFFFFF;
--effegi-ivory: #BFBBA2;
```

### Secondary

```css
--effegi-dark-gray: #6B6362;
--effegi-light-gray: #AAA39D;
--effegi-green: #1E4B46;
```

Non introdurre arbitrariamente nuovi colori di brand.

Colori extra sono ammessi solo quando strettamente necessari per:

- errori;
- warning;
- accessibilità;
- browser/system states.

---

# 7. Font

Dal documento di Visual Identity:

- **Roboto** → font principale;
- **Open Sauce** → descrizioni/testi lunghi per leggibilità.

Usa questi font se sono disponibili negli asset del progetto o se possono essere integrati correttamente.

Non sostituirli senza motivo.

Costruisci una gerarchia tipografica pulita e leggibile, soprattutto su mobile.

---

# 8. Linguaggio grafico

La VI specifica chiaramente:

- quadrati;
- rettangoli;
- ordine;
- solidità;
- semplicità;
- rigore;
- assenza di forme morbide.

## Quindi nella landing

Prediligi:

- pannelli rettangolari;
- griglie nette;
- blocchi di colore;
- linee sottili;
- divisioni geometriche;
- indicatori di step squadrati;
- CTA rettangolari;
- form fields puliti;
- composizioni modulari.

### Border radius

Evita rounded card generiche da SaaS.

Se usi un border radius, deve essere:

- minimo;
- coerente;
- funzionale;

ma la direzione principale deve rimanere **squadrata e rigorosa**.

---

# 9. Tone of Voice

Dal documento Effegi, la voce del brand deve essere:

- competente;
- solida;
- chiara;
- presente.

Lo stile deve essere:

- realistico;
- concreto;
- basato su situazioni vere;
- orientato alle scelte.

Il brand **non deve risultare**:

- commerciale in modo aggressivo;
- sensazionalistico;
- paternalistico;
- burocratico;
- eccessivamente amichevole.

Principio guida:

> **“Tu decidi. Noi ti aiutiamo a capire cosa stai davvero decidendo.”**

Quindi anche il copy della landing deve trasmettere:

- chiarezza;
- esperienza;
- controllo;
- trasparenza;
- accompagnamento.

Non usare hype immobiliare o claim aggressivi se non già approvati.

---

# 10. Target prioritario della landing

Per questa landing il target prioritario sono **proprietari interessati alla vendita o alla valorizzazione del proprio immobile**.

Dal documento emerge in particolare il profilo del proprietario venditore “consapevole”, che:

- deve vendere casa per cambio abitazione, esigenze familiari o investimento;
- ha spesso già un’idea del valore;
- cerca una valutazione realistica;
- cerca affidabilità;
- apprezza esperienza sul territorio;
- vuole chiarezza;
- vuole evitare sorprese.

È rilevante anche il caso di persone che devono gestire immobili ricevuti in eredità e hanno bisogno di:

- supporto chiaro;
- competenza tecnica;
- accompagnamento;
- riduzione delle complessità.

Usa queste informazioni per calibrare gerarchia e messaggi, senza creare sezioni ridondanti.

---

# 11. Fattori differenzianti utilizzabili

Dal materiale Effegi puoi valorizzare, quando utile alla conversione:

### Valorizzazione reale dell’immobile
EFFEGI lavora per far emergere il reale valore della proprietà attraverso analisi, presentazione e strategia di vendita.

### Consulenza trasparente e tutela
L’approccio è consulenziale e mette al centro correttezza, trasparenza e tutela delle parti.

### Conoscenza del territorio e rete di professionisti
La presenza sul territorio e la rete di notai, architetti e broker permettono una gestione più strutturata dell’operazione.

Usa questi elementi come **trust content**, non come blocchi corporate eccessivamente lunghi.

---

# 12. Struttura UX consigliata

Non devi copiare meccanicamente questa struttura se il repository suggerisce una soluzione migliore, ma mantieni la landing compatta e conversion-oriented.

## 01 — Header minimale

Deve contenere principalmente:

- logo Effegi;
- eventuale CTA “Valuta il tuo immobile” se utile;
- eventuali riferimenti strettamente necessari.

Non creare una navbar corporate dispersiva.

Su mobile deve essere compatto.

---

## 02 — Hero + accesso immediato alla valutazione

Above the fold deve essere immediatamente chiaro:

- cosa offre la pagina;
- che l’utente può iniziare subito;
- che il percorso è composto da 3 step.

Possibile base, già presente sul sito:

### H1
**Scopri il valore del tuo immobile**

### Supporting copy
**Ottieni in 3 semplici step una valutazione professionale e gratuita del tuo immobile.**

Non aggiungere claim non verificati.

### Layout

Il form / primo step deve avere **massima priorità visiva**.

Evita una hero in cui:

- l’immagine occupa tutto lo spazio;
- il form finisce sotto la fold;
- bisogna fare molto scroll prima di iniziare;
- il testo è troppo lungo.

---

## 03 — Form attuale

Integra il form attuale all’interno di una UI Effegi più curata.

Deve sembrare parte nativa della nuova landing.

Prevedi:

- label chiare;
- campi grandi;
- spaziature generose;
- CTA evidente;
- stato focus;
- stato hover;
- stato active;
- stato error;
- loading;
- success;
- feedback immediato;
- comportamento mobile corretto.

Non alterare la logica esistente.

---

## 04 — Progressione

Anche nella Fase 1, se compatibile con il form esistente, rendi più evidente il concetto di:

```text
01 → 02 → 03
```

Puoi farlo attraverso:

- 3 rettangoli;
- barra segmentata;
- numerazione;
- cambio colore;
- riempimento progressivo.

L’indicatore deve riprendere il motion language del video.

---

## 05 — Perché Effegi / trust

Crea una sezione molto sintetica che riduca le esitazioni dopo l’ingresso nel funnel.

Puoi valorizzare:

- conoscenza del territorio;
- valorizzazione reale dell’immobile;
- consulenza trasparente;
- rete di professionisti.

Evita blocchi di testo lunghi.

---

## 06 — Come funziona

Spiega il percorso in massimo 3 passaggi.

Ad esempio come struttura, senza inventare contenuti tecnici non verificati:

```text
01 — Inserisci le informazioni richieste
02 — Completa i passaggi della valutazione
03 — Lascia i tuoi recapiti per essere ricontattato
```

Adatta il copy a ciò che il form attuale fa realmente.

---

## 07 — Social proof / fiducia

Se nel progetto sono disponibili recensioni reali o contenuti già approvati, possono essere utilizzati.

Non inventare:

- recensioni;
- nomi;
- numeri;
- percentuali;
- risultati;
- premi.

### Nota importante

La landing attuale contiene contatori/metriche, ma non hardcodare valori se non riesci a verificarli correttamente.

---

## 08 — CTA finale

Riporta l’utente alla valutazione.

La CTA finale deve essere coerente con quella principale.

---

## 09 — Footer

Footer essenziale con:

- dati societari reali;
- Privacy Policy;
- Cookie Policy;
- eventuali riferimenti legali necessari.

---

# 13. Motion system della landing

Il motion deve essere un vero **sistema**, non una raccolta di animazioni diverse.

## Principio

Ogni elemento dovrebbe entrare, cambiare stato o uscire attraverso una logica derivata da:

- rettangoli;
- quadrati;
- maschere;
- spostamenti lineari;
- espansioni;
- contrazioni;
- wipe.

---

## Animazioni suggerite

### Reveal titoli

Evita il semplice `opacity: 0 → 1`.

Preferisci:

- rettangolo che attraversa o scopre il titolo;
- clip/mask rettangolare;
- blocco colorato che si espande e rivela il testo;
- movimento lineare molto breve.

---

### Form fields

Alla comparsa del form:

- entrata ordinata;
- piccolo stagger;
- spostamento verticale/orizzontale controllato;
- nessun rimbalzo.

Al focus:

- cambio di bordo/background;
- piccola trasformazione geometrica;
- feedback immediato.

---

### CTA

Hover/focus:

- riempimento rettangolare;
- inversione tra antracite / avorio / bianco;
- movimento minimo;
- niente glow.

---

### Progress indicator

Ogni step completato può:

- riempire un segmento rettangolare;
- spostare un blocco;
- cambiare colore;
- espandere una forma.

Il movimento deve rendere evidente che il percorso sta avanzando.

---

### Cambio step

Quando in futuro verrà implementato il quiz:

1. il contenuto corrente esce con una traslazione breve;
2. uno o più rettangoli attraversano il contenitore;
3. il nuovo contenuto entra;
4. il progress indicator si aggiorna nello stesso ritmo.

Durata percepita breve: non rallentare mai l’utente.

---

### Transizioni tra sezioni

Puoi utilizzare grandi blocchi rettangolari che:

- scorrono dai bordi;
- cambiano superficie;
- creano una transizione tra antracite e fondo chiaro.

Non utilizzare un effetto diverso per ogni sezione.

---

# 14. Mobile first — PRIORITÀ ASSOLUTA

La maggior parte del traffico arriverà da Meta/Google.

Progetta prima la versione smartphone.

## Requisiti

- form immediatamente accessibile;
- CTA facilmente cliccabili con il pollice;
- campi almeno sufficientemente alti per touch;
- niente colonne troppo strette;
- nessun horizontal scroll;
- nessun elemento tagliato;
- font leggibili;
- nessuna altezza fissa che rompa il layout;
- nessun `100vh` rigido se rischia di tagliare contenuti con browser chrome/tastiera;
- niente video pesanti above the fold;
- niente motion che blocchi la compilazione;
- niente layout desktop semplicemente “rimpicciolito”.

### Form su mobile

Preferisci:

- una colonna;
- label sopra i campi;
- input type corretti;
- autocomplete;
- spacing coerente;
- CTA full-width o comunque molto evidente;
- errori vicino al campo;
- scroll automatico prudente verso errori/step solo quando necessario.

---

# 15. Desktop

Desktop può essere più editoriale, ma senza perdere la priorità del form.

Possibile logica:

```text
| contenuto / messaggio | form / valutazione |
```

oppure:

```text
hero compatta
↓
form centrale dominante
```

Scegli in base alla struttura del progetto e alla leggibilità.

Mantieni comunque una composizione geometrica Effegi.

---

# 16. Tracking ADV

La landing deve essere progettata fin dall’inizio per poter misurare il funnel.

Predisponi hook/eventi per distinguere:

```text
landing_view
valuation_start
valuation_step_1_complete
valuation_step_2_complete
valuation_step_3_complete
valuation_form_complete
lead_submit
valuation_abandon
```

### Prima di aggiungere nuovi eventi

Controlla se il form esistente emette già:

- callback;
- custom events;
- submit events;
- dataLayer events;
- eventi del plugin;
- eventi CRM.

Riutilizza ciò che esiste quando possibile.

---

## Data layer

Se appropriato, predisponi una struttura del tipo:

```js
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: "valuation_step_complete",
  step: 1
});
```

### MAI inserire PII nel tracking

Non inviare a GA4 / GTM / Meta Pixel tramite dataLayer:

- nome;
- cognome;
- email;
- telefono;
- indirizzo completo;
- contenuto libero dei campi;
- altri dati identificativi.

---

# 17. Abbandono

Predisponi la possibilità di distinguere:

- landing visitata;
- percorso non iniziato;
- percorso iniziato;
- step 1 completato;
- step 2 completato;
- step 3 completato;
- lead inviato;
- percorso interrotto.

Non generare falsi `abandon` ad ogni cambio pagina o reload senza una logica affidabile.

Documenta l’approccio utilizzato.

---

# 18. Performance

Trattandosi di landing ADV, performance e conversione hanno priorità sulla spettacolarità.

## Regole

- niente librerie pesanti se non necessarie;
- riutilizza le librerie già presenti nel progetto;
- immagini ottimizzate;
- formati moderni;
- dimensioni esplicite per evitare CLS;
- lazy load sotto la fold;
- above-the-fold leggero;
- niente autoplay video decorativi;
- evita dipendenze per animazioni semplici realizzabili con CSS;
- motion fluido e poco costoso;
- niente reflow continuo durante lo scroll.

---

# 19. Accessibilità

Garantisci:

- HTML semantico;
- un solo H1;
- label reali;
- associazione label/input;
- errori comprensibili;
- focus-visible;
- contrasto sufficiente;
- navigazione da tastiera;
- CTA e controlli con hit area corretta;
- progress indicator accessibile;
- aria-live quando necessario;
- rispetto di `prefers-reduced-motion`;
- nessuna informazione affidata solo al colore.

---

# 20. SEO

Pur essendo una landing ADV:

- usa HTML semantico;
- un solo H1;
- heading ordinati;
- title coerente;
- meta description;
- canonical configurabile;
- contenuti importanti nel DOM;
- alt text per immagini;
- niente testi SEO nascosti;
- niente contenuti importanti visibili solo dopo animazioni JS.

---

# 21. Architettura frontend

Prima di creare file:

1. analizza stack e repository;
2. individua routing;
3. individua componenti riutilizzabili;
4. individua header/footer;
5. individua asset;
6. individua font;
7. individua eventuale form Effegi;
8. individua script e integrazioni;
9. individua sistema di tracking;
10. individua eventuali utility per motion.

Non introdurre una seconda architettura parallela se non serve.

---

## Separazione form / pagina

Organizza la landing in modo che il form sia incapsulato in un componente dedicato, concettualmente simile a:

```text
ValuationLanding
 ├─ ValuationHero
 ├─ CurrentEffegiForm
 ├─ TrustSection
 ├─ ProcessSection
 ├─ FinalCTA
 └─ Footer
```

In futuro deve essere possibile sostituire:

```text
CurrentEffegiForm
```

con:

```text
InteractiveValuationQuiz
```

senza riscrivere tutta la landing.

---

# 22. FASE 2 — architettura già predisposta per il quiz

NON implementare ancora il quiz, ma struttura il codice pensando a un futuro percorso che dovrà:

- mostrare una domanda alla volta;
- utilizzare le stesse domande del form attuale;
- permettere avanti/indietro;
- conservare lo stato;
- salvare progressivamente;
- gestire un identificativo del lead/sessione;
- aggiornare il lead già creato;
- prevenire doppie submission;
- gestire errori e retry;
- funzionare bene su rete mobile;
- aggiornare la progress bar;
- inviare eventi tracking per ogni step;
- essere accessibile.

---

# 23. Contenuti — NON INVENTARE

Puoi utilizzare contenuti provenienti da:

1. landing Effegi attuale;
2. documento allegato, esclusivamente dalle pagine consentite;
3. contenuti già presenti nel repository.

Non inventare:

- statistiche;
- percentuali;
- risultati;
- recensioni;
- testimonianze;
- anni di esperienza;
- servizi;
- sedi;
- claim;
- domande del form;
- condizioni commerciali.

Se un dato è dubbio, non usarlo.

---

# 24. Immagini

Utilizza immagini immobiliari coerenti con la VI e gli asset già disponibili nel progetto, se presenti.

Direzione:

- architettura contemporanea;
- interni curati;
- immagini pulite;
- tagli geometrici;
- fotografia premium ma credibile.

Non inserire immagini casuali prese dalla reference Engel & Völkers.

Se mancano asset definitivi, utilizza placeholder chiaramente sostituibili senza bloccare lo sviluppo.

---

# 25. Conversion design

Mantieni sempre una sola gerarchia primaria.

L’utente deve capire in pochi secondi:

1. cosa può ottenere;
2. come iniziare;
3. quanti passaggi ci sono;
4. cosa deve fare adesso.

Evita:

- due CTA con stesso peso ma azioni diverse;
- menu troppo esteso;
- testi lunghi prima del form;
- modali non necessari;
- caroselli invasivi;
- sezioni decorative;
- elementi che distraggono dalla valutazione.

---

# 26. Indicazioni specifiche derivate dal video

Il video allegato deve essere tradotto in un piccolo **motion design system**.

### Scene chiare
Fondo chiaro/off-white con:

- antracite;
- avorio;
- grigio;
- logo scuro.

### Scene scure
Fondo antracite con:

- blocchi chiari;
- avorio;
- bianco;
- testi bianchi.

### Ritmo
Usa:

- sequenze brevi;
- stagger controllato;
- movimenti lineari;
- entrate da lati differenti;
- passaggi per blocchi.

### Testi
Nel video alcuni testi sono enfatizzati attraverso rettangoli pieni dietro alle singole righe.

Puoi trasferire questa idea a:

- headline;
- label di step;
- microcopy;
- stati di avanzamento;
- CTA;

ma con moderazione.

### Logo
Il logo viene trattato come elemento geometrico vero e proprio.

Nella landing mantienilo:

- pulito;
- leggibile;
- non deformato;
- senza effetti decorativi;
- coerente con la sua forma quadrata.

---

# 27. NON FARE

- Non copiare Engel & Völkers graficamente.
- Non sviluppare ancora il quiz definitivo.
- Non alterare le domande del form.
- Non modificare la raccolta progressiva senza averla analizzata.
- Non inventare API.
- Non inventare endpoint.
- Non inventare tracking ID.
- Non usare PII negli eventi.
- Non inventare copy commerciale.
- Non usare pagine PDF escluse.
- Non usare rounded UI generica.
- Non usare blob o forme organiche.
- Non usare gradienti decorativi vistosi.
- Non usare glassmorphism.
- Non usare glow.
- Non usare animazioni elastiche.
- Non rallentare l’utente con transizioni lunghe.
- Non nascondere contenuti importanti per SEO.
- Non creare regressioni nel resto del sito.
- Non modificare componenti globali senza necessità.

---

# 28. Ordine di esecuzione richiesto

## Step A — Analisi
Analizza:

- repository;
- allegati;
- landing attuale;
- reference Engel & Völkers;
- form;
- integrazione tecnica;
- tracking esistente.

## Step B — UI foundation
Imposta:

- palette;
- font;
- spacing;
- grid;
- componenti;
- responsive rules;
- motion tokens.

## Step C — Landing Fase 1
Implementa:

- header;
- hero;
- form attuale;
- progress UI compatibile;
- trust content;
- eventuale sezione processo;
- CTA finale;
- footer.

## Step D — Motion
Applica il motion system derivato dal video.

## Step E — Tracking
Predisponi gli hook necessari senza PII.

## Step F — QA
Testa tutto.

Non fermarti alla sola analisi: procedi con l’implementazione.

---

# 29. QA obbligatorio

Verifica almeno:

### Mobile
- 320px
- 360px
- 375px
- 390px
- 430px

### Tablet
- portrait
- landscape

### Desktop
- 1280px
- 1440px
- viewport più larghe

Controlla:

- nessun overflow;
- nessun testo tagliato;
- campi usabili;
- tastiera mobile;
- focus states;
- errori;
- progressione;
- CTA;
- contrasto;
- animazioni;
- `prefers-reduced-motion`;
- performance;
- console;
- tracking;
- form;
- submit;
- salvataggio step-by-step.

---

# 30. Criteri di accettazione

La Fase 1 è completa solo se:

- [ ] la nuova landing è stata realmente sviluppata;
- [ ] la pagina è chiaramente dedicata alla valutazione immobiliare;
- [ ] il form è prioritario above the fold;
- [ ] viene mantenuto il form Effegi attuale;
- [ ] le domande esistenti non vengono inventate o modificate;
- [ ] la raccolta progressiva esistente non viene compromessa;
- [ ] la landing è mobile first;
- [ ] il visual utilizza la VI Effegi;
- [ ] vengono utilizzati i colori indicati;
- [ ] vengono utilizzati quadrati/rettangoli come linguaggio grafico;
- [ ] le forme curve sono ridotte al minimo;
- [ ] il motion è coerente con il video allegato;
- [ ] le transizioni sono geometriche, rapide e funzionali;
- [ ] la reference Engel & Völkers viene usata per UX/struttura e non copiata;
- [ ] le pagine 5, 6, 7, 27, 31, 32, 33 del PDF sono state ignorate;
- [ ] il tracking funnel è predisposto;
- [ ] nessuna PII entra nel tracking;
- [ ] il codice è predisposto per il quiz futuro;
- [ ] la pagina è accessibile;
- [ ] la pagina è responsive;
- [ ] non ci sono errori console;
- [ ] non ci sono regressioni nel progetto.

---

# 31. Consegna finale

Al termine del lavoro dammi un report sintetico con:

1. file creati;
2. file modificati;
3. route/URL della landing;
4. struttura realizzata;
5. come è stato integrato il form attuale;
6. come viene mantenuta la raccolta progressiva;
7. animazioni implementate;
8. eventi di tracking predisposti;
9. eventuali elementi che non è stato possibile collegare per mancanza di accesso tecnico;
10. attività da completare nella futura **Fase 2 — Interactive Valuation Quiz**.

Non dichiarare come completato ciò che è stato solo simulato o predisposto.
