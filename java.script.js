// Daftar produk dengan gambar
conct products = [
    { id :1, name :'MILKU', price : 4000, img:'img/milku.jpg'},
    { id :2, name :'POTABEE', price : 2000, img:'img/potabee.jpg'},
    { id :3, name :'OREO', price : 2000, img:'img/oreo.jpg'},
    { id :4, name :'QTELA', price : 2000, img:'img/qtela.webp'},
    { id :5, name :'FLORIDINA', price : 4000, img:'img/floridina.jpg'},



];

// keranjang belanja
let cart =[];

// fungsi umtuk menampilkan daftar produk
function displayProducts () {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createrElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
             <img scr="${product.img}" alt="${produck.name}">
             <h3>${product.name}</h3>
             <p>Rp ${product.price}</p>
             <button onclick="addToCart(${product.id})">tambah ke keranjang<button>
             `;
             productsContainer.appendChild(productDiv);
    });
 }

 // fungsi untuk menambah produk ke keranjang belanja
 function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity
     } else {
        cart.push({...product, quantity: 1 });
     }

     updateCart();
}

// fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalprice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listitem.textcontent = `${item.name} x ${item.quantity} - Rp ${item.price = item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalprice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalprice;
}

// fungsi untuk melakukan chekout
function checkout() {
    if (cart.length === 0) {
        alert('keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`);

    if (payment >= total) {
        alert(`Pembayaran berhasil kembalian Anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

// Event listener untuk tombol checkout
document.getElementById('checkout-btn').addventlistener ('click', checkout);

// Tampilkan produk saat halaman dimuat
displayProducts();
