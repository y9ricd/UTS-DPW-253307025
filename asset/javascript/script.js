// ===========================
// PPDB Portal - Script.js
// Toast Notification & Validasi Form
// ===========================

/**
 * Menampilkan custom toast notification
 * @param {string} message - Pesan yang ditampilkan
 * @param {'success'|'error'} type - Tipe toast
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  // Set ikon sesuai tipe
  const icon = type === 'success' ? '✅' : '❌';
  toast.innerHTML = `${icon} ${message}`;

  // Set class
  toast.className = '';
  toast.classList.add('show', type);

  // Auto hide setelah 3 detik dengan fade out
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Validasi dan submit form pendaftaran
 */
function submitPendaftaran() {
  const nama = document.getElementById('nama');
  const nik = document.getElementById('nik');
  const jalur = document.getElementById('jalur');

  // Cek apakah field kosong
  if (!nama || !nik || !jalur) return;

  const namaVal = nama.value.trim();
  const nikVal = nik.value.trim();
  const jalurVal = jalur.value;

  // Validasi: nama kosong
  if (namaVal === '') {
    showToast('Nama Lengkap wajib diisi!', 'error');
    nama.focus();
    return;
  }

  // Validasi: NIK kosong
  if (nikVal === '') {
    showToast('NIK wajib diisi!', 'error');
    nik.focus();
    return;
  }

  // Validasi: NIK harus 16 digit angka
  const nikRegex = /^\d{16}$/;
  if (!nikRegex.test(nikVal)) {
    showToast('NIK harus berupa 16 digit angka!', 'error');
    nik.focus();
    return;
  }

  // Validasi: jalur pendaftaran belum dipilih
  if (jalurVal === '' || jalurVal === null) {
    showToast('Pilih jalur pendaftaran terlebih dahulu!', 'error');
    jalur.focus();
    return;
  }

  // Semua valid — tampilkan toast sukses & reset form
  showToast('Pendaftaran berhasil dikirim! 🎉', 'success');

  // Reset semua input
  nama.value = '';
  nik.value = '';
  jalur.value = '';
}

// ---- Active nav link highlight ----
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
