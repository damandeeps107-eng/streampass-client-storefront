import os

storefront_dir = '/Users/user/.gemini/antigravity-ide/brain/1e50b2ea-9de2-41f7-bb1c-ff81182ba123/streampass-client-storefront'

# 1. Update index.html
index_path = os.path.join(storefront_dir, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_drawer = '''  <!-- MOBILE DRAWER OVERLAY -->
  <div class="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>

  <!-- MOBILE DRAWER -->
  <div class="mobile-drawer" id="mobile-drawer">
    <div class="mobile-drawer-header">
      <span class="mobile-drawer-title">Navigation Menu</span>
      <button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close Menu">&times;</button>
    </div>
    <div class="mobile-drawer-links">
      <a href="#hero" class="drawer-nav-link active">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <span>Home</span>
      </a>
      <a href="#plans" class="drawer-nav-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0"/><path d="M2 9.5h20"/></svg>
        <span>Plans & Pricing</span>
      </a>
      <a href="#how-it-works" class="drawer-nav-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
        <span>How It Works</span>
      </a>
      <a href="#reviews" class="drawer-nav-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>Reviews & Ratings</span>
      </a>
      <a href="#faqs" class="drawer-nav-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span>FAQ</span>
      </a>
    </div>
    
    <div class="mobile-drawer-actions">
      <button class="btn btn-primary btn-block" id="mobile-nav-cta-order">
        <span>Explore All Plans</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      
      <div class="mobile-drawer-sub-actions">
        <button class="drawer-sub-btn" id="mobile-nav-open-track">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>Track Order</span>
        </button>
        <button class="drawer-sub-btn" id="mobile-nav-open-bot">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <span>Support</span>
        </button>
      </div>
    </div>
  </div>'''

# Replace old drawer div in index.html
start_tag = '<!-- MOBILE DRAWER -->'
end_tag = '</main>'

if start_tag in html and '<main>' in html:
    prefix = html.split(start_tag)[0]
    suffix = html.split('<main>')[1]
    html = prefix + new_drawer + '\n\n  <main>' + suffix

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('✅ index.html updated successfully!')

# 2. Update header.css
header_css_path = os.path.join(storefront_dir, 'src/styles/header.css')
header_css_content = '''/* HEADER STYLES */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  height: var(--nav-height, 64px);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-icon-box {
  width: 36px;
  height: 36px;
  background-color: var(--accent-red, #dc2626);
  color: #ffffff;
  border-radius: var(--radius-md, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon-box svg {
  width: 20px;
  height: 20px;
}

.brand-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-name-text {
  font-family: var(--font-display, inherit);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  letter-spacing: -0.02em;
}

.badge-ott {
  background-color: var(--bg-surface, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  color: var(--text-muted, #64748b);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}

.nav-link {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-secondary, #475569);
  transition: color var(--transition-fast, 0.2s);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--accent-red, #dc2626);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-bot-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  color: var(--text-secondary, #475569);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-sm, 6px);
  cursor: pointer;
  transition: all var(--transition-fast, 0.2s);
}

.nav-bot-btn:hover {
  background-color: #e2e8f0;
  color: var(--text-primary, #0f172a);
}

.mobile-menu-btn {
  display: none;
}

/* ==========================================================================
   MOBILE DRAWER & OVERLAY STYLES (STRICTLY HIDDEN BY DEFAULT)
   ========================================================================== */

/* Mobile Backdrop Overlay - ALWAYS HIDDEN BY DEFAULT */
.mobile-drawer-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.mobile-drawer-overlay.active {
  display: block !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* Mobile Drawer Panel - STRICTLY HIDDEN BY DEFAULT */
.mobile-drawer {
  display: none !important;
  position: fixed !important;
  top: var(--nav-height, 64px) !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-height: calc(100vh - var(--nav-height, 64px)) !important;
  overflow-y: auto !important;
  background: #ffffff !important;
  border-bottom: 2px solid #e2e8f0 !important;
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.18) !important;
  padding: 16px 20px 24px 20px !important;
  z-index: 1001 !important;
  flex-direction: column !important;
  gap: 16px !important;
  transform: translateY(-8px);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  pointer-events: none;
}

.mobile-drawer.open,
.mobile-drawer.active {
  display: flex !important;
  transform: translateY(0) !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* Drawer Header inside drawer */
.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
}

.mobile-drawer-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

.mobile-drawer-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
}

/* Drawer Nav Links */
.mobile-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s ease;
}

.drawer-nav-link svg {
  color: #64748b;
  transition: color 0.15s ease;
}

.drawer-nav-link:hover,
.drawer-nav-link.active {
  background: #f8fafc;
  color: #dc2626;
}

.drawer-nav-link:hover svg,
.drawer-nav-link.active svg {
  color: #dc2626;
}

/* Drawer Actions section */
.mobile-drawer-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
}

.mobile-drawer-sub-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.drawer-sub-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #334155;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.drawer-sub-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* ==========================================================================
   MEDIA QUERIES (MOBILE <= 960px)
   ========================================================================== */
@media (max-width: 960px) {
  /* Hide desktop navigation links */
  .nav-menu, nav.nav-menu, .site-header .nav-links, .nav-links {
    display: none !important;
  }

  /* Hide secondary desktop buttons on header bar on mobile */
  .nav-actions #nav-open-track,
  .nav-actions #nav-open-bot {
    display: none !important;
  }

  .nav-actions {
    gap: 8px !important;
  }

  #nav-cta-order {
    padding: 7px 12px !important;
    font-size: 0.8rem !important;
    white-space: nowrap !important;
  }

  /* Show mobile menu hamburger icon */
  .mobile-menu-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #0f172a;
    cursor: pointer;
  }
}
'''

with open(header_css_path, 'w', encoding='utf-8') as f:
    f.write(header_css_content)
print('✅ header.css updated successfully!')

# 3. Clean up main.css so it doesn't conflict with header.css
main_css_path = os.path.join(storefront_dir, 'src/styles/main.css')
with open(main_css_path, 'r', encoding='utf-8') as f:
    main_css = f.read()

# Remove old .mobile-drawer rules in main.css
lines = main_css.split('\n')
filtered_lines = []
skip = False
for line in lines:
    if 'PERFECT MOBILE HEADER & DRAWER CLOSE-BY-DEFAULT FIX' in line or '.mobile-drawer {' in line:
        skip = True
    if skip and '}' in line and not '.mobile-drawer' in line:
        skip = False
        continue
    if not skip:
        filtered_lines.append(line)

with open(main_css_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(filtered_lines))
print('✅ main.css cleaned successfully!')

