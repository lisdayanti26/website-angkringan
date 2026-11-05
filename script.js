// Daftar produk
const products = [
    { id: 1, name: 'SCORA', price: 30000, img: 'img/scora.jpg' },
    { id: 2, name: 'WARDAH', price: 35000, img: 'img/wardah.jpg' },
    { id: 3, name: 'YSL', price: 2500000, img: 'img/ysl.jpg' },
    { id: 4, name: 'FACETOLOGY', price: 70000, img: 'img/facetologi.jpg' },
    { id: 5, name: 'HERBORIST', price: 25000, img: 'img/herboris.jpg' },
    { id: 6, name: 'NUFACE', price: 45000, img: 'img/nvs.jpg' }
];

// Keranjang belanja
let cart = [];

// Format rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID').format(angka);
}

// Menampilkan produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}"
                 onerror="this.alt='Gambar tidak ditemukan'">
            <h3>${product.name}</h3>
            <p>Rp ${formatRupiah(product.price)}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke Keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Memperbarui keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');

    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${formatRupiah(item.price * item.quantity)}`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent =
        formatRupiah(totalPrice);
}

// Proses checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const payment = Number(
        prompt(`Total belanja Rp ${formatRupiah(total)}. Masukkan jumlah pembayaran:`)
    );

    if (!Number.isFinite(payment) || payment < total) {
        alert('Pembayaran tidak valid atau uang Anda tidak mencukupi.');
        return;
    }

    const change = payment - total;

    alert(
        `Pembayaran berhasil!\nTotal: Rp ${formatRupiah(total)}\nKembalian: Rp ${formatRupiah(change)}`
    );

    cart = [];
    updateCart();
}

// Tombol checkout
document.getElementById('checkout-btn')
    .addEventListener('click', checkout);

// Menampilkan produk ketika halaman dibuka
displayProducts();