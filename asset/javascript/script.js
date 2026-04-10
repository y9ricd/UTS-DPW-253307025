/**
 * PPDB Sekolah Global Nusantara - Interactive Scripts
 * Validasi Form & Toast Notification System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFormValidation();
    initNIKCounter();
    initSmoothScroll();
    initNavHighlight();
});

/**
 * Form Validation with Custom Toast Notification
 */
function initFormValidation() {
    const form = document.getElementById('ppdbForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Intercept form submission
        
        const nama = document.getElementById('nama').value.trim();
        const nik = document.getElementById('nik').value.trim();
        const jalur = document.getElementById('jalur').value;
        
        // Validation Logic
        let errors = [];
        
        // Validate Nama
        if (!nama || nama.length < 3) {
            errors.push('Nama lengkap minimal 3 karakter');
        }
        
        // Validate NIK (must be exactly 16 digits)
        if (!nik) {
            errors.push('NIK wajib diisi');
        } else if (!/^\d{16}$/.test(nik)) {
            errors.push('NIK harus tepat 16 digit angka');
        }
        
        // Validate Jalur
        if (!jalur) {
            errors.push('Jalur pendaftaran harus dipilih');
        }
        
        // Show appropriate toast
        if (errors.length > 0) {
            showToast('error', 'Validasi Gagal!', errors[0]);
            highlightErrorFields(errors);
        } else {
            // Success - simulate submission
            simulateSubmission(form);
        }
    });
}

/**
 * NIK Real-time Counter
 */
function initNIKCounter() {
    const nikInput = document.getElementById('nik');
    const counter = document.getElementById('nikCount');
    if (!nikInput || !counter) return;
    
    nikInput.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = length;
        
        // Visual feedback
        const counterParent = counter.parentElement;
        if (length === 16) {
            counterParent.classList.add('valid');
            counterParent.classList.remove('invalid');
        } else if (length > 16) {
            counterParent.classList.add('invalid');
            counterParent.classList.remove('valid');
            // Prevent more than 16 digits
            this.value = this.value.slice(0, 16);
            counter.textContent = 16;
        } else {
            counterParent.classList.remove('valid', 'invalid');
        }
    });
    
    // Prevent non-numeric input
    nikInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });
}

/**
 * Custom Toast Notification System
 */
function showToast(type, title, message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast.show');
    if (existingToast) {
        existingToast.classList.remove('show');
        setTimeout(() => existingToast.remove(), 300);
    }
    
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Configure toast
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastProgress = document.getElementById('toastProgress');
    
    // Set content based on type
    if (type === 'error') {
        toast.classList.add('error');
        toastIcon.textContent = '❌';
        toastProgress.style.background = '#ef4444';
    } else {
        toast.classList.remove('error');
        toastIcon.textContent = '✅';
        toastProgress.style.background = '#14b8a6';
    }
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Show toast with animation
    toast.classList.add('show');
    
    // Animate progress bar
    toastProgress.style.transition = 'none';
    toastProgress.style.transform = 'scaleX(1)';
    setTimeout(() => {
        toastProgress.style.transition = 'transform 3s linear';
        toastProgress.style.transform = 'scaleX(0)';
    }, 50);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Simulate Form Submission
 */
function simulateSubmission(form) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show success toast
        showToast('success', 'Berhasil!', 'Pendaftaran berhasil dikirim. Silakan cek email untuk konfirmasi.');
        
        // Reset form
        form.reset();
        document.getElementById('nikCount').textContent = '0';
        document.querySelector('.nik-counter').classList.remove('valid', 'invalid');
        
    }, 2000);
}

/**
 * Highlight Error Fields
 */
function highlightErrorFields(errors) {
    const nama = document.getElementById('nama');
    const nik = document.getElementById('nik');
    const jalur = document.getElementById('jalur');
    
    // Reset previous highlights
    [nama, nik, jalur].forEach(field => {
        if (field) field.style.borderColor = '#e2e8f0';
    });
    
    // Highlight specific fields
    errors.forEach(error => {
        if (error.includes('Nama') && nama) {
            nama.style.borderColor = '#ef4444';
            nama.focus();
        } else if (error.includes('NIK') && nik) {
            nik.style.borderColor = '#ef4444';
            if (!nama.value) nik.focus();
        } else if (error.includes('Jalur') && jalur) {
            jalur.style.borderColor = '#ef4444';
        }
    });
}

/**
 * Smooth Scroll Animation
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Active Navigation Highlight
 */
function initNavHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Add scroll effect to navbar
 */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
});