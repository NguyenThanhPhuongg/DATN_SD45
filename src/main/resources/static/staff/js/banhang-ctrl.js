
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
        }
        $scope.bills.push(bill);
        $scope.activeIndex = $scope.bills.length - 1; // Cập nhật activeIndex

    };
});
