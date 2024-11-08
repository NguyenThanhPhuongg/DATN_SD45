
// Khởi tạo controller AngularJS
app.controller("banhang-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.bills = [];
    $scope.activeIndex = 0;
    $scope.scanResults = JSON.parse(localStorage.getItem('qrResults'));
    // Hàm thêm hóa đơn
    $scope.addBill = function () {
        const bill = {
            price: null,
            name_cutomsmer: null,
            phone: null,
            qrCodeUrl: null,
        }

        const qr = new QRious({
            value: `https://aquamarine-sustaining-harp.glitch.me/scan.html?idhd=${$scope.bills.length + 1}`,
            size: 200
        });

        // Store the QR code as a data URL in the bill object
        bill.qrCodeUrl = qr.toDataURL();
        $scope.bills.push(bill);
        $scope.activeIndex = $scope.bills.length - 1;
    };
});
