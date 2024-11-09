let fetchedAddresses = []; // Biến toàn cục để lưu địa chỉ đã fetch
let addressDataId;
let phuongThucVanChuyenId;
let phuongThucThanhToanId;
let isAddingNewAddress = false;

async function fetchDeliveryAddress() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('/dia-chi/get-active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const addressElement = document.getElementById('delivery-address');
        if (result.data && result.data.length > 0) {
            const addressData = result.data[0];
            addressDataId = addressData.id; // Gán ID địa chỉ ban đầu
            console.log('Địa chỉ giao hàng: ', addressDataId);
            addressElement.textContent = `
                ${addressData.hoTen}, ${addressData.diaChi}, ${addressData.thanhPho}, ${addressData.quocGia}
            `;
        } else {
            addressElement.textContent = 'Không có địa chỉ nào';
        }
    } catch (error) {
        console.error('Error fetching delivery address:', error);
        document.getElementById('delivery-address').textContent = 'Lỗi khi tải địa chỉ';
    }
}

async function fetchAddressList() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('/dia-chi/get-list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        fetchedAddresses = result.data; // Lưu kết quả vào biến toàn cục
        const addressListElement = document.getElementById('address-list');

        if (fetchedAddresses && fetchedAddresses.length > 0) {
            addressListElement.innerHTML = fetchedAddresses.map(address => `
                 <div style="background-color: #f0f0f0; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
                    <input type="radio" name="address" value="${address.id}" id="address-${address.id}">
                    <label for="address-${address.id}">
                        <strong style="font-size: 1.5em;">${address.hoTen}</strong> <span style="font-size: 1em;">(${address.sdt})</span> ${address.trangThai === 1 ? '<span style="color: red; font-weight: bold; margin-left: 10px;">Mặc định</span>' : ''}<br>
                        ${address.diaChi}, ${address.thanhPho}, ${address.quocGia}
                    </label>
                </div>
            `).join('');
        } else {
            addressListElement.innerHTML = 'Không có địa chỉ nào';
        }
    } catch (error) {
        console.error('Error fetching address list:', error);
        document.getElementById('address-list').innerHTML = 'Lỗi khi tải danh sách địa chỉ';
    }
}

function selectAddress() {
    const selectedAddressId = document.querySelector('input[name="address"]:checked');
    if (selectedAddressId) {
        const addressId = selectedAddressId.value;
        const selectedAddress = fetchedAddresses.find(address => address.id == addressId);

        if (selectedAddress) {
            const addressElement = document.getElementById('delivery-address');

            // Cập nhật addressDataId với địa chỉ được chọn
            addressDataId = selectedAddress.id; // Cập nhật ID địa chỉ
            console.log('Địa chỉ đã chọn: ', addressDataId);

            addressElement.textContent = `
                ${selectedAddress.hoTen}, ${selectedAddress.diaChi}, ${selectedAddress.thanhPho}, ${selectedAddress.quocGia}
            `;
        }

        closeModal(); // Đóng modal sau khi chọn địa chỉ
    } else {
        alert('Vui lòng chọn một địa chỉ.');
    }
}

function showNewAddressForm() {
    document.getElementById('address-list').style.display = 'none';
    document.getElementById('new-address-form').style.display = 'block';
    document.getElementById('add-address-button').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    isAddingNewAddress = true;
}

async function addNewAddress() {
    const newHoTen = document.getElementById('new-hoTen').value;
    const newSdt = document.getElementById('new-sdt').value;
    const newDiaChi = document.getElementById('new-diaChi').value;
    const newThanhPho = document.getElementById('new-thanhPho').value;
    const newQuocGia = document.getElementById('new-quocGia').value;

    // Kiểm tra các điều kiện ràng buộc
    if (!newHoTen || newHoTen.length > 100) {
        document.getElementById('error-message').innerText = 'Họ tên không được để trống và không vượt quá 100 ký tự.';
        return;
    }
    if (!newSdt || newSdt.length < 10 || newSdt.length > 15) {
        document.getElementById('error-message').innerText = 'Số điện thoại không được để trống và phải có từ 10 đến 15 ký tự.';
        return;
    }
    if (!newDiaChi) {
        document.getElementById('error-message').innerText = 'Địa chỉ không được để trống.';
        return;
    }
    if (!newThanhPho) {
        document.getElementById('error-message').innerText = 'Thành phố không được để trống.';
        return;
    }
    if (!newQuocGia) {
        document.getElementById('error-message').innerText = 'Quốc gia không được để trống.';
        return;
    }

    // Dữ liệu gửi đi
    const requestData = {
        hoTen: newHoTen,
        sdt: newSdt,
        diaChi: newDiaChi,
        thanhPho: newThanhPho,
        quocGia: newQuocGia
    };

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('dia-chi/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Hiển thị thông báo thành công và cập nhật lại danh sách địa chỉ
        console.log(result);
        document.getElementById('new-address-form').style.display = 'none';
        document.getElementById('address-list').style.display = 'block';
        document.getElementById('error-message').innerText = ''; // Xóa thông báo lỗi
        isAddingNewAddress = false;

        // Cập nhật lại danh sách địa chỉ sau khi thêm mới
        fetchAddressList();
        clearFormModal();

    } catch (error) {
        console.error('Error adding new address:', error);
        document.getElementById('error-message').innerText = 'Lỗi khi thêm địa chỉ mới.';
    }
}

function handleConfirmButton() {
    if (isAddingNewAddress) {
        addNewAddress();
    } else {
        selectAddress();
    }
}

function cancelNewAddress() {
    // Ẩn form và hiển thị lại danh sách địa chỉ
    document.getElementById('new-address-form').style.display = 'none';
    document.getElementById('address-list').style.display = 'block';
    document.getElementById('add-address-button').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
    isAddingNewAddress = false;
    document.getElementById('error-message').innerText = ''; // Xóa thông báo lỗi
}


function showModal() {
    document.getElementById('address-modal').style.display = 'block';
    document.body.style.overflow = "hidden"; //
    fetchAddressList(); // Gọi hàm lấy danh sách địa chỉ khi hiển thị modal
}

function clearFormModal() {
    document.getElementById('add-address-button').style.display = 'block';
    document.getElementById('new-hoTen').value = '';
    document.getElementById('new-sdt').value = '';
    document.getElementById('new-diaChi').value = '';
    document.getElementById('new-thanhPho').value = '';
    document.getElementById('new-quocGia').value = '';
}

function closeModal() {
    document.getElementById('address-modal').style.display = 'none';
    document.body.style.overflow = "";
    cancelNewAddress();
    clearFormModal();
}


// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', fetchDeliveryAddress);

// Đóng modal khi nhấp bên ngoài
window.onclick = function (event) {
    const addressModal = document.getElementById("address-modal");
    const shippingModal = document.getElementById("shipping-modal");

    if (event.target === addressModal || event.target === shippingModal) {
        closeModal();
    }
};

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
                            <b style="color: red;"  id="totalItemPrice-${item.id}">${(item.gia * item.soLuong).toLocaleString()} đ</b>
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


async function fetchCartData() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    console.log(`Updated selected items in localStorage:`, selectedItems);

    if (selectedItems && selectedItems.length > 0) {
        try {
            const response = await fetch('gio-hang-chi-tiet/get-by-ids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedItems)
            });

            if (!response.ok) {
                throw new Error('Phản hồi mạng không hợp lệ');
            }

            const data = await response.json();
            console.log(data); // Kiểm tra cấu trúc dữ liệu
            populateTable(data.data); // Sử dụng data.data
        } catch (error) {
            console.error('Có vấn đề với yêu cầu:', error);
        }
    } else {
        console.log('Không có sản phẩm nào được chọn.');
    }
}

document.addEventListener('DOMContentLoaded', fetchCartData);

function populateTable(data) {
    const tableBody = document.querySelector('#products tbody');
    tableBody.innerHTML = ''; // Xóa nội dung cũ
    let totalItemPrice = 0; // Biến lưu tổng tiền hàng

    data.forEach(item => {
        const gia = item.gia; // Lấy giá từ sản phẩm chi tiết
        const soLuong = item.soLuong; // Lấy số lượng
        const tongCong = gia * soLuong; // Tính tổng cộng

        totalItemPrice += tongCong; // Cộng dồn vào tổng tiền hàng

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sanPham.ten}</td>
            <td>${gia.toLocaleString()} đ</td>
            <td style="padding-right: 20px;">${soLuong}</td>
           <td style="color: red; text-align: right; padding-right: 100px;">${tongCong.toLocaleString()} đ</td>
        `;
        tableBody.appendChild(row);
    });

    // Cập nhật tổng tiền hàng vào bảng
    document.getElementById('totalItemPrice').textContent = `${totalItemPrice.toLocaleString()} đ`;
    document.querySelector('.total-price').textContent = `Tổng Cộng: ${totalItemPrice.toLocaleString()} ₫`;

    const shippingFee = 30000; // Phí vận chuyển mặc định
    const totalPayment = totalItemPrice + shippingFee;
    document.getElementById('totalPayment').textContent = `${totalPayment.toLocaleString()} đ`;
}


// Hàm mở modal phương thức vận chuyển
function openShippingModal() {
    document.getElementById("shipping-modal").style.display = "block";
    document.body.style.overflow = "hidden"; // Khóa cuộn khi mở modal
}

// Hàm đóng modal phương thức vận chuyển
function closeShippingModal() {
    document.getElementById("shipping-modal").style.display = "none";
    document.body.style.overflow = ""; // Khôi phục cuộn khi đóng modal
}

async function fetchPaymentMethods() {
    try {
        const response = await fetch('/phuong-thuc-thanh-toan/get-active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Phản hồi mạng không hợp lệ');
        }

        const result = await response.json();
        const paymentOptionsElement = document.getElementById('payment-options');
        phuongThucThanhToanId = result.data.id;
        console.log('phuong thuc thanh toan: ', phuongThucThanhToanId);
        // Kiểm tra xem có dữ liệu hay không
        if (result.data) {
            paymentOptionsElement.innerHTML = `
                <span>${result.data.ten}</span>
                <button class="change-button" onclick="changePaymentMethod()">Thay đổi</button>
            `;
        } else {
            paymentOptionsElement.innerHTML = '<p>Không có phương thức thanh toán nào</p>';
        }
    } catch (error) {
        console.error('Lỗi khi lấy phương thức thanh toán:', error);
        document.getElementById('payment-options').innerHTML = '<p>Lỗi khi tải phương thức thanh toán</p>';
    }
}

// Hàm để xử lý khi nút "Thay đổi" được nhấn
function changePaymentMethod() {
    // Logic để thay đổi phương thức thanh toán (hiện modal hoặc chuyển trang)
    alert('Chức năng thay đổi phương thức thanh toán sẽ được thực hiện ở đây.');
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', fetchPaymentMethods);


async function fetchShippingMethods() {
    try {
        const response = await fetch('/phuong-thuc-van-chuyen/get-active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Phản hồi mạng không hợp lệ');
        }

        const result = await response.json();
        const shippingMethodElement = document.getElementById('shipping-method');

        // Kiểm tra xem có dữ liệu hay không
        if (result.data && result.data.length > 0) {
            const shippingData = result.data[0]; // Lấy phương thức vận chuyển đầu tiên

            // Gán id vào biến toàn cục phuongThucVanChuyenId
            phuongThucVanChuyenId = shippingData.id;
            console.log('Phương thức vận chuyển ID:', phuongThucVanChuyenId);

            shippingMethodElement.innerHTML = `
                <img src="/images/fast-delivery.png" alt="Shipping Icon" class="shipping-icon">
                <span class="shipping-text">${shippingData.ten}</span>
                <button class="change-button" onclick="openShippingModal()">Thay đổi</button>
            `;
        } else {
            shippingMethodElement.innerHTML = '<p>Không có phương thức vận chuyển nào</p>';
        }
    } catch (error) {
        console.error('Lỗi khi lấy phương thức vận chuyển:', error);
        document.querySelector('.shipping-method').innerHTML = '<p>Lỗi khi tải phương thức vận chuyển</p>';
    }
}


// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', fetchShippingMethods);


// dat hang
async function placeOrder() {
    const isConfirmed = window.confirm('Bạn chắc chắn muốn đặt hàng?');
    if (!isConfirmed) {
        return; // Nếu người dùng không đồng ý, dừng lại
    }
    const idDiaChiGiaoHang = addressDataId;

    // Lấy thông tin phương thức vận chuyển đã chọn
    const idPhuongThucVanChuyen = phuongThucVanChuyenId;

    // Lấy thông tin phương thức thanh toán đã chọn
    const idPhuongThucThanhToan = phuongThucThanhToanId;

    // Lấy dữ liệu giỏ hàng
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    if (!selectedItems || selectedItems.length === 0) {
        alert('Giỏ hàng của bạn đang trống.');
        return;
    }

    // Tạo đối tượng HoaDonRequest
    const request = {
        idGioHangChiTiet: selectedItems,
        idDiaChiGiaoHang: idDiaChiGiaoHang,
        idPhuongThucVanChuyen: idPhuongThucVanChuyen,
        idPhuongThucThanhToan: idPhuongThucThanhToan,
        diemSuDung: 0 // Có thể cập nhật nếu có điểm sử dụng
    };

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Gọi API để lưu đơn hàng
    try {
        const response = await fetch('/rest/hoadon/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Thêm token vào headers
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Lưu đơn hàng không thành công.');
        }

        const result = await response.json();
        if (result.code === "200") {
            alert('Đặt hàng thành công!');
            window.location.href = '/bill';
        } else {
            alert(`Có lỗi xảy ra: ${result.message}`);
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Có lỗi xảy ra khi đặt hàng.');
    }

    function hideMessageAfterDelay() {
        setTimeout(function () {
            $('#message').fadeOut('slow', function () {
                $(this).empty().show();
            });
        }, 2000);
    }
}



