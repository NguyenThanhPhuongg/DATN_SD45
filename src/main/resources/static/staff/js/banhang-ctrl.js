
// Khởi tạo controller AngularJS
app.controller("banhang-ctrl", function ($scope, $http, $rootScope, $firebase, $location) {
    $scope.bills = [];
    $scope.activeBill = 0;
    $scope.showPopUp = false;
    $scope.listProduct = [];
    $scope.searchQuery = '';
    // Thiết lập Firebase
    var ref = new Firebase("https://dantn-742db-default-rtdb.firebaseio.com");
    var sync = $firebase(ref);
    // Đối tượng lưu các ID sản phẩm đã được thêm vào từng hóa đơn
    let addedProductIds = {};

    sync.$asObject().$watch(function () {
        sync.$asObject().forEach(function (product) {
            // Tìm hóa đơn mà sản phẩm thuộc về
            const billIndex = $scope.bills.findIndex(bill => bill.name === product.bill);
            if (billIndex !== -1) {

                if (!addedProductIds[product.bill]) {
                    addedProductIds[product.bill] = new Set();
                }
                if (!addedProductIds[product.bill].has(product.id)) {
                    $http.get(`/spct/${product.id}`).then(function (response) {
                        let newProduct = response.data.data;
                        newProduct.soLuong = 1;
                        newProduct.image = response.data.data.sanPham.anh;
                        newProduct.tenSanPham = response.data.data.sanPham.ten;
                        $scope.bills[billIndex].items.push(newProduct);
                        addedProductIds[product.bill].add(product.id);
                        $scope.updateTotalBill($scope.bills[billIndex])
                    }).catch(function (error) {
                        console.error('Có lỗi xảy ra khi gọi API:', error);
                    });
                }
            }
        });
    });

    $scope.clearData = function () {
        ref.remove()
    };
    $scope.clearData();
    $scope.generateBillName = function (lastName) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Nếu không có hóa đơn nào, bắt đầu từ "A"
        if (!lastName) return "A";

        // Lấy phần chữ cái của tên hóa đơn, ví dụ: "Hóa đơn A" -> "A"
        let letters = lastName.replace("Hóa đơn ", "").trim();

        // Chuyển từ chữ cái sang số thứ tự
        let index = 0;
        for (let i = 0; i < letters.length; i++) {
            index = index * 26 + (letters.charCodeAt(i) - "A".charCodeAt(0) + 1);
        }

        // Tăng chỉ số để tạo tên tiếp theo
        index++;

        // Chuyển từ số thứ tự sang chữ cái
        let nextName = "";
        while (index > 0) {
            index--; // Trừ 1 để đảm bảo chỉ số 0-based
            nextName = alphabet[index % 26] + nextName;
            index = Math.floor(index / 26);
        }
        return nextName;

    };
    $scope.addBill = function () {
        // Lấy tên hóa đơn cuối cùng
        const lastBillName = $scope.bills.length > 0
            ? $scope.bills[$scope.bills.length - 1].name
            : null;

        // Tạo tên hóa đơn mới
        const newBillName = $scope.generateBillName(lastBillName);
        let bill = {
            stt: $scope.bills.length + 1,
            name: newBillName,
            totalBill: 0,
            disabled: false,
            totalQuantity: 0,
            nameCustomer: "",
            search: "",
            idCustomer: "",
            phoneCustomer: '',
            moneyCustomer: 0,
            payCustomer: 'money',
            payQRbank: null,
            codeBill: null,
            dateBill: null,
            items: []
        };
        $scope.bills.push(bill);
        $scope.activeBill = $scope.bills.length - 1;
    };
    $scope.removeBill = function (index) {
        $scope.bills.splice(index, 1);

        // Đặt lại hóa đơn đang hoạt động (activeBill)
        if ($scope.activeBill >= $scope.bills.length) {
            $scope.activeBill = $scope.bills.length - 1; // Chuyển activeBill về hóa đơn cuối nếu vượt quá
        }
    };
    $scope.setActiveBill = function (index) {
        $scope.activeBill = index;
    };
    $scope.removeProduct = function (bill, product) {
        const index = bill.items.findIndex(item => item.id === product.id);
        if (index !== -1) {
            bill.items.splice(index, 1);
            if (!addedProductIds[bill.name]) {
                addedProductIds[bill.name] = new Set();
            }
            addedProductIds[bill.name].delete(product.id)
            $scope.updateTotalBill(bill)
        } else {
            console.log("Sản phẩm không được tìm thấy trong mảng items.");
        }
    };

    $scope.updateQuantity = function (bill, item) {
        item.total = item.soLuong * item.gia;
        $scope.updateTotalBill(bill)
    };
    $scope.updateTotalBill = function (bill) {
        bill.totalBill = bill.items.reduce(function (total, product) {
            return total + (product.soLuong * product.gia);
        }, 0);
        bill.totalQuantity = bill.items.reduce(function (total, product) {
            return total + product.soLuong;
        }, 0);
    };
    $scope.showListProduct = function () {
        $http.get('/san-pham').then(resp => {
            if (resp.status === 200) {
                $scope.showPopUp = true;
                setTimeout(() => {
                    const searchInput = document.getElementById('searchProduct');
                    searchInput.addEventListener('keyup', function() {
                        const filter = this.value.toLowerCase();
                        const rows = document.querySelectorAll('#tableproductlist tbody tr');
                        rows.forEach(row => {
                            const cells = row.getElementsByTagName('td');
                            let rowContainsSearchText = false;

                            for (let i = 0; i < cells.length; i++) {
                                if (cells[i].textContent.toLowerCase().includes(filter)) {
                                    rowContainsSearchText = true;
                                    break;
                                }
                            }

                            if (rowContainsSearchText) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        });
                    });
                }, 200);
                const productList = resp.data.data; // Danh sách sản phẩm
                const requests = productList.map(item =>
                    $http.get(`/san-pham/${item.id}`).then(detailResp => {
                        const productDetails = detailResp.data.data.listSanPhamChiTiet;

                        // Thêm thuộc tính `tenSanPham` vào từng mục trong `listSanPhamChiTiet`
                        productDetails.forEach(detail => {
                            detail.tenSanPham = item.ten;
                            detail.image = item.anh;
                        });

                        return productDetails;
                    })
                );

                // Xử lý tất cả yêu cầu đồng thời với Promise.all
                Promise.all(requests).then(allDetails => {
                    $scope.listProduct = allDetails.flat(); // Gộp tất cả chi tiết lại thành một mảng

                    console.log("Danh sách sản phẩm chi tiết với tên sản phẩm:", $scope.listProduct);
                    $scope.$apply(); // Đảm bảo giao diện được cập nhật
                }).catch(error => {
                    console.error("Lỗi khi tải chi tiết sản phẩm:", error);
                });
            } else {
                console.error("Không thể lấy danh sách sản phẩm:", resp);
            }
        }).catch(error => {
            console.error("Lỗi khi gọi API sản phẩm:", error);
        });
    };

    $scope.searchFilter = function(product) {
        console.log(1111)
        if (!$scope.searchQuery) {
            return true; // Trả về tất cả sản phẩm khi không có từ khóa tìm kiếm
        }
        // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm
        return product.tenSanPham.toLowerCase().includes($scope.searchQuery.toLowerCase());
    };

    $scope.closeProductList = function () {
        $scope.showPopUp = false
    };
    $scope.addProductToBill = function (bill, product) {
        bill.items.push({
            tenSanPham: product.tenSanPham,
            id: product.id,
            image: product.image,
            gia: product.gia,
            ghiChu: product.ghiChu,
            soLuong: 1
        });
        $scope.updateTotalBill(bill);
        $scope.showPopUp = false
    };
    $scope.onPhoneChange = function(bill) {
        let formData = {
            role: "CLIENT",
            phone: bill.phoneCustomer,
        }
        $http.post("/user/get-list", formData).then(resp => {
            if (resp.data.data.length === 1) {
                bill.nameCustomer = resp.data.data[0].profile.hoVaTen
            } else if (resp.data.data.length === 0)  {
                bill.nameCustomer = '';
                $scope.onKeyDownName = function(bill) {
                    if (event.keyCode === 13) {
                        let dataUser ={
                            email: `ziaza${bill.phoneCustomer}@gmail.com`,
                            name: bill.nameCustomer,
                            phone: bill.phoneCustomer,
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
        if (bill.phoneCustomer === '' || bill.phoneCustomer === null || bill.phoneCustomer === undefined) {
            inputElementName.value = '';
        }
    };
    $scope.formatCurrency = function (amount) {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(amount);
    };
    $scope.onChangePayment = function(bill) {
        if (bill.payCustomer === 'money') {
            console.log("Chọn phương thức thanh toán: Tiền mặt");
            // Thực hiện các hành động khác nếu cần khi chọn Tiền mặt
        } else if (bill.payCustomer === 'bank') {
            const AMOUNT = bill.totalBill;
            const DESCRIPTION = encodeURIComponent('Thanh toan QR tai quay');
            const ACCOUNT_NAME = encodeURIComponent('NGUYEN THI THANH PHUONG');
            let QR_URL = `https://img.vietqr.io/image/970422-3006200466-compact.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
            bill.payQRbank = QR_URL;
        }
    };
    $scope.payBill = function (bill) {
        $http.post("/api/hoa-don/thanh-toan", bill).then(resp => {
            if (resp.status === 200) {
                bill.codeBill = resp.data.ma;
                bill.dateBill = resp.data.ngayThanhToan;
                const billModal = new bootstrap.Modal(document.getElementById(`paymentModal-${bill.name}`), {
                    keyboard: false
                });
                billModal.show();
            }
        });

    };
    $scope.clearBill = function (bill) {
        bill.disabled = true;
    };
    $scope.printBill = function (bill) {
        var innerContents = document.getElementById(`paymentModal-${bill.name}`).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write(`
        <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>In hóa đơn</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                .modal-header, .modal-footer {
                    display: none;
                }
            </style>
            </head>
            <body onload="window.print()"> ${innerContents}  </html>`
        );
        popupWinindow.document.close();
    };
});
