$(document).ready(function () {
    // Xử lý khi nhấn nút tìm kiếm
    $('#searchButton').on('click', function (e) {
        e.preventDefault();

        // Lấy từ khóa từ ô input
        const keyword = $('#searchInput').val().trim();

        // Kiểm tra từ khóa rỗng
        if (keyword === '') {
            alert('Vui lòng nhập từ khóa tìm kiếm.');
            return;
        }

        // Gọi API tìm kiếm
        $.ajax({
            url: `/san-pham/search`,
            type: 'GET',
            data: {ten: keyword},
            success: function (data) {
                // Hiển thị kết quả
                const resultsContainer = $('#searchResults');
                resultsContainer.empty();

                if (data.length === 0) {
                    resultsContainer.append('<p class="text-danger">Không tìm thấy sản phẩm nào!</p>');
                } else {
                    data.forEach(product => {
                        const productHtml = `
                                <div class="col-md-3 mb-3">
                                    <div class="card">
                                        <img src="${product.anh || '/images/default.png'}" class="card-img-top" alt="${product.tenSanPham}">
                                        <div class="card-body">
                                            <h5 class="card-title">${product.tenSanPham}</h5>
                                            <p class="card-text">Giá: ${product.giaBan.toLocaleString()} VND</p>
                                            <a href="/san-pham/${product.id}" class="btn btn-primary">Xem chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                        resultsContainer.append(productHtml);
                    });
                }
            },
            error: function () {
                alert('Đã xảy ra lỗi khi tìm kiếm sản phẩm.');
            }
        });
    });
});