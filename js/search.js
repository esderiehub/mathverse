// ===== ARAMA FONKSİYONU =====
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.theorem-card, .formula-card, .math-card');

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(query)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Boş durum
    const grid = document.querySelector('.cards-grid, .math-grid');
    if (grid) {
      const visible = grid.querySelectorAll('.theorem-card:not(.hidden), .formula-card:not(.hidden), .math-card:not(.hidden)');
      let empty = grid.querySelector('.empty-state');
      if (visible.length === 0 && query !== '') {
        if (!empty) {
          empty = document.createElement('div');
          empty.className = 'empty-state';
          empty.innerHTML = `<i class="fas fa-search"></i><h3>"${query}" için sonuç bulunamadı</h3><p>Farklı bir arama terimi deneyin.</p>`;
          grid.appendChild(empty);
        }
      } else {
        if (empty) empty.remove();
      }
    }
  });

  // Enter ile arama sayfasına git
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `theorems.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

// ===== URL'DEN ARAMA PARAMETRESİ =====
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('search');
  if (q && searchInput) {
    searchInput.value = q;
    searchInput.dispatchEvent(new Event('input'));
  }
});