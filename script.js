/**
 * Controlador de Presentación: Prueba t de Student y Prueba F de Fisher en RLM
 * Posgrado UNAMBA - Tema III (10 Diapositivas: 1 Portada + Parte 1 [2-4] + Parte 2 [5-10])
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 1;
  const totalSlides = 10;
  const parte1LastSlide = 4;

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot-indicator');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const currentSlideNum = document.getElementById('current-slide-num');
  const totalSlidesNum = document.getElementById('total-slides-num');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const tabSectionT = document.getElementById('tab-section-t');
  const tabSectionF = document.getElementById('tab-section-f');
  const logoBox = document.querySelector('.unamba-logo-box');

  if (totalSlidesNum) totalSlidesNum.textContent = totalSlides;

  function updateSectionTabs(slideIndex) {
    if (!tabSectionT || !tabSectionF) return;
    if (slideIndex <= parte1LastSlide) {
      tabSectionT.className = 'px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10 cursor-pointer';
      tabSectionF.className = 'px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-all duration-300 flex items-center space-x-1.5 hover:bg-slate-800/60 border border-transparent cursor-pointer';
    } else {
      tabSectionT.className = 'px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-all duration-300 flex items-center space-x-1.5 hover:bg-slate-800/60 border border-transparent cursor-pointer';
      tabSectionF.className = 'px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-lg shadow-sky-500/10 cursor-pointer';
    }
  }

  function triggerMathRender() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  function goToSlide(index) {
    if (index < 1 || index > totalSlides) return;
    currentSlide = index;

    slides.forEach((slide) => {
      const idx = parseInt(slide.dataset.index, 10);
      slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      const dotIndex = idx + 1;
      if (dotIndex === currentSlide) {
        dot.className = dotIndex <= parte1LastSlide
          ? 'dot-indicator w-7 h-2 rounded-full bg-amber-400 transition-all duration-300 cursor-pointer'
          : 'dot-indicator w-7 h-2 rounded-full bg-sky-400 transition-all duration-300 cursor-pointer';
      } else {
        dot.className = 'dot-indicator w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-500 transition-all duration-300 cursor-pointer';
      }
    });

    if (currentSlideNum) currentSlideNum.textContent = currentSlide;
    updateSectionTabs(currentSlide);

    if (btnPrev) btnPrev.disabled = currentSlide === 1;
    if (btnNext) {
      btnNext.disabled = currentSlide === totalSlides;
      btnNext.classList.toggle('opacity-40', currentSlide === totalSlides);
      btnNext.classList.toggle('cursor-not-allowed', currentSlide === totalSlides);
    }

    triggerMathRender();
  }

  if (logoBox) {
    logoBox.style.cursor = 'pointer';
    logoBox.title = 'Ir a la Portada General (Slide 1)';
    logoBox.addEventListener('click', () => goToSlide(1));
  }
  if (tabSectionT) tabSectionT.addEventListener('click', () => goToSlide(2));
  if (tabSectionF) tabSectionF.addEventListener('click', () => goToSlide(5));

  if (btnPrev) btnPrev.addEventListener('click', () => { if (currentSlide > 1) goToSlide(currentSlide - 1); });
  if (btnNext) btnNext.addEventListener('click', () => { if (currentSlide < totalSlides) goToSlide(currentSlide + 1); });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const target = parseInt(e.currentTarget.dataset.slide, 10);
      goToSlide(target);
    });
  });

  function toggleFullscreen() {
    if (!btnFullscreen) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      btnFullscreen.innerHTML = '<i class="fa-solid fa-compress text-xs"></i>';
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      btnFullscreen.innerHTML = '<i class="fa-solid fa-expand text-xs"></i>';
    }
  }
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        if (currentSlide > 1) goToSlide(currentSlide - 1);
        break;
      case 'Home':
      case '0':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      case '1':
        goToSlide(2);
        break;
      case '2':
        goToSlide(5);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'p':
      case 'P':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          window.print();
        }
        break;
    }
  });

  // ==========================================
  // SLIDE 3: CAMPANA t-STUDENT INTERACTIVA (SVG)
  // ==========================================
  const alphaBtns = document.querySelectorAll('.s5-alpha-btn');
  const tcalcSlider = document.getElementById('s5-tcalc-slider');
  const tcalcValLabel = document.getElementById('s5-tcalc-val');
  const s5Verdict = document.getElementById('s5-verdict');

  let activeAlpha = 0.05;
  let activeTCrit = 2.042;

  function tToX(t) {
    return 200 + (t / 4.0) * 180;
  }

  function tPdfY(t) {
    const df = 30;
    const density = Math.pow(1 + (t * t) / df, -(df + 1) / 2);
    return 140 - density * 112;
  }

  function renderTBell() {
    const curve = document.getElementById('t-bell-curve');
    const tailL = document.getElementById('t-tail-left');
    const tailR = document.getElementById('t-tail-right');
    if (!curve || !tailL || !tailR) return;

    let dCurve = '';
    for (let t = -4.0; t <= 4.001; t += 0.1) {
      const x = tToX(t).toFixed(1);
      const y = tPdfY(t).toFixed(1);
      dCurve += (t === -4.0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }
    curve.setAttribute('d', dCurve);

    let dLeft = `M ${tToX(-4.0).toFixed(1)} 140`;
    for (let t = -4.0; t <= -activeTCrit; t += 0.05) {
      dLeft += ` L ${tToX(t).toFixed(1)} ${tPdfY(t).toFixed(1)}`;
    }
    dLeft += ` L ${tToX(-activeTCrit).toFixed(1)} ${tPdfY(-activeTCrit).toFixed(1)} L ${tToX(-activeTCrit).toFixed(1)} 140 Z`;
    tailL.setAttribute('d', dLeft);

    let dRight = `M ${tToX(activeTCrit).toFixed(1)} 140 L ${tToX(activeTCrit).toFixed(1)} ${tPdfY(activeTCrit).toFixed(1)}`;
    for (let t = activeTCrit; t <= 4.001; t += 0.05) {
      dRight += ` L ${tToX(t).toFixed(1)} ${tPdfY(t).toFixed(1)}`;
    }
    dRight += ` L ${tToX(4.0).toFixed(1)} 140 Z`;
    tailR.setAttribute('d', dRight);

    const xCritL = tToX(-activeTCrit).toFixed(1);
    const xCritR = tToX(activeTCrit).toFixed(1);
    document.getElementById('t-crit-left-line').setAttribute('x1', xCritL);
    document.getElementById('t-crit-left-line').setAttribute('x2', xCritL);
    document.getElementById('t-crit-right-line').setAttribute('x1', xCritR);
    document.getElementById('t-crit-right-line').setAttribute('x2', xCritR);

    document.getElementById('t-crit-left-lbl').setAttribute('x', xCritL);
    document.getElementById('t-crit-left-lbl').textContent = `-${activeTCrit.toFixed(2)}`;
    document.getElementById('t-crit-right-lbl').setAttribute('x', xCritR);
    document.getElementById('t-crit-right-lbl').textContent = `+${activeTCrit.toFixed(2)}`;

    const tCalc = parseFloat(tcalcSlider ? tcalcSlider.value : 2.2);
    const xCalc = tToX(tCalc).toFixed(1);
    document.getElementById('t-calc-line').setAttribute('x1', xCalc);
    document.getElementById('t-calc-line').setAttribute('x2', xCalc);
    document.getElementById('t-calc-dot').setAttribute('cx', xCalc);
    const calcTxt = document.getElementById('t-calc-text');
    calcTxt.setAttribute('x', xCalc);
    calcTxt.textContent = `t = ${tCalc.toFixed(2)}`;

    if (tcalcValLabel) tcalcValLabel.textContent = (tCalc >= 0 ? '+' : '') + tCalc.toFixed(2);

    const reject = Math.abs(tCalc) > activeTCrit;
    if (s5Verdict) {
      if (reject) {
        s5Verdict.textContent = `Zona de Rechazo: Rechaza H₀ (α=${activeAlpha})`;
        s5Verdict.className = 'px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center min-w-[170px]';
      } else {
        s5Verdict.textContent = `Zona de Aceptación: No rechaza H₀`;
        s5Verdict.className = 'px-3.5 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center min-w-[170px]';
      }
    }
  }

  alphaBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeAlpha = parseFloat(btn.dataset.alpha);
      activeTCrit = parseFloat(btn.dataset.tcrit);
      alphaBtns.forEach((b) => {
        b.className = 's5-alpha-btn px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer';
      });
      btn.className = 's5-alpha-btn px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold border border-amber-400 cursor-pointer';
      renderTBell();
    });
  });

  if (tcalcSlider) {
    tcalcSlider.addEventListener('input', renderTBell);
  }
  renderTBell();

  // ==========================================
  // SLIDE 8: SIMULADOR R² -> ESTADÍSTICO F
  // ==========================================
  const simfR2 = document.getElementById('simf-r2');
  const simfR2Val = document.getElementById('simf-r2-val');
  const simfFOut = document.getElementById('simf-f-out');
  const simfBarExp = document.getElementById('simf-bar-exp');
  const simfBarRes = document.getElementById('simf-bar-res');

  function updateSimF() {
    if (!simfR2) return;
    const r2 = parseFloat(simfR2.value);
    const n = 60;
    const k = 3;
    const fVal = (r2 / k) / ((1 - r2) / (n - k - 1));
    const pctExp = Math.round(r2 * 100);
    const pctRes = 100 - pctExp;

    if (simfR2Val) simfR2Val.textContent = r2.toFixed(2);
    if (simfFOut) simfFOut.textContent = fVal.toFixed(2);
    if (simfBarExp) {
      simfBarExp.style.width = `${pctExp}%`;
      simfBarExp.textContent = `Explicada (${pctExp}%)`;
    }
    if (simfBarRes) {
      simfBarRes.style.width = `${pctRes}%`;
      simfBarRes.textContent = pctRes >= 15 ? `Residual (${pctRes}%)` : `${pctRes}%`;
    }
  }

  if (simfR2) {
    simfR2.addEventListener('input', updateSimF);
    updateSimF();
  }

  // ==========================================
  // SISTEMA DE 4 TEMAS VISUALES
  // ==========================================
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
  const themeButtons = document.querySelectorAll('.theme-opt-btn');
  const themeChecks = document.querySelectorAll('.theme-check');
  const themeActiveLabel = document.getElementById('theme-active-label');
  const themeActiveIcon = document.getElementById('theme-active-icon');

  const themeMeta = {
    dark: { label: 'Cyber Dark', iconClass: 'fa-solid fa-moon text-amber-400' },
    light: { label: 'Sobrio Claro', iconClass: 'fa-solid fa-sun text-amber-500' },
    notebook: { label: 'Cuaderno', iconClass: 'fa-solid fa-book-open text-blue-500' },
    chalkboard: { label: 'Pizarra de Aula', iconClass: 'fa-solid fa-chalkboard text-emerald-400' }
  };

  function applyTheme(themeName) {
    if (!themeMeta[themeName]) themeName = 'notebook';
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-notebook', 'theme-chalkboard', 'dark');

    if (themeName === 'dark') {
      document.documentElement.classList.add('dark', 'theme-dark');
    } else if (themeName === 'chalkboard') {
      document.documentElement.classList.add('dark', 'theme-chalkboard');
    } else {
      document.documentElement.classList.add(`theme-${themeName}`);
    }

    if (themeActiveLabel) themeActiveLabel.textContent = themeMeta[themeName].label;
    if (themeActiveIcon) themeActiveIcon.className = themeMeta[themeName].iconClass;

    themeChecks.forEach((check) => {
      check.classList.toggle('hidden', check.dataset.check !== themeName);
    });

    try {
      localStorage.setItem('presentation-theme-v2', themeName);
    } catch (e) {}

    triggerMathRender();
  }

  if (btnThemeToggle && themeDropdownMenu) {
    btnThemeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdownMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!themeDropdownMenu.contains(e.target) && e.target !== btnThemeToggle) {
        themeDropdownMenu.classList.add('hidden');
      }
    });
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      applyTheme(e.currentTarget.dataset.theme);
      if (themeDropdownMenu) themeDropdownMenu.classList.add('hidden');
    });
  });

  const themeOrder = ['notebook', 'light', 'chalkboard', 'dark'];
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 't' || e.key === 'T') {
      const current = localStorage.getItem('presentation-theme-v2') || 'notebook';
      const nextIdx = (themeOrder.indexOf(current) + 1) % themeOrder.length;
      applyTheme(themeOrder[nextIdx]);
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  const urlSlide = parseInt(urlParams.get('slide'), 10);

  let initialTheme = 'notebook';
  try {
    initialTheme = urlTheme || localStorage.getItem('presentation-theme-v2') || 'notebook';
  } catch (e) {
    if (urlTheme) initialTheme = urlTheme;
  }
  applyTheme(initialTheme);

  if (urlSlide && urlSlide >= 1 && urlSlide <= totalSlides) {
    goToSlide(urlSlide);
  } else {
    goToSlide(1);
  }
});
