app.controller("sanpham-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.thuonghieu = [];
    $scope.danhmuc = [];
    $scope.form = {};
    $scope.formAdd = {};
    $scope.searchText = ''; // Thêm biến tìm kiếm
    $scope.pager = {
        page: 0,
        size: 5,
        items: [],
        count: 0,
        first: function () {
            this.page = 0;
            this.updateItems();
        },
        prev: function () {
            if (this.page > 0) {
                this.page--;
                this.updateItems();
            }
        },
        next: function () {
            if (this.page < this.count - 1) {
                this.page++;
                this.updateItems();
            }
        },
        last: function () {
            this.page = this.count - 1;
            this.updateItems();
        },
        updateItems: function () {
            const filteredItems = $scope.items.filter(item => {
                // Chuyển đổi cả item và searchText thành chữ thường để so sánh không phân biệt chữ hoa chữ thường
                const searchTextLower = $scope.searchText.toLowerCase();

                return Object.values(item).some(value => {
                    // Chuyển đổi giá trị của thuộc tính thành chuỗi và so sánh với searchText
                    return value.toString().toLowerCase().includes(searchTextLower);
                });
            });

            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }

    };

    // Hàm khởi tạo
    $scope.initialize = function () {
        // Tải danh sách thương hiệu
        $http.get("/rest/sanpham").then(resp => {
            console.log("Data from API: ", resp.data); // Kiểm tra dữ liệu từ API
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.ngayTao = new Date(item.ngayTao); // Đổi tên trường nếu cần
                item.ngayCapNhat = new Date(item.ngayCapNhat); // Đổi tên trường nếu cần
            });
            $scope.pager.updateItems(); // Cập nhật các mục cho pager
        }).catch(error => {
            console.log("Error loading thuong hieu: ", error);
        });
        $http.get("/rest/danhmuc").then(resp => {
            $scope.danhmuc = resp.data;
        });
        $http.get("/rest/thuonghieu").then(resp => {
            $scope.thuonghieu = resp.data;
        });
    };

    // Theo dõi sự thay đổi trong ô tìm kiếm
    $scope.$watch('searchText', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager.updateItems();
        }
    });
    // Khởi tạo
    $scope.initialize();

    // Reset
    $scope.reset = function () {
        // Giữ nguyên giá trị của id nếu có
        const currentId = $scope.form.id; // Lưu trữ giá trị ID hiện tại
        const ngayTao = $scope.form.ngayTao; // Lưu trữ giá trị ID hiện tại
        // Thiết lập lại các trường khác
        $scope.form = {
            nguoiTao: 'Admin', // Mặc định người tạo là 'Admin'
            nguoiCapNhat: 'Admin', // Mặc định người cập nhật là 'Admin'
            ngayCapNhat: new Date(), // Ngày cập nhật sẽ là thời gian hiện tại
            ngayTao: ngayTao,
            ten: '', // Đặt mặc định cho tên
            trangThai: 1, // Đặt mặc định cho trạng thái là true
            id: currentId // Giữ nguyên giá trị ID
        };
    };

    $scope.resetAdd = function () {
        $scope.formAdd = {};
    };


    $scope.edit = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        $scope.form = angular.copy(item);
    };

    $scope.update = function () {
        $scope.error1 = {
            ten: false,
            moTa: false,
            xuatXu: false,
            trangThai: false,
            idThuongHieu: false,
            idDanhMuc: false,
            anh: false // Thêm trường lỗi cho ảnh
        };

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 100) {
            $scope.error1.ten = true;
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 100) {
            $scope.error1.moTa = true;
            isValid = false;
        }

        if (!$scope.form.xuatXu) {
            $scope.error1.xuatXu = true;
            isValid = false;
        }

        if (!$scope.form.idThuongHieu || !$scope.form.idThuongHieu.id) {
            $scope.error1.idThuongHieu = true;
            isValid = false;
        }

        if (!$scope.form.idDanhMuc || !$scope.form.idDanhMuc.id) {
            $scope.error1.idDanhMuc = true;
            isValid = false;
        }

        if (!$scope.form.trangThai) {
            $scope.error1.trangThai = true;
            isValid = false;
        }

        // Kiểm tra trường ảnh
        if (!$scope.form.anh) {
            $scope.error1.anh = true; // Đánh dấu lỗi cho ảnh
            isValid = false;
        }

        // Nếu dữ liệu không hợp lệ, hiển thị thông báo và không thực hiện thêm
        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật thương hiệu này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                var item = angular.copy($scope.form);
                item.ngayCapNhat = new Date(); // Chỉ cập nhật ngày sửa
                item.nguoiCapNhat = 'Admin'; // Đặt người tạo mặc định là 'Admin'

                $http.put(`/rest/sanpham/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật thương hiệu đã bị hủy", "error");
            }
        });
    };

// Xóa thương hiệu
    $scope.delete = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa thương hiệu này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $http.delete(`/rest/sanpham/${item.id}`).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.reset();
                    swal("Success!", "Xóa thành công", "success");
                }).catch(error => {
                    swal("Error!", "Xóa thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy xóa", "Xóa thương hiệu đã bị hủy", "error");
            }
        });
    };
    // Thêm thương hiệu
    $scope.create = function () {
        $scope.error = {
            ten: false,
            moTa: false,
            xuatXu: false,
            trangThai: false,
            idThuongHieu: false,
            idDanhMuc: false,
            anh: false // Thêm trường lỗi cho ảnh
        };

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        if (!$scope.formAdd.ten || $scope.formAdd.ten.length < 1 || $scope.formAdd.ten.length > 100) {
            $scope.error.ten = true;
            isValid = false;
        }

        if (!$scope.formAdd.moTa || $scope.formAdd.moTa.length < 1 || $scope.formAdd.moTa.length > 100) {
            $scope.error.moTa = true;
            isValid = false;
        }

        if (!$scope.formAdd.xuatXu) {
            $scope.error.xuatXu = true;
            isValid = false;
        }

        if (!$scope.formAdd.idThuongHieu || !$scope.formAdd.idThuongHieu.id) {
            $scope.error.idThuongHieu = true;
            isValid = false;
        }

        if (!$scope.formAdd.idDanhMuc || !$scope.formAdd.idDanhMuc.id) {
            $scope.error.idDanhMuc = true;
            isValid = false;
        }

        if (!$scope.formAdd.trangThai) {
            $scope.error.trangThai = true;
            isValid = false;
        }

        // Kiểm tra trường ảnh
        if (!$scope.formAdd.anh) {
            $scope.error.anh = true; // Đánh dấu lỗi cho ảnh
            isValid = false;
        }

        // Nếu dữ liệu không hợp lệ, hiển thị thông báo và không thực hiện thêm
        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn thêm thương hiệu này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAdd) => {
            if (willAdd) {
                var item = angular.copy($scope.formAdd);
                item.nguoiTao = 'Admin'; // Đặt người tạo mặc định là 'Admin'
                item.ngayTao = new Date(); // Ngày tạo là thời gian hiện tại
                item.ngayCapNhat = new Date(); // Ngày cập nhật là thời gian hiện tại

                $http.post(`/rest/sanpham`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.resetAdd();
                    swal("Success!", "Thêm mới thành công", "success");
                }).catch(error => {
                    swal("Error!", "Thêm mới thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy thêm thương hiệu", "Thêm thương hiệu đã bị hủy", "error");
            }
        });
    };

    document.getElementById('profileImage').addEventListener('change', function (event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById('previewImage');
                preview.src = e.target.result;
                preview.style.display = 'block'; // Hiển thị ảnh xem trước
            }
            reader.readAsDataURL(input.files[0]);
        }
    });
    document.getElementById('profileImage2').addEventListener('change', function (event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById('previewImage2');
                preview.src = e.target.result;
                preview.style.display = 'block'; // Hiển thị ảnh xem trước
            }
            reader.readAsDataURL(input.files[0]);
        }
    });





});
