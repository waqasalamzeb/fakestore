document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const priceInput = document.getElementById('price');

    // Fetch product data
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            populateCategoryFilter(data);
            searchInput.addEventListener('input', () => filterProducts(data));
            categorySelect.addEventListener('change', () => filterProducts(data));
            priceInput.addEventListener('input', () => filterProducts(data));
        });

    // Display products
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Populate category filter
    function populateCategoryFilter(products) {
        const categories = ['all', ...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categorySelect.appendChild(option);
        });
    }

    // Filter products
    function filterProducts(products) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const maxPrice = parseFloat(priceInput.value);

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesPrice = isNaN(maxPrice) || product.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        displayProducts(filteredProducts);
    }
});
