// ============================================
// PPDB Portal — script.js
// Toast Notification & Form Validation
// ============================================

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = type === 'success' ? '✅' : '❌';
  toast.innerHTML = icon + ' ' + message;
  toast.className = 'show ' + type;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function submitPendaftaran() {
  const nama  = document.getElementById('nama');
  const nik   = document.getElementById('nik');
  const jalur = document.getElementById('jalur');

  if (!nama || !nik || !jalur) return;

  const namaVal  = nama.value.trim();
  const nikVal   = nik.value.trim();
  const jalurVal = jalur.value;

  if (namaVal === '') {
    showToast('Nama Lengkap wajib diisi!', 'error');
    nama.focus();
    return;
  }

  if (nikVal === '') {
    showToast('NIK wajib diisi!', 'error');
    nik.focus();
    return;
  }

  if (!/^\d{16}$/.test(nikVal)) {
    showToast('NIK harus tepat 16 digit angka!', 'error');
    nik.focus();
    return;
  }

  if (!jalurVal) {
    showToast('Pilih jalur pendaftaran terlebih dahulu!', 'error');
    jalur.focus();
    return;
  }

  showToast('Pendaftaran berhasil dikirim!', 'success');

  nama.value  = '';
  nik.value   = '';
  jalur.value = '';
}

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
