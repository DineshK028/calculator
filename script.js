/* Age Calculator Pro - script.js
   Features:
   - Age calculation years/months/days
   - Live timer
   - Total time lived
   - Age difference (2 DOBs)
   - Save DOB in localStorage
   - Shareable URL params
   - Download PDF (jsPDF)
   - Dark/Light theme
   - Confetti on birthday
   - Multilanguage support (basic)
*/

(() => {
  // Elements
  const dob1 = document.getElementById('dob1');
  const dob2 = document.getElementById('dob2');
  const mainForm = document.getElementById('mainForm');
  const result = document.getElementById('result');
  const ageText = document.getElementById('ageText');
  const bornText = document.getElementById('bornText');
  const nextBdayText = document.getElementById('nextBdayText');
  const daysLeftText = document.getElementById('daysLeftText');
  const liveTimer = document.getElementById('liveTimer');
  const totalTime = document.getElementById('totalTime');
  const diffText = document.getElementById('diffText');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const saveBtn = document.getElementById('saveBtn');
  const shareBtn = document.getElementById('shareBtn');
  const pdfBtn = document.getElementById('pdfBtn');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const birthdayBadge = document.getElementById('birthdayBadge');
  const savedNote = document.getElementById('savedNote');

  const langSelect = document.getElementById('langSelect');
  const themeToggle = document.getElementById('themeToggle');

  // Translations (expand as needed)
  const translations = {
    en: {
      labelDob1: "Your Date of Birth",
      labelDob2: "Compare with (optional)",
      btnCalculate: "Calculate Age",
      btnReset: "Reset",
      btnShare: "Get Share Link",
      btnSave: "Save DOB",
      btnPDF: "Download PDF",
      resultTitle: "Results",
      ageLabel: "Age",
      bornOnLabel: "Born on",
      nextBdayLabel: "Next Birthday",
      daysLeftLabel: "Days left",
      liveTimerLabel: "Live Timer (you've been alive)",
      totalTimeLabel: "Total Time Lived",
      progressLabel: "Birthday Progress",
      diffLabel: "Age Difference",
      btnCopy: "Copy Result",
      btnConfetti: "Celebrate (Confetti)"
    },
    hi: {
      labelDob1: "आपकी जन्मतिथि",
      labelDob2: "तुलना के लिए (वैकल्पिक)",
      btnCalculate: "आयु ज्ञात करें",
      btnReset: "रीसेट",
      btnShare: "शेयर लिंक",
      btnSave: "DOB सेव करें",
      btnPDF: "PDF डाउनलोड",
      resultTitle: "परिणाम",
      ageLabel: "आयु",
      bornOnLabel: "जन्म",
      nextBdayLabel: "अगला जन्मदिन",
      daysLeftLabel: "दिन शेष",
      liveTimerLabel: "कितने समय से आप जीवित हैं",
      totalTimeLabel: "कुल समय",
      progressLabel: "जन्मदिन प्रगति",
      diffLabel: "आयु अंतर",
      btnCopy: "परिणाम कॉपी करें",
      btnConfetti: "जश्न (Confetti)"
    },
    kn: {
      labelDob1: "ನಿಮ್ಮ ಜನ್ಮತಾರೀಖ್",
      labelDob2: "ಹೋಲಿಸಲು (ಐಚ್ಛಿಕ)",
      btnCalculate: "ವಯಸ್ಸು ಲೆಕ್ಕಿಸಿ",
      btnReset: "ಮರುಸಂಜೆ",
      btnShare: "ಹಂಚಿಕೊಳ್ಳಲು ಕೊಂಡಿ",
      btnSave: "DOB ಉಳಿಸಿ",
      btnPDF: "PDF ಡೌನ್ಲೋಡ್",
      resultTitle: "ಫಲಿತಾಂಶ",
      ageLabel: "ವಯಸ್ಸು",
      bornOnLabel: "ಹುಟ್ಟಿದ್ದು",
      nextBdayLabel: "ಮುಂದಿನ ಜನ್ಮದಿನ",
      daysLeftLabel: "ಉಳಿದ ದಿನಗಳು",
      liveTimerLabel: "ನೀವು ಎಷ್ಟು ಸಮಯ ಜೀವಿಸುತ್ತಿದ್ದೀರಿ",
      totalTimeLabel: "ಒಟ್ಟು ಕಾಲ",
      progressLabel: "ಜನ್ಮದಿನ ಪ್ರಗತಿ",
      diffLabel: "ವಯಸ್ಸಿನ ವ್ಯತ್ಯಾಸ",
      btnCopy: "ಫಲಿತಾಂಶ ನಕಲಿ ಮಾಡಿ",
      btnConfetti: "ಹಬ್ಬ (Confetti)"
    },
    ta: {
      labelDob1: "உங்கள் பிறந்த தேதி",
      labelDob2: "ஒப்பிட (விரலாக)",
      btnCalculate: "வயதை கணக்கிடு",
      btnReset: "மீட்டமை",
      btnShare: "பகிர் 링크",
      btnSave: "DOB சேமி",
      btnPDF: "PDF பதிவிறக்கு",
      resultTitle: "முடிவுகள்",
      ageLabel: "வயது",
      bornOnLabel: "பிறந்த நாள்",
      nextBdayLabel: "அடுத்த பிறந்த நாள்",
      daysLeftLabel: "மீதம் நாட்கள்",
      liveTimerLabel: "நீங்கள் வாழ்ந்த காலம்",
      totalTimeLabel: "மொத்த காலம்",
      progressLabel: "பிறந்த நாள் முன்னேற்றம்",
      diffLabel: "வயது வேற்றுமை",
      btnCopy: "முடிவைப் பிரதி",
      btnConfetti: "க праздник"
    },
    te: {
      labelDob1: "మీ జన్మతారీఖు",
      labelDob2: "తొక్కాట (ఐచ్ఛికం)",
      btnCalculate: "వయస్సు లెక్కించు",
      btnReset: "రిసెట్",
      btnShare: "షేర్ లింక్",
      btnSave: "DOB సేవ్ చేయి",
      btnPDF: "PDF డౌన్లోడ్",
      resultTitle: "ఫలితాలు",
      ageLabel: "వయసు",
      bornOnLabel: "పుట్టిన రోజు",
      nextBdayLabel: "తదుపరి పుట్టిన రోజు",
      daysLeftLabel: "మిగిలిన రోజులు",
      liveTimerLabel: "మీరు జీవించి ఉన్న సమయం",
      totalTimeLabel: "మొత్తం సమయం",
      progressLabel: "పుట్టినరోజు పురోగతి",
      diffLabel: "వయసుల తేడా",
      btnCopy: "ఫలితాన్ని కాపీ చేయి",
      btnConfetti: "సెలబ్రేట్ (Confetti)"
    },
    ml: {
      labelDob1: "നിങ്ങളുടെ ജന്മതീയതി",
      labelDob2: "താവിധ്യം (ഐച്ഛികം)",
      btnCalculate: "പ്രായം കണക്കാക്കുക",
      btnReset: "പുനഃസജ്ജമാക്കുക",
      btnShare: "ഷെയർ ലിങ്ക്",
      btnSave: "DOB സേവ് ചെയ്യുക",
      btnPDF: "PDF ഡൗൺലോഡ്",
      resultTitle: "ഫലങ്ങൾ",
      ageLabel: "പ്രായം",
      bornOnLabel: "ജനിച്ചു",
      nextBdayLabel: "അടുത്ത ബർത്ത്ഡേ",
      daysLeftLabel: "നാൾ ശേഷിച്ചത്",
      liveTimerLabel: "താങ്കൾ ജീവിച്ചിട്ടുള്ള സമയം",
      totalTimeLabel: "മൊത്തം സമയം",
      progressLabel: "ബര്‍ത്ത്‌ഡേ പ്രോഗ്രസ്",
      diffLabel: "പ്രായ വ്യത്യാസം",
      btnCopy: "ഫലം കോപി ചെയ്യുക",
      btnConfetti: "ഉത്സവം (Confetti)"
    }
  };

  // Utilities
  function qs(selector) { return document.querySelector(selector); }
  function clamp(n){ return Math.max(0, Math.min(100, n)); }

  // Theme & Language initialization
  const savedTheme = localStorage.getItem('ac_theme') || 'dark';
  if (savedTheme === 'light') document.body.classList.add('light');
  themeToggle.textContent = (savedTheme === 'light') ? '☀️' : '🌙';
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('ac_theme', isLight ? 'light' : 'dark');
  });

  // Load language
  const savedLang = localStorage.getItem('ac_lang') || 'en';
  langSelect.value = savedLang;
  langSelect.addEventListener('change', () => {
    localStorage.setItem('ac_lang', langSelect.value);
    applyTranslations();
  });

  function applyTranslations() {
    const lang = langSelect.value || 'en';
    const map = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (map[key]) el.innerText = map[key];
    });
  }
  applyTranslations();

  // Populate from saved DOB if exists
  const savedDob = localStorage.getItem('ac_dob1');
  const savedDob2 = localStorage.getItem('ac_dob2');
  if (savedDob) { dob1.value = savedDob; savedNote.innerText = (translations[langSelect.value] || translations.en).btnSave + " ✓"; }
  if (savedDob2) dob2.value = savedDob2;

  // Parse URL params for share link
  function parseURLParams() {
    const params = new URLSearchParams(location.search);
    const d1 = params.get('dob');
    const d2 = params.get('dob2');
    if (d1) dob1.value = d1;
    if (d2) dob2.value = d2;
    if (d1 || d2) {
      // auto calculate if dob present
      setTimeout(() => doCalculate(), 250);
    }
  }
  parseURLParams();

  // Calculation functions
  function safeDateFromInput(val){
    if(!val) return null;
    const d = new Date(val + 'T00:00:00'); // avoid timezone issues
    return isNaN(d) ? null : d;
  }

  function calcAgeParts(dob, refDate = new Date()){
    const y1 = dob.getFullYear(), m1 = dob.getMonth(), day1 = dob.getDate();
    const y2 = refDate.getFullYear(), m2 = refDate.getMonth(), day2 = refDate.getDate();

    let years = y2 - y1;
    let months = m2 - m1;
    let days = day2 - day1;

    if (days < 0) {
      months--;
      // days in previous month of refDate
      const prevMonthDays = new Date(y2, m2, 0).getDate();
      days += prevMonthDays;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  function totalTimeLivedMs(dob, refDate = new Date()){
    return refDate.getTime() - dob.getTime();
  }

  function msToDetailed(ms){
    const seconds = Math.floor(ms/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);
    // months as approx: use years and months approx using calendar not ms; but for total months approximate as days/30.4375
    const months = Math.floor(days / 30.4375);
    return { seconds, minutes, hours, days, weeks, months };
  }

  // Live timer
  let liveInterval = null;
  function startLiveTimer(dob){
    stopLiveTimer();
    function tick(){
      const now = new Date();
      const diffMs = totalTimeLivedMs(dob, now);
      const parts = msToDetailed(diffMs);
      // Build live timer string: Y M D H:M:S
      const ageParts = calcAgeParts(dob, now);
      const remHours = parts.hours % 24;
      const remMinutes = parts.minutes % 60;
      const remSeconds = parts.seconds % 60;
      liveTimer.innerText = `${ageParts.years}y ${ageParts.months}m ${ageParts.days}d ${remHours}h ${remMinutes}m ${remSeconds}s`;
    }
    tick();
    liveInterval = setInterval(tick, 1000);
  }
  function stopLiveTimer(){ if (liveInterval) clearInterval(liveInterval); liveInterval = null; }

  // Birthday progress
  function updateProgress(dob){
    const now = new Date();
    let next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (next < now) next.setFullYear(now.getFullYear() + 1);

    const prev = new Date(next.getFullYear() - 1, dob.getMonth(), dob.getDate());
    const total = next.getTime() - prev.getTime();
    const passed = now.getTime() - prev.getTime();
    const percent = clamp( Math.round((passed/total)*100) );
    progressBar.style.width = percent + '%';
    progressPercent.innerText = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
  }

  // Age difference between dob1 & dob2
  function computeDifference(d1, d2){
    if(!d1 || !d2) return null;
    // which is older?
    let a = d1, b = d2, label = 'A';
    if (d2 < d1) { a = d2; b = d1; label = 'B'; } // a older, b younger
    const parts = calcAgeParts(a, b); // time from older to younger
    const olderLabel = (d1 < d2) ? 'You' : 'Other';
    return { parts, olderLabel, olderDate: a, youngerDate: b };
  }

  // Main calculation
  function doCalculate(){
    const v1 = dob1.value;
    if (!v1) {
      alert('Please enter your birth date.');
      return;
    }
    const d1 = safeDateFromInput(v1);
    const d2 = safeDateFromInput(dob2.value);

    if (!d1) { alert('Invalid date 1'); return; }
    if (dob2.value && !d2) { alert('Invalid date 2'); return; }

    // Age parts (as of today)
    const today = new Date();
    const age = calcAgeParts(d1, today);
    ageText.innerHTML = `${age.years} years, ${age.months} months, ${age.days} days`;

    // Born on weekday
    bornText.innerText = d1.toLocaleString(navigator.language, { weekday: 'long', year:'numeric', month:'long', day:'numeric' });

    // Next birthday
    let next = new Date(today.getFullYear(), d1.getMonth(), d1.getDate());
    if (next < today) next.setFullYear(today.getFullYear() + 1);
    nextBdayText.innerText = `${next.toLocaleString(navigator.language, { weekday:'long' })}, ${next.toDateString()}`;

    // Days left
    const diffMs = next.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffMs / (1000*60*60*24));
    daysLeftText.innerText = `${daysLeft} days`;

    // Total time lived
    const totalMs = totalTimeLivedMs(d1, today);
    const tot = msToDetailed(totalMs);
    totalTime.innerHTML = `${tot.days.toLocaleString()} days • ${tot.weeks.toLocaleString()} weeks • ${tot.months.toLocaleString()} months • ${tot.hours.toLocaleString()} hours • ${tot.minutes.toLocaleString()} minutes • ${tot.seconds.toLocaleString()} seconds`;

    // Live timer
    startLiveTimer(d1);

    // Update progress bar
    updateProgress(d1);

    // Age difference if dob2 given
    if (d2) {
      const diff = computeDifference(d1, d2);
      if (diff) {
        const { parts, olderLabel } = diff;
        diffText.innerText = `${parts.years} years, ${parts.months} months, ${parts.days} days (${(d1<d2)? 'You are younger' : (d1>d2)? 'You are older' : 'Same age'})`;
      } else diffText.innerText = '—';
    } else {
      diffText.innerText = '—';
    }

    // Birthday confetti if today is birthday
    const isBirthday = (today.getMonth() === d1.getMonth() && today.getDate() === d1.getDate());
    birthdayBadge.style.display = isBirthday ? 'inline-block' : 'none';
    if (isBirthday) runConfetti();

    // show result block
    result.classList.remove('hidden');
  }

  // Share link
  shareBtn.addEventListener('click', () => {
    const v1 = dob1.value, v2 = dob2.value;
    if (!v1) { alert('Enter DOB to share'); return; }
    const url = new URL(location.href);
    url.searchParams.set('dob', v1);
    if (v2) url.searchParams.set('dob2', v2);
    navigator.clipboard.writeText(url.toString()).then(() => {
      alert('Share link copied to clipboard');
    }).catch(()=> alert('Could not copy link'));
  });

  // Save DOB(s)
  saveBtn.addEventListener('click', () => {
    if (dob1.value) { localStorage.setItem('ac_dob1', dob1.value); savedNote.innerText = 'Saved ✓'; }
    if (dob2.value) localStorage.setItem('ac_dob2', dob2.value);
    setTimeout(()=> savedNote.innerText = '', 2500);
  });

  // PDF generation
  pdfBtn.addEventListener('click', async () => {
    if (!dob1.value) { alert('Enter DOB first'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Age Report - Age Calculator Pro', 14, 18);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`DOB: ${dob1.value}`, 14, 38);

    // insert result fields in doc
    const lines = [
      `Age: ${ageText.innerText}`,
      `Born on: ${bornText.innerText}`,
      `Next birthday: ${nextBdayText.innerText}`,
      `Days left: ${daysLeftText.innerText}`,
      `Live timer: ${liveTimer.innerText}`,
      `Total time lived: ${totalTime.innerText}`,
      `Age difference: ${diffText.innerText}`
    ];
    let y = 50;
    lines.forEach(line => { doc.text(line, 14, y); y += 8; });

    const filename = `age_report_${dob1.value}.pdf`;
    doc.save(filename);
  });

  // Copy result to clipboard
  copyBtn.addEventListener('click', () => {
    if (result.classList.contains('hidden')) return;
    const text = [
      `Age: ${ageText.innerText}`,
      `Born on: ${bornText.innerText}`,
      `Next birthday: ${nextBdayText.innerText}`,
      `Days left: ${daysLeftText.innerText}`,
      `Live timer: ${liveTimer.innerText}`,
      `Total time lived: ${totalTime.innerText}`,
      `Age difference: ${diffText.innerText}`
    ].join('\n');
    navigator.clipboard.writeText(text).then(()=> alert('Result copied to clipboard'));
  });

  // Confetti
  function runConfetti(){
    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 120, origin: { y: 0.6 } });
    } else {
      console.warn('confetti library not available');
    }
  }
  confettiBtn.addEventListener('click', runConfetti);

  // Reset
  resetBtn.addEventListener('click', ()=> {
    dob1.value = '';
    dob2.value = '';
    result.classList.add('hidden');
    stopLiveTimer();
    savedNote.innerText = '';
  });

  // form submit
  mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    doCalculate();
  });

  // Auto-calc when DOB inputs change (optional)
  dob1.addEventListener('change', () => {
    // autosave hint
    savedNote.innerText = '';
  });

  // initial translations
  applyTranslations();

  // Expose doCalculate for auto-run by URL parse
  window.doCalculate = doCalculate;
})();
