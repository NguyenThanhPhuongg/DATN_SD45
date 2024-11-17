$(document).ready(function () {
    // Retrieve userId and token from local storage
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        $.ajax({
            url: `/wishlist/${userId}`,
            method: 'GET',
            headers: headers,
            success: function (products) {
                const container = $('#wishlist-container'); // Sử dụng ID của container
                container.empty();

                products.forEach(product => {
                    container.append(`
                        <div class="col-2 product">
                            <a href="/productDetail/${product.id}">
                                <img src="/images/${product.image}" alt="${product.ten}" />
                            </a>
                            <a href="#">
                                <div class="delete-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Huỷ yêu thích">
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
        console.log("Không tìm thấy userId hoặc token trong localStorage.");
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

// $(document).ready(functi on () {
//     // Gọi API lấy danh sách sản phẩm yêu thích từ /wishlist/hien-thi
//     $.ajax({
//         url: '/wishlist/hien-thi',  // Gọi API lấy danh sách yêu thích
//         method: 'GET',
//         success: function (products) {
//             const container = $('#wishlist-container');
//             container.empty();
//
//             products.forEach(product => {
//                 // Kiểm tra nếu price tồn tại và là một số hợp lệ
//                 const price = product.price ? product.price : 0; // Nếu price không có, mặc định là 0
//                 const formattedPrice = price.toLocaleString(); // Chuyển đổi thành định dạng chuỗi số
//
//                 container.append(`
//                     <div class="col-2 product">
//                         <a href="/productDetail/${product.productId}">
//                             <img src="/images/${product.image}" alt="${product.name}" />
//                         </a>
//                         <a href="#">
//                             <div class="delete-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Huỷ yêu thích">
//                                 <i class="bi bi-x-lg"></i>
//                             </div>
//                         </a>
//                         <h3>${product.name}</h3>
//                         <div>${formattedPrice}đ</div> <!-- Hiển thị giá đã định dạng -->
//                     </div>
//                 `);
//             });
//         },
//         error: function (error) {
//             console.log("Lỗi khi lấy danh sách yêu thích:", error);
//         }
//     });
// });


