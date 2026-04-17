// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== AKTİF LİNK =====
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ===== KOPYALA BUTONU =====
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    const text = document.getElementById(target)?.innerText || btn.getAttribute('data-text') || '';
    navigator.clipboard.writeText(text).then(() => {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
      btn.style.color = '#4ade80';
      btn.style.borderColor = '#4ade80';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  });
});

// ===== SCROLL ANİMASYON =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.theorem-card, .math-card, .formula-card, .stat-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== MOBİL MENÜ =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

// ===== FILTER BUTONLARI (formulas & theorems) =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    const cards = document.querySelectorAll('.theorem-card, .formula-card');

    cards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Boş durum kontrolü
    const grid = document.querySelector('.cards-grid');
    if (grid) {
      const visible = grid.querySelectorAll('.theorem-card:not(.hidden), .formula-card:not(.hidden)');
      let empty = grid.querySelector('.empty-state');
      if (visible.length === 0) {
        if (!empty) {
          empty = document.createElement('div');
          empty.className = 'empty-state';
          empty.innerHTML = '<i class="fas fa-search"></i><h3>Sonuç bulunamadı</h3><p>Farklı bir kategori deneyin.</p>';
          grid.appendChild(empty);
        }
      } else {
        if (empty) empty.remove();
      }
    }
  });
});

// ===== MATHJAX YENİDEN RENDER =====
function rerenderMath() {
  if (window.MathJax) {
    MathJax.typesetPromise().catch(err => console.log(err));
  }
}
document.addEventListener('DOMContentLoaded', rerenderMath);