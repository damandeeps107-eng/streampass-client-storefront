import os

app_js_path = '/Users/user/.gemini/antigravity-ide/brain/1e50b2ea-9de2-41f7-bb1c-ff81182ba123/streampass-client-storefront/src/js/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

old_drawer_js = '''  // Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  mobileToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-drawer .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });'''

new_drawer_js = '''  // Mobile Menu Drawer & Overlay
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
  });'''

old_close_func = '''function closeMobileDrawer() {
  document.getElementById('mobile-drawer')?.classList.remove('open');
}'''

new_close_func = '''function closeMobileDrawer() {
  document.getElementById('mobile-drawer')?.classList.remove('open', 'active');
  document.getElementById('mobile-drawer-overlay')?.classList.remove('active');
}'''

if old_drawer_js in js_content:
    js_content = js_content.replace(old_drawer_js, new_drawer_js)
if old_close_func in js_content:
    js_content = js_content.replace(old_close_func, new_close_func)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
print('✅ app.js updated successfully!')
