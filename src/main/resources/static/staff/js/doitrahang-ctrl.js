app.controller("yeucaudoitra-ctrl", function ($scope, $http, $routeParams,$location) {
    const loai = $routeParams.loai;
    const trangThai = $routeParams.trangThai;

    // Khởi tạo dữ liệu
    $scope.items = [];
    $scope.searchText = "";

    $scope.pager = {
        page: 0, size: 10, items: [], count: 0, first: function () {
            this.page = 0;
            this.updateItems();
        }, prev: function () {
            if (this.page > 0) {
                this.page--;
                this.updateItems();
            }
        }, next: function () {
            if (this.page < this.count - 1) {
                this.page++;
                this.updateItems();
            }
        }, last: function () {
            this.page = this.count - 1;
            this.updateItems();
        }, updateItems: function () {
            const filteredItems = $scope.items.filter(item => // Lọc theo từ khóa tìm kiếm
                (!$scope.searchText || item.hoaDon.ma.toLowerCase().includes($scope.searchText.toLowerCase())));

            this.count = Math.ceil(filteredItems.length / this.size); // Tổng số trang
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size); // Dữ liệu của trang
        }
    };

    // Hàm load dữ liệu từ API
    $scope.initialize = function () {
        $http.get(`/yeu-cau/filter?loai=${loai}&trangThai=${trangThai}`).then(resp => {
            if (resp.data && Array.isArray(resp.data.data)) {
                $scope.items = resp.data.data.map(item => ({
                    ...item, ngayTao: new Date(item.ngayTao), // Chuyển đổi định dạng ngày tháng
                    ngayCapNhat: new Date(item.ngayCapNhat)
                }));
                $scope.pager.updateItems(); // Cập nhật phân trang
            } else {
                console.error("Dữ liệu API không hợp lệ.");
            }
        }).catch(error => {
            console.error("Lỗi khi tải dữ liệu từ API:", error);
        });
    };

    $scope.edit = function (item) {
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form = angular.copy(item);
    };

    // Gọi hàm khi controller được khởi tạo
    $scope.initialize();

    $scope.yeuCauChiTietList = [];

    // Hàm lấy danh sách chi tiết theo idDoiTra
    $scope.loadChiTiet = function (idDoiTra) {
        $http.get(`/yeu-cau-chi-tiet/by-yeu-cau/${idDoiTra}`).then(resp => {
            $scope.yeuCauChiTietList = resp.data.data; // Gán danh sách vào scope
            console.log("Chi tiết yêu cầu đổi trả:", $scope.yeuCauChiTietList);
        }).catch(error => {
            console.error("Lỗi khi tải dữ liệu chi tiết:", error);
        });
    };

    // Hàm cập nhật trạng thái yêu cầu

    $scope.updateStatus = function (idDoiTra) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái đơn hàng này?",
            icon: "warning",
            buttons: ["Hủy", "Xác nhận"],
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                // Thực hiện cập nhật trạng thái hóa đơn nếu người dùng xác nhận
                $http.put(`/yeu-cau/${idDoiTra}/update-status`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(function (response) {
                    if (response.data.code === 200) {
                        // Cập nhật lại trạng thái trong bảng
                        const updatedItem = response.data.data;
                        const index = $scope.items.findIndex(item => item.id === idDoiTra);
                        if (index !== -1) {
                            $scope.items[index] = updatedItem;
                        }
                    }
                    toastr.success("Cập nhật trạng thái yêu cầu thành công", "Thành công!");
                    $scope.initialize();
                }).catch(function (error) {
                    toastr.error("Có lỗi", "Lỗi!");
                    console.error("Lỗi khi cập nhật trạng thái:", error);
                    });
            } else {
                toastr.info("Hành động đã hủy", "Hủy!");
            }
        });
    };

    $scope.selectedGhiChu = '';  // Lý do hủy được chọn
    $scope.idHuyTra = null;  // ID hóa đơn cần cập nhật

    // Mở modal và lưu ID hóa đơn
    $scope.openModal = function (idHuyTra) {
        $scope.idHuyTra = idHuyTra; // Lưu ID hóa đơn
    };

    $scope.updateCancelOrder = function () {
        if (!$scope.selectedGhiChu) {
            toastr.error("Bạn chưa nhập lý do hủy", "Lỗi!");
            return;
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn hủy đơn hàng này?",
            icon: "warning",
            buttons: ["Hủy", "Xác nhận"],
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                var cancelOrderRequest = {
                    orderInfo: $scope.selectedGhiChu
                };

                // Lấy token từ localStorage
                var token = localStorage.getItem('token');  // Thay 'token' bằng tên bạn đã lưu trong localStorage

                // Gửi yêu cầu hủy đơn hàng
                $http.post('/yeu-cau/cancel/' + $scope.idHuyTra, cancelOrderRequest, {
                    headers: {
                        'Authorization': 'Bearer ' + token  // Thêm token vào header Authorization
                    }
                })
                    .then(function (response) {
                        toastr.success("Hủy đơn hàng thành công", "Thành công!");
                        // Đóng modal sau khi hủy thành công
                        $('#huyYeuCau').modal('hide');
                        // Refresh danh sách hóa đơn nếu cần
                        $scope.initialize();
                    })
                    .catch(function (error) {
                        toastr.error("Có lỗi không thể hủy đơn hàng", "Lỗi!");
                        console.error(error);
                    });
            } else {
                toastr.info("Hành động đã hủy", "Hủy!");
            }
        });
    };

    // Tạo map để ánh xạ giá trị loai và trangThai sang tiêu đề
    $scope.getTitle = function () {
        if (loai === "EXCHANGE" && trangThai === "0") {
            return "đổi hàng chờ xác nhận";
        }
        if (loai === "EXCHANGE" && trangThai === "1") {
            return "đổi hàng đã xác nhận";
        }
        if (loai === "EXCHANGE" && trangThai === "2") {
            return "đổi hàng không xác nhận";
        }
        if (loai === "REFUND" && trangThai === "0") {
            return "hoàn hàng chờ xác nhận";
        }
        if (loai === "REFUND" && trangThai === "1") {
            return "hoàn hàng đã xác nhận";
        }
        if (loai === "REFUND" && trangThai === "1") {
            return "hoàn hàng không xác nhận";
        }
        return "Quản lý yêu cầu đổi hàng";
    };

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right", // Hiển thị ở góc trên bên phải
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000", // Thời gian thông báo tồn tại (ms)
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

});
