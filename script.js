const imlec = document.getElementById('imleç');

document.addEventListener('mousemove', e => {
  imlec.style.left = e.clientX + 'px';
  imlec.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .kahve-kart, .bilgi-kart').forEach(el => {
  el.addEventListener('mouseenter', () => imlec.classList.add('büyük'));
  el.addEventListener('mouseleave', () => imlec.classList.remove('büyük'));
});

const ustmenu = document.getElementById('ustmenu');

window.addEventListener('scroll', () => {
  ustmenu.classList.toggle('sabit', window.scrollY > 60);
});

const acilElemanlar = document.querySelectorAll('.acil');

const gorunumIzleyici = new IntersectionObserver((girişler) => {
  girişler.forEach((giriş, i) => {
    if (giriş.isIntersecting) {
      setTimeout(() => giriş.target.classList.add('görünür'), i * 80);
      gorunumIzleyici.unobserve(giriş.target);
    }
  });
}, { threshold: 0.1 });

acilElemanlar.forEach(el => gorunumIzleyici.observe(el));

document.querySelectorAll('.sekme').forEach(sekmeBtn => {
  sekmeBtn.addEventListener('click', () => {

    document.querySelectorAll('.sekme').forEach(b => b.classList.remove('aktif'));
    document.querySelectorAll('.sekme-panel').forEach(p => p.classList.remove('aktif'));

    sekmeBtn.classList.add('aktif');
    const hedef = document.getElementById('sekme-' + sekmeBtn.dataset.sekme);
    hedef.classList.add('aktif');

    hedef.querySelectorAll('.acil').forEach((el, i) => {
      el.classList.remove('görünür');
      setTimeout(() => el.classList.add('görünür'), i * 100);
    });
  });
});

const cubukIzleyici = new IntersectionObserver((girişler) => {
  girişler.forEach(giriş => {
    if (giriş.isIntersecting) {
      const dolgu = giriş.target.querySelector('.yogunluk-dolu');
      if (dolgu) {
        const genislik = dolgu.style.width;
        dolgu.style.width = '0';
        setTimeout(() => { dolgu.style.width = genislik; }, 150);
      }
    }
  });
}, { threshold: .5 });

document.querySelectorAll('.kahve-kart').forEach(kart => cubukIzleyici.observe(kart));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hedef = document.querySelector(link.getAttribute('href'));
    if (hedef) {
      e.preventDefault();
      hedef.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const sayacIzleyici = new IntersectionObserver((girişler) => {
  girişler.forEach(giriş => {
    if (!giriş.isIntersecting) return;

    const el = giriş.target;
    const metin = el.textContent;
    const sayi  = parseFloat(metin.replace(/[^0-9.]/g, ''));
    const sonek = metin.replace(/[0-9.]/g, '');

    if (!sayi) return;

    let baslangic = 0;
    const sure = 1400;

    const adim = (zaman) => {
      if (!baslangic) baslangic = zaman;
      const ilerleme = Math.min((zaman - baslangic) / sure, 1);
      const yuzme = 1 - Math.pow(1 - ilerleme, 3);
      const gosterilenSayi = sayi < 100
        ? (sayi * yuzme).toFixed(sayi % 1 !== 0 ? 1 : 0)
        : Math.floor(sayi * yuzme);
      el.textContent = gosterilenSayi + sonek;
      if (ilerleme < 1) requestAnimationFrame(adim);
    };

    requestAnimationFrame(adim);
    sayacIzleyici.unobserve(el);
  });
}, { threshold: .8 });

document.querySelectorAll('.rakam-sayi').forEach(el => sayacIzleyici.observe(el));
