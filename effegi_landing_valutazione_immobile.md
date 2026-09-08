# EFFEGI — Landing “Valuta il tuo immobile”

## Obiettivo

Realizza una nuova landing page dedicata alla **valutazione degli immobili** per Effegi Gruppo Immobiliare.

La pagina sarà utilizzata come landing di atterraggio per campagne **Meta Ads e Google Ads**, con obiettivo principale di **lead generation**.

Il percorso ideale finale sarà:

**ADV → Landing → Quiz → Raccolta progressiva dati → Lead → Contatto commerciale**

La landing deve essere:

- graficamente coerente con la Visual Identity Effegi;
- pensata prima di tutto per mobile;
- semplice, veloce e intuitiva;
- orientata alla conversione;
- predisposta per il tracking ADV;
- progettata per evolvere successivamente in un vero quiz interattivo;
- leggera e performante;
- accessibile e responsive.

---

# 1. Reference principali

## Reference creativa, strutturale e UX

Usa come riferimento principale:

https://www.engelvoelkers.com/it/it/vendita/valuta-il-tuo-immobile

Prendi ispirazione il più possibile da questa reference per:

- struttura della landing;
- gerarchia dell’esperienza;
- centralità della valutazione;
- modalità di presentazione del percorso;
- progressione percepita;
- UX/UI;
- modalità di compilazione;
- gestione degli step;
- chiarezza delle CTA;
- esperienza mobile;
- sensazione di percorso guidato.

**Non copiare il visual Engel & Völkers.**  
La logica e l’esperienza possono essere prese come riferimento, ma tutto deve essere reinterpretato attraverso il brand Effegi.

---

## Landing Effegi attuale

Landing attualmente online:

https://immobilieffegi.it/valuta-il-tuo-immobile/

Questa pagina è il riferimento principale per:

- form;
- campi;
- domande;
- logica di raccolta dati;
- comportamento tecnico;
- contenuti già approvati relativi alla valutazione immobiliare.

**Non inventare nuovi campi, domande, statistiche, claim o informazioni commerciali.**

---

# 2. IMPORTANTE — FASE 1 DA REALIZZARE ORA

## Per ora NON sviluppare il nuovo quiz interattivo

La UX finale dovrà diventare un quiz con **una domanda alla volta**, ma **in questa prima fase devi utilizzare il form attuale già presente nella landing Effegi esistente**.

Quindi:

> **NON ricostruire ancora il form da zero.**  
> **NON modificare le sue domande.**  
> **NON modificare la sua logica di invio.**  
> **NON sostituirlo con un mockup non funzionante.**

Riutilizza il form attuale e integralo nel nuovo layout.

Se nel progetto esiste già il codice, shortcode, script, embed, endpoint o componente utilizzato dal form attuale, riutilizzalo.

Se la sua integrazione non è disponibile nel repository, **non inventare endpoint o logiche backend**: prepara correttamente il contenitore e l’architettura frontend, mantenendo evidente il punto in cui collegare il form reale.

La nuova UI deve già essere pensata per permettere, in una fase successiva, di sostituire il form attuale con il nuovo quiz senza dover ricostruire tutta la landing.

---

# 3. Requisito tecnico futuro fondamentale — raccolta progressiva lead

Il form attuale è organizzato in **3 step** e i dati vengono raccolti/inviati progressivamente.

La logica da preservare anche nel futuro quiz è:

```text
STEP 1
compilazione
↓
salvataggio/invio dati

STEP 2
compilazione
↓
salvataggio/invio dati

STEP 3
compilazione + dati di contatto
↓
salvataggio/invio dati + lead completo
```

L’utente non deve perdere i dati già inseriti se abbandona il percorso prima della fine.

Quando verrà sviluppato il nuovo quiz sarà quindi necessario:

- salvare i dati ad ogni step completato;
- non attendere esclusivamente il submit finale;
- ricondurre, quando tecnicamente possibile, gli step successivi allo stesso lead;
- utilizzare un identificativo univoco del lead/sessione quando necessario;
- preservare i dati parziali in caso di abbandono;
- verificare attentamente il comportamento backend/API prima di sostituire il form attuale.

### In questa fase

Non modificare questa logica tecnica se il form attuale la gestisce già.

L’obiettivo ora è **preservare il funzionamento esistente** e costruire intorno ad esso la nuova esperienza visiva.

---

# 4. Struttura della landing

La pagina deve essere molto focalizzata sulla conversione e non deve sembrare una pagina corporate generica.

## Header

Mantieni l’header essenziale.

Priorità:

- logo Effegi ben visibile;
- eventuali elementi strettamente necessari;
- nessuna navigazione invasiva che distragga dall’obiettivo;
- CTA coerente con la valutazione, se realmente necessaria;
- comportamento responsive impeccabile.

Su mobile deve occupare poco spazio verticale.

---

## Hero / ingresso nel percorso

La valutazione deve essere **immediatamente protagonista above the fold**.

La hero deve comunicare rapidamente:

- possibilità di conoscere il valore del proprio immobile;
- semplicità del percorso;
- gratuità/non vincolo solo se già confermati dai contenuti Effegi esistenti;
- CTA immediata verso l’inizio della valutazione.

Come base testuale puoi riutilizzare il concetto già presente nella landing attuale:

**“Scopri il valore del tuo immobile”**

Evita hero eccessivamente editoriali o con troppo testo.

Il form o l’accesso al form deve essere percepito come elemento principale, non secondario.

---

## Area valutazione / form

Questa è la parte centrale dell’esperienza.

### Fase attuale

Integra il **form Effegi esistente** in modo molto più curato rispetto alla landing attuale.

Deve sembrare parte integrante della nuova UI e non un elemento esterno appoggiato alla pagina.

Prevedi:

- contenitore chiaro e leggibile;
- gerarchia visiva forte;
- spazio sufficiente;
- label sempre leggibili;
- campi grandi e semplici da compilare da smartphone;
- CTA primaria molto evidente;
- messaggi di errore chiari;
- focus states accessibili;
- stato loading;
- stato success/error;
- nessun campo troppo piccolo su mobile;
- tastiere/input type corretti quando applicabile;
- autofill compatibile.

Non alterare i nomi, il significato o la logica dei campi esistenti.

---

## Progressione visiva

Anche mantenendo il form attuale, introduci una percezione chiara di avanzamento quando tecnicamente compatibile con la sua struttura.

Puoi utilizzare:

- indicatore 1 / 2 / 3;
- barra di avanzamento;
- rettangoli/quadrati progressivi;
- stato corrente evidenziato;
- microanimazioni tra uno step e l’altro.

La progressione deve essere immediatamente comprensibile e non decorativa.

---

## Contenuti di supporto

Dopo o attorno al percorso principale, utilizza solo sezioni che aiutino realmente la conversione.

Puoi recuperare e riorganizzare contenuti già presenti nella landing Effegi attuale, per esempio:

- perché scegliere Effegi;
- competenza e conoscenza del territorio;
- servizio offerto;
- elementi di fiducia;
- testimonianze reali già disponibili;
- vantaggi della valutazione;
- CTA di richiamo alla valutazione.

Mantieni la pagina compatta.

Non trasformarla in una homepage completa.

Ogni sezione deve avere una funzione precisa:

**ridurre dubbi → aumentare fiducia → riportare l’utente alla valutazione.**

Non inventare numeri, recensioni, risultati, partner, premi o claim.

---

## Footer

Footer essenziale e coerente con Effegi.

Mantieni esclusivamente le informazioni realmente necessarie, compresi:

- dati aziendali;
- privacy;
- cookie;
- eventuali riferimenti obbligatori.

---

# 5. Visual Identity

Utilizza questi colori come palette di riferimento.

## Primary

```css
--effegi-anthracite: #2B3131;
--effegi-white: #FFFFFF;
--effegi-ivory: #BFBBA2;
```

## Secondary

```css
--effegi-dark-gray: #6B6362;
--effegi-light-gray: #AAA39D;
--effegi-green: #1E4B46;
```

Non introdurre colori estranei alla palette se non strettamente necessari per stati funzionali/accessibilità.

### Direzione visiva

Il design deve risultare:

- elegante;
- sobrio;
- contemporaneo;
- premium ma non freddo;
- affidabile;
- pulito;
- coerente con il settore immobiliare;
- fortemente riconoscibile come Effegi.

Usa il contrasto tra:

- antracite;
- bianco;
- avorio;

come struttura principale dell’interfaccia.

I colori secondari devono lavorare soprattutto come:

- variazioni di superficie;
- stati;
- dettagli;
- elementi grafici;
- micro-interazioni.

Il verde deve essere utilizzato con intenzione e non come colore dominante indiscriminato.

---

# 6. Documento di progetto allegato

Usa il documento di progetto allegato come riferimento per la Visual Identity e per gli elementi realmente utili alla landing.

## NON considerare in alcun modo le pagine:

- 5
- 6
- 7
- 27
- 31
- 32
- 33

Non prendere da queste pagine:

- layout;
- indicazioni visuali;
- immagini;
- componenti;
- pattern;
- esempi;
- regole;
- animazioni.

Per il resto del documento, recupera solo elementi coerenti e realmente applicabili al digitale.

---

# 7. Animazioni e micro-interazioni

Le animazioni devono nascere dal linguaggio visivo Effegi.

Nella Visual Identity sono presenti **rettangoli e quadrati** costruiti attraverso i colori della palette: trasformali in elementi dinamici dell’interfaccia.

Possibili utilizzi:

- transizione tra step;
- entrata/uscita dei contenuti;
- feedback dopo la selezione;
- progress bar;
- indicatori di avanzamento;
- cambio di stato;
- micro-interazioni su CTA;
- elementi grafici di accompagnamento.

Usa come ulteriore riferimento l’**esempio di animazione Effegi allegato**.

## Regole

Le animazioni devono essere:

- semplici;
- veloci;
- fluide;
- coerenti;
- funzionali alla comprensione del percorso;
- leggere a livello di performance.

Evita:

- animazioni puramente decorative;
- effetti troppo complessi;
- parallax pesante;
- dipendenze inutili;
- tempi di attesa artificiali;
- elementi che rallentano la compilazione;
- animazioni che spostano continuamente il layout;
- contenuti importanti nascosti fino allo scroll.

Rispetta `prefers-reduced-motion`.

---

# 8. Mobile first — priorità assoluta

Progetta inizialmente per smartphone e poi scala verso tablet e desktop.

La maggior parte del traffico arriverà da Meta/Google Ads.

## Mobile UX

Assicurati che:

- il contenuto principale sia immediatamente visibile;
- la CTA primaria sia evidente;
- il form sia semplice da usare con una mano;
- i touch target siano sufficientemente grandi;
- non ci siano testi troppo piccoli;
- non ci siano campi affiancati quando compromettono la leggibilità;
- non ci sia overflow orizzontale;
- non ci siano elementi tagliati;
- non vengano usate altezze rigide che rompono il layout;
- la tastiera mobile non renda inutilizzabile il form;
- il passaggio tra gli step sia rapido;
- il caricamento sia leggero.

Evita di sacrificare la UX mobile per ottenere un desktop più scenografico.

---

# 9. Conversion design

La landing deve ridurre il più possibile l’attrito.

Principi:

- una sola azione primaria per volta;
- CTA descrittive;
- progressione evidente;
- ridurre il numero di decisioni simultanee;
- mantenere sempre chiaro cosa succederà dopo;
- evitare navigazione dispersiva;
- non sovraccaricare l’utente di testo prima del form;
- utilizzare contenuti di fiducia solo nei punti in cui servono;
- riportare l’utente verso la valutazione dopo le sezioni informative.

Il design deve far percepire il percorso come **breve e completabile**.

---

# 10. Tracking ADV

Predisponi la landing fin dall’inizio per il tracking del funnel.

Non inserire ID Analytics, Pixel o container inventati.

Crea invece una struttura chiara e facilmente collegabile a GTM / GA4 / Meta Pixel.

Gli eventi da prevedere sono:

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

Se il form attuale genera già eventi o callback, analizzali e riutilizzali quando possibile.

## Data Layer

Quando appropriato, predisponi eventi tramite `dataLayer.push()` in modo pulito e documentato.

Esempio concettuale:

```js
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: "valuation_step_complete",
  step: 1
});
```

Non inviare nel dataLayer:

- nome;
- cognome;
- email;
- telefono;
- indirizzo completo;
- altri dati personali identificativi.

Il tracking deve misurare il funnel senza esporre PII.

---

# 11. Abbandono del percorso

Predisponi tecnicamente la possibilità di misurare l’abbandono del quiz/form.

Non generare falsi eventi di abbandono.

La logica dovrà distinguere, per quanto possibile, tra:

- utente che apre la landing e non inizia;
- utente che inizia;
- ultimo step completato;
- form completato;
- lead inviato;
- percorso interrotto prima del completamento.

Questa parte deve essere implementata in modo compatibile con il form attuale e con il futuro quiz.

---

# 12. Architettura frontend

Prima di scrivere codice:

1. analizza il repository;
2. identifica stack, componenti, CSS, convenzioni e routing già utilizzati;
3. identifica eventuali asset Effegi già disponibili;
4. identifica eventuale form già presente;
5. identifica eventuale script/integrazione della landing attuale;
6. riutilizza ciò che esiste quando ha senso;
7. evita duplicazioni;
8. non modificare pagine o componenti non necessari.

Organizza la landing in componenti riutilizzabili.

La struttura dovrebbe permettere in futuro di sostituire:

```text
CurrentEffegiForm
```

con:

```text
InteractiveValuationQuiz
```

senza dover ricostruire hero, layout, tracking e sezioni di supporto.

---

# 13. Form futuro — preparazione architetturale

Anche se **NON va ancora sviluppato**, prepara l’interfaccia pensando al futuro quiz.

Il quiz finale dovrà:

- mostrare una domanda alla volta;
- mantenere le stesse informazioni richieste dal form Effegi attuale;
- permettere avanti/indietro;
- conservare le risposte;
- mostrare il progresso;
- effettuare salvataggi progressivi;
- mantenere un `lead_id` / `session_id` quando necessario;
- recuperare correttamente lo stato del percorso;
- funzionare bene anche con connessioni mobili non perfette;
- evitare doppie submission;
- gestire loading/error/retry;
- essere navigabile da tastiera;
- essere utilizzabile con screen reader.

Per ora crea solo un’architettura che non renda difficile questa evoluzione.

---

# 14. Performance

La landing deve essere veloce perché sarà utilizzata per campagne ADV.

Priorità:

- immagini responsive;
- formati moderni;
- lazy loading solo sotto la fold;
- evitare video pesanti se non necessari;
- evitare grandi librerie solo per piccole animazioni;
- evitare JavaScript non necessario;
- ridurre layout shift;
- dimensionare correttamente immagini e media;
- caricamento prioritario degli elementi above-the-fold;
- evitare animazioni che causano reflow continui.

Non sacrificare Core Web Vitals per effetti visivi.

---

# 15. Accessibilità

Garantisci almeno:

- HTML semantico;
- label reali per i campi;
- stati `focus-visible`;
- contrasto sufficiente;
- CTA accessibili da tastiera;
- errori associati ai relativi campi;
- `aria-live` per eventuali messaggi dinamici del form;
- progress indicator comprensibile anche senza animazione;
- rispetto di `prefers-reduced-motion`;
- nessuna informazione comunicata esclusivamente attraverso il colore.

---

# 16. Responsive

Verifica almeno:

- mobile piccolo;
- mobile standard;
- mobile grande;
- tablet portrait;
- tablet landscape;
- laptop;
- desktop;
- viewport molto larghe.

Il layout deve adattarsi fluidamente.

Evita breakpoint costruiti solo per “aggiustare” singoli screenshot.

---

# 17. Contenuti

Regole fondamentali:

- usa i contenuti già approvati Effegi quando disponibili;
- usa la landing attuale come fonte;
- non inventare dati;
- non inventare statistiche;
- non inventare testimonianze;
- non inventare vantaggi commerciali;
- non inventare domande del form;
- non inventare sedi o informazioni societarie;
- non copiare testi proprietari della reference Engel & Völkers.

La reference Engel & Völkers serve per **UX e struttura**, non per il copy.

---

# 18. SEO

Pur essendo una landing ADV, mantieni una base SEO corretta:

- un solo `h1`;
- heading gerarchici;
- title e meta description coerenti;
- contenuti testuali presenti nel DOM;
- form e CTA con markup accessibile;
- immagini con `alt`;
- canonical configurabile;
- nessun contenuto importante dipendente esclusivamente dalle animazioni.

---

# 19. Stati UI da progettare

Prevedi almeno questi stati:

### Form
- default;
- focus;
- compilato;
- errore;
- disabled;
- loading;
- success.

### CTA
- default;
- hover;
- focus;
- active;
- disabled;
- loading.

### Step
- non iniziato;
- corrente;
- completato;
- errore.

---

# 20. Cosa NON fare

Non:

- creare una copia grafica di Engel & Völkers;
- utilizzare colori fuori dalla palette senza motivo;
- inventare contenuti;
- inventare dati o statistiche;
- riscrivere da zero il form in questa fase;
- cambiare le domande del form attuale;
- cambiare la logica di raccolta progressiva;
- creare endpoint fittizi;
- inserire tracking ID fittizi;
- introdurre animazioni pesanti;
- fare una landing desktop-first;
- usare testi microscopici;
- nascondere contenuti importanti tramite animazioni;
- modificare componenti globali inutilmente;
- rompere il resto del sito.

---

# 21. Criteri di accettazione — Fase 1

Il lavoro è completato solo se:

- [ ] esiste una nuova landing dedicata alla valutazione;
- [ ] il visual è coerente con Effegi;
- [ ] vengono utilizzati i colori indicati;
- [ ] la reference Engel & Völkers è stata utilizzata come riferimento UX, non copiata;
- [ ] il form Effegi attuale è mantenuto;
- [ ] le domande del form non sono state alterate;
- [ ] la logica tecnica esistente non è stata sostituita con una simulazione;
- [ ] la landing è mobile first;
- [ ] il form è facile da utilizzare da smartphone;
- [ ] la pagina è responsive;
- [ ] la progressione è visivamente comprensibile;
- [ ] le animazioni derivano dal linguaggio geometrico Effegi;
- [ ] gli effetti non rallentano la compilazione;
- [ ] il tracking funnel è predisposto senza PII;
- [ ] non sono stati inseriti ID Analytics/Pixel inventati;
- [ ] non sono stati inventati contenuti;
- [ ] accessibilità e focus states sono gestiti;
- [ ] non ci sono overflow o contenuti tagliati;
- [ ] le pagine 5, 6, 7, 27, 31, 32 e 33 del documento di progetto sono state ignorate;
- [ ] il codice è predisposto per sostituire in futuro il form con un quiz interattivo;
- [ ] non sono state introdotte regressioni nelle altre pagine del progetto.

---

# 22. Prima di consegnare

Effettua un controllo finale completo di:

1. responsive;
2. mobile UX;
3. contrasto;
4. focus states;
5. validazione form;
6. error handling;
7. performance;
8. console errors;
9. overflow;
10. tracking hooks;
11. assenza di PII negli eventi;
12. preservazione del form Effegi esistente;
13. coerenza cromatica;
14. coerenza delle animazioni;
15. assenza di modifiche non richieste.

Al termine, indicami sinteticamente:

- file creati/modificati;
- struttura implementata;
- come hai integrato il form attuale;
- quali eventi tracking hai predisposto;
- eventuali limiti tecnici riscontrati;
- cosa rimane da fare nella **Fase 2 — quiz interattivo**.
