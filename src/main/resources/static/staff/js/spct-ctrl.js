app.controller("spct-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.item = [];
    $scope.items = [];
    $scope.form = {};
    $scope.filters = {};  // Đối tượng lưu giá trị bộ lọc riêng
    $scope.error = {};
    $scope.size = [];
    $scope.mausac = [];
    $scope.danhmuc = [];
    $scope.thuonghieu = [];
    $scope.chatlieu = [];
    $scope.searchText = ''; // Biến tìm kiếm
    $scope.selectedProductId = null;

    $scope.pager = {
        page: 0, size: 5, items: [], count: 0, first: function () {
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
            const filteredItems = $scope.items.filter(item => {
                const statusMatches = item.trangThai === 1;
                const matchesSearch = item.ma.toString().toLowerCase().includes($scope.searchText.toLowerCase()) || item.ten.toLowerCase().includes($scope.searchText.toLowerCase());
                return matchesSearch && $scope.filterByAttributes(item) && statusMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };
    $scope.pager2 = {
        page: 0, size: 5, items: [], count: 0, first: function () {
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
            const filteredItems = $scope.items.filter(item => {
                const statusMatches = item.trangThai === 2;
                const matchesSearch = item.ma.toString().toLowerCase().includes($scope.searchText.toLowerCase()) || item.ten.toLowerCase().includes($scope.searchText.toLowerCase());
                return matchesSearch && $scope.filterByAttributes(item) && statusMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    $scope.filterByAttributes = function (item) {
        return ((!$scope.filters.idChatLieu || item.idChatLieu === $scope.filters.idChatLieu) && (!$scope.filters.idDanhMuc || item.idDanhMuc === $scope.filters.idDanhMuc) && (!$scope.filters.idThuongHieu || item.idThuongHieu === $scope.filters.idThuongHieu) && (!$scope.filters.xuatXu || item.xuatXu === $scope.filters.xuatXu));
    };

    $scope.initialize = function () {
        $http.get("/san-pham").then(resp => {
            $scope.items = resp.data.data.map(item => ({
                ...item, ngayTao: new Date(item.ngayTao), ngayCapNhat: new Date(item.ngayCapNhat)
            }));
            $scope.pager.updateItems();
            $scope.pager2.updateItems();
        }).catch(error => console.error("Lỗi khi tải danh mục: ", error));

        $http.get("/rest/danhmuc").then(resp => {
            $scope.danhmuc = resp.data.data;
        });
        $http.get("/rest/thuonghieu").then(resp => {
            $scope.thuonghieu = resp.data.data;
        });
        $http.get("/chat-lieu/get-list").then(resp => {
            $scope.chatlieu = resp.data.data;
        });
        $http.get("/size/get-list").then(resp => {
            $scope.size = resp.data.data;
        });
        $http.get("/mau-sac/get-list").then(resp => {
            $scope.mausac = resp.data.data;
        });
    };

    $scope.$watchGroup(['filters.idChatLieu', 'filters.idDanhMuc', 'filters.idThuongHieu', 'filters.xuatXu', 'searchText'], function () {
        $scope.pager.updateItems();
    });

    $scope.edit = function (item) {
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        $scope.form = angular.copy(item);
    };

    $scope.update = function () {
        $scope.error = {
            ten: false,
            moTa: false,
            xuatXu: false,
            gia: false,
            idChatLieu: false,
            idThuongHieu: false,
            idDanhMuc: false,
            anh: false // Thêm trường lỗi cho ảnh
        };

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 250) {
            $scope.error.ten = true;
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 250) {
            $scope.error.moTa = true;
            isValid = false;
        }

        if (!$scope.form.xuatXu) {
            $scope.error.xuatXu = true;
            isValid = false;
        }

        if (!$scope.form.idThuongHieu || !$scope.form.idThuongHieu) {
            $scope.error.idThuongHieu = true;
            isValid = false;
        }

        if (!$scope.form.idDanhMuc || !$scope.form.idDanhMuc) {
            $scope.error.idDanhMuc = true;
            isValid = false;
        }

        if (!$scope.form.idChatLieu || !$scope.form.idChatLieu) {
            $scope.error.idChatLieu = true;
            isValid = false;
        }

        if (!$scope.form.gia || $scope.form.gia < 100000 || $scope.form.gia > 100000000) {
            $scope.error.gia = true;
            isValid = false;
        }

        if (!$scope.form.anh) {
            $scope.error.anh = true;
            isValid = false;
        }

        // Nếu dữ liệu không hợp lệ, hiển thị thông báo và không thực hiện thêm
        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật sản phẩm này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                var item = angular.copy($scope.form);
                item.ngayCapNhat = new Date(); // Chỉ cập nhật ngày sửa
                item.nguoiCapNhat = 2;

                $http.put(`/san-pham/${item.id}`, item).then(resp => {
                    $scope.upLoadImage();
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                    $('#exampleModal').modal('hide');
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật thương hiệu đã bị hủy", "error");
            }
        });
    };

    $scope.update2 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn ẩn sản phẩm này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 2; // Cập nhật trạng thái
                $http.put(`/san-pham/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Ẩn sản phẩm thành công", "success");
                }).catch(error => {
                    swal("Error!", "Ẩn sản phẩm thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Ẩn sản phẩm đã bị hủy", "error");
            }
        });
    };

    $scope.update1 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn hiện sản phẩm này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 1; // Cập nhật trạng thái
                $http.put(`/san-pham/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Hiện sản phẩm thành công", "success");
                }).catch(error => {
                    swal("Error!", "Hiện sản phẩm thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Hiện sản phẩm đã bị hủy", "error");
            }
        });
    };

    $scope.selectProduct = function (item) {
        console.log("Selected Product ID: ", item.id); // Log để kiểm tra
        $rootScope.selectedProductId = item.id; // Lưu ID sản phẩm vào rootScope để sử dụng ở trang khác
        $rootScope.selectedProductTen = item.ten; // Lưu ID sản phẩm vào rootScope để sử dụng ở trang khác
        $location.path('/spct'); // Chuyển hướng đến trang sản phẩm chi tiết
    };


    $scope.upLoadImage = function () {
        const input = document.getElementById('profileImage');
        if (input.files && input.files[0]) {
            const formData = new FormData();
            formData.append("file", input.files[0]);

            $http.post("/file/upload", formData, {
                headers: {'Content-Type': undefined}
            }).then(resp => {
                $scope.form.anh = resp.data.filePath;  // lưu đường dẫn vào form
                document.getElementById("imagePath").value = resp.data.filePath;  // hiển thị đường dẫn ở input
                // Gọi lại API để lấy dữ liệu mới
                $scope.initialize(); // Tải lại dữ liệu hình ảnh
            }).catch(error => {
                console.error("Lỗi khi tải lên ảnh:", error);
                alert("Có lỗi khi tải lên ảnh. Vui lòng kiểm tra lại.");
            });
        }
    };


    document.getElementById('profileImage').addEventListener('change', function (event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById('previewImage');
                preview.src = e.target.result;
                preview.style.display = 'block'; // Hiển thị ảnh xem trước
            };
            reader.readAsDataURL(file);
        }
    });


    $scope.initialize();
});
