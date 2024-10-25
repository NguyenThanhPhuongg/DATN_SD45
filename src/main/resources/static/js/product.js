$(document).ready(function () {
    const productId = 1;

    // Lấy dữ liệu sản phẩm
    $.ajax({
        url: `/san-pham/${productId}`,
        method: 'GET',
        success: function (response) {
            const product = response.data;
            $('#productName').text(product.ten);
            $('#productBrand').text(product.thuonghieu.ten);
            $('#productCode').text(product.ma);
            $('#productPrice').text(product.gia.toLocaleString() + 'đ');
            $('#productOldPrice').text(product.gia.toLocaleString() + 'đ');
            $('#priceProduct').val(product.gia);
            $('#productDescription').text(product.moTa);
        },
        error: function (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm", error);
        }
    });

    // Lấy danh sách màu sắc
    $.ajax({
        url: '/mau-sac/get-list',
        method: 'GET',
        success: function (response) {
            const colors = response.data;
            let colorHtml = '<label>Màu sắc:</label><br>';
            colors.forEach(color => {
                colorHtml += `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="colorOptions" id="color-${color.id}" value="${color.id}"> <!-- Đảm bảo đây là ID -->
            <label class="form-check-label" for="color-${color.id}">${color.ten}</label>
        </div>`;
            });
            $('#colorOptions').html(colorHtml);
        },
        error: function (error) {
            console.error("Lỗi khi lấy danh sách màu sắc", error);
        }
    });

// Lấy danh sách kích thước
    $.ajax({
        url: '/size/get-list',
        method: 'GET',
        success: function (response) {
            const sizes = response.data;
            let sizeHtml = '<label>Kích thước:</label><br>';
            sizes.forEach(size => {
                sizeHtml += `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="sizeOptions" id="size-${size.id}" value="${size.id}"> <!-- Đảm bảo đây là ID -->
            <label class="form-check-label" for="size-${size.id}">${size.ten}</label>
        </div>`;
            });
            $('#sizeOptions').html(sizeHtml);
        },
        error: function (error) {
            console.error("Lỗi khi lấy danh sách kích thước", error);
        }
    });


    $('.btn-addcart').on('click', function () {
        const selectedColorId = $('input[name="colorOptions"]:checked').val(); // Giá trị ID màu
        const selectedSizeId = $('input[name="sizeOptions"]:checked').val(); // Giá trị ID kích thước
        const quantity = $('input[name="quantity_product"]').val();

        // Kiểm tra nếu tất cả các tùy chọn đã được chọn
        if (!selectedColorId || !selectedSizeId) {
            alert('Vui lòng chọn màu sắc và kích thước!');
            return;
        }

        const request = {
            idSanPham: productId,
            idSize: selectedSizeId, // ID kích thước
            idMauSac: selectedColorId, // ID màu sắc
            soLuong: parseInt(quantity)
        };

        // Lấy token từ localStorage
        const token = localStorage.getItem('token');

        // Gọi API để thêm vào giỏ hàng
        $.ajax({
            url: '/gio-hang-chi-tiet',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(request),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function (response) {
                alert('Thêm vào giỏ hàng thành công!');
            },
            error: function (xhr, status, error) {
                alert('Có lỗi xảy ra: ' + error);
            }
        });
    });

});
