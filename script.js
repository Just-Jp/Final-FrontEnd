document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      initCarousel();
    }
  
    window.addEventListener('resize', () => {
      const currentMobile = window.innerWidth < 600;
      if (currentMobile !== isMobile) {
        location.reload();
      }
    });
  });
  
  function initCarousel() {
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
  
    let currentIndex = 0;
  
    cards.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (index === 0) {
        indicator.classList.add('active');
      }
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  
    showSlide(currentIndex);
  
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
    function showSlide(index) {
      cards.forEach(card => card.classList.remove('active'));
      document.querySelectorAll('.indicator').forEach(ind => ind.classList.remove('active'));
      cards[index].classList.add('active');
      document.querySelectorAll('.indicator')[index].classList.add('active');
      currentIndex = index;
      prevBtn.style.opacity = index === 0 ? '0.5' : '1';
      nextBtn.style.opacity = index === cards.length - 1 ? '0.5' : '1';
    }
  
    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      showSlide(currentIndex);
    }
  
    cards.forEach(card => {
      card.style.display = 'block';
      setTimeout(() => card.style.display = '', 50);
    });
  }