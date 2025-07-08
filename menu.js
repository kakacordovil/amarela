document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  let menuAberto = false;

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menuAberto = !menuAberto;
      menuBtn.textContent = menuAberto ? '✖' : '☰';
    });

    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          menu.classList.add('hidden');
          menuBtn.textContent = '☰';
          menuAberto = false;
        }
      });
    });
  }
});