
function openCheckoutForPlatform(platformId) {
  const platform = PLATFORMS_DATA.find(p => p.id === platformId);
  state.checkout.platformId = platformId;
  const platformSelect = document.getElementById('checkout-platform-select');
  if (platformSelect) platformSelect.value = platformId;
  
  if (platform && platform.plans && platform.plans.length > 0) {
    state.checkout.planId = platform.plans[0].id;
  } else {
    state.checkout.planId = platformId + '-6m';
  }
  
  updateCheckoutPlansDropdown();
  updateCheckoutSummary();
  updatePlatformDetailsInspector(platformId);
  
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('active');
}

function updatePlatformDetailsInspector(platformId) {
  const platform = PLATFORMS_DATA.find(p => p.id === platformId) || PLATFORMS_DATA[0];
  const logoEl = document.getElementById('details-platform-logo');
  const nameEl = document.getElementById('details-platform-name');
  const subEl = document.getElementById('details-platform-sub');
  const btn6m = document.getElementById('btn-details-6m');
  const btn1y = document.getElementById('btn-details-1y');
  const qualityEl = document.getElementById('details-quality-text');

  if (logoEl) logoEl.src = platform.logoImg;
  if (nameEl) nameEl.textContent = platform.name + ' Ultra HD Pass';
  if (subEl) subEl.textContent = '✓ Verified Active Pass • 6 Months: ₹199 | 1 Year: ₹340';
  if (qualityEl) qualityEl.textContent = (platform.plans && platform.plans[0]?.quality) || '4K Ultra HD + HDR';

  if (btn6m) {
    btn6m.textContent = 'Select 6 Months (₹199)';
    btn6m.onclick = (e) => {
      e.stopPropagation();
      openCheckoutForPlan(platform.id, (platform.plans && platform.plans[0]?.id) || (platform.id + '-6m'));
    };
  }
  if (btn1y) {
    btn1y.textContent = 'Select 1 Year (₹340)';
    btn1y.onclick = (e) => {
      e.stopPropagation();
      openCheckoutForPlan(platform.id, (platform.plans && platform.plans[1]?.id) || (platform.id + '-1y'));
    };
  }
}

function getMerchantUpiConfig() {
  const savedUpi = localStorage.getItem("streamPass_merchant_upi_id");
  const savedName = localStorage.getItem("streamPass_merchant_name");
  const savedBinance = localStorage.getItem("streamPass_merchant_binance_id");
  const savedUsdt = localStorage.getItem("streamPass_merchant_usdt_address");
  return {
    upiId: savedUpi || "pay.streampass@paytm",
    merchantName: savedName || "StreamPass Digital Services",
    binanceId: savedBinance || "284910384",
    usdtAddress: savedUsdt || "0xbC2916Fa5F8436704985A264B119F960Ad8F11F5"
  };
}

const STORAGE_KEY = 'streamPass_all_client_orders';

function saveNewClientOrder(order) {
  if (!order.status) order.status = 'Pending';
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const orders = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save order', e);
  }
}
/**
 * StreamPass OTT Marketplace Main Application Controller
 * Standardized 2 Plans per OTT: 6 Months (₹199) and 1 Year (₹340)
 * High-Trust Layout with 100% Replacement & Refund Protection
 */

import {
  SITE_CONFIG,
  FEATURED_DEAL,
  PLATFORMS_DATA,
  CATEGORIES,
  WHY_CHOOSE_US,
  HOW_IT_WORKS,
  FAQS
} from '../data/catalog.js';

// Application State - Default to 'netflix' for clean uncrowded comparison
const state = {
  activeCategory: 'all',
  searchQuery: '',
  activePlatformFilter: 'netflix',
  checkout: {
    platformId: '',
    planId: '',
    quantity: 1,
    fullName: '',
    whatsapp: '',
    email: '',
    deviceNotes: '',
    paymentMethod: 'amazon',
    lastOrder: null
  }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initLiveSalesTicker();
  initApp();
});

function initApp() {
  renderBrandElements();
  renderFeaturedDeal();
  renderCategoryFilters();
  renderPlatforms();
  renderPlatformTabs();
  renderIndividualPlans();
  renderWhyChooseUs();
  renderHowItWorks();
  renderFaqs();
  setupEventListeners();
  setupScrollEffects();
  setupTrackOrderFeature();
  initSupportBot();
  initVipPopup();
}

/**
 * 1. Global Brand & Config Binding
 */
function renderBrandElements() {
  document.querySelectorAll('.brand-name-text').forEach(el => el.textContent = SITE_CONFIG.brandName);
  document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());
  
  // Direct WhatsApp links removed in favor of 24/7 Support Bot
}

/**
 * 2. Featured Combo Deal
 */
function renderFeaturedDeal() {
  const container = document.getElementById('featured-deal-container');
  if (!container) return;

  const deal = FEATURED_DEAL;
  const savingsPercent = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);

  container.innerHTML = `
    <div class="deal-ambient-glow"></div>
    <div class="deal-card">
      <div class="deal-left">
        <div class="deal-badge-row">
          <span class="deal-main-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${deal.badge}
          </span>
          <span class="deal-savings-tag">Save ${savingsPercent}% Today</span>
        </div>

        <h3 class="deal-title">${deal.title}</h3>

        <div class="deal-price-wrapper">
          <div class="deal-price">
            ${SITE_CONFIG.currency}${deal.price} <span class="period">/ ${deal.billingPeriod}</span>
          </div>
          <div class="deal-original-price">${SITE_CONFIG.currency}${deal.originalPrice}</div>
        </div>

        <div class="deal-included-platforms">
          <span class="deal-platforms-label">Included Platforms (${PLATFORMS_DATA.length} Verified Services):</span>
          <div class="deal-included-logos">
            ${PLATFORMS_DATA.map(p => `
              <div class="deal-logo-thumb" title="${p.name}">
                <img src="${p.logoImg}" alt="${p.name}" />
              </div>
            `).join("")}
          </div>
        </div>

        <ul class="deal-features-list">
          ${deal.features.map(f => `
            <li class="deal-feature-item">
              <span class="deal-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <div class="deal-actions">
          <div class="deal-cta-row">
            <button class="btn btn-deal btn-lg" id="btn-get-featured-deal">
              <span>Get Now — ${SITE_CONFIG.currency}${deal.price}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="btn btn-secondary btn-lg" id="btn-deal-ask-bot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="4" y="8" width="16" height="12" rx="4"/><line x1="9" y1="13" x2="9.01" y2="13" stroke-width="3"/><line x1="15" y1="13" x2="15.01" y2="13" stroke-width="3"/><path d="M9 17h6"/></svg>
              <span>Ask Support Bot</span>
            </button>
          </div>
          <p class="deal-disclaimer">
            * Disclaimer: ${deal.disclaimer}
          </p>
        </div>
      </div>

      <div class="deal-right">
        <div class="deal-image-frame">
          <img src="${deal.image}" alt="${deal.title}" loading="lazy" />
          <div class="deal-pass-overlay">
            <span class="pass-label">VIP STREAM PASS</span>
            <span class="pass-id">ID: ALL-OTT-365</span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-get-featured-deal")?.addEventListener("click", () => {
    openCheckoutForDeal(deal);
  });
  document.getElementById("btn-deal-ask-bot")?.addEventListener("click", () => {
    openSupportBotWithPrompt("vip");
  });
}

/**
 * 3. Categories & Platform Showcase
 */
function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="filter-btn ${cat.id === state.activeCategory ? 'active' : ''}" data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.activeCategory = e.currentTarget.dataset.category;
      renderPlatforms();
    });
  });
}

function renderPlatforms() {
  const grid = document.getElementById('platforms-grid');
  if (!grid) return;

  let filtered = PLATFORMS_DATA;

  // Filter by category
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  // Filter by search query
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="platforms-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h4>No OTT Platforms Found</h4>
        <p>Try searching for Netflix, YouTube, Spotify, Prime, Hotstar, or clear your filters.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(platform => `
    <div class="platform-card" style="--platform-accent: ${platform.accentColor}; --platform-glow: ${platform.accentGlow};">
      <div>
        <div class="platform-card-header">
          <div class="platform-icon-frame">
            <img src="${platform.logoImg}" alt="${platform.name} Logo" class="platform-logo-img" loading="lazy" />
          </div>
          <div class="platform-meta">
            <h3 class="platform-name">${platform.name}</h3>
            <span class="platform-plan-count">2 Verified Plans (6M & 1Y)</span>
          </div>
        </div>

        <p class="platform-desc">${platform.description}</p>
      </div>

      <div class="platform-card-footer">
        <div class="platform-price-box">
          <span class="price-label">Starting from</span>
          <div class="price-val">
            ${SITE_CONFIG.currency}${platform.startingPrice}<span class="price-period">/6 mos</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm btn-view-platform-plans" data-platform-id="${platform.id}">
          <span>View Plans</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-view-platform-plans').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.dataset.platformId;
      switchPlatformFilter(pId);
      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/**
 * 4. Platform Filter Switcher for Individual Plans
 */
function renderPlatformTabs() {
  const container = document.getElementById('platform-tabs');
  if (!container) return;

  const platformTabs = PLATFORMS_DATA.map(p => `
    <button class="tab-btn ${state.activePlatformFilter === p.id ? 'active' : ''}" data-platform-id="${p.id}" style="--platform-accent: ${p.accentColor}">
      <img src="${p.logoImg}" alt="${p.name}" class="tab-logo-img" />
      <span>${p.name}</span>
    </button>
  `).join('');

  const allTab = `
    <button class="tab-btn ${state.activePlatformFilter === 'all' ? 'active' : ''}" data-platform-id="all">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
      <span>All Platforms Overview</span>
    </button>
  `;

  container.innerHTML = platformTabs + allTab;

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.dataset.platformId;
      switchPlatformFilter(pId);
    });
  });
}

function switchPlatformFilter(platformId) {
  state.activePlatformFilter = platformId;
  const container = document.getElementById('platform-tabs');
  if (container) {
    container.querySelectorAll('.tab-btn').forEach(b => {
      if (b.dataset.platformId === platformId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }
  renderIndividualPlans();
}

/**
 * 5. Clean, Uncluttered Side-by-Side Comparison Layout with 100% Replacement & Refund Protection
 */
function renderIndividualPlans() {
  const container = document.getElementById('individual-plans-grid');
  if (!container) return;

  // Single Platform Selected (Default & Cleanest: 2 Side-by-Side Cards)
  if (state.activePlatformFilter !== 'all') {
    const platform = PLATFORMS_DATA.find(p => p.id === state.activePlatformFilter) || PLATFORMS_DATA[0];

    container.innerHTML = `
      <!-- Platform Active Info Banner -->
      <div class="platform-active-banner" style="--platform-accent: ${platform.accentColor};">
        <div class="banner-left">
          <div class="banner-logo-box">
            <img src="${platform.logoImg}" alt="${platform.name} Logo" class="banner-logo-img" />
          </div>
          <div class="banner-details">
            <h3>${platform.name} Plans</h3>
            <p>${platform.tagline} • Genuine Access Guaranteed</p>
          </div>
        </div>
        <div class="banner-badge-box">
          <span class="banner-trust-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            100% Replacement & Refund Warranty
          </span>
        </div>
      </div>

      <!-- 2 Clean Side-by-Side Comparison Cards (6 Months vs 1 Year) -->
      <div class="plans-comparison-grid">
        ${renderPlanCardHtml(platform.plans[0], platform, false)}
        ${renderPlanCardHtml(platform.plans[1], platform, true)}
      </div>

      <!-- Dedicated Section-Level Replacement & Refund Assurance Card -->
      ${renderRefundAssuranceHtml(platform.name)}
    `;
  } else {
    // All Platforms Selected: Render grouped cleanly by platform with clear headers
    let html = '';
    PLATFORMS_DATA.forEach(platform => {
      html += `
        <div style="margin-bottom: 50px;">
          <div class="platform-active-banner" style="--platform-accent: ${platform.accentColor};">
            <div class="banner-left">
              <div class="banner-logo-box">
                <img src="${platform.logoImg}" alt="${platform.name} Logo" class="banner-logo-img" />
              </div>
              <div class="banner-details">
                <h3>${platform.name} Plans</h3>
                <p>${platform.tagline}</p>
              </div>
            </div>
            <div class="banner-badge-box">
              <span class="banner-trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                100% Warranty
              </span>
            </div>
          </div>

          <div class="plans-comparison-grid">
            ${renderPlanCardHtml(platform.plans[0], platform, false)}
            ${renderPlanCardHtml(platform.plans[1], platform, true)}
          </div>
        </div>
      `;
    });

    html += renderRefundAssuranceHtml("All Streaming Platforms");
    container.innerHTML = html;
  }

  // Attach button events
  container.querySelectorAll('.btn-buy-plan').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.dataset.platformId;
      const planId = e.currentTarget.dataset.planId;
      openCheckoutForPlan(pId, planId);
    });
  });

  container.querySelectorAll('.btn-view-plan-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.dataset.platformId;
      const planId = e.currentTarget.dataset.planId;
      openPlanDetailsModal(pId, planId);
    });
  });
}

function renderPlanCardHtml(plan, platform, isBestValue) {
  const savings = Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);

  return `
    <div class="plan-card ${plan.popular || isBestValue ? 'is-popular' : ''}" style="--platform-accent: ${platform.accentColor}; --platform-glow: ${platform.accentGlow};">
      ${isBestValue ? `<div class="popular-banner">BEST VALUE</div>` : ''}

      <div>
        <div class="plan-top-row">
          <span class="plan-tier-badge ${isBestValue ? 'badge-1y' : ''}">
            <img src="${platform.logoImg}" alt="${platform.name}" class="pill-logo-img" />
            ${isBestValue ? '1 YEAR ANNUAL PASS' : '6 MONTH PASS'}
          </span>
          <span class="plan-duration-badge">${plan.duration}</span>
        </div>

        <h3 class="plan-title">${platform.name} — ${plan.duration}</h3>
        <p class="plan-type-sub">${plan.type}</p>

        <div class="plan-price-block">
          <div class="plan-price-amount">${SITE_CONFIG.currency}${plan.price}</div>
          <div class="plan-price-orig">${SITE_CONFIG.currency}${plan.originalPrice}</div>
          <span class="plan-save-tag">SAVE ${savings}%</span>
        </div>

        <!-- Highlighted Device, Screen & Quality Specifications -->
        <div class="plan-specs-pills">
          <div class="spec-item" style="border: 1px solid rgba(34, 197, 94, 0.4); background: rgba(34, 197, 94, 0.08);">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Account Stability: <strong class="spec-highlight" style="color:#22c55e;">🔒 100% No Logout Guarantee</strong></span>
          </div>
          <div class="spec-item">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span>Quality: <strong class="spec-highlight" style="color:var(--accent-cyan);">${plan.quality}</strong></span>
          </div>
          <div class="spec-item">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            <span>Devices Supported: <strong class="spec-highlight">${plan.devices}</strong></span>
          </div>
          <div class="spec-item">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Simultaneous Limit: <strong class="spec-highlight" style="color:var(--accent-gold);">${plan.deviceLimit}</strong></span>
          </div>
          <div class="spec-item">
            <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            <span>Warranty: <strong class="spec-highlight" style="color:var(--accent-green);">${plan.warranty}</strong></span>
          </div>
        </div>

        <!-- NEW: Dedicated Problem & Refund Protection Box on Every Plan -->
        <div class="plan-refund-protection-box">
          <svg class="refund-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div class="refund-protection-text">
            <h5>🔒 100% No Logout Guarantee & Replacement Protection</h5>
            <p>Dedicated PIN-locked profiles guarantee ZERO sudden logouts or password errors. Facing any screen or login issue? Credentials swapped in 15–30 mins or 100% pro-rated refund.</p>
          </div>
        </div>

        <div class="plan-features-block">
          <ul class="plan-features-list">
            ${plan.features.map(f => `
              <li class="plan-feature-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="plan-buttons-group">
        <button class="btn btn-primary btn-block btn-buy-plan" data-platform-id="${platform.id}" data-plan-id="${plan.id}">
          <span>Buy Now — ${SITE_CONFIG.currency}${plan.price}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
        <button class="btn-details btn-view-plan-details" data-platform-id="${platform.id}" data-plan-id="${plan.id}">
          Plan Details & Refund Terms
        </button>
      </div>
    </div>
  `;
}

function renderRefundAssuranceHtml(platformContext) {


  return `
    <div class="refund-assurance-section">
      <div class="refund-assurance-header">
        <div class="assurance-title-group">
          <div class="assurance-main-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <div>
            <h3>Our 100% Replacement & Refund Promise</h3>
            <p>Every subscription for ${platformContext} is backed by our customer-first guarantee.</p>
          </div>
        </div>

        <button class="assurance-bot-cta" id="btn-refund-assurance-bot">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <span>Instant Refund / Swap Bot</span>
        </button>
      </div>

      <div class="assurance-pillars-grid">
        <div class="assurance-pillar-card">
          <div class="pillar-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h4>15–30 Min Rapid Replacement</h4>
          <p>Login error, incorrect PIN, or profile issue? Open our 24/7 Support Bot and our technicians will swap your profile within 15–30 minutes.</p>
        </div>

        <div class="assurance-pillar-card">
          <div class="pillar-icon gold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h4>100% Pro-Rated Refund Policy</h4>
          <p>If any technical or platform issue cannot be resolved within 24 hours, you receive an immediate UPI refund for all unused days. Zero hassle.</p>
        </div>

        <div class="assurance-pillar-card">
          <div class="pillar-icon cyan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <h4>Full Active Warranty</h4>
          <p>Protected for the full 180 days (6 Months) or 365 days (1 Year). No sudden terminations, no fine print surprises.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * 6. Why Choose Us Section
 */
function renderWhyChooseUs() {
  const container = document.getElementById('why-choose-us-grid');
  if (!container) return;

  container.innerHTML = WHY_CHOOSE_US.map(item => `
    <div class="why-card">
      <div class="why-icon-box">
        ${item.icon}
      </div>
      <h3 class="why-title">${item.title}</h3>
      <p class="why-desc">${item.description}</p>
    </div>
  `).join('');
}

/**
 * 7. How It Works Section
 */
function renderHowItWorks() {
  const container = document.getElementById('how-it-works-timeline');
  if (!container) return;

  container.innerHTML = HOW_IT_WORKS.map(item => `
    <div class="step-card">
      <div class="step-number-bubble">${item.step}</div>
      <h3 class="step-title">${item.title}</h3>
      <p class="step-desc">${item.description}</p>
    </div>
  `).join('');
}

/**
 * 8. FAQ Accordion
 */
function renderFaqs() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  container.innerHTML = FAQS.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-trigger" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${faq.question}</span>
        <span class="faq-icon-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div class="faq-answer-wrapper">
        <p class="faq-answer-text">${faq.answer}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const currentItem = e.currentTarget.closest('.faq-item');
      const isActive = currentItem.classList.contains('active');

      container.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        currentItem.classList.add('active');
        e.currentTarget.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 9. Plan Details Modal
 */
function openPlanDetailsModal(platformId, planId) {
  const modal = document.getElementById('plan-detail-modal');
  const modalContent = document.getElementById('plan-detail-modal-body');
  if (!modal || !modalContent) return;

  const platform = PLATFORMS_DATA.find(p => p.id === platformId);
  if (!platform) return;
  const plan = platform.plans.find(p => p.id === planId);
  if (!plan) return;

  modalContent.innerHTML = `
    <div class="plan-detail-header" style="--platform-accent: ${platform.accentColor};">
      <div class="plan-detail-icon">
        <img src="${platform.logoImg}" alt="${platform.name} Logo" class="modal-logo-img" />
      </div>
      <div class="plan-detail-title-group">
        <h3>${platform.name} — ${plan.name}</h3>
        <p>${plan.type} • ${plan.duration} Access</p>
      </div>
    </div>

    <div class="plan-specs-grid">
      <div class="spec-cell">
        <span class="cell-label">Duration</span>
        <span class="cell-value">${plan.duration} (${plan.durationDays} Days)</span>
      </div>
      <div class="spec-cell">
        <span class="cell-label">Streaming Quality</span>
        <span class="cell-value" style="color:var(--accent-cyan);">${plan.quality}</span>
      </div>
      <div class="spec-cell">
        <span class="cell-label">Supported Devices</span>
        <span class="cell-value">${plan.devices}</span>
      </div>
      <div class="spec-cell">
        <span class="cell-label">Simultaneous Screens</span>
        <span class="cell-value" style="color:var(--accent-gold);">${plan.deviceLimit || '1 Screen'}</span>
      </div>
      <div class="spec-cell">
        <span class="cell-label">Activation SLA</span>
        <span class="cell-value">${plan.activation}</span>
      </div>
      <div class="spec-cell">
        <span class="cell-label">Warranty</span>
        <span class="cell-value" style="color:var(--accent-green);">${plan.warranty}</span>
      </div>
    </div>

    <!-- Replacement & Refund Policy in Modal -->
    <div class="plan-refund-protection-box" style="margin-bottom: 22px;">
      <svg class="refund-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
      <div class="refund-protection-text">
        <h5>100% Replacement & Money-Back Policy</h5>
        <p>In case of any login issue, PIN error, or unexpected outage, contact our WhatsApp support with your Order ID. We resolve it in 15–30 minutes. If unresolved within 24 hours, you receive an immediate pro-rated UPI refund.</p>
      </div>
    </div>

    <div class="plan-included-block">
      <h4>Included Plan Features:</h4>
      <ul class="plan-included-list">
        ${plan.features.map(f => `
          <li class="plan-included-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="plan-terms-box">
      <p>
        <strong>Terms & Guidelines:</strong> Use login credentials strictly on authorized number of devices (${plan.deviceLimit}). Do not modify account passwords or emails. Active replacement warranty covers unexpected outages during the full ${plan.duration} validity.
      </p>
    </div>

    <div class="plan-modal-footer">
      <div class="modal-price-display">
        <span class="price-sub">Total Price (${plan.duration})</span>
        <div class="price-number">${SITE_CONFIG.currency}${plan.price}</div>
      </div>
      <button class="btn btn-primary btn-lg" id="btn-modal-proceed-order">
        <span>Proceed to Order</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  `;

  document.getElementById('btn-modal-proceed-order')?.addEventListener('click', () => {
    closeModal(modal);
    openCheckoutForPlan(platformId, planId);
  });

  openModal(modal);
}

/**
 * 10. Checkout Flow
 */
function openCheckoutForPlan(platformId, planId) {
  state.checkout.platformId = platformId;
  state.checkout.planId = planId;
  state.checkout.quantity = 1;
  showCheckoutModal();
}

function openCheckoutForDeal(deal) {
  state.checkout.platformId = 'featured-deal';
  state.checkout.planId = deal.id;
  state.checkout.quantity = 1;
  showCheckoutModal();
}

function showCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  // Populate platform select
  const platformSelect = document.getElementById('checkout-platform-select');
  if (platformSelect) {
    let options = `<option value="featured-deal" ${state.checkout.platformId === 'featured-deal' ? 'selected' : ''}>★ ALL OTT — 1 YEAR PREMIUM (Combo Deal - ₹1499)</option>`;
    PLATFORMS_DATA.forEach(p => {
      options += `<option value="${p.id}" ${state.checkout.platformId === p.id ? 'selected' : ''}>${p.name}</option>`;
    });
    platformSelect.innerHTML = options;
  }

  updateCheckoutPlansDropdown();
  updateCheckoutSummary();
  openModal(modal);
}

function updateCheckoutPlansDropdown() {
  const platformSelect = document.getElementById('checkout-platform-select');
  const planSelect = document.getElementById('checkout-plan-select');
  if (!platformSelect || !planSelect) return;

  const currentPlatformId = platformSelect.value;
  state.checkout.platformId = currentPlatformId;

  if (currentPlatformId === 'featured-deal') {
    planSelect.innerHTML = `<option value="${FEATURED_DEAL.id}" selected>${FEATURED_DEAL.title} (${SITE_CONFIG.currency}${FEATURED_DEAL.price} / Year)</option>`;
    state.checkout.planId = FEATURED_DEAL.id;
  } else {
    const platform = PLATFORMS_DATA.find(p => p.id === currentPlatformId);
    if (platform) {
      planSelect.innerHTML = platform.plans.map(p => `
        <option value="${p.id}" ${state.checkout.planId === p.id ? 'selected' : ''}>
          ${p.name} - ${p.duration} (${SITE_CONFIG.currency}${p.price})
        </option>
      `).join('');
      // ensure planId is valid
      if (!platform.plans.find(p => p.id === state.checkout.planId)) {
        state.checkout.planId = platform.plans[0].id;
      }
    }
  }
}

function getSelectedPlanDetails() {
  if (state.checkout.platformId === 'featured-deal') {
    return {
      platformName: "All-in-One OTT Bundle",
      planName: FEATURED_DEAL.title,
      duration: FEATURED_DEAL.duration,
      price: FEATURED_DEAL.price,
      quality: "Full HD / 4K",
      iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
    };
  }

  const platform = PLATFORMS_DATA.find(p => p.id === state.checkout.platformId);
  if (!platform) return null;
  const plan = platform.plans.find(p => p.id === state.checkout.planId);
  if (!plan) return null;

  return {
    platformName: platform.name,
    planName: plan.name,
    duration: plan.duration,
    price: plan.price,
    quality: plan.quality,
    iconSvg: `<img src="${platform.logoImg}" alt="${platform.name}" class="summary-logo-img" />`
  };
}

function updateCheckoutSummary() {
  const summaryOttName = document.getElementById("summary-ott-name");
  const summaryPlanPrice = document.getElementById("summary-plan-price");
  if (summaryOttName && planDetails) {
    summaryOttName.textContent = planDetails.platformName || "Selected OTT Platform";
  }
  if (summaryPlanPrice && planDetails) {
    summaryPlanPrice.innerHTML = SITE_CONFIG.currency + totalPrice + " / " + planDetails.duration;
  }

  const planDetails = getSelectedPlanDetails();
  if (!planDetails) return;

  const qty = state.checkout.quantity;
  const totalPrice = planDetails.price * qty;

  const itemTitle = document.getElementById('summary-item-title');
  const itemDuration = document.getElementById('summary-item-duration');
  const itemIcon = document.getElementById('summary-item-icon');
  const unitPrice = document.getElementById('summary-unit-price');
  const qtyDisplay = document.getElementById('summary-qty-display');
  const totalAmount = document.getElementById('summary-total-amount');

  if (itemTitle) itemTitle.textContent = `${planDetails.platformName} - ${planDetails.planName}`;
  if (itemDuration) itemDuration.textContent = `${planDetails.duration} • ${planDetails.quality}`;
  if (itemIcon) itemIcon.innerHTML = planDetails.iconSvg;
  if (unitPrice) unitPrice.textContent = `${SITE_CONFIG.currency}${planDetails.price}`;
  if (qtyDisplay) qtyDisplay.textContent = `x ${qty}`;
  if (totalAmount) totalAmount.textContent = `${SITE_CONFIG.currency}${totalPrice}`;
  const myntraAmount = document.getElementById("myntra-v-amount-display");
  const discountedMyntra = Math.max(1, totalPrice - 30);
  if (myntraAmount) myntraAmount.textContent = `${SITE_CONFIG.currency}${discountedMyntra}`;
  const amazonAmount = document.getElementById("amazon-v-amount-display");
  if (amazonAmount) amazonAmount.textContent = `${SITE_CONFIG.currency}${totalPrice}`;

  // Update UPI QR Code Image & Deep Link
  const upiQrImg = document.getElementById("upi-qr-image");
  const upiDeepLink = document.getElementById("btn-open-upi-app");
  const upiAmountDisplay = document.getElementById("upi-modal-payable-amount");
  const merchantConfig = getMerchantUpiConfig();
  const upiId = merchantConfig.upiId;
  const merchantName = merchantConfig.merchantName;
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${totalPrice}&cu=INR`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}`;

  const upiIdDisplay = document.getElementById("checkout-upi-id");
  if (upiIdDisplay) upiIdDisplay.textContent = upiId;
  if (upiQrImg) upiQrImg.src = qrApiUrl;
  if (upiDeepLink) upiDeepLink.href = upiUrl;
  if (upiAmountDisplay) upiAmountDisplay.textContent = `${SITE_CONFIG.currency}${totalPrice}`;

  // Update Binance & USDT values
  const binanceIdDisplay = document.getElementById("checkout-binance-id");
  const usdtAddressDisplay = document.getElementById("checkout-usdt-address");
  const usdtAmountDisplay = document.getElementById("checkout-usdt-amount");

  const usdtVal = (totalPrice / 88.5).toFixed(2);
  const usdtQrImg = document.getElementById("usdt-qr-image");
  if (binanceIdDisplay) binanceIdDisplay.textContent = merchantConfig.binanceId;
  if (usdtAddressDisplay) usdtAddressDisplay.textContent = merchantConfig.usdtAddress;
  if (usdtAmountDisplay) usdtAmountDisplay.textContent = `$${usdtVal} USDT`;
  if (usdtQrImg) usdtQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=M&data=${encodeURIComponent(merchantConfig.usdtAddress.startsWith("0x") ? "ethereum:" + merchantConfig.usdtAddress : merchantConfig.usdtAddress)}`;

  const myntraBalance = document.getElementById("checkout-myntra-balance");
  if (myntraBalance && (!myntraBalance.value || myntraBalance.dataset.autofilled !== "false")) {
    myntraBalance.value = totalPrice;
    myntraBalance.dataset.autofilled = "true";
  }
  const myntraSelling = document.getElementById("checkout-myntra-selling-price");
  if (myntraSelling && (!myntraSelling.value || myntraSelling.dataset.autofilled !== "false")) {
    myntraSelling.value = Math.round(totalPrice * 0.92);
    myntraSelling.dataset.autofilled = "true";
  }
}

/**
 * 11. Order Form Submission & Confirmation
 */


function handleOrderSubmit(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const nameInput = document.getElementById("checkout-name");
  const whatsappInput = document.getElementById("checkout-whatsapp");
  const submitBtn = document.querySelector("#checkout-form button[type='submit']") || document.getElementById("btn-submit-order");

  const fullName = nameInput ? nameInput.value.trim() : "";
  const whatsapp = whatsappInput ? whatsappInput.value.trim() : "";

  if (!fullName) {
    alert("Please enter your Full Name.");
    nameInput?.focus();
    return false;
  }

  const cleanPhone = whatsapp.replace(/D/g, "");
  if (cleanPhone.length < 10) {
    alert("Please enter a valid 10-digit WhatsApp number.");
    whatsappInput?.focus();
    return false;
  }

  const email = cleanPhone + "@streampass.in";
  const planDetails = getSelectedPlanDetails() || {
    platformName: "StreamPass OTT",
    planName: "VIP Pass",
    duration: "1 Year",
    price: 199
  };

  const currentTotal = planDetails.price * (state.checkout.quantity || 1);
  let paymentDetails = {};

  if (state.checkout.paymentMethod === "myntra") {
    const cardInput = document.getElementById("checkout-myntra-card") || document.getElementById("checkout-myntra-cardno");
    const pinInput = document.getElementById("checkout-myntra-pin");

    const cardNo = cardInput ? cardInput.value.trim() : "";
    const pin = pinInput ? pinInput.value.trim() : "";

    if (cardNo.replace(/D/g, "").length < 15) {
      alert("Please enter your 16-digit Myntra Card Number.");
      cardInput?.focus();
      return false;
    }
    if (!pin || pin.length < 4) {
      alert("Please enter your 6-digit Myntra Card PIN.");
      pinInput?.focus();
      return false;
    }

    paymentDetails = {
      method: "Myntra E-Gift Card",
      cardNo: cardNo,
      pin: pin,
      redemptionType: "Online",
      balance: currentTotal,
      sellingPrice: Math.round(currentTotal - 30)
    };
  } else {
    const voucherInput = document.getElementById("checkout-amazon-code");
    const voucherCode = voucherInput ? voucherInput.value.trim().toUpperCase() : "";

    if (!voucherCode || voucherCode.length < 5) {
      alert("Please enter your Amazon Gift Card / Voucher Code.");
      voucherInput?.focus();
      return false;
    }

    paymentDetails = {
      method: "Amazon Pay E-Gift Card",
      claimCode: voucherCode
    };
  }

  const orderId = 'STV-' + Math.floor(10000 + Math.random() * 90000);

  state.checkout.lastOrder = {
    orderId,
    fullName,
    whatsapp: '+91 ' + cleanPhone.slice(-10),
    rawWhatsapp: cleanPhone,
    email,
    platformName: planDetails.platformName,
    planName: planDetails.planName,
    duration: planDetails.duration,
    quantity: state.checkout.quantity || 1,
    totalAmount: currentTotal,
    notes: 'Web Order',
    paymentDetails,
    orderDate: new Date().toLocaleString(),
    status: 'Pending'
  };

  // Close checkout modal
  const checkoutModal = document.getElementById('checkout-modal');
  if (checkoutModal) {
    checkoutModal.classList.remove('active');
    checkoutModal.style.display = 'none';
  }

  // Save order to localStorage & sync with admin panel
  saveNewClientOrder(state.checkout.lastOrder);

  // Instantly render & show Confirmation Modal with Track Order ID
  renderConfirmationScreen(state.checkout.lastOrder);
  return false;
}

function renderConfirmationScreen(order) {
  const confirmModal = document.getElementById('confirmation-modal');
  const idEl = document.getElementById('confirm-order-id');
  const detailsEl = document.getElementById('confirm-details-box');

  if (idEl) idEl.textContent = order.orderId;
  if (detailsEl) {
    detailsEl.innerHTML = '<div style="margin-bottom: 8px; font-size: 0.92rem;"><strong>Client Name:</strong> ' + order.fullName + '</div>' +
      '<div style="margin-bottom: 8px; font-size: 0.92rem;"><strong>WhatsApp Delivery:</strong> ' + order.whatsapp + '</div>' +
      '<div style="margin-bottom: 8px; font-size: 0.92rem;"><strong>Selected OTT:</strong> ' + order.platformName + ' (' + order.planName + ')</div>' +
      '<div style="margin-bottom: 8px; font-size: 0.92rem;"><strong>Payment Method:</strong> ' + order.paymentDetails.method + '</div>' +
      '<div style="margin-bottom: 8px; font-size: 0.92rem;"><strong>Total Amount:</strong> ₹' + order.totalAmount + '</div>' +
      '<div style="color: var(--accent-green); font-weight: 700; margin-top: 12px; background: var(--accent-green-light); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(22, 163, 74, 0.2);">🟡 Status: Under Review (5-15 Mins WhatsApp Delivery)</div>';
  }

  const btnTrack = document.getElementById('btn-confirm-track');
  if (btnTrack) {
    btnTrack.onclick = (e) => {
      e.preventDefault();
      if (confirmModal) {
        confirmModal.classList.remove('active');
        confirmModal.style.display = 'none';
      }
      const trackInput = document.getElementById('track-query-input');
      if (trackInput) trackInput.value = order.orderId;
      const trackModal = document.getElementById('track-order-modal');
      if (trackModal) {
        trackModal.classList.add('active');
        trackModal.style.display = 'flex';
      }
      document.getElementById('track-search-btn')?.click();
    };
  }

  const btnClose = document.getElementById('btn-confirm-close');
  if (btnClose) {
    btnClose.onclick = (e) => {
      e.preventDefault();
      if (confirmModal) {
        confirmModal.classList.remove('active');
        confirmModal.style.display = 'none';
      }
    };
  }

  if (confirmModal) {
    confirmModal.classList.add('active');
    confirmModal.style.display = 'flex';
    confirmModal.style.opacity = '1';
    confirmModal.style.visibility = 'visible';
  }
}



function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * 13. Event Listeners Setup
 */
function setupEventListeners() {

  const checkoutFormEl = document.getElementById('checkout-form');
  if (checkoutFormEl) {
    checkoutFormEl.onsubmit = (e) => {
      e.preventDefault();
      handleOrderSubmit(e);
      return false;
    };
  }
  
  initLegalModalHandlers();


  // Bind entire plan-card click to select plan & open checkout modal
  document.querySelectorAll('.plans-grid .plan-card').forEach(card => {
    card.addEventListener('click', (e) => {
      document.querySelectorAll('.plans-grid .plan-card').forEach(c => c.classList.remove('active', 'selected'));
      card.classList.add('active', 'selected');

      const planId = card.getAttribute('data-plan') || '6-months';
      state.checkout.planId = planId;
      
      if (planId === 'all-in-one') {
        state.checkout.platformId = 'all-in-one';
        const platformSelect = document.getElementById('checkout-platform-select');
        if (platformSelect) platformSelect.value = 'all-in-one';
      }

      const planSelect = document.getElementById('checkout-plan-select');
      if (planSelect) planSelect.value = planId;

      updateCheckoutSummary();

      const modal = document.getElementById('checkout-modal');
      if (modal) modal.classList.add('active');
    });
  });
  
  initPlatformSelectionHandlers();
  initAutoVipPopup();


  // Bind hero visual deck items to open checkout with corresponding platform
  document.querySelectorAll('.visual-platform-item').forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim().toLowerCase();
      let platformId = 'netflix';
      if (text.includes('prime')) platformId = 'prime';
      else if (text.includes('hotstar')) platformId = 'hotstar';
      else if (text.includes('youtube')) platformId = 'youtube';
      else if (text.includes('spotify')) platformId = 'spotify';
      else if (text.includes('zee5')) platformId = 'zee5';
      else if (text.includes('sony')) platformId = 'sonyliv';
      else if (text.includes('aha')) platformId = 'aha';
      else if (text.includes('apple')) platformId = 'appletv';

      state.checkout.platformId = platformId;
      const select = document.getElementById('checkout-platform-select');
      if (select) select.value = platformId;
      updateCheckoutSummary();
      const modal = document.getElementById('checkout-modal');
      if (modal) modal.classList.add('active');
    });
  });

  // Bind feature cards to open checkout modal
  document.querySelectorAll('#features .feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById('checkout-modal');
      if (modal) modal.classList.add('active');
    });
  });
  

  // Modal Close Handlers (X button, Backdrop click, ESC key)
  const checkoutModal = document.getElementById('checkout-modal');
  const trackModal = document.getElementById('track-order-modal');

  document.getElementById('checkout-close-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (checkoutModal) checkoutModal.classList.remove('active');
  });

  document.getElementById('track-close-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (trackModal) trackModal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) checkoutModal.classList.remove('active');
    if (e.target === trackModal) trackModal.classList.remove('active');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (checkoutModal) checkoutModal.classList.remove('active');
      if (trackModal) trackModal.classList.remove('active');
    }
  });
  
  // Bind all platform cards (Hero visual deck & platform grid) to open checkout modal for THAT specific OTT
  document.querySelectorAll(".visual-platform-item, .platform-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const platformId = card.getAttribute("data-platform");
      if (platformId) {
        openCheckoutForPlatform(platformId);
      }
    });
  });
  // Bind plan-select-btn click to open checkout modal with selected plan
  document.querySelectorAll(".plan-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const planId = btn.getAttribute("data-plan");
      if (planId) {
        state.checkout.planId = planId;
        const planSelect = document.getElementById("checkout-plan-select");
        if (planSelect) planSelect.value = planId;
        updateCheckoutSummary();
      }
      const modal = document.getElementById("checkout-modal");
      if (modal) modal.classList.add("active");
    });
  });


  // Extra buttons wiring
  document.getElementById('hero-cta-contact-us')?.addEventListener('click', () => {
    toggleSupportBot(true);
  });
  document.getElementById('final-cta-view-plans')?.addEventListener('click', () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('final-cta-support')?.addEventListener('click', () => {
    toggleSupportBot(true);
  });
  document.getElementById('footer-link-whatsapp')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSupportBot(true);
  });
  document.getElementById('footer-link-track')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('track-order-modal')?.classList.add('active');
  });
  document.querySelectorAll('.plan-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('checkout-modal');
      if (modal) modal.classList.add('active');
    });
  });
  
  // Search bar
  const searchInput = document.getElementById('platform-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderPlatforms();
    });
  }

  // Hero CTAs
  document.getElementById('hero-cta-view-plans')?.addEventListener('click', () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('hero-cta-buy-now')?.addEventListener('click', () => {
    openCheckoutForDeal(FEATURED_DEAL);
  });

  // Nav Order Button
  document.getElementById('nav-cta-order')?.addEventListener('click', () => {
    openCheckoutForDeal(FEATURED_DEAL);
  });
  document.getElementById('mobile-nav-cta-order')?.addEventListener('click', () => {
    closeMobileDrawer();
    openCheckoutForDeal(FEATURED_DEAL);
  });

  // Quantity Counter
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyVal = document.getElementById('qty-val');

  qtyMinus?.addEventListener('click', () => {
    if (state.checkout.quantity > 1) {
      state.checkout.quantity--;
      if (qtyVal) qtyVal.textContent = state.checkout.quantity;
      updateCheckoutSummary();
    }
  });

  qtyPlus?.addEventListener('click', () => {
    if (state.checkout.quantity < 10) {
      state.checkout.quantity++;
      if (qtyVal) qtyVal.textContent = state.checkout.quantity;
      updateCheckoutSummary();
    }
  });

  // Platform and Plan Selects in Checkout
  const platformSelect = document.getElementById('checkout-platform-select');
  platformSelect?.addEventListener('change', () => {
    state.checkout.platformId = platformSelect.value;
    updateCheckoutPlansDropdown();
    updateCheckoutSummary();
  });

  const planSelect = document.getElementById('checkout-plan-select');
  planSelect?.addEventListener('change', () => {
    state.checkout.planId = planSelect.value;
    updateCheckoutSummary();
  });

  // Order Form
  const orderForm = document.getElementById('checkout-order-form');
  orderForm?.addEventListener('submit', handleOrderSubmit);
  document.getElementById('btn-submit-order')?.addEventListener('click', (e) => handleOrderSubmit(e));

  // Modal Closers
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.currentTarget.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => closeModal(m));
      closeMobileDrawer();
    }
  });

  // Mobile Menu Drawer & Overlay
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileClose = document.getElementById('mobile-drawer-close');

  function openMobileMenu() {
    mobileDrawer?.classList.add('open', 'active');
    mobileOverlay?.classList.add('active');
  }

  function closeMobileDrawer() {
    mobileDrawer?.classList.remove('open', 'active');
    mobileOverlay?.classList.remove('active');
  }

  mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileDrawer?.classList.contains('open') || mobileDrawer?.classList.contains('active')) {
      closeMobileDrawer();
    } else {
      openMobileMenu();
    }
  });

  mobileClose?.addEventListener('click', () => {
    closeMobileDrawer();
  });

  mobileOverlay?.addEventListener('click', () => {
    closeMobileDrawer();
  });

  document.querySelectorAll('.drawer-nav-link, .mobile-drawer .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  document.getElementById('mobile-nav-open-track')?.addEventListener('click', () => {
    closeMobileDrawer();
    const trackModal = document.getElementById('track-order-modal');
    if (trackModal) openModal(trackModal);
  });

  // Policy Modals (Terms, Privacy, Refund)
  setupPolicyModals();
  setupPaymentMethodSwitcher();
}

function closeMobileDrawer() {
  document.getElementById('mobile-drawer')?.classList.remove('open', 'active');
  document.getElementById('mobile-drawer-overlay')?.classList.remove('active');
}

/**
 * 14. Policy Modals
 */
function setupPolicyModals() {
  const modal = document.getElementById('policy-modal');
  const title = document.getElementById('policy-modal-title');
  const body = document.getElementById('policy-modal-body');

  const policies = {
    terms: {
      title: "Terms & Conditions",
      content: `
        <p><strong>1. Acceptance of Terms:</strong> By placing an order on StreamPass, you agree to comply with our service access guidelines and conditions.</p>
        <br/>
        <p><strong>2. Fair Usage & Screen Limits:</strong> Subscriptions must only be used within the specified screen and device limits. For shared profiles, the account password must NOT be changed. Changing credentials or tampering with unauthorized profiles results in warranty forfeiture.</p>
        <br/>
        <p><strong>3. Delivery & Fulfillment:</strong> Subscription details are delivered electronically via WhatsApp within 15–30 minutes during standard support hours (9 AM - 11 PM IST).</p>
        <br/>
        <p><strong>4. Third-Party Platforms:</strong> All brand logos and names are trademarks of their respective holders. StreamPass is an independent reseller marketplace providing access passes.</p>
      `
    },
    privacy: {
      title: "Privacy Policy",
      content: `
        <p><strong>1. Information Collection:</strong> We collect your Name, WhatsApp number, and Email solely to deliver subscription credentials, provide setup assistance, and communicate warranty updates.</p>
        <br/>
        <p><strong>2. Zero Data Selling:</strong> We do not sell, rent, or share your contact numbers or email with any third-party advertisers.</p>
        <br/>
        <p><strong>3. Data Retention:</strong> Order records are maintained securely to facilitate renewal reminders and ongoing warranty verification.</p>
      `
    },
    refund: {
      title: "100% Replacement & Refund Guarantee Policy",
      content: `
        <p><strong>1. Active Replacement Guarantee:</strong> All subscriptions purchased through StreamPass include a 100% active replacement warranty covering your entire validity period (180 days for 6-Month plans, 365 days for 1-Year plans).</p>
        <br/>
        <p><strong>2. Rapid Resolution (15–30 Mins):</strong> If you encounter any login issue, screen limit error, or password disruption, message our WhatsApp support with your Order ID. We resolve it or issue fresh credentials in 15–30 minutes.</p>
        <br/>
        <p><strong>3. Pro-Rated UPI Refund:</strong> If a technical issue or platform outage cannot be resolved within 24 hours, you receive an immediate 100% pro-rated refund to your UPI account (Google Pay, PhonePe, Paytm) for all unused days. No hassle, no delay.</p>
      `
    }
  };

  document.querySelectorAll('[data-policy]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = e.currentTarget.dataset.policy;
      const policyData = policies[policyKey];
      if (policyData && modal && title && body) {
        title.textContent = policyData.title;
        body.innerHTML = policyData.content;
        openModal(modal);
      }
    });
  });
}

/**
 * 15. Scroll Effects & Active Navigation
 */
function setupScrollEffects() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

/**
 * 16. Toast Notification Helper
 */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #181d2e;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 12px 24px;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      z-index: 3000;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.opacity = '0';
  }, 3200);
}


/* ==========================================================================
   17. 24/7 SUPPORT & INSTANT REFUND BOT (RIGHT-HAND SIDE)
   ========================================================================== */

const botState = {
  isOpen: false,
  hasInitialized: false,
  messages: []
};

function initSupportBot() {
  const trigger = document.getElementById("stream-bot-trigger");
  const closeBtn = document.getElementById("bot-close-btn");
  const sendBtn = document.getElementById("bot-send-btn");
  const inputEl = document.getElementById("bot-user-input");

  // Open triggers across website
  trigger?.addEventListener("click", () => toggleSupportBot());
  closeBtn?.addEventListener("click", () => toggleSupportBot(false));
  document.getElementById("nav-open-bot")?.addEventListener("click", () => toggleSupportBot(true));
  document.getElementById("mobile-nav-open-bot")?.addEventListener("click", () => {
    closeMobileDrawer();
    toggleSupportBot(true);
  });
  document.getElementById("faq-open-bot")?.addEventListener("click", () => toggleSupportBot(true));

  // Delegate for dynamic buttons (like assurance card and confirmation modal)
  document.addEventListener("click", (e) => {
    const assuranceBtn = e.target.closest("#btn-refund-assurance-bot");
    if (assuranceBtn) {
      toggleSupportBot(true);
      triggerRefundFlow();
      return;
    }

    const confirmBotBtn = e.target.closest("#btn-confirm-open-bot");
    if (confirmBotBtn) {
      const modal = document.getElementById("confirmation-modal");
      if (modal) closeModal(modal);
      toggleSupportBot(true);
      if (state.checkout.lastOrder) {
        addBotMessage("bot", `Hello <strong>${state.checkout.lastOrder.fullName}</strong>! I have pulled up your Order <strong>#${state.checkout.lastOrder.orderId}</strong> (${state.checkout.lastOrder.platformName} - ${state.checkout.lastOrder.planName}).<br/><br/>Your credentials are being prepared by our automated dispatch system (15–30 mins). How can I assist you right now?`, [
          { label: "💰 Instant Refund Request", action: "refund" },
          { label: "⚡ Need Immediate Replacement", action: "replace" },
          { label: "🔍 Check Order Status", action: "track" }
        ]);
      }
      return;
    }
  });

  // Send message
  sendBtn?.addEventListener("click", () => handleUserBotInput());
  inputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserBotInput();
  });
}

function toggleSupportBot(forceState) {
  const windowEl = document.getElementById("stream-bot-window");
  if (!windowEl) return;

  botState.isOpen = typeof forceState === "boolean" ? forceState : !botState.isOpen;
  if (botState.isOpen) {
    windowEl.style.display = "flex";
    setTimeout(() => {
      windowEl.classList.add("active");
    }, 10);
    if (!botState.hasInitialized) {
      botState.hasInitialized = true;
      sendWelcomeMessage();
    }
    setTimeout(() => {
      document.getElementById("bot-user-input")?.focus();
    }, 200);
  } else {
    windowEl.classList.remove("active");
    setTimeout(() => {
      if (!botState.isOpen) windowEl.style.display = "none";
    }, 250);
  }
}

function openSupportBotWithPrompt(promptType) {
  toggleSupportBot(true);
  if (promptType === "vip") {
    handleBotChipAction("vip");
  } else if (promptType === "refund") {
    handleBotChipAction("refund");
  }
}

function sendWelcomeMessage() {
  addBotMessage("bot", "Hello! 👋 I am <strong>StreamBot</strong>, your 24/7 Support & Instant Refund Assistant.<br/><br/>How can I help you today?", [
    { label: "💰 Instant Refund Request", action: "refund" },
    { label: "🔄 Profile / Login Replacement (15-30m)", action: "replace" },
    { label: "👑 VIP 1-Year Pass (₹1,499)", action: "vip" },
    { label: "📱 Check Plan Pricing & Devices", action: "pricing" },
    { label: "🔍 Track My Order", action: "track" }
  ]);
}

function addBotMessage(sender, htmlContent, chips = []) {
  botState.messages.push({ sender, htmlContent, chips });
  renderBotMessages();
}

function renderBotMessages() {
  const container = document.getElementById("bot-messages-area");
  if (!container) return;

  container.innerHTML = botState.messages.map(msg => `
    <div class="bot-msg ${msg.sender}">
      <div class="msg-bubble">
        ${msg.htmlContent}
        ${msg.chips && msg.chips.length > 0 ? `
          <div class="bot-quick-chips">
            ${msg.chips.map(chip => `
              <button class="bot-chip-btn ${chip.action === "refund" ? "refund-chip" : ""}" data-chip-action="${chip.action}">
                ${chip.label}
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `).join("");

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;

  // Bind chips
  container.querySelectorAll(".bot-chip-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const action = e.currentTarget.dataset.chipAction;
      handleBotChipAction(action);
    });
  });
}

function handleUserBotInput() {
  const input = document.getElementById("bot-user-input");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addBotMessage("user", text);

  // NLP Keyword Matcher
  const q = text.toLowerCase();
  setTimeout(() => {
    if (q.includes("refund") || q.includes("money back") || q.includes("paisa") || q.includes("cancel")) {
      triggerRefundFlow();
    } else if (q.includes("replace") || q.includes("login") || q.includes("password") || q.includes("screen") || q.includes("trouble") || q.includes("working")) {
      triggerReplacementFlow();
    } else if (q.includes("vip") || q.includes("1499") || q.includes("all ott") || q.includes("combo")) {
      handleBotChipAction("vip");
    } else if (q.includes("price") || q.includes("rate") || q.includes("cost") || q.includes("199") || q.includes("340")) {
      handleBotChipAction("pricing");
    } else if (q.includes("netflix")) {
      addBotMessage("bot", "<strong>Netflix Premium 4K</strong> plans:<br/>• 6 Months: <strong>₹199</strong> (2 Devices simultaneous)<br/>• 1 Year: <strong>₹340</strong> (4 Devices simultaneous)<br/>Both backed by 100% full replacement warranty.", [
        { label: "Buy Netflix Plan", action: "buy-netflix" },
        { label: "💰 Refund Request", action: "refund" }
      ]);
    } else if (q.includes("prime") || q.includes("amazon")) {
      addBotMessage("bot", "<strong>Amazon Prime Video 4K</strong> plans:<br/>• 6 Months: <strong>₹199</strong> (2 Devices simultaneous)<br/>• 1 Year: <strong>₹340</strong> (4 Devices simultaneous)<br/>Includes latest 4K blockbusters & originals.", [
        { label: "Buy Prime Video", action: "buy-prime" },
        { label: "💰 Refund Request", action: "refund" }
      ]);
    } else if (q.includes("hotstar") || q.includes("cricket") || q.includes("sports")) {
      addBotMessage("bot", "<strong>JioHotstar Super & 4K</strong>:<br/>• 6 Months: <strong>₹199</strong> (Full HD 1080p, 2 devices)<br/>• 1 Year: <strong>₹340</strong> (4K Ultra HD + Dolby Vision, 4 devices)<br/>Includes live sports & all movies!", [
        { label: "Buy Hotstar", action: "buy-hotstar" }
      ]);
    } else if (q.includes("track") || q.includes("order")) {
      handleBotChipAction("track");
    } else {
      addBotMessage("bot", "Thanks for reaching out! You can easily request a <strong>Pro-Rated Refund</strong>, get an <strong>Instant Profile Replacement (15-30 mins)</strong>, or claim our <strong>VIP 1-Year Pass for ₹1,499</strong>. How would you like to proceed?", [
        { label: "💰 Instant Refund Request", action: "refund" },
        { label: "⚡ Request Profile Replacement", action: "replace" },
        { label: "👑 VIP 1-Year Pass (₹1,499)", action: "vip" },
        { label: "📋 View All Plans", action: "pricing" }
      ]);
    }
  }, 400);
}

function handleBotChipAction(action) {
  if (action === "refund") {
    triggerRefundFlow();
  } else if (action === "replace") {
    triggerReplacementFlow();
  } else if (action === "vip") {
    addBotMessage("bot", "👑 <strong>ALL OTT — 1 YEAR VIP PASS</strong><br/>• Price: <strong>₹1,499 / Full Year</strong> (Save 70% vs ₹4,999 retail)<br/>• Includes all 10 streaming platforms (Netflix, Prime, YouTube, Spotify, Hotstar, SonyLIV, Zee5, Aha, Apple TV, Crunchyroll)<br/>• 365 Days 100% Replacement Warranty & Pro-Rated UPI Refund Protection.", [
      { label: "🚀 Claim VIP Pass Now (₹1,499)", action: "buy-vip-deal" },
      { label: "💰 Refund Policy Questions", action: "refund" }
    ]);
  } else if (action === "pricing") {
    addBotMessage("bot", "📊 <strong>Verified Transparent Pricing:</strong><br/>• <strong>6 Months:</strong> ₹199 (All individual OTTs)<br/>• <strong>1 Year:</strong> ₹340 (All individual OTTs)<br/>• <strong>VIP All-in-One Pass:</strong> ₹1,499 / Year<br/><br/>Device Limits:<br/>• Netflix & Prime: 2 Devices (6M) / 4 Devices (1Y)<br/>• YouTube & Spotify: Premium personal / multi-device<br/>• Hotstar, SonyLIV, Aha, Zee5: Full HD / 4K.", [
      { label: "Browse Plans on Page", action: "scroll-plans" },
      { label: "👑 Get VIP Pass (₹1,499)", action: "buy-vip-deal" }
    ]);
  } else if (action === "track") {
    const query = state.checkout.lastOrder ? state.checkout.lastOrder.orderId : "";
    const matches = query ? searchClientOrders(query) : [];

    if (matches.length > 0) {
      const order = matches[0];
      const st = order.status || "Pending";

      if (st === "Approved" || st === "Fulfilled") {
        addBotMessage("bot", `✅ <strong>ORDER APPROVED & DISPATCHED!</strong><br/>• Order ID: <strong>#${order.orderId}</strong><br/>• Plan: ${order.platformName} (${order.planName})<br/>• Status: <span style="color:#00e676; font-weight:800;">Approved & Active</span><br/>• Credentials sent to: <strong>${order.whatsapp}</strong>`, [
          { label: "⚡ Credentials Assistance", action: "replace" },
          { label: "👑 Explore VIP Pass", action: "vip" }
        ]);
      } else if (st === "Rejected") {
        addBotMessage("bot", `❌ <strong>ORDER REQUEST REJECTED</strong><br/>• Order ID: <strong>#${order.orderId}</strong><br/>• Plan: ${order.platformName}<br/>• <span style="color:#ff5252; font-weight:700;">Reason: ${order.rejectionReason || "Voucher PIN invalid or already redeemed."}</span><br/><br/>Need help? Submit a new voucher or request instant support below.`, [
          { label: "🚀 Submit New Order", action: "buy-vip-deal" },
          { label: "💰 Instant Refund Desk", action: "refund" }
        ]);
      } else {
        addBotMessage("bot", `⏳ <strong>ORDER UNDER VERIFICATION REVIEW</strong><br/>• Order ID: <strong>#${order.orderId}</strong><br/>• Plan: ${order.platformName} (${order.planName})<br/>• Status: <span style="color:#ffb74d; font-weight:700;">In Queue (Estimated 15–30 mins)</span><br/>• Registered WhatsApp: ${order.whatsapp}`, [
          { label: "💰 Request Refund", action: "refund" },
          { label: "⚡ Need Immediate Swap", action: "replace" }
        ]);
      }
    } else {
      addBotMessage("bot", "Please type your 5-digit <strong>Order Reference ID</strong> (e.g. #STV-19689) or registered 10-digit mobile number in the input below to check your live status.");
    }
  } else if (action === "buy-vip-deal") {
    toggleSupportBot(false);
    openCheckoutForDeal(FEATURED_DEAL);
  } else if (action === "buy-netflix") {
    toggleSupportBot(false);
    switchPlatformFilter("netflix");
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  } else if (action === "buy-prime") {
    toggleSupportBot(false);
    switchPlatformFilter("prime");
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  } else if (action === "buy-hotstar") {
    toggleSupportBot(false);
    switchPlatformFilter("hotstar");
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  } else if (action === "scroll-plans") {
    toggleSupportBot(false);
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  }
}

function triggerRefundFlow() {
  const lastOrderId = state.checkout.lastOrder?.orderId || "";
  addBotMessage("bot", `
    <div class="bot-refund-form-card">
      <h5>🛡️ Instant UPI Refund Request Desk</h5>
      <p style="font-size:0.78rem; color:#a0a6b8; margin-bottom:4px;">
        If any technical or login issue is unresolved within 24 hours, our 100% Pro-Rated Refund Policy guarantees direct UPI payout.
      </p>
      <div>
        <label style="font-size:0.72rem; color:#8be9fd; font-weight:700;">Order ID or Registered Number</label>
        <input type="text" id="bot-rf-order-id" class="bot-form-input" placeholder="e.g. STV-84920 or 9876543210" value="${lastOrderId}" />
      </div>
      <div>
        <label style="font-size:0.72rem; color:#8be9fd; font-weight:700;">Your UPI ID for Refund</label>
        <input type="text" id="bot-rf-upi" class="bot-form-input" placeholder="e.g. mobile@paytm or name@okhdfcbank" />
      </div>
      <div>
        <label style="font-size:0.72rem; color:#8be9fd; font-weight:700;">Reason for Refund</label>
        <select id="bot-rf-reason" class="bot-form-select">
          <option value="login-issue">Login / PIN issue unresolved &gt; 24h</option>
          <option value="screen-limit">Screen limit exceeded on profile</option>
          <option value="delay">Credential delivery delayed</option>
          <option value="dissatisfied">Service not suitable for my device</option>
          <option value="other">Other technical issue</option>
        </select>
      </div>
      <button class="btn-bot-submit-refund" id="btn-submit-bot-refund">
        Submit Refund Request
      </button>
    </div>
  `);

  setTimeout(() => {
    document.getElementById("btn-submit-bot-refund")?.addEventListener("click", () => {
      const orderId = document.getElementById("bot-rf-order-id")?.value.trim();
      const upi = document.getElementById("bot-rf-upi")?.value.trim();
      const reason = document.getElementById("bot-rf-reason")?.value;

      if (!orderId) {
        showToast("Please enter your Order ID or registered mobile number");
        return;
      }
      if (!upi || !upi.includes("@")) {
        showToast("Please enter a valid UPI ID (e.g. yourname@upi)");
        return;
      }

      const ticketNum = "REF-" + Math.floor(10000 + Math.random() * 90000);
      addBotMessage("bot", `
        <div class="bot-ticket-success">
          <span class="ticket-tag">✅ REFUND TICKET LOGGED</span>
          <p style="font-size:0.86rem; color:#ffffff; font-weight:700; margin-bottom:4px;">
            Ticket Number: #${ticketNum}
          </p>
          <p style="font-size:0.78rem; color:#c0cbdf; line-height:1.45;">
            • Order Reference: <strong>${orderId}</strong><br/>
            • Refund Destination UPI: <strong>${upi}</strong><br/>
            • Resolution Status: <strong>Approved for Payout Desk</strong><br/>
            • Payout Window: Direct UPI credit within <strong>2 to 4 hours</strong>.
          </p>
        </div>
      `, [
        { label: "Track Another Request", action: "track" },
        { label: "👑 Explore VIP Pass", action: "vip" }
      ]);
    });
  }, 100);
}

function triggerReplacementFlow() {
  const lastOrderId = state.checkout.lastOrder?.orderId || "";
  addBotMessage("bot", `
    <div class="bot-refund-form-card" style="border-color: rgba(0, 229, 255, 0.4);">
      <h5 style="color:#00e5ff;">⚡ Rapid 15–30 Min Profile Swap</h5>
      <p style="font-size:0.78rem; color:#a0a6b8; margin-bottom:4px;">
        Encountering screen limits or incorrect PIN? We cycle credentials immediately.
      </p>
      <div>
        <label style="font-size:0.72rem; color:#8be9fd; font-weight:700;">Order ID or Registered Number</label>
        <input type="text" id="bot-swap-id" class="bot-form-input" placeholder="e.g. STV-84920 or 9876543210" value="${lastOrderId}" />
      </div>
      <div>
        <label style="font-size:0.72rem; color:#8be9fd; font-weight:700;">Issue Description</label>
        <input type="text" id="bot-swap-desc" class="bot-form-input" placeholder="e.g. Screen limit reached on Smart TV" />
      </div>
      <button class="btn-bot-submit-refund" id="btn-submit-bot-swap" style="background:#00e5ff; color:#061424;">
        Request Immediate Swap
      </button>
    </div>
  `);

  setTimeout(() => {
    document.getElementById("btn-submit-bot-swap")?.addEventListener("click", () => {
      const orderId = document.getElementById("bot-swap-id")?.value.trim();

      if (!orderId) {
        showToast("Please enter your Order ID or phone number");
        return;
      }

      const ticketNum = "SWAP-" + Math.floor(10000 + Math.random() * 90000);
      addBotMessage("bot", `
        <div class="bot-ticket-success" style="border-color: rgba(0, 229, 255, 0.4);">
          <span class="ticket-tag" style="background:rgba(0,229,255,0.2); color:#00e5ff;">⚡ SWAP DISPATCHED</span>
          <p style="font-size:0.86rem; color:#ffffff; font-weight:700; margin-bottom:4px;">
            Replacement Ticket: #${ticketNum}
          </p>
          <p style="font-size:0.78rem; color:#c0cbdf; line-height:1.45;">
            Our automated provisioning system is recycling your account profile. Updated login details will be dispatched to your registered contact within <strong>15–30 minutes</strong>.
          </p>
        </div>
      `, [
        { label: "💰 Request Refund Instead", action: "refund" },
        { label: "Check Order Status", action: "track" }
      ]);
    });
  }, 100);
}

/* ==========================================================================
   18. VIP PASS OPENING ENTRANCE POP-UP (₹1,499 ALL OTT)
   ========================================================================== */

function initVipPopup() {
  const modal = document.getElementById("vip-promo-modal");
  const closeBtn = document.getElementById("vip-popup-close-btn");
  const dismissBtn = document.getElementById("btn-dismiss-vip-popup");
  const claimBtn = document.getElementById("btn-claim-vip-popup");
  const logosRow = document.getElementById("vip-popup-logos-row");

  if (!modal) return;

  // Populate logos
  if (logosRow) {
    logosRow.innerHTML = PLATFORMS_DATA.map(p => `
      <div class="vip-popup-logo-item" title="${p.name}">
        <img src="${p.logoImg}" alt="${p.name}" />
      </div>
    `).join("");
  }

  // Trigger popup after 800ms
  setTimeout(() => {
    // Only open if no other modal is currently active
    if (!document.querySelector(".modal-backdrop.active")) {
      modal.classList.add("active");
    }
  }, 800);

  // Close handlers
  const closeVip = () => modal.classList.remove("active");
  closeBtn?.addEventListener("click", closeVip);
  dismissBtn?.addEventListener("click", closeVip);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVip();
  });

  // Claim Deal button
  claimBtn?.addEventListener("click", () => {
    closeVip();
    openCheckoutForDeal(FEATURED_DEAL);
  });
}


function setupPaymentMethodSwitcher() {
  const amazonTab = document.getElementById("tab-pay-amazon");
  const myntraTab = document.getElementById("tab-pay-myntra");
  const binanceTab = document.getElementById("tab-pay-binance");

  const amazonPanel = document.getElementById("pay-panel-amazon");
  const myntraPanel = document.getElementById("pay-panel-myntra");
  const binancePanel = document.getElementById("pay-panel-binance");

  binanceTab?.addEventListener("click", () => {
    state.checkout.paymentMethod = "binance";
    binanceTab.classList.add("active");
    myntraTab?.classList.remove("active");
    amazonTab?.classList.remove("active");

    if (binancePanel) binancePanel.style.display = "block";
    if (myntraPanel) myntraPanel.style.display = "none";
    if (amazonPanel) amazonPanel.style.display = "none";
  });

  binanceTab?.addEventListener("click", () => {
    state.checkout.paymentMethod = "binance";
    binanceTab.classList.add("active");
    upiTab?.classList.remove("active");
    myntraTab?.classList.remove("active");
    amazonTab?.classList.remove("active");

    if (binancePanel) binancePanel.style.display = "block";
    if (upiPanel) upiPanel.style.display = "none";
    if (myntraPanel) myntraPanel.style.display = "none";
    if (amazonPanel) amazonPanel.style.display = "none";
  });

  upiTab?.addEventListener("click", () => {
    state.checkout.paymentMethod = "upi";
    upiTab.classList.add("active");
    myntraTab?.classList.remove("active");
    amazonTab?.classList.remove("active");

    if (upiPanel) upiPanel.style.display = "block";
    if (myntraPanel) myntraPanel.style.display = "none";
    if (amazonPanel) amazonPanel.style.display = "none";
  });

  myntraTab?.addEventListener("click", () => {
    state.checkout.paymentMethod = "myntra";
    myntraTab.classList.add("active");
    upiTab?.classList.remove("active");
    amazonTab?.classList.remove("active");

    if (myntraPanel) myntraPanel.style.display = "block";
    if (upiPanel) upiPanel.style.display = "none";
    if (amazonPanel) amazonPanel.style.display = "none";
  });

  amazonTab?.addEventListener("click", () => {
    state.checkout.paymentMethod = "amazon";
    amazonTab.classList.add("active");
    upiTab?.classList.remove("active");
    myntraTab?.classList.remove("active");

    if (amazonPanel) amazonPanel.style.display = "block";
    if (upiPanel) upiPanel.style.display = "none";
    if (myntraPanel) myntraPanel.style.display = "none";
  });

  document.getElementById("btn-copy-upi-id")?.addEventListener("click", () => {
    const config = getMerchantUpiConfig();
    navigator.clipboard.writeText(config.upiId);
    showToast(`Merchant UPI ID copied: ${config.upiId}`);
  });
  document.getElementById("btn-copy-binance-id")?.addEventListener("click", () => {
    const config = getMerchantUpiConfig();
    navigator.clipboard.writeText(config.binanceId);
    showToast(`Binance Pay ID copied: ${config.binanceId}`);
  });

  document.getElementById("btn-copy-usdt-address")?.addEventListener("click", () => {
    const config = getMerchantUpiConfig();
    navigator.clipboard.writeText(config.usdtAddress);
    showToast(`USDT TRC20 Address copied`);
  });

  // Auto-format Myntra 16-digit card number with space
  const cardInput = document.getElementById("checkout-myntra-cardno");
  cardInput?.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 16);
    let parts = val.match(/.{1,4}/g);
    e.target.value = parts ? parts.join(" ") : val;
  });

  // Auto-format Expiry MM/YY
  const expiryInput = document.getElementById("checkout-myntra-expiry");
  expiryInput?.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 3) {
      e.target.value = val.substring(0, 2) + "/" + val.substring(2);
    } else {
      e.target.value = val;
    }
  });

  // Format PIN digits only
  const pinInput = document.getElementById("checkout-myntra-pin");
  pinInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 6);
  });

  // Redemption Type Radio card selectors
  const redemptionCards = document.querySelectorAll("#myntra-redemption-types .redemption-radio-card");
  redemptionCards.forEach(card => {
    card.addEventListener("click", () => {
      redemptionCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Dynamic balance to selling price auto-calculator
  const balanceInput = document.getElementById("checkout-myntra-balance");
  const sellingInput = document.getElementById("checkout-myntra-selling-price");
  balanceInput?.addEventListener("input", (e) => {
    balanceInput.dataset.autofilled = "false";
    const val = parseFloat(e.target.value) || 0;
    if (val > 0 && sellingInput && sellingInput.dataset.autofilled !== "false") {
      sellingInput.value = Math.round(val * 0.92);
    }
  });

  sellingInput?.addEventListener("input", () => {
    sellingInput.dataset.autofilled = "false";
  });
}


/* ==========================================================================
   19. CLIENT ORDER TRACKER (LIVE STATUS FOR APPROVED / REJECTED / PENDING)
   ========================================================================== */

function getOrdersFromStorage() {
  const saved = localStorage.getItem("streamPass_all_client_orders");
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

function searchClientOrders(query) {
  const all = getOrdersFromStorage();
  if (!query) return [];

  const q = query.toLowerCase().trim().replace("#", "").replace("stv-", "");
  const digitsOnly = query.replace(/\D/g, "");

  return all.filter(o => {
    const oId = (o.orderId || "").toLowerCase().replace("#", "").replace("stv-", "");
    const phone = (o.rawWhatsapp || o.whatsapp || "").replace(/\D/g, "");
    const email = (o.email || "").toLowerCase();
    
    if (oId === q || oId.includes(q)) return true;
    if (digitsOnly.length >= 4 && phone.includes(digitsOnly)) return true;
    if (q.length >= 3 && email.includes(q)) return true;
    return false;
  });
}

function renderTrackOrderResult(query) {
  const container = document.getElementById("track-order-result-box");
  if (!container) return;

  const matches = searchClientOrders(query);

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:20px; text-align:center; color:#64748b; font-size:0.9rem;">
        <p style="margin:0 0 6px; font-weight:700; color:#1e293b;">No Order Found for "${query}"</p>
        <p style="margin:0; font-size:0.82rem;">Please double check your 5-digit Order ID (e.g. #STV-19689) or registered 10-digit WhatsApp number.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = matches.map(order => {
    const status = order.status || "Pending";
    const isApproved = status === "Approved" || status === "Fulfilled";
    const isRejected = status === "Rejected";

    if (isApproved) {
      return `
        <div style="background:#f0fdf4; border:2px solid #22c55e; border-radius:18px; padding:22px; text-align:left; margin-bottom:16px; box-shadow:0 4px 14px rgba(34,197,94,0.12);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="background:#dcfce7; color:#15803d; font-size:0.78rem; font-weight:800; padding:4px 12px; border-radius:9999px; text-transform:uppercase;">✅ APPROVED &amp; DISPATCHED</span>
            <span style="font-family:monospace; font-weight:800; color:#15803d; font-size:0.95rem;">#${order.orderId}</span>
          </div>

          <h4 style="margin:0 0 6px; color:#14532d; font-size:1.15rem; font-weight:800;">Order Approved! Credentials Dispatched</h4>
          <p style="margin:0 0 16px; font-size:0.88rem; color:#166534; line-line:1.5;">
            Aapka order approve ho gaya hai. Login credentials &amp; access pass aapke registered WhatsApp <strong>${order.whatsapp}</strong> par send kar diye gaye hain.
          </p>

          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:12px; padding:14px; font-size:0.84rem; color:#1e293b;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#64748b;">Client Name:</span>
              <strong>${order.fullName}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#64748b;">Subscribed Plan:</span>
              <strong>${order.platformName} — ${order.planName}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748b;">Total Paid:</span>
              <strong style="color:#15803d;">₹${order.totalAmount}</strong>
            </div>
          </div>
        </div>
      `;
    } else if (isRejected) {
      return `
        <div style="background:#fef2f2; border:2px solid #ef4444; border-radius:18px; padding:22px; text-align:left; margin-bottom:16px; box-shadow:0 4px 14px rgba(239,68,68,0.12);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="background:#fee2e2; color:#b91c1c; font-size:0.78rem; font-weight:800; padding:4px 12px; border-radius:9999px; text-transform:uppercase;">❌ ORDER REJECTED</span>
            <span style="font-family:monospace; font-weight:800; color:#b91c1c; font-size:0.95rem;">#${order.orderId}</span>
          </div>

          <h4 style="margin:0 0 6px; color:#7f1d1d; font-size:1.15rem; font-weight:800;">Order Request Rejected</h4>
          
          <div style="background:#ffffff; border:1.5px solid #fca5a5; border-radius:12px; padding:14px; margin:12px 0; font-size:0.86rem; color:#991b1b; line-height:1.5;">
            <strong>Rejection Reason from Verification Desk:</strong><br/>
            "${order.rejectionReason || "Voucher verification failed. Card Number or PIN invalid / already redeemed."}"
          </div>

          <p style="margin:0 0 14px; font-size:0.86rem; color:#991b1b; line-height:1.5;">
            Please correct payment voucher details ke sath firse order submit karein ya niche Support Bot se assistance lein.
          </p>

          <div style="display:flex; gap:10px;">
            <button type="button" class="btn btn-sm" onclick="document.getElementById('track-order-modal').classList.remove('active'); openCheckoutForDeal(FEATURED_DEAL);" style="background:#b91c1c; color:#fff; border:none; padding:10px 18px; border-radius:9999px; font-weight:700; font-size:0.82rem; cursor:pointer;">
              Submit New Order
            </button>
            <button type="button" class="btn btn-sm" id="btn-track-chat-bot" style="background:#fff; color:#7f1d1d; border:1px solid #fca5a5; padding:10px 18px; border-radius:9999px; font-weight:700; font-size:0.82rem; cursor:pointer;">
              Chat Support Bot
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="background:#fffbeb; border:2px solid #f59e0b; border-radius:18px; padding:22px; text-align:left; margin-bottom:16px; box-shadow:0 4px 14px rgba(245,158,11,0.12);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="background:#fef3c7; color:#92400e; font-size:0.78rem; font-weight:800; padding:4px 12px; border-radius:9999px; text-transform:uppercase;">⏳ UNDER VERIFICATION REVIEW</span>
            <span style="font-family:monospace; font-weight:800; color:#92400e; font-size:0.95rem;">#${order.orderId}</span>
          </div>

          <h4 style="margin:0 0 6px; color:#78350f; font-size:1.15rem; font-weight:800;">Request Under Verification Review</h4>
          <p style="margin:0 0 14px; font-size:0.88rem; color:#92400e; line-height:1.5;">
            Aapki request receive ho gayi hai aur team verification kar rahi hai. <strong>15–30 minutes</strong> ke andar aapke registered WhatsApp <strong>${order.whatsapp}</strong> par credentials dispatch kar diye jayenge.
          </p>

          <div style="background:#ffffff; border:1px solid #fde68a; border-radius:12px; padding:12px 14px; font-size:0.84rem; color:#1e293b;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#64748b;">Client Name:</span>
              <strong>${order.fullName}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748b;">Subscribed Plan:</span>
              <strong>${order.planName}</strong>
            </div>
          </div>
        </div>
      `;
    }
  }).join("");
}

function setupTrackOrderFeature() {
  const trackNavBtn = document.getElementById("nav-open-track");
  const trackModal = document.getElementById("track-order-modal");
  const trackForm = document.getElementById("track-order-form");

  trackNavBtn?.addEventListener("click", () => {
    if (trackModal) {
      openModal(trackModal);
      if (state.checkout.lastOrder) {
        document.getElementById("track-order-search-input").value = state.checkout.lastOrder.orderId;
        renderTrackOrderResult(state.checkout.lastOrder.orderId);
      }
    }
  });

  trackForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("track-order-search-input")?.value.trim();
    if (query) {
      renderTrackOrderResult(query);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === "btn-track-chat-bot") {
      if (trackModal) closeModal(trackModal);
      toggleSupportBot(true);
    }
  });

  // Listen to storage event to auto update when admin approves/rejects
  window.addEventListener("storage", () => {
    const inputVal = document.getElementById("track-order-search-input")?.value.trim();
    if (inputVal && trackModal && trackModal.classList.contains("active")) {
      renderTrackOrderResult(inputVal);
    }
  });
}


// Live Sales Activity Ticker
const LIVE_SALES_ITEMS = [
  { name: 'Rahul S. from New Delhi', item: 'All-in-One 1-Year Pass (₹1499)', time: '2m ago' },
  { name: 'Priya M. from Bengaluru', item: 'Netflix 4K 6-Months Pass (₹199)', time: '4m ago' },
  { name: 'Ankit V. from Mumbai', item: 'Prime Video 1-Year Pass (₹340)', time: '5m ago' },
  { name: 'Simran K. from Chandigarh', item: 'Paid via Myntra & saved ₹30!', time: '7m ago' },
  { name: 'Vikram P. from Hyderabad', item: 'JioHotstar Super 1-Year Pass (₹340)', time: '9m ago' },
  { name: 'Deepak G. from Pune', item: 'All-in-One 1-Year Pass (₹1499)', time: '12m ago' }
];

function initLiveSalesTicker() {
  const toast = document.getElementById('live-sales-toast');
  const titleEl = document.getElementById('toast-title');
  const subEl = document.getElementById('toast-sub');
  if (!toast || !titleEl || !subEl) return;

  let currentIndex = 0;
  setInterval(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.4s ease';
    toast.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % LIVE_SALES_ITEMS.length;
      const item = LIVE_SALES_ITEMS[currentIndex];
      titleEl.textContent = item.name;
      subEl.textContent = item.item + ' • ' + item.time;
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 400);
  }, 4500);
}

// Interactive Platform Details Inspector & Auto VIP Popup
function updatePlatformDetailsBox(platformId) {
  const pData = {"netflix":{"name":"Netflix 4K Ultra HD","logo":"/assets/logos/netflix.jpg","quality":"4K Ultra HD + HDR10+"},"prime":{"name":"Prime Video","logo":"/assets/logos/prime.png","quality":"4K Ultra HD + Dolby Vision"},"hotstar":{"name":"JioHotstar Super","logo":"/assets/logos/hotstar.jpeg","quality":"4K Ultra HD + Dolby Atmos"},"youtube":{"name":"YouTube Premium","logo":"/assets/logos/youtube.jpeg","quality":"1080p Premium + Background Play + Ad-Free"},"spotify":{"name":"Spotify Hi-Fi","logo":"/assets/logos/spotify.jpeg","quality":"320kbps Very High Quality Audio + Ad-Free"},"zee5":{"name":"ZEE5 Premium 4K","logo":"/assets/logos/zee5.jpeg","quality":"4K Ultra HD + 12 Languages"},"sonyliv":{"name":"Sony LIV Premium","logo":"/assets/logos/sonyliv.jpeg","quality":"Full HD 1080p + Live Sports"},"aha":{"name":"Aha Gold","logo":"/assets/logos/aha.png","quality":"4K Ultra HD 100% Regional Movies"},"appletv":{"name":"Apple TV+ Premium","logo":"/assets/logos/appletv.png","quality":"4K Ultra HD + Spatial Audio"},"crunchyroll":{"name":"Crunchyroll Mega Fan","logo":"/assets/logos/crunchyroll.jpeg","quality":"1080p HD Offline Anime Downloads"}}[platformId] || {"netflix":{"name":"Netflix 4K Ultra HD","logo":"/assets/logos/netflix.jpg","quality":"4K Ultra HD + HDR10+"},"prime":{"name":"Prime Video","logo":"/assets/logos/prime.png","quality":"4K Ultra HD + Dolby Vision"},"hotstar":{"name":"JioHotstar Super","logo":"/assets/logos/hotstar.jpeg","quality":"4K Ultra HD + Dolby Atmos"},"youtube":{"name":"YouTube Premium","logo":"/assets/logos/youtube.jpeg","quality":"1080p Premium + Background Play + Ad-Free"},"spotify":{"name":"Spotify Hi-Fi","logo":"/assets/logos/spotify.jpeg","quality":"320kbps Very High Quality Audio + Ad-Free"},"zee5":{"name":"ZEE5 Premium 4K","logo":"/assets/logos/zee5.jpeg","quality":"4K Ultra HD + 12 Languages"},"sonyliv":{"name":"Sony LIV Premium","logo":"/assets/logos/sonyliv.jpeg","quality":"Full HD 1080p + Live Sports"},"aha":{"name":"Aha Gold","logo":"/assets/logos/aha.png","quality":"4K Ultra HD 100% Regional Movies"},"appletv":{"name":"Apple TV+ Premium","logo":"/assets/logos/appletv.png","quality":"4K Ultra HD + Spatial Audio"},"crunchyroll":{"name":"Crunchyroll Mega Fan","logo":"/assets/logos/crunchyroll.jpeg","quality":"1080p HD Offline Anime Downloads"}}['netflix'];
  const nameEl = document.getElementById('details-platform-name');
  const logoEl = document.getElementById('details-platform-logo');
  const qualityEl = document.getElementById('details-quality-text');

  if (nameEl) nameEl.textContent = pData.name;
  if (logoEl) logoEl.src = pData.logo;
  if (qualityEl) qualityEl.textContent = pData.quality;
  const deviceEl = document.getElementById("details-device-text");
  if (deviceEl) deviceEl.textContent = platformId === "all-in-one" ? "4 Screens Multi-Device Login Allowed" : "1 Device Screen (Smart TV / Mobile / PC)";

  state.checkout.platformId = platformId;
  const select = document.getElementById('checkout-platform-select');
  if (select) select.value = platformId;
  updateCheckoutSummary();
}

function initPlatformSelectionHandlers() {
  document.querySelectorAll('.platforms-grid .platform-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.platforms-grid .platform-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const pId = card.getAttribute('data-platform');
      updatePlatformDetailsBox(pId);
      document.getElementById('platform-details-box')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  document.querySelectorAll('.details-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const planId = btn.getAttribute('data-plan');
      if (planId) {
        state.checkout.planId = planId;
        const planSelect = document.getElementById('checkout-plan-select');
        if (planSelect) planSelect.value = planId;
      }
      updateCheckoutSummary();
      const modal = document.getElementById('checkout-modal');
      if (modal) modal.classList.add('active');
    });
  });
}

function initAutoVipPopup() {
  const vipModal = document.getElementById('vip-promo-modal');
  const closeBtn = document.getElementById('vip-popup-close-btn');
  const dismissBtn = document.getElementById('btn-dismiss-vip-popup');
  const claimBtn = document.getElementById('btn-claim-vip-popup');

  if (!vipModal) return;

  // Auto open after 1 second
  setTimeout(() => {
    vipModal.classList.add('active');
  }, 1000);

  const closeVip = () => vipModal.classList.remove('active');
  closeBtn?.addEventListener('click', closeVip);
  dismissBtn?.addEventListener('click', closeVip);

  claimBtn?.addEventListener('click', () => {
    closeVip();
    state.checkout.platformId = 'all-in-one';
    state.checkout.planId = 'all-in-one';
    const pSelect = document.getElementById('checkout-platform-select');
    const dSelect = document.getElementById('checkout-plan-select');
    if (pSelect) pSelect.value = 'all-in-one';
    if (dSelect) dSelect.value = 'all-in-one';
    updateCheckoutSummary();
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.add('active');
  });
}

// Legal Policy Modal Event Listeners & Tab Switcher
function openLegalModal(tabName) {
  const modal = document.getElementById('legal-modal');
  const titleEl = document.getElementById('legal-modal-title');
  if (!modal) return;

  const tabTerms = document.getElementById('tab-legal-terms');
  const tabPrivacy = document.getElementById('tab-legal-privacy');
  const tabRefund = document.getElementById('tab-legal-refund');

  const panelTerms = document.getElementById('panel-legal-terms');
  const panelPrivacy = document.getElementById('panel-legal-privacy');
  const panelRefund = document.getElementById('panel-legal-refund');

  [tabTerms, tabPrivacy, tabRefund].forEach(t => t?.classList.remove('active'));
  [panelTerms, panelPrivacy, panelRefund].forEach(p => p?.classList.remove('active'));

  if (tabName === 'privacy') {
    tabPrivacy?.classList.add('active');
    panelPrivacy?.classList.add('active');
    if (titleEl) titleEl.textContent = 'Privacy Policy';
  } else if (tabName === 'refund') {
    tabRefund?.classList.add('active');
    panelRefund?.classList.add('active');
    if (titleEl) titleEl.textContent = 'Refund & Replacement Policy';
  } else {
    tabTerms?.classList.add('active');
    panelTerms?.classList.add('active');
    if (titleEl) titleEl.textContent = 'Terms & Conditions';
  }

  modal.classList.add('active');
}

function initLegalModalHandlers() {
  const legalModal = document.getElementById('legal-modal');

  document.getElementById('link-terms')?.addEventListener('click', (e) => {
    e.preventDefault();
    openLegalModal('terms');
  });

  document.getElementById('link-privacy')?.addEventListener('click', (e) => {
    e.preventDefault();
    openLegalModal('privacy');
  });

  document.getElementById('link-refund')?.addEventListener('click', (e) => {
    e.preventDefault();
    openLegalModal('refund');
  });

  document.getElementById('footer-link-help-faqs')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('tab-legal-terms')?.addEventListener('click', () => openLegalModal('terms'));
  document.getElementById('tab-legal-privacy')?.addEventListener('click', () => openLegalModal('privacy'));
  document.getElementById('tab-legal-refund')?.addEventListener('click', () => openLegalModal('refund'));

  document.getElementById('legal-close-btn')?.addEventListener('click', () => {
    legalModal?.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === legalModal) legalModal?.classList.remove('active');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal?.classList.contains('active')) {
      legalModal.classList.remove('active');
    }
  });
}
