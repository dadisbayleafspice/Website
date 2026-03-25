// ═══════════════════════════════════════════════
// Dadi's Bayleaf Spice — React App Component
// App.jsx
// ═══════════════════════════════════════════════
//
// Usage (with Vite or CRA):
//   1. npm create vite@latest dadis-spice -- --template react
//   2. Replace src/App.jsx with this file
//   3. Place styles.css in src/ and import it here
//   4. Drop the logo PNG in src/assets/logo.png
//   5. npm run dev
//
// ═══════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
// import './styles.css';                   // ← uncomment when using with bundler
// import logoImg from './assets/logo.png'; // ← uncomment when using with bundler

/* ─── DATA ─── */
const NAV_LINKS = [
  { href: '#home',    label: 'Home' },
  { href: '#shop',    label: 'Shop' },
  { href: '#recipes', label: 'Recipes' },
  { href: '#blog',    label: 'Blog' },
  { href: '#about',   label: 'About Us' },
];

const FEATURES = [
  { icon: '🌿', title: '100% Natural',    desc: 'No artificial colours, flavours, or preservatives — ever.' },
  { icon: '🏺', title: 'Stone Ground',    desc: 'Traditional stone-grinding preserves natural oils & aroma.' },
  { icon: '🚚', title: 'Fast Delivery',   desc: 'Ships pan India in 2–5 days. Free above ₹999.' },
  { icon: '🏅', title: 'Award Winning',   desc: 'Recognised by India Food Awards 2023 for authenticity.' },
];

const CATEGORIES = [
  { id: 'whole',    emoji: '🫙', title: 'Whole Spices',     desc: 'Handpicked, sundried whole spices retaining full flavour profiles.',        count: 24 },
  { id: 'ground',   emoji: '🧂', title: 'Ground Masalas',   desc: 'Stone-ground spice powders for the finest curries and biryanis.',           count: 18 },
  { id: 'blends',   emoji: '🍛', title: 'Special Blends',   desc: "Dadi's secret masala blends passed down through generations.",              count: 12 },
  { id: 'seeds',    emoji: '🌾', title: 'Seeds & Herbs',    desc: 'Aromatic seeds and dried herbs from certified organic farms.',              count: 16 },
  { id: 'gifting',  emoji: '🎁', title: 'Gift Hampers',     desc: 'Beautifully curated spice hampers — perfect for every occasion.',           count: 8,  unit: 'Sets' },
  { id: 'regional', emoji: '🗺️', title: 'Regional Specials', desc: 'Exclusive spice mixes from the kitchens of Chhattisgarh.',               count: 10 },
];

const INITIAL_PRODUCTS = [
  { id: 1, emoji: '🌿', bg: 'p-bg1', badge: 'Bestseller', stars: 5, name: 'Premium Bay Leaf',      origin: 'Kerala',  price: 149 },
  { id: 2, emoji: '🌶️', bg: 'p-bg2', badge: 'New',        stars: 4, name: 'Kashmiri Red Chilli',   origin: 'Kashmir', price: 199 },
  { id: 3, emoji: '🟡', bg: 'p-bg3', badge: null,          stars: 5, name: 'Organic Turmeric',      origin: 'Erode',   price: 129 },
  { id: 4, emoji: '🫚', bg: 'p-bg4', badge: 'Sale',        stars: 5, name: "Dadi's Garam Masala",   origin: 'Secret Blend', price: 249 },
];

const RECIPES = [
  { emoji: '🍛', bg: 'r-bg1', tags: ['Main Course', '45 min'], title: "Dadi's Dal Makhani",   desc: "Slow-cooked black lentils with our special bay leaf and garam masala blend. A recipe passed down without ever being written." },
  { emoji: '🍚', bg: 'r-bg2', tags: ['Rice', '60 min'],        title: 'Royal Biryani Masala', desc: "Fragrant basmati layered with whole spices and Dadi's biryani blend — each grain kissed with tradition." },
  { emoji: '🫖', bg: 'r-bg3', tags: ['Drinks', '10 min'],      title: 'Masala Chai Blend',    desc: "The perfect morning chai with cardamom, ginger, cinnamon and a secret touch that Dadi never fully revealed." },
];

const BLOG_FEATURED = {
  emoji: '🌿',
  label: 'Featured',
  date: 'March 15, 2025',
  title: 'The Ancient Art of Stone Grinding — Why We Still Swear By It',
  excerpt: "Modern grinding methods use high-speed blades that generate heat, burning away the precious volatile oils that give spices their depth. Discover why Dadi's stone chakki makes all the difference...",
};

const BLOG_ITEMS = [
  { emoji: '🫙', date: 'Feb 28, 2025', title: 'How to Store Spices the Right Way — Preserving Flavour for Months' },
  { emoji: '🗺️', date: 'Feb 10, 2025', title: 'Chhattisgarhi Cuisine — The Unsung Jewel of Indian Regional Cooking' },
  { emoji: '🌶️', date: 'Jan 22, 2025', title: 'Bay Leaf — The Royal Spice That Changed Indian Cooking Forever' },
  { emoji: '🌿', date: 'Jan 5, 2025',  title: 'Organic vs. Conventional Spices — Does the Difference Matter?' },
];

const TESTIMONIALS = [
  { quote: "The moment I opened the garam masala jar, my entire kitchen smelled like my nani's house. Truly magical. Nothing compares to real stone-ground spices.", avatar: '👩🏽', name: 'Priya Sharma', loc: 'Mumbai' },
  { quote: "I've been a chef for 20 years and tried spices from around the world. Dadi's Bayleaf Spice has some of the purest, most aromatic bay leaves I've ever used.", avatar: '👨🏾', name: 'Chef Rohit Verma', loc: 'Delhi' },
  { quote: "The gift hamper I received for Diwali was absolutely stunning. The quality of each spice blend inside was extraordinary. My whole family was impressed!", avatar: '👩🏽‍🦱', name: 'Ananya Patel', loc: 'Ahmedabad' },
];

const MARQUEE_ITEMS = ['Pure & Natural', 'Stone Ground', 'No Preservatives', 'Farm to Kitchen', '100% Authentic', 'Traditional Recipes', 'Pan India Delivery'];

/* ─── SUB-COMPONENTS ─── */

/** Reusable section title block */
function SectionTitle({ tag, title, subtitle }) {
  return (
    <div className="section-title">
      <span className="section-tag">✦ {tag} ✦</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div className="title-ornament"><span>❋</span></div>
    </div>
  );
}

/** Star rating display */
function Stars({ count }) {
  return (
    <div className="stars">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </div>
  );
}

/** Single product card */
function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <div className={`product-img ${product.bg}`}>
        {product.emoji}
        {product.badge && <div className="product-badge">{product.badge}</div>}
      </div>
      <div className="product-info">
        <Stars count={product.stars} />
        <h4>{product.name}</h4>
        <div className="origin">✦ {product.origin} Origin</div>
        <div className="product-price">
          <span className="price">₹{product.price}</span>
          <button
            className="add-btn"
            onClick={handleAdd}
            style={added ? { background: 'linear-gradient(135deg,#5a8a3a,#3a6a1a)', color: 'white' } : {}}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Modal wrapper */
function Modal({ id, isOpen, onClose, title, children }) {
  /* Close on overlay click */
  const handleOverlay = (e) => {
    if (e.target.classList.contains('modal-overlay')) onClose();
  };

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      id={id}
      onClick={handleOverlay}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ─── HEADER COMPONENT ─── */
function Header({ cartCount, onCartClick, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="header"
      style={{ boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : '0 4px 30px rgba(0,0,0,0.4)' }}
    >
      <div className="header-top">
        ✦ &nbsp; Free shipping on orders above ₹999 &nbsp; · &nbsp; Use code DADI10 for 10% off your first order &nbsp; ✦
      </div>
      <div className="header-main">
        <a href="#home" className="logo-wrap">
          {/* Replace src with imported logoImg when using a bundler */}
          <img src="./logo.png" alt="Dadi's Bayleaf Spice" className="logo-img" />
        </a>

        <nav id="mainNav">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="search-wrap">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search spices..." />
          </div>

          <button className="icon-btn" onClick={onLoginClick}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Login</span>
          </button>

          <button className="icon-btn" onClick={onCartClick} style={{ position: 'relative' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="badge">{cartCount}</span>
            <span>Cart</span>
          </button>

          <button
            className="hamburger"
            id="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} id="mobileNav">
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ─── SECTION COMPONENTS ─── */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-pattern" />
      <div className="hero-content">
        <div className="hero-eyebrow"><span>Since 1952 · Raipur, India</span></div>
        <h1 className="hero-title">
          Royal Spices<br />from <em>Dadi's</em><br />Kitchen
        </h1>
        <p className="hero-sub">Where every pinch tells a story of tradition</p>
        <p className="hero-desc">
          Hand-curated, sun-dried, and stone-ground spices carrying the warmth of generations.
          From Dadi's kitchen to yours — pure, unadulterated Indian flavours that transform
          every meal into a celebration.
        </p>
        <div className="hero-btns">
          <a href="#shop" className="btn-gold">Explore Our Spices</a>
          <a href="#about" className="btn-outline">Our Story</a>
        </div>
      </div>
      <div className="hero-spices">
        {[
          { cls: 'sb1', emoji: '🌶️', label: 'Lal Mirch' },
          { cls: 'sb2', emoji: '🌿', label: 'Bay Leaf'  },
          { cls: 'sb3', emoji: '🫚', label: 'Jeera'     },
          { cls: 'sb4', emoji: '🧡', label: 'Haldi'     },
        ].map(s => (
          <div key={s.label} className={`spice-blob ${s.cls}`}>
            {s.emoji}<span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // duplicate for seamless loop
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i}>{item}{i < items.length - 1 && <span className="dot"> ✦ </span>}</span>
        ))}
      </div>
    </div>
  );
}

function FeaturesStrip() {
  return (
    <div className="features-strip">
      {FEATURES.map(f => (
        <div key={f.title} className="feature-item">
          <div className="feature-icon">{f.icon}</div>
          <h4>{f.title}</h4>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ShopCategories() {
  const scrollToProducts = () => {
    document.querySelector('.products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="section" id="shop">
      <SectionTitle tag="Our Collections" title="Shop by Category" subtitle="Explore India's finest spice heritage" />
      <div className="categories-grid">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="cat-card" onClick={scrollToProducts}>
            <div className="cat-card-inner">
              <span className="cat-emoji">{cat.emoji}</span>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <div className="cat-count">{cat.count} {cat.unit ?? 'Products'}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts({ onAddToCart }) {
  return (
    <section className="section alt-bg">
      <SectionTitle tag="Bestsellers" title="Featured Spices" subtitle="Most loved by our royal customers" />
      <div className="products-grid">
        {INITIAL_PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <a href="#" className="btn-gold">View All Products</a>
      </div>
    </section>
  );
}

function AboutBanner() {
  return (
    <section className="about-banner" id="about">
      <div className="about-text">
        <span className="section-tag">✦ Our Heritage ✦</span>
        <h2>Dadi's <em>Secret</em><br />Lives On</h2>
        <p>
          It all began in a small kitchen in Raipur, where our Dadi — our grandmother — would
          wake before sunrise to grind her spices on a stone chakki. She believed that every
          spice carried a soul, and that soul could only be preserved by hand.
        </p>
        <p>
          Seven decades later, we carry that same belief into every jar we fill. From curating
          the finest farms across India to using traditional stone-grinding methods, Dadi's
          Bayleaf Spice is a love letter to authentic Indian flavour.
        </p>
        <div className="about-stats">
          {[['70+', 'Years'], ['50+', 'Spices'], ['2L+', 'Families']].map(([num, label]) => (
            <div key={label} className="stat">
              <span className="num">{num}</span>
              <span className="label">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="about-visual">
        <div className="about-img-frame">
          <div className="about-corner tl" /><div className="about-corner tr" />
          <div className="about-corner bl" /><div className="about-corner br" />
          <div className="about-img-inner">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 100 }}>👵🏽</div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold-light)', fontSize: 20, marginTop: 12 }}>
                Dadi's Kitchen
              </div>
              <div style={{ color: 'rgba(245,234,216,0.5)', fontStyle: 'italic', fontSize: 15, marginTop: 6 }}>
                Raipur, 1952
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecipesSection() {
  return (
    <section className="section" id="recipes">
      <SectionTitle tag="From Our Kitchen" title="Dadi's Recipes" subtitle="Traditional recipes perfected over generations" />
      <div className="recipes-grid">
        {RECIPES.map(r => (
          <div key={r.title} className="recipe-card">
            <div className={`recipe-img ${r.bg}`}>{r.emoji}</div>
            <div className="recipe-meta">
              {r.tags.map(t => <span key={t} className="recipe-tag">{t}</span>)}
            </div>
            <div className="recipe-info">
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <a href="#" className="link">Read Recipe →</a>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <a href="#" className="btn-outline" style={{ color: 'var(--brown-dark)', borderColor: 'var(--brown)' }}>
          View All Recipes
        </a>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="section alt-bg" id="blog">
      <SectionTitle tag="Spice Stories" title="From The Blog" subtitle="Tales, traditions, and the wisdom of spices" />
      <div className="blog-grid">
        <div className="blog-featured">
          <div className="blog-img">
            {BLOG_FEATURED.emoji}
            <div className="blog-img-label">{BLOG_FEATURED.label}</div>
          </div>
          <div className="blog-content">
            <div className="date">{BLOG_FEATURED.date}</div>
            <h3>{BLOG_FEATURED.title}</h3>
            <p>{BLOG_FEATURED.excerpt}</p>
          </div>
        </div>
        <div className="blog-list">
          {BLOG_ITEMS.map(item => (
            <div key={item.title} className="blog-item">
              <div className="blog-item-icon">{item.emoji}</div>
              <div className="blog-item-text">
                <div className="date">{item.date}</div>
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <SectionTitle tag="What They Say" title="Words from Our Family" />
      <div className="testimonials-grid">
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="testimonial">
            <p>{t.quote}</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.avatar}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-loc">{t.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail]     = useState('');
  const [done, setDone]       = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setTimeout(() => { setDone(false); setEmail(''); }, 2500);
  };

  return (
    <section className="newsletter">
      <h2>Join Dadi's Circle</h2>
      <p>Recipes, spice wisdom & exclusive offers delivered to your inbox</p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" style={done ? { background: '#3a6a1a' } : {}}>
          {done ? '✓ Subscribed!' : 'Subscribe'}
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="./logo.png" alt="Dadi's Bayleaf Spice" />
          <p>Authentic Indian spices, ground with love and tradition since 1952. From Dadi's kitchen in Raipur to homes across India.</p>
          <div className="social-links">
            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
              <a key={i} className="social-btn" href="#">{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            {['Whole Spices', 'Ground Masalas', 'Special Blends', 'Seeds & Herbs', 'Gift Hampers'].map(c => (
              <li key={c}><a href="#">{c}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">📍 Raipur, Chhattisgarh</a></li>
            <li><a href="#">📞 +91 98765 43210</a></li>
            <li><a href="#">✉️ hello@dadisbayleaf.in</a></li>
            <li><a href="#">🕐 Mon–Sat, 9am–6pm</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Dadi's Bayleaf Spice · Crafted with <span>♥</span> in Raipur, India · All Rights Reserved
      </div>
    </footer>
  );
}

/* ─── CART MODAL ─── */
function CartModal({ isOpen, onClose, items }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <Modal id="cartModal" isOpen={isOpen} onClose={onClose} title="Your Cart">
      <div id="cartItems" style={{ minHeight: 80, border: '1px solid var(--border)', padding: 16, marginBottom: 20, background: 'white', fontSize: 15, color: 'var(--text-light)' }}>
        {items.length === 0
          ? <p style={{ fontStyle: 'italic' }}>Your cart is empty.</p>
          : items.map((item, i) => (
              <p key={i}>{item.emoji} {item.name} × {item.qty} — ₹{item.price * item.qty}</p>
            ))
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Playfair Display',serif", fontSize: 18, color: 'var(--brown-dark)', marginBottom: 20 }}>
        <span>Total</span><span>₹{total}</span>
      </div>
      <button className="btn-gold" style={{ width: '100%', textAlign: 'center' }}>Proceed to Checkout</button>
    </Modal>
  );
}

/* ─── LOGIN MODAL ─── */
function LoginModal({ isOpen, onClose }) {
  return (
    <Modal id="loginModal" isOpen={isOpen} onClose={onClose} title="Welcome Back">
      <input type="email" placeholder="Email address" />
      <input type="password" placeholder="Password" />
      <button className="btn-gold" style={{ marginTop: 8, width: '100%', textAlign: 'center' }}>Sign In</button>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-light)' }}>
        New here? <a href="#" style={{ color: 'var(--gold)' }}>Create an account</a>
      </p>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════
   ROOT APP COMPONENT
   ═══════════════════════════════════════════════ */
export default function App() {
  const [cartItems, setCartItems] = useState([
    { emoji: '🌿', name: 'Premium Bay Leaf',       qty: 1, price: 149 },
    { emoji: '🧡', name: "Dadi's Garam Masala",    qty: 1, price: 249 },
    { emoji: '🌶️', name: 'Kashmiri Red Chilli',    qty: 1, price: 199 },
  ]);
  const [cartOpen,  setCartOpen]  = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const handleAddToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === product.name);
      if (existing) {
        return prev.map(i => i.name === product.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { emoji: product.emoji, name: product.name, qty: 1, price: product.price }];
    });
  }, []);

  /* Lock body scroll when a modal is open */
  useEffect(() => {
    document.body.style.overflow = (cartOpen || loginOpen) ? 'hidden' : '';
  }, [cartOpen, loginOpen]);

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
      />

      <main>
        <Hero />
        <Marquee />
        <FeaturesStrip />
        <ShopCategories />
        <FeaturedProducts onAddToCart={handleAddToCart} />
        <AboutBanner />
        <RecipesSection />
        <BlogSection />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />

      {/* Scroll to top */}
      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>

      {/* Modals */}
      <CartModal  isOpen={cartOpen}  onClose={() => setCartOpen(false)}  items={cartItems} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
