$(document).ready(function () {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    if (token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Truyền token trong header
        };

        // Gọi API lấy danh sách sản phẩm yêu thích
        $.ajax({
            url: '/yeu-thich', // Đường dẫn API
            method: 'GET',
            headers: headers, // Truyền header với token
            success: function (products) {
                const container = $('#wishlist-container');
                container.empty();

                // Kiểm tra nếu response là một mảng
                if (Array.isArray(products)) {
                    products.forEach(product => {
                        // Kiểm tra và định dạng giá
                        const price = product.gia ? product.gia : 0;
                        const formattedPrice = price.toLocaleString();

                        container.append(`
                            <div class="col-2 product">
                                <a href="/productDetail/${product.id}">
                                    <img src="/images/${product.anh}" alt="${product.ten}" />
                                </a>
                                <a href="#">
                                    <div class="delete-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Huỷ yêu thích">
                                        <i class="bi bi-x-lg"></i>
                                    </div>
                                </a>
                                <h3>${product.ten}</h3>
                                <div>${formattedPrice}đ</div>
                            </div>
                        `);
                    });
                } else {
                    console.log("Dữ liệu trả về không phải là một mảng:", products);
                }
            },
            error: function (error) {
                console.log("Lỗi khi lấy danh sách yêu thích:", error);
            }
        });
    } else {
        console.log("Không tìm thấy token trong localStorage.");
    }
});


document.querySelectorAll('.page-num').forEach(page => {
    page.addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Xóa lớp active từ tất cả các liên kết
        document.querySelectorAll('.page-num').forEach(link => {
            link.classList.remove('active');
        });

        // Thêm lớp active vào liên kết được nhấn
        this.classList.add('active');
    });
});
