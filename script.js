(function(){
  const h = document.getElementById('hamburger');
  const nav = document.querySelector('nav.navBar');
  if (!h || !nav) return;

  const setOpen = open => {
    nav.classList.toggle('active', !!open);
    h.setAttribute('aria-expanded', String(!!open));
    document.documentElement.classList.toggle('no-scroll', !!open);
    document.body.classList.toggle('no-scroll', !!open);
  };

  h.addEventListener('click', e => { e.stopPropagation(); setOpen(!nav.classList.contains('active')); });

  document.addEventListener('click', e => { if (!nav.contains(e.target) && !h.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  // close panel on link click (small delay)
  nav.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    // mobile: if clicking top-level dropdown trigger, toggle submenu
    const dropdownItem = e.target.closest('.dropdown');
    if (dropdownItem && window.matchMedia('(max-width:768px)').matches && e.target === dropdownItem.querySelector('a')) {
      e.preventDefault();
      dropdownItem.classList.toggle('expanded');
      const expanded = dropdownItem.classList.contains('expanded');
      dropdownItem.querySelector('a')?.setAttribute('aria-expanded', String(expanded));
      return;
    }
    setTimeout(()=> setOpen(false), 80);
  });
})();









/* intersection observer animation code */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // If you want animation to run only once:
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el))















/* footer section's js code */
// small script to update year in copyright
  (function(){
    var el = document.getElementById('copyright-year');
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  })();
