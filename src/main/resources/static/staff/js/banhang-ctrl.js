
// Khởi tạo controller AngularJS
app.controller("banhang-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.bills = [];
    $scope.activeIndex = 0;
    $scope.vouchers = [];
    $scope.selectedVoucher = 0;
    $scope.moneyCustomer = null;
    $scope.paymentCustomer = 'money';
    $scope.phoneCustomer = null;
    $scope.products = null;
    $scope.productDetails = [];
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
    $scope.setActiveTab = function (index) {
        $scope.activeIndex = index;
    };
    $scope.initialize = function () {
        // $http.get("/rest/khuyenmai").then(resp => {
        //     $scope.vouchers = resp.data.data;
        // });
        $http.get("/san-pham").then(resp => {
            $scope.products = resp.data.data;
        });
    };
    $scope.selectProduct = function (item, event) {
        let idhd = event.target.getAttribute('data-bill')
        $scope.productDetails = []
        $http.get(`/san-pham/${item.id}`).then(resp => {
            let Arr = resp.data.data.listSize;
            Arr.forEach(itm => {
                $http.get(`/spct/${itm.id}`).then(res => {
                    $scope.productDetails.push(res.data.data);
                });
            });
        });
        const detailModal = new bootstrap.Modal(document.getElementById('addProductModalDetail'), {
            keyboard: false
        });
        detailModal.show();
    };

    $scope.showProductModal = function (idBill) {
        const btn = document.querySelector('.btn-select');
        btn.setAttribute('data-bill', idBill)
        const productlModal = new bootstrap.Modal(document.getElementById('addProductModal'), {
            keyboard: false
        });
        productlModal.show();
    };

    $scope.addProdBill = function (event) {
        console.log($scope.activeIndex);
    };

    $scope.onPhoneChange = function(idBill) {
        const inputElementPhone = document.getElementById(`phoneInput-${idBill}`);
        const inputElementName = document.getElementById(`nameInput-${idBill}`);
        const eleCreateBill = document.querySelector(`.btn-create-bill-${idBill}`);
        const phone = inputElementPhone.value;
        const nameUser = inputElementName.value;
        let formData = {
            role: "CLIENT",
            phone: phone,
        }
        $http.post("user/get-list", formData).then(resp => {
            if (resp.data.data.length === 1) {
                let name = resp.data.data[0].profile.hoVaTen;
                inputElementName.value = name;
                eleCreateBill.setAttribute('data-iduser', resp.data.data[0].id)
                eleCreateBill.setAttribute('data-nameuser', name)
            } else if (resp.data.data.length === 0)  {
                inputElementName.value = '';
                $scope.onKeyDownName = function(event) {
                    if (event.keyCode === 13) {
                        let dataUser ={
                            email: `ziaza${phone}@gmail.com`,
                            name: inputElementName.value,
                            phone: phone,
                            password: "Ziaza@123",
                            retypePassword: "Ziaza@123",
                            ngaySinh: "2000-12-11T17:00:00.000Z",
                        }
                        $http.post("/register", dataUser).then(res => {
                            if (res.data.code === '200') {
                                var toastLiveExample = document.getElementById('liveToast')
                                var toast = new bootstrap.Toast(toastLiveExample)
                                toast.show()
                            }
                        })
                    }
                };
            }
        });
        if (phone === '' || phone === null || phone === undefined) {
            inputElementName.value = '';
        }
    };
    $scope.onVoucherChange = function (idBill) {
        function formatCurrency(amount) {
            const formatter = new Intl.NumberFormat('vi-VN');
            return formatter.format(amount);
        }
        const selectedVoucherEle = document.getElementById(`selectedVoucher-${idBill}`);
        const showVoucherEle = document.getElementById(`voucher-${idBill}`);
        const elePriceTotal = document.querySelector(`.price-bill-${idBill}`);
        const priceOriginal = elePriceTotal.getAttribute('data-origin')
        const valueVoucher = formatCurrency(parseFloat(selectedVoucherEle.value));
        showVoucherEle.textContent = `- ${valueVoucher} vnđ`;
        if (priceOriginal) {
            elePriceTotal.textContent = parseFloat(priceOriginal) - valueVoucher + ' vnđ';
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

    };
    $scope.createBill = function (idBill, event) {
        // Lấy tất cả các sản phẩm từ bảng
        const rows = document.querySelectorAll(`.display-result-${idBill} tr`);

        // Lấy phần tử để hiển thị danh sách sản phẩm trong modal
        const ListProdEl = document.querySelector('.prod-in-bill');
        const billInfoEl = document.querySelector('.bill-info-head');
        const btnDoneEl = document.querySelector('.btn-done-bill');
        const priceBill = document.querySelector(`.price-bill-${idBill}`).textContent;
        const voucherBill = document.querySelector(`#voucher-${idBill}`).textContent;
        ListProdEl.innerHTML = ''; // Xóa danh sách cũ để tránh lặp lại khi mở lại modal
        let totalQuantity = 0;
        let chiTietList = [];
        rows.forEach((row, index) => {
            const productName = row.querySelector('.name-prod').textContent.trim();
            const size = row.querySelector('.size-prod').textContent.trim();
            const quantityInput = row.querySelector('.quantity-input');
            const quantity = parseFloat(quantityInput.value);
            const price = parseFloat(quantityInput.getAttribute('data-price'));
            const idProd = parseFloat(quantityInput.getAttribute('data-idsp'));
            const totalPrice = quantity * price;

            totalQuantity += quantity;
            chiTietList.push({
                idSanPhamChiTiet: parseInt(idProd),
                soLuong: quantity
            });
            // Tạo HTML cho từng sản phẩm
            let htmlProd = `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <div>${productName}</div>
                    <div class="text-muted">${size}</div>
                </td>
                <td class="text-center">${quantity}</td>
                <td class="text-end">${price}</td>
                <td class="text-end">${totalPrice}</td>
            </tr>`;

            ListProdEl.insertAdjacentHTML('beforeend', htmlProd);
        });
        let dataBill = {
            idNguoiDung: parseFloat(event.target.getAttribute('data-iduser')),
            tongTien: parseFloat(priceBill.replace(/[^0-9,]/g, '')),
            diemSuDung: parseFloat(voucherBill.replace(/\D/g, '')),
            chiTietList: chiTietList
        }
        $http.post("/api/hoa-don/thanh-toan", dataBill).then(resp => {
            if (resp.status === 200) {
                btnDoneEl.setAttribute('data-bilid', idBill)
                if (billInfoEl) {
                    billInfoEl.innerHTML = `
                        <p><b>Ngày mua:</b> <span>${new Date().toLocaleDateString()}</span></p>
                        <p><b>Nhân viên bán hàng:</b> <span>...</span></p>
                        <p><b>Người mua:</b> <span>${event.target.getAttribute('data-nameuser')}</span></p>
                        <p><b>Số HĐ:</b> <span>${resp.data.ma}</span></p>
                    `;
                }
            }
        });

        const totalQuantityEl = document.querySelector('.total-quantity');
        const totalVoucherEl = document.querySelector('.total-voucher');
        const totalPaymentEl = document.querySelector('.total-payment');
        totalQuantityEl.textContent = `Tổng số lượng: ${totalQuantity}`;
        totalVoucherEl.textContent = `Giảm ${voucherBill}`;
        totalPaymentEl.textContent = `Tổng TT: ${priceBill}`;

        const billModal = new bootstrap.Modal(document.getElementById('paymentModal'), {
            keyboard: false
        });
        billModal.show();
    };

    $scope.clearBill = function (event) {
        const btn = document.querySelector(`.btn-create-bill-${event.target.getAttribute('data-bilid')}`);
        btn.textContent = 'Đã thanh toán';
        btn.disabled = true
    };

    $scope.initialize()
});
