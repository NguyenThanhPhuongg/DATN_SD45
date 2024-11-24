$(document).ready(function () {
    const form = $('#searchForm');
    const input = $('#searchInput');
    const resultsContainer = $('#searchResults');

    // Hàm gọi API tìm kiếm và hiển thị kết quả
    function fetchSearchResults(keyword) {
        if (!keyword.trim()) {
            resultsContainer.html('<p class="text-danger">Vui lòng nhập từ khóa tìm kiếm.</p>');
            return;
        }

        // Gọi API
        $.ajax({
            url: '/san-pham/search',
            type: 'GET',
            data: {ten: keyword},
            success: function (data) {
                resultsContainer.empty();

                if (data.length === 0) {
                    resultsContainer.html('<p class="text-danger">Không tìm thấy sản phẩm nào!</p>');
                } else {
                    data.forEach(product => {
                        const productHtml = `
                            <div class="col-md-3 mb-3">
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
                                            <i class="fa-regular fa-heart fa-xl heart-icon" title="Thêm vào yêu thích"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        resultsContainer.append(productHtml);
                    });
                }
            },
            error: function () {
                resultsContainer.html('<p class="text-danger">Đã xảy ra lỗi khi tìm kiếm sản phẩm.</p>');
            }
        });
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
    }
});

$(document).ready(function () {
    const resultsContainer = $('#searchResults'); // Container chứa kết quả

    // Lấy từ khóa tìm kiếm từ URL
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('ten'); // Lấy giá trị của 'ten'

    if (keyword) {
        // Gọi API tìm kiếm
        fetch(`/san-pham/search?ten=${encodeURIComponent(keyword)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API.');
                }
                return response.json();
            })
            .then(data => {
                resultsContainer.empty(); // Xóa nội dung cũ

                if (data.length === 0) {
                    resultsContainer.html('<p class="text-danger">Không tìm thấy sản phẩm nào!</p>');
                } else {
                    data.forEach(product => {
                        const productHtml = `
        <div class="col-md-3">
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
                        <i class="fa-regular fa-heart fa-xl heart-icon" title="Thêm vào yêu thích"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
                        resultsContainer.append(productHtml);
                    });


                }
            })
            .catch(error => {
                console.error(error);
                resultsContainer.html('<p class="text-danger">Đã xảy ra lỗi khi tải dữ liệu.</p>');
            });
    } else {
        resultsContainer.html('<p class="text-danger">Không có từ khóa tìm kiếm.</p>');
    }
});
