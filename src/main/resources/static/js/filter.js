$(document).ready(function () {
    const form = $('#searchForm');
    const input = $('#searchInput');
    const resultsContainer = $('#searchResults');

    // Hàm hiển thị thông báo
    function displayMessage(message, type = 'text-danger') {
        resultsContainer.html(`<p class="${type}">${message}</p>`);
    }

    // Hàm tạo HTML cho sản phẩm
    function createProductHtml(product) {
        return `
            <div class="col-md-3 mb-3 product" data-product-id="${product.id}">
                <div class="card product-card">
                    <a href="/productDetail/${product.id}">
                        <img style="width: 270px; height: 270px;" src="/images/${product.anh || 'default.png'}" alt="${product.ten}">
                    </a>
                    <div class="card-body">
                        <div class="text-start">
                            <h6 class="card-title">${product.ten}</h6>
                            <p class="price">${product.gia.toLocaleString()}đ 
                                <span class="text-muted"><del>6.888.888đ</del></span>
                            </p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-buy btn-dark w-75">Mua ngay</button>
                            <span style="cursor: pointer" class="icon-heart">
                                <i style="font-size: 24px" class="bi bi-heart"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // Hàm gọi API tìm kiếm
    async function fetchSearchResults(keyword) {
        if (!keyword.trim()) {
            displayMessage('Vui lòng nhập từ khóa tìm kiếm.');
            return;
        }

        try {
            const response = await fetch(`/san-pham/search?ten=${encodeURIComponent(keyword)}`);
            if (!response.ok) throw new Error('Lỗi khi gọi API.');

            const data = await response.json();
            resultsContainer.empty();

            if (data.length === 0) {
                displayMessage('Không tìm thấy sản phẩm nào!');
            } else {
                data.forEach(product => {
                    resultsContainer.append(createProductHtml(product));
                });

                // Gắn sự kiện click cho trái tim
                attachWishlistEvent();
            }
        } catch (error) {
            console.error(error);
            displayMessage('Đã xảy ra lỗi khi tải dữ liệu.');
        }
    }

    // Xử lý sự kiện gửi form
    form.on('submit', function (e) {
        e.preventDefault();
        const keyword = input.val().trim();
        fetchSearchResults(keyword);
    });

    // Kiểm tra từ khóa trong URL khi tải trang
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('ten');

    if (keyword) {
        input.val(keyword); // Hiển thị từ khóa trên input
        fetchSearchResults(keyword); // Gọi tìm kiếm
    } else {
        displayMessage('Không có từ khóa tìm kiếm.');
    }

    // Hàm gắn sự kiện cho biểu tượng trái tim
    function attachWishlistEvent() {
        $('.icon-heart i').off('click').on('click', function () {
            const productId = $(this).closest('.product').data('product-id');
            const authToken = localStorage.getItem('token');

            if (!authToken) {
                alert('Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
                return;
            }

            const heartIcon = $(this);

            // Kiểm tra sản phẩm đã có trong danh sách yêu thích
            $.ajax({
                url: `/yeu-thich/${productId}/check`,
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${authToken}`
                },
                success: function (isInWishlist) {
                    if (isInWishlist) {
                        alert('Sản phẩm đã có trong danh sách yêu thích.');
                        heartIcon.removeClass('bi-heart').addClass('bi-heart-fill');
                    } else {
                        // Thêm sản phẩm vào danh sách yêu thích
                        $.ajax({
                            url: `/yeu-thich/${productId}`,
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${authToken}`
                            },
                            success: function () {
                                alert('Đã thêm sản phẩm vào danh sách yêu thích!');
                                heartIcon.removeClass('bi-heart').addClass('bi-heart-fill');
                            },
                            error: function () {
                                alert('Có lỗi xảy ra khi thêm vào danh sách yêu thích.');
                            }
                        });
                    }
                },
                error: function () {
                    alert('Có lỗi xảy ra khi kiểm tra danh sách yêu thích.');
                }
            });
        });
    }
});
