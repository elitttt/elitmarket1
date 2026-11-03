// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'MILKU', price: 4000, img: 'img/milku.jpg' },
    { id: 2, name: 'POTABEE', price: 2000, img: 'img/potabee.jpg' },
    { id: 3, name: 'OREO', price: 2000, img: 'img/oreo.jpg' },
    { id: 4, name: 'QTELA', price: 2000, img: 'img/qtela.webp' },
    { id: 5, name: 'FLORIDINA', price: 4000, img: 'img/floridina.jpg' },
];

// Keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Fungsi untuk menampilkan isi keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        const subtotal = item.price * item.quantity;

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${subtotal.toLocaleString('id-ID')}`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += subtotal;
    });

    document.getElementById('total-price').textContent =
        totalPrice.toLocaleString('id-ID');
}

// Fungsi checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const payment = prompt(
        `Total belanja Anda Rp ${total.toLocaleString('id-ID')}. Masukkan jumlah pembayaran:`
    );

    // Batalkan jika pengguna menekan Cancel
    if (payment === null) {
        return;
    }

    const amountPaid = Number(payment);

    if (!Number.isFinite(amountPaid) || amountPaid < total) {
        alert('Uang Anda tidak mencukupi atau jumlah pembayaran tidak valid.');
        return;
    }

    const change = amountPaid - total;

    alert(
        `Pembayaran berhasil!\nKembalian Anda: Rp ${change.toLocaleString('id-ID')}`
    );

    cart = [];
    updateCart();
}

// Event listener tombol checkout
document.getElementById('checkout-btn')
    .addEventListener('click', checkout);

// Tampilkan produk saat halaman dimuat
displayProducts();