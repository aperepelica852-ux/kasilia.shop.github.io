document.querySelector('.search-block input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const query = e.target.value.trim().toLowerCase();

    const matches = {
      // Сузі
      "сузі": "suzi",
      "suzi": "suzi",
      "suzy": "suzi",
      "су": "suzi",

      // Адель
      "адель": "adel",
      "adel": "adel",
      "адел": "adel",

      // Каміла
      "каміла": "kamila",
      "kamila": "kamila",
      "camila": "kamila",
      "камила": "kamila",

      // Емілі
      "емілі": "emili",
      "emili": "emili",
      "емили": "emili",
      "emily": "emili",

      // Кері
      "кері": "keri",
      "keri": "keri",
      "kerry": "keri",
      "кери": "keri",

      // Еліза
      "еліза": "eliza",
      "eliza": "eliza",
      "еліза": "eliza",
      "elyza": "eliza"
    };

    const targetId = matches[query];
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        targetElement.classList.add('highlighted');
        setTimeout(() => targetElement.classList.remove('highlighted'), 2000);
      }
    } else {
      alert("Товар не знайдено 😔");
    }
  }
});
