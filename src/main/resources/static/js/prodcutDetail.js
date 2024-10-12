
$(document).ready(function (){
    // Tăng giá trị khi click vào nút tăng
    $('.quantity_plus').click(function() {
        var input = $(this).siblings('input[name="quantity_product"]');
        var currentValue = parseInt(input.val());
        var priceProduct = $('input[name="price_product"]').val();
        var totalPrice = null;
        input.val(currentValue + 1);
        totalPrice = priceProduct * (currentValue + 1);
        var formattedTotalPrice = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        $('#total_price span').text(formattedTotalPrice);
        $('#total_price').show();
    });

    // Giảm giá trị khi click vào nút giảm
    $('.quantity_minius').click(function() {
        var input = $(this).siblings('input[name="quantity_product"]');
        var currentValue = parseInt(input.val());
        var priceProduct = $('input[name="price_product"]').val();
        var totalPrice = null;
        if (currentValue > 1) { // Đảm bảo giá trị không nhỏ hơn 1
            input.val(currentValue - 1);
            totalPrice = priceProduct * (currentValue - 1);
            var formattedTotalPrice = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            $('#total_price span').text(formattedTotalPrice);
            $('#total_price').show();
        }

    });

    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        console.log( $(this).serializeArray() );
    });
})
