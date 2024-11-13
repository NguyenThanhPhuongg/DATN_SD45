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

$(document).ready(function () {
    // Hàm lấy userId từ cookies
    function getUserIdFromCookies() {
        const name = "userId=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null; // Trả về null nếu không tìm thấy userId
    }



    const userId = getUserIdFromCookies();

    if (userId) {
        $.ajax({
            url: `/wishlist/${userId}`,
            method: 'GET',
            success: function (products) {
                const container = $('.row.justify-content-start');
                container.empty();

                products.forEach(product => {
                    container.append(`
                        <div class="col-2 product">
                            <a href="/productDetail/${product.id}"><img src="/images/${product.image}" alt=""/></a>
                            <a href="#">
                                <div class="delete-icon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Huỷ yêu thích">
                                    <i class="bi bi-x-lg"></i>
                                </div>
                            </a>
                            <h3>${product.ten}</h3>
                            <div>${product.gia.toLocaleString()}đ</div>
                        </div>
                    `);
                });
            },
            error: function (error) {
                console.log("Lỗi khi lấy danh sách yêu thích:", error);
            }
        });
    } else {
        console.log("Không tìm thấy userId trong cookies.");
    }
});

