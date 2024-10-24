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
            let colorHtml = '';
            colors.forEach(color => {
                colorHtml += `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="colorOptions" id="color-${color.id}" value="${color.ten}">
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
            let sizeHtml = '';
            sizes.forEach(size => {
                sizeHtml += `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="sizeOptions" id="size-${size.id}" value="${size.ten}">
                        <label class="form-check-label" for="size-${size.id}">${size.ten}</label>
                    </div>`;
            });
            $('#sizeOptions').html(sizeHtml);
        },
        error: function (error) {
            console.error("Lỗi khi lấy danh sách kích thước", error);
        }
    });
});
