// ===== NAVBAR ARAMA =====
document.getElementById('searchInput')?.addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  if (!q) {
    document.querySelectorAll('.theorem-card, .formula-card, .math-card').forEach(c => c.classList.remove('hidden'));
    return;
  }
  document.querySelectorAll('.theorem-card, .formula-card, .math-card').forEach(card => {
    card.classList.toggle('hidden', !card.innerText.toLowerCase().includes(q));
  });
});