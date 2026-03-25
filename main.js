/* ═══════════════════════════════════════════════
   Dadi's Bayleaf Spice — Main JavaScript
   main.js
   ═══════════════════════════════════════════════ */

'use strict';

/* ─── STATE ─── */
let cartCount = 3;

const cartItems = [
  { emoji: '🌿', name: "Premium Bay Leaf",       qty: 1, price: 149 },
  { emoji: '🧡', name: "Dadi's Garam Masala",    qty: 1, price: 249 },
  { emoji: '🌶️', name: "Kashmiri Red Chilli",    qty: 1, price: 199 },
];

/* ─── MODAL HELPERS ─── */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal(id);
  }
}

/* ─── MOBILE NAV ─── */
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

function closeMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.remove('open');
}

/* ─── CART ─── */
function updateCartBadge() {
  const badge = document.querySelector('.badge');
  if (badge) badge.textContent = cartCount;
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  container.innerHTML = cartItems
    .map(item => `<p>${item.emoji} ${item.name} × ${item.qty} — ₹${item.price}</p>`)
    .join('');

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = `₹${total}`;
}

function addToCart(btn) {
  const card   = btn.closest('.product-card');
  const name   = card?.querySelector('h4')?.textContent ?? 'Product';
  const price  = parseInt(card?.querySelector('.price')?.textContent.replace('₹', '') ?? '0', 10);
  const emoji  = card?.querySelector('.product-img')?.textContent?.trim() ?? '🛒';

  const existing = cartItems.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ emoji, name, qty: 1, price });
  }

  cartCount++;
  updateCartBadge();
  renderCartItems();

  /* Visual feedback on button */
  btn.textContent              = '✓ Added';
  btn.style.background         = 'linear-gradient(135deg, #5a8a3a, #3a6a1a)';
  btn.style.color              = 'white';

  setTimeout(() => {
    btn.textContent    = '+ Add';
    btn.style.background = '';
    btn.style.color      = '';
  }, 1500);
}

/* ─── CATEGORY FILTER ─── */
function filterCategory(cat) {
  /* In a real SPA this would filter the products grid.
     For now we scroll into the products section. */
  const grid = document.querySelector('.products-grid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'center' });

  /* Highlight active category card */
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
  event?.currentTarget?.classList.add('active-cat');
}

/* ─── STICKY HEADER SHADOW ─── */
function handleHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  header.style.boxShadow = window.scrollY > 60
    ? '0 4px 40px rgba(0,0,0,0.5)'
    : '0 4px 30px rgba(0,0,0,0.4)';
}

/* ─── SCROLL TO TOP ─── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── NEWSLETTER ─── */
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="email"]');
  if (!input?.value) return;
  const btn = event.target.querySelector('button');
  if (btn) {
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#3a6a1a';
    setTimeout(() => {
      btn.textContent    = 'Subscribe';
      btn.style.background = '';
      input.value         = '';
    }, 2500);
  }
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  /* Scroll listener */
  window.addEventListener('scroll', handleHeaderScroll);

  /* Render initial cart */
  renderCartItems();
  updateCartBadge();

  /* Newsletter form */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);

  /* Close mobile nav on outside click */
  document.addEventListener('click', (e) => {
    const nav       = document.getElementById('mobileNav');
    const hamburger = document.getElementById('hamburger');
    if (
      nav?.classList.contains('open') &&
      !nav.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) {
      closeMenu();
    }
  });
});

/* ─── EXPOSE GLOBALS for inline HTML onclick attributes ─── */
window.openModal          = openModal;
window.closeModal         = closeModal;
window.closeModalOutside  = closeModalOutside;
window.toggleMenu         = toggleMenu;
window.closeMenu          = closeMenu;
window.addToCart          = addToCart;
window.filterCategory     = filterCategory;
window.scrollToTop        = scrollToTop;
