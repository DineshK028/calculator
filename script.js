// Simple Age Calculator - clean UI version
(() => {
  // Elements
  const tabs = document.querySelectorAll('.tab');
  const panelCalc = document.getElementById('panel-calc');
  const panelFind = document.getElementById('panel-find');

  const dobInput = document.getElementById('dobInput');
  const shareBtn = document.getElementById('shareBtn');
  const asOfRow = document.getElementById('asOfRow');
  const asOfInput = document.getElementById('asOfInput');
  const calcBtn = document.getElementById('calcBtn');
  const resetBtn = document.getElementById('resetBtn');

  const resultArea = document.getElementById('resultArea');
  const ageOutput = document.getElementById('ageOutput');
  const bornWeekday = document.getElementById('bornWeekday');
  const totalDaysEl = document.getElementById('totalDays');
  const totalWeeksEl = document.getElementById('totalWeeks');
  const totalMonthsEl = document.getElementById('totalMonths');
  const totalHoursEl = document.getElementById('totalHours');
  const nextBdayDate = document.getElementById('nextBdayDate');
  const daysToGoBtn = document.getElementById('daysToGoBtn');
  const turningBtn = document.getElementById('turningBtn');

  // Find DOB elements
  const yearsInput = document.getElementById('yearsInput');
  const monthsInput = document.getElementById('monthsInput');
  const daysInput = document.getElementById('daysInput');
  const findBtn = document.getElementById('findBtn');
  const findResetBtn = document.getElementById('findResetBtn');
  const findResult = document.getElementById('findResult');
  const dobFound = document.getElementById('dobFound');
  const dobFoundWeekday = document.getElementById('dobFoundWeekday');
  const dobFoundIso = document.getElementById('dobFoundIso');

  // Utility: parse date input as local mid-night to avoid timezone shift
  function parseDateInput(val) {
    if (!val) return null;
    const d = new Date(val + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.dataset.tab;
      if (key === 'today') {
        panelCalc.classList.remove('hidden');
        panelFind.classList.add('hidden');
        asOfRow.classList.add('hidden');
      } else if (key === 'specific') {
        panelCalc.classList.remove('hidden');
        panelFind.classList.add('hidden');
        asOfRow.classList.remove('hidden');
        // set default asOf to today if empty
        if (!asOfInput.value) {
          const todayISO = new Date().toISOString().slice(0,10);
          asOfInput.value = todayISO;
        }
      } else { // find
        panelCalc.classList.add('hidden');
        panelFind.classList.remove('hidden');
      }
      // hide results on tab change
      resultArea.classList.add('hidden');
      findResult.classList.add('hidden');
    });
  });

  // Calculation logic (years, months, days)
  function calcYMD(dob, ref) {
    // dob and ref are Date objects
    let years = ref.getFullYear() - dob.getFullYear();
    let months = ref.getMonth() - dob.getMonth();
    let days = ref.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      // days in previous month of ref
      const prevMonthDays = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
      days += prevMonthDays;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  }

  // compute totals (using ms diff)
  function totalsFromMs(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    // months approximate using 30.4375 days per month
    const months = Math.floor(days / 30.4375);
    return { seconds, minutes, hours, days, weeks, months };
  }

  // Next birthday and days until
  function nextBirthdayInfo(dob, ref) {
    let next = new Date(ref.getFullYear(), dob.getMonth(), dob.getDate());
    if (next < ref) next.setFullYear(ref.getFullYear() + 1);
    const diffMs = next.getTime() - new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
    // days difference (ceil)
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return { next, daysLeft };
  }

  // Calculate button handler
  calcBtn.addEventListener('click', () => {
    const dobVal = dobInput.value;
    if (!dobVal) {
      alert('Please enter Date of Birth.');
      return;
    }
    const dob = parseDateInput(dobVal);
    if (!dob) {
      alert('Invalid Date of Birth.');
      return;
    }

    // Reference date
    let ref;
    if (!asOfRow.classList.contains('hidden') && asOfInput.value) {
      ref = parseDateInput(asOfInput.value);
      if (!ref) {
        alert('Invalid "as of" date.');
        return;
      }
    } else {
      // today (use local date with time ignored)
      const t = new Date();
      ref = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    }

    if (ref < dob) {
      alert('"As of" date cannot be before Date of Birth.');
      return;
    }

    // Age parts
    const { years, months, days } = calcYMD(dob, ref);
    ageOutput.textContent = `${years} Years, ${months} Months, ${days} Days`;
    bornWeekday.textContent = `Born on a ${dob.toLocaleString(undefined, { weekday: 'long' })}`;

    // Totals
    const ms = ref.getTime() - dob.getTime();
    const t = totalsFromMs(ms);
    totalDaysEl.textContent = t.days.toLocaleString();
    totalWeeksEl.textContent = t.weeks.toLocaleString();
    totalMonthsEl.textContent = t.months.toLocaleString();
    totalHoursEl.textContent = t.hours.toLocaleString();

    // Next birthday
    const nb = nextBirthdayInfo(dob, ref);
    nextBdayDate.textContent = nb.next.toLocaleDateString(undefined, { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    daysToGoBtn.textContent = `${nb.daysLeft} days to go`;
    turningBtn.textContent = `Turning ${years + 1}`;

    // show result area
    resultArea.classList.remove('hidden');
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    dobInput.value = '';
    asOfInput.value = '';
    resultArea.classList.add('hidden');
    // clear numbers
    ageOutput.textContent = '—';
    bornWeekday.textContent = '—';
    totalDaysEl.textContent = '—';
    totalWeeksEl.textContent = '—';
    totalMonthsEl.textContent = '—';
    totalHoursEl.textContent = '—';
    nextBdayDate.textContent = '—';
    daysToGoBtn.textContent = '—';
    turningBtn.textContent = '—';
  });

  // Share link: copy URL with dob (and asOf if present)
  shareBtn.addEventListener('click', () => {
    const dobVal = dobInput.value;
    if (!dobVal) { alert('Enter Date of Birth to share'); return; }
    const url = new URL(location.href);
    url.searchParams.set('dob', dobVal);
    if (asOfInput.value && !asOfRow.classList.contains('hidden')) url.searchParams.set('asof', asOfInput.value);
    navigator.clipboard.writeText(url.toString()).then(() => {
      alert('Share link copied to clipboard');
    }).catch(() => {
      prompt('Copy this link', url.toString());
    });
  });

  // Load URL params if any
  function loadFromUrl() {
    const params = new URLSearchParams(location.search);
    const dob = params.get('dob');
    const asof = params.get('asof');
    if (dob) {
      dobInput.value = dob;
    }
    if (asof) {
      asOfInput.value = asof;
      // switch to specific tab if asof present
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      const specificTab = document.querySelector('.tab[data-tab="specific"]');
      if (specificTab) specificTab.classList.add('active');
      asOfRow.classList.remove('hidden');
    }
    if (dob) {
      // auto-calc when loaded via share
      setTimeout(() => calcBtn.click(), 200);
    }
  }
  loadFromUrl();

  // Find DOB logic
  findBtn.addEventListener('click', () => {
    const y = parseInt(yearsInput.value || '0', 10);
    const m = parseInt(monthsInput.value || '0', 10);
    const d = parseInt(daysInput.value || '0', 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      alert('Enter years/months/days (0 if none).');
      return;
    }
    // reference date is today
    const t = new Date();
    const ref = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    // subtract years/months/days
    let targetYear = ref.getFullYear() - y;
    let targetMonth = ref.getMonth() - m;
    let targetDay = ref.getDate() - d;

    // normalize months & years
    while (targetMonth < 0) { targetMonth += 12; targetYear -= 1; }
    // create candidate date and adjust day if invalid (e.g., Feb 30)
    let candidate = new Date(targetYear, targetMonth, 1);
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    if (targetDay > daysInMonth) targetDay = daysInMonth;
    candidate = new Date(targetYear, targetMonth, targetDay);

    // Output
    dobFound.textContent = candidate.toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
    dobFoundWeekday.textContent = `Born on a ${candidate.toLocaleString(undefined, { weekday: 'long' })}`;
    dobFoundIso.textContent = candidate.toISOString().slice(0,10);

    findResult.classList.remove('hidden');
  });

  findResetBtn.addEventListener('click', () => {
    yearsInput.value = '';
    monthsInput.value = '';
    daysInput.value = '';
    findResult.classList.add('hidden');
  });

})();
