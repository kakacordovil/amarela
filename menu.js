document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const iconHam = document.getElementById('iconHam');
  const iconX = document.getElementById('iconX');
  let menuAberto = false;

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menuAberto = !menuAberto;
      if (iconHam && iconX) {
        iconHam.classList.toggle('hidden', menuAberto);
        iconX.classList.toggle('hidden', !menuAberto);
      }
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          menu.classList.add('hidden');
          if (iconHam && iconX) {
            iconHam.classList.remove('hidden');
            iconX.classList.add('hidden');
          }
          menuAberto = false;
        }
      });
    });
  }
});
