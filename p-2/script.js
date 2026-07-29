document.addEventListener('DOMContentLoaded', () => {
  // Menu Data Source
  const menuItems = [
    {
      id: 1,
      name: 'Smoky Pan Pizza',
      description: 'Wood-fired crust with pepperoni, roasted peppers, and melting mozzarella.',
      price: 399,
      category: 'non-veg',
      cuisine: 'Italian',
      emoji: '🍕',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Garden Veggie Bowl',
      description: 'Quinoa, roasted veggies, hummus, and a citrus herb drizzle.',
      price: 249,
      category: 'veg',
      cuisine: 'Mediterranean',
      emoji: '🥗',
      badge: 'Healthy'
    },
    {
      id: 3,
      name: 'Butter Chicken Rice',
      description: 'Creamy butter chicken served over fragrant basmati rice.',
      price: 329,
      category: 'non-veg',
      cuisine: 'Indian',
      emoji: '🍛',
      badge: 'Comfort Food'
    },
    {
      id: 4,
      name: 'Classic Cheeseburger',
      description: 'Double patty, cheddar, pickles, and house sauce in a soft bun.',
      price: 279,
      category: 'non-veg',
      cuisine: 'American',
      emoji: '🍔',
      badge: 'Popular'
    },
    {
      id: 5,
      name: 'Paneer Tikka Wrap',
      description: 'Chargrilled paneer with mint chutney and crunchy slaw.',
      price: 219,
      category: 'veg',
      cuisine: 'Indian',
      emoji: '🌯',
      badge: 'Spicy'
    },
    {
      id: 6,
      name: 'Truffle Pasta',
      description: 'Creamy pasta topped with truffle mushrooms and aged parmesan.',
      price: 549,
      category: 'veg',
      cuisine: 'Italian',
      emoji: '🍝',
      badge: 'Premium'
    }
  ];

  // Application State
  let activeCategory = 'all';
  let activePrice = 'all';
  let activeCuisine = 'all';
  let searchQuery = '';
  
  // Persistent Cart Initialization
  let cart = JSON.parse(localStorage.getItem('flavourFleetCart')) || [];

  // DOM Elements
  const menuGrid = document.getElementById('menuGrid');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const navCartCount = document.getElementById('navCartCount');
  const subtotal = document.getElementById('subtotal');
  const total = document.getElementById('total');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalAddBtn = document.getElementById('modalAddBtn');
  const navSearch = document.getElementById('navbarSearch');
  const menuSearch = document.getElementById('menuSearch');
  const priceFilter = document.getElementById('priceFilter');
  const cuisineFilter = document.getElementById('cuisineFilter');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');
  const formStatus = document.getElementById('formStatus');

  // Filter Computation
  function getFilteredItems() {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesPrice =
        activePrice === 'all' ||
        (activePrice === 'budget' && item.price < 250) ||
        (activePrice === 'mid' && item.price >= 250 && item.price <= 500) ||
        (activePrice === 'premium' && item.price > 500);
      const matchesCuisine = activeCuisine === 'all' || item.cuisine === activeCuisine;
      
      const haystack = `${item.name} ${item.description} ${item.cuisine}`.toLowerCase();
      const matchesSearch = haystack.includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesCuisine && matchesSearch;
    });
  }

  // Render Menu Section
  function renderMenu() {
    if (!menuGrid) return;
    const filteredItems = getFilteredItems();

    if (!filteredItems.length) {
      menuGrid.innerHTML = `
        <div class="col-12">
          <div class="alert alert-light text-center py-4 rounded-4">
            <h5>No dishes found 🔍</h5>
            <p class="text-muted mb-0">Try clearing filters or adjusting your search term.</p>
          </div>
        </div>`;
      return;
    }

    menuGrid.innerHTML = filteredItems
      .map(
        (item) => `
        <div class="col-md-6">
          <div class="card menu-card h-100 p-3">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="menu-emoji">${item.emoji}</span>
                  <span class="badge bg-warning-subtle text-dark border border-warning-subtle fw-semibold">${item.badge}</span>
                </div>
                <h5 class="fw-bold mb-1">${item.name}</h5>
                <p class="text-muted small mb-3">${item.description}</p>
              </div>
              <div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="fs-5 fw-bold text-dark">₹${item.price}</span>
                  <span class="badge bg-light text-secondary border">${item.cuisine}</span>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline-dark btn-sm flex-grow-1 quick-view-btn" data-id="${item.id}">Quick View</button>
                  <button class="btn btn-primary btn-sm flex-grow-1 add-cart-btn" data-id="${item.id}">+ Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // Save State and Update Cart UI
  function saveAndRenderCart() {
    localStorage.setItem('flavourFleetCart', JSON.stringify(cart));
    renderCart();
  }

  function addToCart(itemId) {
    const item = menuItems.find((entry) => entry.id === itemId);
    if (!item) return;

    const existing = cart.find((entry) => entry.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    saveAndRenderCart();
    showToast(`Added ${item.name} to cart!`, item.emoji);
  }

  function updateQuantity(itemId, change) {
    const existing = cart.find((entry) => entry.id === itemId);
    if (!existing) return;

    existing.quantity += change;
    if (existing.quantity <= 0) {
      cart = cart.filter((entry) => entry.id !== itemId);
    }
    saveAndRenderCart();
  }

  function renderCart() {
    if (!cartItems) return;

    if (!cart.length) {
      cartItems.innerHTML = `
        <div class="text-center py-4">
          <p class="fs-1 mb-1">🛒</p>
          <p class="text-muted mb-0">Your cart is currently empty.</p>
        </div>`;
      if (cartCount) cartCount.textContent = '0';
      if (navCartCount) navCartCount.textContent = '0';
      if (subtotal) subtotal.textContent = '₹0';
      if (total) total.textContent = '₹0';
      return;
    }

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = itemCount;
    if (navCartCount) navCartCount.textContent = itemCount;

    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalAmount = sub + 40 + 25; // Delivery (40) + Taxes (25)

    if (subtotal) subtotal.textContent = `₹${sub}`;
    if (total) total.textContent = `₹${totalAmount}`;

    cartItems.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item d-flex justify-content-between align-items-center">
          <div>
            <h6 class="fw-bold mb-0">${item.emoji} ${item.name}</h6>
            <span class="text-muted small">₹${item.price} × ${item.quantity}</span>
          </div>
          <div class="cart-actions d-flex align-items-center gap-1">
            <button class="btn btn-outline-dark btn-sm" data-action="decrease" data-id="${item.id}">-</button>
            <span class="fw-bold px-2">${item.quantity}</span>
            <button class="btn btn-outline-dark btn-sm" data-action="increase" data-id="${item.id}">+</button>
            <button class="btn btn-danger btn-sm ms-1" data-action="remove" data-id="${item.id}">✕</button>
          </div>
        </div>
      `
      )
      .join('');
  }

  // Quick View Modal Opener
  function openModal(itemId) {
    const item = menuItems.find((entry) => entry.id === itemId);
    if (!item) return;

    if (modalTitle) modalTitle.textContent = item.name;
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="text-center mb-3">
          <span style="font-size: 4rem;">${item.emoji}</span>
        </div>
        <p class="text-muted mb-3">${item.description}</p>
        <div class="d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
          <div>
            <span class="text-muted d-block small">Price</span>
            <span class="fs-4 fw-bold text-dark">₹${item.price}</span>
          </div>
          <span class="badge bg-success-subtle text-success fs-6">${item.cuisine}</span>
        </div>
      `;
    }
    if (modalAddBtn) modalAddBtn.dataset.id = item.id;
    
    const modalEl = document.getElementById('itemModal');
    if (modalEl) {
      // Reuses existing Bootstrap modal instance safely
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  // Toast Notification Trigger
  function showToast(message, icon = '✨') {
    const toastEl = document.getElementById('liveToast');
    const toastMsg = document.getElementById('toastMessage');
    const toastIco = document.getElementById('toastIcon');

    if (!toastEl) return;

    if (toastMsg) toastMsg.textContent = message;
    if (toastIco) toastIco.textContent = icon;
    toastEl.classList.remove('d-none');

    setTimeout(() => {
      toastEl.classList.add('d-none');
    }, 2500);
  }

  // Synchronize Controls & Filter Handlers
  function syncFilters() {
    if (menuSearch) searchQuery = menuSearch.value;
    activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    if (priceFilter) activePrice = priceFilter.value;
    if (cuisineFilter) activeCuisine = cuisineFilter.value;
    renderMenu();
  }

  // Delegation Event Listeners
  menuGrid?.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-cart-btn');
    if (addButton) addToCart(Number(addButton.dataset.id));

    const quickButton = event.target.closest('.quick-view-btn');
    if (quickButton) openModal(Number(quickButton.dataset.id));
  });

  cartItems?.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === 'increase') updateQuantity(id, 1);
    if (action === 'decrease') updateQuantity(id, -1);
    if (action === 'remove') updateQuantity(id, -999);
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      syncFilters();
    });
  });

  menuSearch?.addEventListener('input', syncFilters);
  priceFilter?.addEventListener('change', syncFilters);
  cuisineFilter?.addEventListener('change', syncFilters);

  navSearch?.addEventListener('input', (event) => {
    if (menuSearch) menuSearch.value = event.target.value;
    syncFilters();
  });

  // Hero Card Add Button Handler
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rawId = e.currentTarget.dataset.id;
      if (rawId) addToCart(Number(rawId));
    });
  });

  // Modal Add Button Handler
  modalAddBtn?.addEventListener('click', () => {
    const id = Number(modalAddBtn.dataset.id);
    addToCart(id);
    const modalEl = document.getElementById('itemModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  });

  // Checkout Validation & Processing
  checkoutBtn?.addEventListener('click', () => {
    if (!cart.length) {
      showToast('Your cart is empty! Add dishes to checkout.', '⚠️');
      return;
    }

    const orderSummary = cart.map((item) => `${item.name} (x${item.quantity})`).join(', ');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    contactName?.focus();
    
    if (formStatus) formStatus.textContent = 'Redirecting order details to email...';

    const subject = encodeURIComponent('FlavourFleet - New Checkout Request');
    const body = encodeURIComponent(`Hello FlavourFleet Team,\n\nI would like to place an order:\n\nOrder Items:\n${orderSummary}\n\nPlease contact me to finalize payment and delivery.\n\nThanks!`);
    
    window.location.href = `mailto:orders@flavourfleet.com?subject=${subject}&body=${body}`;
  });

  // Support Form Handler
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactName?.value.trim() || 'Customer';
    const email = contactEmail?.value.trim() || 'No email provided';
    const message = contactMessage?.value.trim() || 'No message';
    
    const subject = encodeURIComponent(`Support Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    if (formStatus) formStatus.textContent = 'Opening email client...';
    window.location.href = `mailto:support@flavourfleet.com?subject=${subject}&body=${body}`;
  });

  // Initial Load Trigger
  renderMenu();
  renderCart();
});