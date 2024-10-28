let data; // Biến lưu trữ dữ liệu giỏ hàng

async function fetchCartData() {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        const response = await fetch('gio-hang-chi-tiet/get-list', {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data && data.code === "200" && data.data) {
            const productCount = data.data.length;
            document.getElementById('productCount').textContent = productCount;
            document.getElementById('productCountSummary').textContent = productCount;

            const totalPrice = data.data.reduce((total, item) => total + (item.gia * item.soLuong), 0);
            document.getElementById('totalPrice').textContent = `${totalPrice.toLocaleString()} đ`;

            const cartList = document.getElementById('cartList');
            cartList.innerHTML = ''; // Xóa danh sách hiện tại
            data.data.forEach(item => {
                const productDetail = item.sanPhamChiTiet;
                const product = item.sanPham;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart_item');
                cartItem.innerHTML = `
                    <input type="checkbox" class="product-checkbox" id="product-${item.id}" onclick="handleCheckboxChange(${item.id})" />
                    <img class="cart_thumb" src="${productDetail.imageUrl || 'default-image.png'}" alt=""/>
                    <div class="cart_info">
                        <h3>
                            <h2>${product.ten}</h2>
                           <span>(Màu: ${productDetail.mauSac.ten}, Size: ${productDetail.size.ten})</span>
<!--                            <span>-->
<!--                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">-->
<!--                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>-->
<!--                                </svg>-->
<!--                            </span>-->
                        </h3>
                        <div class="cart_item_price">${item.gia.toLocaleString()} đ</div>
                        <div class="cart_item_quantity">
                            <div class="quantity_group">
                                <button onclick="decreaseQuantity(this, ${item.id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                    </svg>
                                </button>
                                <input type="number" value="${item.soLuong}" min="1" onchange="updateQuantity(this, ${item.id})"/>
                                <button onclick="increaseQuantity(this, ${item.id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                </button>
                            </div>
                            <b id="totalItemPrice-${item.id}">${(item.gia * item.soLuong).toLocaleString()} đ</b>
                        </div>
                    </div>
                `;
                cartList.appendChild(cartItem);
            });
        } else {
            console.error('Invalid data structure:', data);
        }
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

function increaseQuantity(button, itemId) {
    const quantityInput = button.previousElementSibling;
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateTotalPrice(itemId, quantity);
}

function decreaseQuantity(button, itemId) {
    const quantityInput = button.nextElementSibling;
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotalPrice(itemId, quantity);
    }
}

function updateQuantity(input, itemId) {
    const quantity = parseInt(input.value);
    if (quantity < 1) {
        input.value = 1;
    }
    updateTotalPrice(itemId, parseInt(input.value));
}

function updateTotalPrice(itemId, quantity) {
    const item = data.data.find(i => i.id === itemId);
    const price = item.gia;
    const totalPriceElement = document.getElementById('totalPrice');

    const totalItemPrice = price * quantity;

    // Cập nhật giá trị tổng cho từng mặt hàng
    const totalItemPriceElement = document.getElementById(`totalItemPrice-${itemId}`);
    totalItemPriceElement.textContent = `${totalItemPrice.toLocaleString()} đ`;

    // Tính tổng giá trị của tất cả mặt hàng
    const allItems = document.querySelectorAll('.cart_item');
    const grandTotal = Array.from(allItems).reduce((sum, item) => {
        const itemQuantity = parseInt(item.querySelector('input[type="number"]').value);
        const itemPrice = parseInt(item.querySelector('.cart_item_price').textContent.replace(/ đ/g, '').replace(/,/g, ''));
        return sum + (itemQuantity * itemPrice);
    }, 0);

    totalPriceElement.textContent = `${grandTotal.toLocaleString()} đ`;
}

function handleCheckboxChange(itemId) {
    const checkbox = document.getElementById(`product-${itemId}`);
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    console.log(`Checkbox for item ${itemId} is now ${checkbox.checked}.`);
    console.log(`Current selected items:`, selectedItems);

    // Kiểm tra nếu checkbox được đánh dấu
    if (checkbox.checked) {
        // Nếu chưa có, thêm itemId vào danh sách đã chọn
        if (!selectedItems.includes(itemId)) {
            selectedItems.push(itemId);
            console.log(`Added item ${itemId} to selected items.`);
        } else {
            console.log(`Item ${itemId} is already selected.`);
        }
    } else {
        // Nếu không, tìm vị trí của itemId trong danh sách và xóa nó
        const index = selectedItems.indexOf(itemId);
        if (index > -1) {
            selectedItems.splice(index, 1); // Xóa itemId khỏi danh sách đã chọn
            console.log(`Removed item ${itemId} from selected items.`);
        } else {
            console.log(`Item ${itemId} was not found in selected items.`);
        }
    }

    // Cập nhật localStorage với danh sách mới
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    console.log(`Updated selected items in localStorage:`, selectedItems);
}



// Gọi hàm fetchCartData để tải dữ liệu giỏ hàng khi trang được tải
window.onload = fetchCartData;
