class PerfumApp {
    constructor() {
        this.currentUser = null;
        this.users = [];
        this.products = [];
        this.brands = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.loadBrandsData();
        this.checkUserSession();
    }

    setupEventListeners() {
        // Formulario Login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Formulario Registrarse
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Formulario Recuperar contraseña
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }

        // Formulario Perfil del usuario
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProfileUpdate();
            });
        }

        // Validacion del input "Contraseña"
        const registerPassword = document.getElementById('registerPassword');
        if (registerPassword) {
            registerPassword.addEventListener('input', (e) => {
                this.validatePassword(e.target.value);
            });
        }

        // Validacion del input "Validar Contraseña"
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', (e) => {
                this.validateConfirmPassword();
            });
        }

        // Funcion para el boton del buscador
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.handleSearch();
            });
        }

        // Evento de buscar al precionar "Enter"
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });
        }

        // Evento del filtro de productos
        document.querySelectorAll('.filter-section select').forEach(select => {
            select.addEventListener('change', () => {
                this.filterProducts();
            });
        });

        // Evento del filtro de marcas por categoria
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.filterBrands(category);
            });
        });
    }

    loadSampleData() {
        // Usuarios de Prueba
        this.users = [
            {
                id: 1,
                name: 'Admin',
                email: 'admin@perfum.com',
                password: 'Admin123!',
                role: 'admin',
                telefono: '+56912345678',
                direccion: 'Santiago, Chile',
                fecha_nacimiento: '2025-01-01',
                preferencias: ['fresh', 'woody']
            },
            {
                id: 2,
                name: 'Perfumería Prueba',
                email: 'tienda@prueba.com',
                password: 'Prueba123!',
                role: 'Tienda',
                telefono: '+56987654321',
                direccion: 'Providencia, Santiago',
                fecha_nacimiento: '2025-02-02',
                preferencias: []
            },
            {
                id: 3,
                name: 'Cliente Prueba',
                email: 'cliente@prueba.com',
                password: 'Cliente123!',
                role: 'Cliente',
                telefono: '+56932145678',
                direccion: 'Concepcion',
                fecha_nacimiento: '2025-02-02',
                preferencias: []
            }
        ];

        // Productos de Prueba
        this.products = [
            {
                id: 1,
                name: 'Chanel No. 5',
                brand: 'Chanel',
                price: 89990,
                type: 'Eau de Parfum',
                gender: 'Femenino',
                rating: 5,
                description: 'El perfume más icónico del mundo',
                image: '../images/chanel5.webp',
                stores: [
                    { name: 'Perfumería Bella', price: 89990 },
                    { name: 'Fragrance Store', price: 92990 }
                ]
            },
            {
                id: 2,
                name: 'Sauvage',
                brand: 'Dior',
                price: 79990,
                type: 'Eau de Toilette',
                gender: 'Masculino',
                rating: 4,
                description: 'Fragancia fresca e intensa',
                image: '../images/sauvage.webp',
                stores: [
                    { name: 'Perfumería Bella', price: 79990 },
                    { name: 'Luxury Scents', price: 81990 }
                ]
            },
            {
                id: 3,
                name: 'Eros',
                brand: 'Versace',
                price: 65990,
                type: 'Eau de Parfum',
                gender: 'Masculino',
                rating: 5,
                description: 'Pasión, audacia y deseo',
                image: '../images/eros.png',
                stores: [
                    { name: 'Perfumería Bella', price: 65990 },
                    { name: 'Scent World', price: 67990 }
                ]
            },
            {
                id: 4,
                name: '1 Million',
                brand: 'Paco Rabanne',
                price: 55990,
                type: 'Eau de Toilette',
                gender: 'Masculino',
                rating: 4,
                description: 'Fragancia magnética y seductora',
                image: '../images/onemillion.webp',
                stores: [
                    { name: 'Perfumería Bella', price: 55990 },
                    { name: 'Golden Fragrances', price: 57990 }
                ]
            }
        ];
    }

    loadBrandsData() {
        // Marcas de prueba
        this.brands = [
            {
                id: 1,
                name: "Chanel",
                category: "luxury",
                description: "Elegancia francesa atemporal con fragancias icónicas que definen el lujo.",
                origin: "Francia",
                founded: "1910",
                priceRange: "$80.000 - $200.000",
                fragranceCount: 25,
                rating: 4.8,
                popularFragrances: [
                    { name: "Chanel No. 5", type: "Eau de Parfum", price: "$89.990" },
                    { name: "Coco Mademoiselle", type: "Eau de Parfum", price: "$85.990" },
                    { name: "Bleu de Chanel", type: "Eau de Toilette", price: "$79.990" }
                ]
            },
            {
                id: 2,
                name: "Dior",
                category: "luxury",
                description: "Sofisticación y modernidad combinadas en fragancias que capturan la esencia del glamour.",
                origin: "Francia", 
                founded: "1947",
                priceRange: "$70.000 - $180.000",
                fragranceCount: 30,
                rating: 4.7,
                popularFragrances: [
                    { name: "Sauvage", type: "Eau de Toilette", price: "$79.990" },
                    { name: "Miss Dior", type: "Eau de Parfum", price: "$82.990" },
                    { name: "J'adore", type: "Eau de Parfum", price: "$85.990" }
                ]
            },
            {
                id: 3,
                name: "Versace",
                category: "designer",
                description: "Lujo italiano audaz con fragancias que expresan pasión y sensualidad.",
                origin: "Italia",
                founded: "1978",
                priceRange: "$50.000 - $120.000",
                fragranceCount: 20,
                rating: 4.6,
                popularFragrances: [
                    { name: "Eros", type: "Eau de Toilette", price: "$65.990" },
                    { name: "Dylan Blue", type: "Eau de Toilette", price: "$68.990" },
                    { name: "Bright Crystal", type: "Eau de Toilette", price: "$62.990" }
                ]
            },
            {
                id: 4,
                name: "Paco Rabanne",
                category: "designer",
                description: "Innovación y rebeldía en cada fragancia, redefiniendo las reglas del perfume.",
                origin: "España",
                founded: "1966",
                priceRange: "$45.000 - $100.000",
                fragranceCount: 18,
                rating: 4.5,
                popularFragrances: [
                    { name: "1 Million", type: "Eau de Toilette", price: "$55.990" },
                    { name: "Lady Million", type: "Eau de Parfum", price: "$58.990" },
                    { name: "Invictus", type: "Eau de Toilette", price: "$52.990" }
                ]
            },
            {
                id: 5,
                name: "Tom Ford",
                category: "niche",
                description: "Lujo contemporáneo con fragancias provocativas y sofisticadas para el conocedor.",
                origin: "Estados Unidos",
                founded: "2006",
                priceRange: "$150.000 - $400.000",
                fragranceCount: 35,
                rating: 4.9,
                popularFragrances: [
                    { name: "Black Orchid", type: "Eau de Parfum", price: "$185.990" },
                    { name: "Oud Wood", type: "Eau de Parfum", price: "$220.990" },
                    { name: "Tobacco Vanille", type: "Eau de Parfum", price: "$195.990" }
                ]
            },
            {
                id: 6,
                name: "Creed",
                category: "niche",
                description: "Artesanía tradicional inglesa con ingredientes de la más alta calidad desde 1760.",
                origin: "Reino Unido",
                founded: "1760",
                priceRange: "$200.000 - $500.000",
                fragranceCount: 40,
                rating: 4.8,
                popularFragrances: [
                    { name: "Aventus", type: "Eau de Parfum", price: "$285.990" },
                    { name: "Silver Mountain Water", type: "Eau de Parfum", price: "$245.990" },
                    { name: "Green Irish Tweed", type: "Eau de Parfum", price: "$255.990" }
                ]
            },
            {
                id: 7,
                name: "Yves Saint Laurent",
                category: "luxury",
                description: "Elegancia parisina rebelde con fragancias que desafían las convenciones.",
                origin: "Francia",
                founded: "1961",
                priceRange: "$60.000 - $150.000",
                fragranceCount: 22,
                rating: 4.6,
                popularFragrances: [
                    { name: "La Nuit de L'Homme", type: "Eau de Toilette", price: "$72.990" },
                    { name: "Black Opium", type: "Eau de Parfum", price: "$78.990" },
                    { name: "Y", type: "Eau de Toilette", price: "$69.990" }
                ]
            },
            {
                id: 8,
                name: "Armani",
                category: "designer",
                description: "Minimalismo italiano elegante con fragancias que reflejan sofisticación moderna.",
                origin: "Italia",
                founded: "1975",
                priceRange: "$50.000 - $130.000",
                fragranceCount: 28,
                rating: 4.4,
                popularFragrances: [
                    { name: "Acqua di Giò", type: "Eau de Toilette", price: "$65.990" },
                    { name: "Code", type: "Eau de Toilette", price: "$62.990" },
                    { name: "Sì", type: "Eau de Parfum", price: "$68.990" }
                ]
            }
        ];
    }

    // Función auxiliar para obtener nombre de categoría
    getCategoryName(category) {
        const categoryNames = {
            'luxury': 'Lujo',
            'designer': 'Diseñador',
            'niche': 'Nicho'
        };
        return categoryNames[category] || category;
    }

    // Función para crear el HTML de una tarjeta de marca
    createBrandCard(brand) {
        const stars = '★'.repeat(Math.floor(brand.rating)) + '☆'.repeat(5 - Math.floor(brand.rating));
    
        return `
            <div class="brand-card" data-category="${brand.category}" data-brand-id="${brand.id}">
                <div class="brand-logo">
                    ${brand.name.charAt(0)}
                </div>
                <h3 class="brand-name">${brand.name}</h3>
                <p class="brand-description">${brand.description}</p>
                <div class="brand-stats-inline">
                    <span>${brand.fragranceCount} fragancias</span>
                    <span class="brand-rating">${stars} ${brand.rating}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="brand-category">${this.getCategoryName(brand.category)}</span>
                    <span class="brand-price-range">${brand.priceRange}</span>
                </div>
            </div>
        `;
    }

    displayBrands(brands = this.brands) {
        const brandsGrid = document.getElementById('brandsGrid');
        if (!brandsGrid) return;

        // Mostrar loading
        brandsGrid.innerHTML = `
            <div class="brands-loading">
                <div class="brands-spinner"></div>
            </div>
        `;

        // Simular carga y mostrar marcas
        setTimeout(() => {
            brandsGrid.innerHTML = brands.map(brand => this.createBrandCard(brand)).join('');
            
            // Agregar event listeners para los modales
            this.addBrandCardListeners();
        }, 800);
    }

    // Funcion de filtro de marcas
    filterBrands(category) {
        const filteredBrands = category === 'all' ? this.brands : this.brands.filter(brand => brand.category === category);
        this.displayBrands(filteredBrands);
        
        // Actualizar botones activos
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const categoryBtn = document.querySelector(`[data-category="${category}"]`);
        if (categoryBtn) {
            categoryBtn.classList.add('active');
        }
    }

    // Funcion de Buscar por marca
    searchBrands(searchTerm) {
        const filteredBrands = this.brands.filter(brand => 
            brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.origin.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayBrands(filteredBrands);
    }

    // Función para mostrar el modal de detalles de marca
    showBrandModal(brand) {
        const modal = document.getElementById('brandModal');
        if (!modal) return;
        
        const modalTitle = modal.querySelector('.brand-modal-title');
        const modalBody = modal.querySelector('.brand-modal-body');

        if (modalTitle) modalTitle.textContent = brand.name;
        
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="brand-detail-grid">
                    <div class="brand-detail-info">
                        <h5>Información de la Marca</h5>
                        <div class="brand-origin">
                            <strong>Origen:</strong> ${brand.origin}<br>
                            <strong>Fundada:</strong> ${brand.founded}<br>
                            <strong>Categoría:</strong> ${this.getCategoryName(brand.category)}
                        </div>
                        <p><strong>Descripción:</strong></p>
                        <p>${brand.description}</p>
                        <p><strong>Rango de Precios:</strong> ${brand.priceRange}</p>
                        <p><strong>Total de Fragancias:</strong> ${brand.fragranceCount}</p>
                        <p><strong>Rating:</strong> ${'★'.repeat(Math.floor(brand.rating))} ${brand.rating}/5</p>
                    </div>
                    <div class="brand-fragrances-section">
                        <h5>Fragancias Populares</h5>
                        <div class="brand-fragrances">
                            ${brand.popularFragrances.map(fragrance => `
                                <div class="fragrance-item">
                                    <div class="fragrance-name">${fragrance.name}</div>
                                    <div class="fragrance-type">${fragrance.type}</div>
                                    <div class="fragrance-price">${fragrance.price}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary btn-lg">Ver Todas las Fragancias</button>
                </div>
            `;
        }

        // Mostrar el modal
        if (typeof bootstrap !== 'undefined') {
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    }

    addBrandCardListeners() {
        const brandCards = document.querySelectorAll('.brand-card');
        brandCards.forEach(card => {
            card.addEventListener('click', () => {
                const brandId = parseInt(card.dataset.brandId);
                const brand = this.brands.find(b => b.id === brandId);
                if (brand) {
                    this.showBrandModal(brand);
                }
            });
        });
    }

    checkUserSession() {
        // CHEQUEAR SI SE GUARDA LA SESION
        const storedUser = this.getStoredUser();
        if (storedUser) {
            this.currentUser = storedUser;
            this.updateNavigation();
        }
    }

    getStoredUser() {
        // SIMULAN EL GUARDADO DEL USUARIO SIN USAR EL LOCALSTORAGE
        return window.currentUser || null;
    }

    setStoredUser(user) {
        // SIMULAN EL GUARDADO DEL USUARIO SIN USAR EL LOCALSTORAGE
        window.currentUser = user;
    }

    handleLogin() {
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        
        if (!loginEmail || !loginPassword) return;
        
        const email = loginEmail.value;
        const password = loginPassword.value;

        // Validar Formulario de Inicio de Sesion
        if (!this.validateEmail(email)) {
            this.showError('loginEmail', 'Email inválido');
            return;
        }

        if (!password) {
            this.showError('loginPassword', 'Contraseña requerida');
            return;
        }

        // Buscar Usuario
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.setStoredUser(user);
            this.updateNavigation();
            this.closeModal('loginModal');
            this.showAlert('success', `¡Bienvenido, ${user.name}!`);
        } else {
            this.showAlert('danger', 'Credenciales incorrectas');
        }
    }

    handleRegister() {
        const registerName = document.getElementById('registerName');
        const registerEmail = document.getElementById('registerEmail');
        const registerPassword = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const userRole = document.getElementById('userRole');
        const acceptTerms = document.getElementById('acceptTerms');

        if (!registerName || !registerEmail || !registerPassword || !confirmPassword || !userRole || !acceptTerms) {
            this.showAlert('danger', 'Faltan campos requeridos');
            return;
        }

        const name = registerName.value;
        const email = registerEmail.value;
        const password = registerPassword.value;
        const confirmPass = confirmPassword.value;
        const role = userRole.value;
        const terms = acceptTerms.checked;

        // VALIDACION DEL FORMULARIO DE REGISTRO
        if (!name) {
            this.showError('registerName', 'Nombre requerido');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError('registerEmail', 'Email inválido');
            return;
        }

        if (!this.isPasswordValid(password)) {
            this.showAlert('danger', 'La contraseña no cumple con los requisitos');
            return;
        }

        if (password !== confirmPass) {
            this.showError('confirmPassword', 'Las contraseñas no coinciden');
            return;
        }

        if (!role) {
            this.showAlert('danger', 'Selecciona un tipo de usuario');
            return;
        }

        if (!terms) {
            this.showAlert('danger', 'Debes aceptar los términos y condiciones');
            return;
        }

        // VALIDAR SI EL USUARIO EXISTE
        if (this.users.find(u => u.email === email)) {
            this.showAlert('danger', 'El email ya está registrado');
            return;
        }

        // CREAR EL NUEVO USUARIO
        const newUser = {
            id: this.users.length + 1,
            name,
            email,
            password,
            role,
            telefono: '',
            direccion: '',
            fecha_nacimiento: '',
            preferencias: []
        };

        this.users.push(newUser);
        this.closeModal('registerModal');
        this.showAlert('success', '¡Registro exitoso! Ahora puedes iniciar sesión.');
    }

    handleForgotPassword() {
        const recoveryEmail = document.getElementById('recoveryEmail');
        if (!recoveryEmail) return;
        
        const email = recoveryEmail.value;

        if (!this.validateEmail(email)) {
            this.showError('recoveryEmail', 'Email inválido');
            return;
        }

        const user = this.users.find(u => u.email === email);
        if (user) {
            this.closeModal('forgotPasswordModal');
            this.showAlert('success', 'Se ha enviado un enlace de recuperación a tu email.');
        } else {
            this.showAlert('danger', 'Email no encontrado');
        }
    }

    handleProfileUpdate() {
        if (!this.currentUser) return;

        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profilePhone = document.getElementById('profilePhone');
        const profileBirthdate = document.getElementById('profileBirthdate');
        const profileAddress = document.getElementById('profileAddress');

        if (!profileName || !profileEmail) return;

        const formData = {
            name: profileName.value,
            email: profileEmail.value,
            telefono: profilePhone ? profilePhone.value : '',
            fecha_nacimiento: profileBirthdate ? profileBirthdate.value : '',
            direccion: profileAddress ? profileAddress.value : '',
            preferencias: []
        };

        // OBTENER LAS PREFERENCIAS
        const prefCheckboxes = ['prefFresh', 'prefWoody', 'prefFloral', 'prefOriental'];
        prefCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                formData.preferencias.push(id.replace('pref', '').toLowerCase());
            }
        });

        // CAMBIAR LA CONTRASEÑA
        const newPassword = document.getElementById('newPassword');
        const confirmNewPassword = document.getElementById('confirmNewPassword');

        if (newPassword && newPassword.value) {
            if (!this.isPasswordValid(newPassword.value)) {
                this.showAlert('danger', 'La nueva contraseña no cumple con los requisitos');
                return;
            }
            if (confirmNewPassword && newPassword.value !== confirmNewPassword.value) {
                this.showAlert('danger', 'Las contraseñas no coinciden');
                return;
            }
            formData.password = newPassword.value;
        }

        // UPDATEAR LOS DATOS DEL USUARIO
        Object.assign(this.currentUser, formData);
        this.setStoredUser(this.currentUser);
        this.closeModal('profileModal');
        this.showAlert('success', 'Perfil actualizado exitosamente');
    }

    handleSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;
        
        const query = searchInput.value.toLowerCase();
        if (!query) return;

        this.showLoading();
                
        setTimeout(() => {
            const filteredProducts = this.products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );

            const filteredBrands = this.brands.filter(brand => 
                brand.name.toLowerCase().includes(query) ||
                brand.description.toLowerCase().includes(query) ||
                brand.origin.toLowerCase().includes(query)
            );
                    
            this.hideLoading();
            this.renderProducts(filteredProducts);

            if (document.getElementById('brandsGrid')) {
                this.displayBrands(filteredBrands);
            }
                    
            if (filteredProducts.length === 0) {
                this.showAlert('info', 'No se encontraron productos para tu búsqueda');
            }

        }, 1000);
    }

    // FILTRAR PRODUCTOS
    filterProducts() {
        const filterSelects = document.querySelectorAll('.filter-section select');
        if (filterSelects.length < 4) return;
        
        const filters = {
            brand: filterSelects[0].value,
            type: filterSelects[1].value,
            gender: filterSelects[2].value,
            priceRange: filterSelects[3].value
        };

        let filtered = [...this.products];

        if (filters.brand && filters.brand !== 'Todas las marcas') {
            filtered = filtered.filter(p => p.brand === filters.brand);
        }

        if (filters.type && filters.type !== 'Tipo de fragancia') {
            filtered = filtered.filter(p => p.type === filters.type);
        }

        if (filters.gender && filters.gender !== 'Género') {
            filtered = filtered.filter(p => p.gender === filters.gender);
        }

        if (filters.priceRange && filters.priceRange !== 'Rango de precio') {
            const [min, max] = this.parsePriceRange(filters.priceRange);
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }

        this.renderProducts(filtered);
    }

    parsePriceRange(range) {
        switch(range) {
            case '$0 - $50.000':
                return [0, 50000];
            case '$50.000 - $100.000':
                return [50000, 100000];
            case '$100.000+':
                return [100000, Infinity];
            default:
                return [0, Infinity];
        }
    }

    renderProducts(products) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            grid.appendChild(productCard);
        });
    }

    // CREACION DE LA CARD DEL PRODUCTO
    createProductCard(product) {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6';

        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

        col.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" class="img-fluid" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <i class="fas fa-spray-can" style="display: none;"></i>` 
                        : 
                        `<i class="fas fa-spray-can"></i>`
                    }
                </div>
                <div class="product-info">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-brand">${product.brand}</p>
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-primary btn-sm" onclick="app.showProductDetails(${product.id})">
                            Ver Detalles
                        </button>
                        <div class="text-warning">
                            ${stars}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return col;
    }

    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // CREACION DEL DETALLE DEL PRODUCTO
        const modalHtml = `
            <div class="modal fade" id="productModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.name}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="product-image-large text-center mb-3">
                                        ${product.image ? 
                                            `<img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-height: 300px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                            <i class="fas fa-spray-can" style="font-size: 8rem; color: #6b7280; display: none;"></i>` 
                                            : 
                                            `<i class="fas fa-spray-can" style="font-size: 8rem; color: #6b7280;"></i>`
                                        }
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h3>${product.name}</h3>
                                    <p class="text-muted">${product.brand}</p>
                                    <p>${product.description}</p>
                                    <div class="mb-3">
                                        <strong>Tipo:</strong> ${product.type}<br>
                                        <strong>Género:</strong> ${product.gender}<br>
                                        <strong>Calificación:</strong> ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                                    </div>
                                    <h4 class="text-primary">Precios en tiendas:</h4>
                                    ${product.stores.map(store => `
                                        <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                                            <span>${store.name}</span>
                                            <span class="fw-bold">$${store.price.toLocaleString()}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal
        const existingModal = document.getElementById('productModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal
        document.body.insertAdjacentHTML('beforeend', modalHtml);
                
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    validatePassword(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        Object.keys(requirements).forEach(req => {
            const element = document.getElementById(req);
            const icon = element.querySelector('i');
            
            if (requirements[req]) {
                element.classList.remove('invalid');
                element.classList.add('valid');
                icon.className = 'fas fa-check me-2';
            } else {
                element.classList.remove('valid');
                element.classList.add('invalid');
                icon.className = 'fas fa-times me-2';
            }
        });

        return Object.values(requirements).every(req => req);
    }

    // VALIDACION "CONTRASEÑA" Y "VALIDAR CONTRASEÑA" SEAN IGUALES
    validateConfirmPassword() {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmField = document.getElementById('confirmPassword');

        if (password !== confirmPassword) {
            confirmField.classList.add('is-invalid');
            return false;
        } else {
            confirmField.classList.remove('is-invalid');
            return true;
        }
    }

    // REGEX VALIDACION CONTRASEÑA CUMPLA PARAMETROS MINIMOS
    isPasswordValid(password) {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /\d/.test(password) &&
               /[!@#$%^&*(),.?":{}|<>]/.test(password);
    }

    // REGEX VALIDACION CORREO
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    updateNavigation() {
        const navItems = document.querySelector('.navbar-nav');
        if (this.currentUser) {
            navItems.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="#home">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#products">Productos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#brands">Marcas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#about">Nosotros</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i>${this.currentUser.name}
                        <span class="user-role">${this.currentUser.role}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="app.showProfile()">Mi Perfil</a></li>
                        <li><a class="dropdown-item" href="#" onclick="app.logout()">Cerrar Sesión</a></li>
                    </ul>
                </li>
            `;
        }
    }

    showProfile() {
        // Insertar datos al formulario del perfil
        document.getElementById('profileName').value = this.currentUser.name;
        document.getElementById('profileEmail').value = this.currentUser.email;
        document.getElementById('profilePhone').value = this.currentUser.telefono || '';
        document.getElementById('profileBirthdate').value = this.currentUser.fecha_nacimiento || '';
        document.getElementById('profileAddress').value = this.currentUser.direccion || '';

        // Agrega las preferencias
        const prefCheckboxes = ['prefFresh', 'prefWoody', 'prefFloral', 'prefOriental'];
        prefCheckboxes.forEach(id => {
            const prefName = id.replace('pref', '').toLowerCase();
            document.getElementById(id).checked = this.currentUser.preferencias.includes(prefName);
        });

        // Mostrar panel de Administrador si el rol es de "Admin"
        if (this.currentUser.role === 'admin') {
            document.getElementById('adminPanel').style.display = 'block';
        }

        // Mostrar Modal del perfil
        const modal = new bootstrap.Modal(document.getElementById('profileModal'));
        modal.show();
    }

    logout() {
        this.currentUser = null;
        window.currentUser = null;
        this.updateNavigation();
        this.showAlert('success', 'Sesión cerrada exitosamente');
                
        // Resetear la navegacion al cerrar sesion
        const navItems = document.querySelector('.navbar-nav');
        navItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="#home">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#products">Productos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#brands">Marcas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#about">Nosotros</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <i class="fas fa-user me-1"></i>Ingresar
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">
                    Registrarse
                </a>
            </li>
        `;
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('productsGrid').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('productsGrid').style.display = 'flex';
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('is-invalid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    }

    showAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
                
        document.body.insertAdjacentHTML('beforeend', alertHtml);
                
        // Auto-remove after 5 seconds
        setTimeout(() => {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => {
                if (alert.textContent.includes(message)) {
                    alert.remove();
                }
            });
        }, 5000);
    }

    closeModal(modalId) {
        const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (modal) {
            modal.hide();
        }
    }

    
}

    // Initialize app
    const app = new PerfumApp();

    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar marcas si la página actual es brands
        if (document.getElementById('brandsGrid')) {
            app.displayBrands();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    window.brandsModule = {
        displayBrands: () => app.displayBrands(),
        filterBrands: (category) => app.filterBrands(category),
        searchBrands: (searchTerm) => app.searchBrands(searchTerm),
        brandsData: app.brands
    };
