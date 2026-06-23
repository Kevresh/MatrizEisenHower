'use strict';

/* ── Logo ── */
document.querySelectorAll('img.candidate-logo, img.header-logo').forEach(img => {
  img.src = LOGO_DATA_URL;
});

/* ── Quadrant mapping ── */
const QUADRANT_MAP = {
  '11': 'hacer',    // urgente + importante
  '01': 'decidir',  // no urgente + importante
  '10': 'delegar',  // urgente + no importante
  '00': 'eliminar', // ni urgente ni importante
};

const QUADRANT_LABELS = {
  hacer:    '→ Cuadrante: Hacer',
  decidir:  '→ Cuadrante: Decidir',
  delegar:  '→ Cuadrante: Delegar',
  eliminar: '→ Cuadrante: Eliminar',
};

/* ── Modal elements ── */
const overlay       = document.getElementById('modal-overlay');
const btnNewTask    = document.getElementById('btn-new-task');
const btnClose      = document.getElementById('modal-close');
const btnCancel     = document.getElementById('btn-cancel');
const btnAdd        = document.getElementById('btn-add');
const taskText      = document.getElementById('task-text');
const taskDate      = document.getElementById('task-date');
const chkUrgente    = document.getElementById('chk-urgente');
const chkImportante = document.getElementById('chk-importante');
const previewDot    = document.getElementById('preview-dot');
const previewLabel  = document.getElementById('preview-label');

function openModal() {
  taskText.value = '';
  taskDate.value = '';
  chkUrgente.checked = false;
  chkImportante.checked = false;
  updatePreview();
  overlay.classList.add('is-open');
  setTimeout(() => taskText.focus(), 260);
}

function closeModal() {
  overlay.classList.remove('is-open');
}

function getQuadrant() {
  const u = chkUrgente.checked    ? '1' : '0';
  const i = chkImportante.checked ? '1' : '0';
  return QUADRANT_MAP[u + i];
}

function updatePreview() {
  const q = getQuadrant();
  previewDot.className  = 'preview-dot q-' + q;
  previewLabel.textContent = QUADRANT_LABELS[q];
}

chkUrgente.addEventListener('change', updatePreview);
chkImportante.addEventListener('change', updatePreview);

btnNewTask.addEventListener('click', openModal);
btnClose.addEventListener('click',   closeModal);
btnCancel.addEventListener('click',  closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Format date for display ── */
function formatDate(isoDate) {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

/* ── Add a task card to the correct quadrant ── */
function addTask(text, isoDate, quadrant) {
  const container = document.getElementById('tasks-' + quadrant);

  const card = document.createElement('div');
  card.className = 'task-card';

  const span = document.createElement('span');
  span.className = 'task-card__text';
  span.textContent = text;

  const dateSpan = document.createElement('span');
  dateSpan.className = 'task-card__date';
  dateSpan.textContent = formatDate(isoDate);

  const delBtn = document.createElement('button');
  delBtn.className = 'task-card__delete';
  delBtn.type = 'button';
  delBtn.setAttribute('aria-label', 'Eliminar tarea');
  delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2.5"
    stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`;
  delBtn.addEventListener('click', () => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(6px)';
    card.style.transition = '200ms ease';
    setTimeout(() => card.remove(), 200);
  });

  card.appendChild(span);
  card.appendChild(dateSpan);
  card.appendChild(delBtn);
  container.appendChild(card);
}

btnAdd.addEventListener('click', () => {
  const text = taskText.value.trim();
  if (!text) {
    taskText.focus();
    taskText.style.borderColor = '#e05a5a';
    setTimeout(() => { taskText.style.borderColor = ''; }, 1200);
    return;
  }
  addTask(text, taskDate.value, getQuadrant());
  closeModal();
});

/* Allow Ctrl+Enter to submit */
taskText.addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) btnAdd.click();
});

/* ── Download ── */
const btnDownload = document.getElementById('btn-download');
const btnLabel    = document.getElementById('btn-label');
const captureEl   = document.getElementById('matrix-capture');

btnDownload.addEventListener('click', async () => {
  if (document.activeElement) document.activeElement.blur();

  btnDownload.disabled = true;
  btnLabel.textContent = 'Generando…';

  try {
    const canvas = await html2canvas(captureEl, {
      scale: 2,
      useCORS: false,
      allowTaint: false,
      backgroundColor: '#F4F6FA',
      logging: false,
    });

    const link = document.createElement('a');
    link.download = 'matriz-eisenhower-utede.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('[html2canvas]', err);
    alert('No se pudo generar la imagen.\nDetalle: ' + (err.message || err));
  } finally {
    btnDownload.disabled = false;
    btnLabel.textContent = 'Descargar matriz';
  }
});
