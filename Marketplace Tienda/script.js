const allProductsUrl = 'https://fakestoreapi.com/products';  
const containerProducts = document.getElementById('container-products');
const searchInput = document.getElementById('search');
const cartItems = document.getElementById('cart-items');
const totalPriceDisplay = document.getElementById('total-price');
let cart = [];


const getData = async (URL) => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error("Error en los productos:", error);
    }
};


const displayProducts = (products) => {
    containerProducts.innerHTML = ''; 
    products.forEach(product => {
        const { id, title, description, price, category, image } = product;

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const imgProduct = document.createElement('img');
        imgProduct.src = image;  
        imgProduct.alt = description;

        const titleProduct = document.createElement('h2');
        titleProduct.textContent = title;

        const priceProduct = document.createElement('p');
        priceProduct.textContent = `$${price}`;

        const categoryProduct = document.createElement('p');
        categoryProduct.textContent = `Categoría: ${category}`; 

        const btnAddToCart = document.createElement('button');
        btnAddToCart.textContent = 'Agregar al carrito';
        btnAddToCart.addEventListener('click', () => addToCart(product));

        productCard.appendChild(imgProduct);
        productCard.appendChild(titleProduct);
        productCard.appendChild(priceProduct);
        productCard.appendChild(categoryProduct);
        productCard.appendChild(btnAddToCart);

        containerProducts.appendChild(productCard);
    });
};


const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
       
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
    } else {
        
        cart.push({
            ...product,
            quantity: 1,
            totalPrice: product.price
        });
    }
    updateCart();
};


const updateCart = () => {
    cartItems.innerHTML = ''; 
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} (x${item.quantity}) - $${item.totalPrice.toFixed(2)}`;
        cartItems.appendChild(li);

        totalPrice += item.totalPrice;
    });

    totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
};


searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    fetch(allProductsUrl)
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(searchQuery)
            );
            displayProducts(filteredProducts);
        })
        .catch(error => console.error("Error en los productos:", error));
});


getData(allProductsUrl);