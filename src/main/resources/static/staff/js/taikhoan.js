app.controller('taikhoan-ctrl', function($scope, $timeout) {
    // Đảm bảo mã JavaScript chạy sau khi view được tải
    $timeout(function() {
        const datatablesSimple = document.getElementById('datatablesSimple');
        if (datatablesSimple) {
            new simpleDatatables.DataTable(datatablesSimple);
        }

        // Các mã JavaScript khác bạn muốn chạy
        console.log('JavaScript in taikhoan.html is executed');
    }, 0);
});