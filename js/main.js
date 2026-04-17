// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGEr MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== AKTİF NAV LİNK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ===== FADE-IN ANİMASYON =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.theorem-card, .formula-card, .math-card, .stat-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== TEOREM FİLTRE =====
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#theoremGrid .theorem-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
    checkEmpty('theoremGrid');
  });
});

// ===== FORMÜL FİLTRE =====
document.querySelectorAll('.filter-btn[data-filter2]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter2]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter2;
    document.querySelectorAll('#formulaGrid .formula-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat2 === filter;
      card.classList.toggle('hidden', !show);
    });
    checkEmpty('formulaGrid');
  });
});

// ===== BOŞ DURUM KONTROL =====
function checkEmpty(gridId) {
  const grid = document.getElementById(gridId);
  const existing = grid.querySelector('.empty-state');
  if (existing) existing.remove();
  const visible = [...grid.children].filter(c => !c.classList.contains('hidden') && !c.classList.contains('empty-state'));
  if (visible.length === 0) {
    grid.insertAdjacentHTML('beforeend', `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>Sonuç bulunamadı</h3>
        <p>Farklı bir filtre deneyin.</p>
      </div>
    `);
  }
}

// ===== TEOREM ARAMA =====
document.getElementById('theoremSearch')?.addEventListener('input', function () {
  const q = this.value.toLowerCase();
  document.querySelectorAll('#theoremGrid .theorem-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.classList.toggle('hidden', !text.includes(q));
  });
  checkEmpty('theoremGrid');
});

// ===== FORMÜL KOPYALA =====
function copyFormula(btn, latex) {
  navigator.clipboard.writeText(latex).then(() => {
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
}

// ===== MODAL VERİLERİ =====
const modalData = {
  pisagor: {
    tag: 'geometri', tagLabel: 'Geometri', difficulty: 'easy', diffLabel: 'Temel',
    title: 'Pisagor Teoremi',
    desc: 'Dik üçgende hipotenüsün karesi, diğer iki kenarın karelerinin toplamına eşittir.',
    formula: '$$a^2 + b^2 = c^2$$',
    history: 'MÖ 570\'de doğan Pisagor tarafından sistematik olarak ele alınmış olsa da bu özellik Babilliler tarafından çok daha önce biliniyordu.',
    uses: ['Uzaklık hesaplama', 'İnşaat ve mimari', 'Navigasyon sistemleri', 'Bilgisayar grafikleri']
  },
  fermat: {
    tag: 'cebir', tagLabel: 'Cebir', difficulty: 'hard', diffLabel: 'İleri',
    title: "Fermat'ın Son Teoremi",
    desc: 'n > 2 için aⁿ + bⁿ = cⁿ denkleminin pozitif tam sayı çözümü yoktur.',
    formula: '$$a^n + b^n \\neq c^n \\quad (n > 2)$$',
    history: "Pierre de Fermat 1637'de bu teoremi kenar boşluğuna yazıp 'muhteşem bir ispata sahibim ama sığmıyor' dedi. Andrew Wiles 1995'te 358 yıl sonra ispat etti.",
    uses: ['Sayı teorisi araştırmaları', 'Kriptografi', 'Eliptik eğri teorisi']
  },
  kalkulus: {
    tag: 'analiz', tagLabel: 'Analiz', difficulty: 'medium', diffLabel: 'Orta',
    title: 'Kalkülüsün Temel Teoremi',
    desc: 'Türev ve integral birbirinin ters işlemidir. Bu teorem analizi temelden değiştirdi.',
    formula: '$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$',
    history: "Newton ve Leibniz 17. yüzyılda bağımsız olarak keşfetti. Matematiksel analizin temel taşıdır.",
    uses: ['Fizik (hareket, alan)', 'Mühendislik hesaplamaları', 'Ekonomi modelleri', 'Olasılık teorisi']
  },
  oklid: {
    tag: 'sayi', tagLabel: 'Sayı Teorisi', difficulty: 'medium', diffLabel: 'Orta',
    title: "Öklid'in Sonsuzluk Teoremi",
    desc: 'Asal sayıların sayısı sonsuzdur. Öklid bunu zarif bir çelişki ile ispat etti.',
    formula: '$$p_1 \\cdot p_2 \\cdots p_n + 1$$',
    history: "MÖ 300 yılında Öklid'in 'Elementler' eserinde yer alan bu ispat, tarihte bilinen en zarif matematiksel ispatlardan biridir.",
    uses: ['Kriptografi (RSA)', 'Asal sayı üretimi', 'Hash fonksiyonları']
  },
  euler: {
    tag: 'analiz', tagLabel: 'Analiz', difficulty: 'medium', diffLabel: 'Orta',
    title: 'Euler Kimliği',
    desc: "Matematiğin en güzel denklemi: e, i, π, 1 ve 0'ı tek bir denklemde birleştirir.",
    formula: '$$e^{i\\pi} + 1 = 0$$',
    history: "Leonhard Euler tarafından 18. yüzyılda türetildi. Fizikçi Richard Feynman bunu 'matematiğin en çarpıcı formülü' olarak nitelendirdi.",
    uses: ['Karmaşık analiz', 'Sinyal işleme', 'Kuantum mekaniği', 'Elektrik mühendisliği']
  },
  riemann: {
    tag: 'geometri', tagLabel: 'Geometri', difficulty: 'hard', diffLabel: 'İleri',
    title: 'Riemann Hipotezi',
    desc: "Zeta fonksiyonunun tüm önemsiz olmayan sıfırlarının reel kısmı 1/2'dir.",
    formula: '$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$',
    history: "Bernhard Riemann 1859'da öne sürdü. Clay Matematik Enstitüsü'nün 1 milyon dolar ödüllü 7 Milenyum problemi'nden biridir.",
    uses: ['Asal sayıların dağılımı', 'Kriptografi', 'Kuantum kaos teorisi']
  }
};

// ===== MODAL AÇ =====
function openModal(key) {
  const d = modalData[key];
  if (!d) return;
  document.getElementById('modalContent').innerHTML = `
    <div class="tc-tag ${d.tag}" style="margin-bottom:1rem">${d.tagLabel}</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:1.8rem;margin-bottom:0.75rem">${d.title}</h2>
    <p style="color:var(--text2);margin-bottom:1.5rem">${d.desc}</p>
    <div class="tc-formula" style="font-size:1.3rem;padding:1.5rem;margin-bottom:1.5rem">${d.formula}</div>
    <h4 style="margin-bottom:0.5rem;color:var(--text)">📜 Tarihçe</h4>
    <p style="color:var(--text2);margin-bottom:1.2rem;font-size:0.93rem">${d.history}</p>
    <h4 style="margin-bottom:0.5rem;color:var(--text)">🔧 Kullanım Alanları</h4>
    <ul style="color:var(--text2);padding-left:1.2rem;font-size:0.93rem;display:flex;flex-direction:column;gap:0.3rem">
      ${d.uses.map(u => `<li>${u}</li>`).join('')}
    </ul>
    <div style="margin-top:1.5rem">
      <span class="tc-difficulty ${d.difficulty}">${d.diffLabel}</span>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('active');
  if (window.MathJax) MathJax.typesetPromise();
}

// ===== MODAL KAPAT =====
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== MATEMATİKÇİ MODAL =====
const mathData = {
  euler: {
    initial: 'L', name: 'Leonhard Euler', years: '1707 – 1783',
    bio: "İsviçreli matematikçi Euler, tarihinin en üretken matematikçilerinden biridir. Hayatının son yıllarında tamamen kör olmasına rağmen üretkenliğini sürdürdü.",
    contributions: ['e sayısını tanımladı', 'Euler kimliğini türetti', 'Grafik teorisini kurdu', 'π notasyonunu yaygınlaştırdı', 'Fonksiyon kavramını geliştirdi'],
    formula: '$$e^{i\\pi} + 1 = 0$$'
  },
  gauss: {
    initial: 'G', name: 'Carl Friedrich Gauss', years: '1777 – 1855',
    bio: "Alman matematikçi Gauss, 'Matematiğin Prensi' olarak anılır. 3 yaşında aritmetik hataları düzeltiyor, 10 yaşında 1'den 100'e kadar olan sayıları saniyeler içinde topluyordu.",
    contributions: ['Normal dağılımı (Gauss eğrisi)', 'Gauss eleme yöntemi', 'Sayı teorisi katkıları', 'Kompleks sayılar geometrisi', 'Manyetizm ve elektrik çalışmaları'],
    formula: '$$\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$$'
  },
  riemann: {
    initial: 'R', name: 'Bernhard Riemann', years: '1826 – 1866',
    bio: "Alman matematikçi Riemann, yalnızca 39 yıl yaşamasına rağmen matematiğe dev katkılar yaptı. Einstein'ın görelilik teorisinin matematiksel altyapısı olan Riemann geometrisini kurdu.",
    contributions: ['Riemann geometrisi', 'Riemann hipotezi', 'Riemann integrali', 'Riemann yüzeyleri', 'Görelilik teorisine temel'],
    formula: '$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$'
  }
};

function openMathModal(key) {
  const d = mathData[key];
  if (!d) return;
  document.getElementById('modalContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap">
      <div class="math-avatar" style="width:72px;height:72px;font-size:2rem;flex-shrink:0">${d.initial}</div>
      <div>
        <h2 style="font-family:'Playfair Display',serif;font-size:1.6rem">${d.name}</h2>
        <p style="color:var(--text2)">${d.years}</p>
      </div>
    </div>
    <p style="color:var(--text2);margin-bottom:1.5rem;font-size:0.95rem;line-height:1.8">${d.bio}</p>
    <div class="tc-formula" style="font-size:1.2rem;padding:1.2rem;margin-bottom:1.5rem">${d.formula}</div>
    <h4 style="margin-bottom:0.75rem;color:var(--text)">🏆 Başlıca Katkılar</h4>
    <ul style="color:var(--text2);padding-left:1.2rem;font-size:0.93rem;display:flex;flex-direction:column;gap:0.4rem">
      ${d.contributions.map(c => `<li>${c}</li>`).join('')}
    </ul>
  `;
  document.getElementById('modalOverlay').classList.add('active');
  if (window.MathJax) MathJax.typesetPromise();
}
// Arama kutusu
const searchInput = document.querySelector('.nav-search input');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.theorem-card');
    
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc  = card.querySelector('p')?.textContent.toLowerCase() || '';
      
      if (title.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Detay butonları
document.querySelectorAll('.tc-arrow, .theorem-card').forEach(el => {
  el.addEventListener('click', function () {
    const card = this.closest('.theorem-card');
    const id   = card?.dataset.id;
    if (id) {
      window.location.href = `detay.html?id=${id}`;
    }
  });
});