document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 0 25px rgba(0,245,212,0.6)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
});