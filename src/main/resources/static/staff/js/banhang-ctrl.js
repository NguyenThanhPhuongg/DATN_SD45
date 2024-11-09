
// Khởi tạo controller AngularJS
app.controller("banhang-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.bills = [];
    $scope.activeIndex = 0;
    $scope.vouchers = [];
    $scope.selectedVoucher = 0;
    $scope.moneyCustomer = null;
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
        console.log($scope.activeIndex)
    };
    $scope.setActiveTab = function (index) {
        $scope.activeIndex = index;
    };
    $scope.initialize = function () {
        $http.get("/rest/khuyenmai").then(resp => {
            $scope.vouchers = resp.data.data;
        });
    };
    $scope.onVoucherChange = function (selectedVoucher, idBill) {
        const elePriceTotal = document.querySelector(`.price-bill-${idBill}`);
        const priceOriginal = elePriceTotal.getAttribute('data-origin')

        elePriceTotal.textContent = parseFloat(priceOriginal) - parseFloat(selectedVoucher) + ' vnđ'
        // You can perform further actions based on the selected voucher here
    };
    $scope.onKeyDown = function(event) {
        // Kiểm tra nếu phím Enter (keyCode 13) được nhấn
        if (event.keyCode === 13) {
            console.log("Enter key pressed, Money Customer:", $scope.moneyCustomer);
            // Thực hiện các thao tác cần thiết khi nhấn Enter
        }
    };
    $scope.onMoneyCustomerChange = function(idBill) {
        const inputElementMn = document.getElementById(`moneyCustomerInput-${idBill}`);
        const moneyCustomer = inputElementMn.value;
        const elePriceTotal = document.querySelector(`.price-bill-${idBill}`);
        const eleReturn = document.querySelector(`.return-money-${idBill}`);
        let priceLast = elePriceTotal.textContent.replace(/[^0-9,]/g, '')
        if (priceLast && parseFloat(moneyCustomer) > 0) {
            eleReturn.textContent = parseFloat(moneyCustomer) - parseFloat(priceLast) + ' vnđ'
        }
        console.log(moneyCustomer);
        if (moneyCustomer == null || moneyCustomer === ''){
            eleReturn.textContent = '0 vnđ'
        }
    };
    $scope.initialize()
});
