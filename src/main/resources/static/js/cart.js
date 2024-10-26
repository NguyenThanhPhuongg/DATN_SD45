async function fetchCartData() {
    try {
        // Lấy token từ local storage
        const token = localStorage.getItem('token'); // Thay 'token' bằng tên key của bạn

        // Cấu hình headers
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`); // Nếu dùng Bearer token
        }

        const response = await fetch('/gio-hang-chi-tiet/getList', {
            method: 'GET',
            headers: headers, // Thêm headers vào yêu cầu
        });

        // Kiểm tra trạng thái phản hồi
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Kiểm tra nếu dữ liệu trả về đúng
        if (data && data.productCount && data.cartItems) {
            // Hiển thị số lượng sản phẩm
            document.getElementById('productCount').textContent = data.productCount;
            document.getElementById('productCountSummary').textContent = data.productCount;

            // Hiển thị tổng tiền
            document.getElementById('totalPrice').textContent = `${data.totalPrice.toLocaleString()} đ`;

            // Render các sản phẩm trong giỏ hàng
            const cartList = document.getElementById('cartList');
            cartList.innerHTML = '';
            data.cartItems.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart_item');
                cartItem.innerHTML = `
                        <img class="cart_thumb" src="${item.imageUrl}" alt=""/>
                        <div class="cart_info">
                            <h3>
                                <span>${item.nameProduct}</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </span>
                            </h3>
                            <div class="cart_item_price">${item.price.toLocaleString()} đ</div>
                            <div class="cart_item_quantity">
                                <div class="quantity_group">
                                    <button onclick="decreaseQuantity(this, ${item.id})">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                        </svg>
                                    </button>
                                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(this, ${item.id})"/>
                                    <button onclick="increaseQuantity(this, ${item.id})">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                        </svg>
                                    </button>
                                </div>
                                <b>${(item.price * item.quantity).toLocaleString()} đ</b>
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

// Load cart data on page load
document.addEventListener('DOMContentLoaded', fetchCartData);
