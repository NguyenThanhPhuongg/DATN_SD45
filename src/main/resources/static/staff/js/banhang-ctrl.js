
// Khởi tạo controller AngularJS
app.controller("banhang-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.bills = [];
    $scope.activeIndex = 0;
    $scope.vouchers = [];
    $scope.selectedVoucher = 0;
    $scope.moneyCustomer = null;
    $scope.paymentCustomer = 'money';
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
    $scope.onChangePayment = function(idBill) {
        const paymentOptions = document.getElementsByName(`payment-${idBill}`);
        let paymentCustomer;
        const elePriceTotal = document.querySelector(`.price-bill-${idBill}`);
        const qrImg = document.querySelector(`.qr-payment-${idBill}`);
        const AMOUNT = elePriceTotal.textContent.replace(/[^0-9,]/g, ''); // Loại bỏ ký tự không phải số và dấu phẩy
        const DESCRIPTION = encodeURIComponent('ck'); // Mã hóa mô tả
        const ACCOUNT_NAME = encodeURIComponent('NGUYEN THI THANH PHUONG'); // Mã hóa tên tài khoản
        let QR_URL = `https://img.vietqr.io/image/970422-3006200466-compact.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
        console.log(AMOUNT)
        console.log(QR_URL)
        // Lặp qua các radio button để kiểm tra cái nào được chọn
        for (const option of paymentOptions) {
            if (option.checked) {
                paymentCustomer = option.value;
                break;
            }
        }
        const qrCode = document.getElementById(`card-qr-${idBill}`);

        if (paymentCustomer === 'bank') {
            qrCode.classList.add('show')
            qrImg.src = QR_URL;
        } else {
            qrCode.classList.remove('show') // Ẩn QR code
        }

        console.log("Phương thức thanh toán:", paymentCustomer);
    };
    $scope.initialize()
});
