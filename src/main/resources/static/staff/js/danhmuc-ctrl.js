app.controller("danhmuc-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};
    $scope.formAdd = {};
    $scope.searchText = ''; // Biến tìm kiếm
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
            // Lọc các mục theo tìm kiếm
            const filteredItems = $scope.items.filter(item => {
                return item.id.toString().toLowerCase().includes($scope.searchText.toLowerCase()) || // Lọc theo ID
                    item.ten.toLowerCase().includes($scope.searchText.toLowerCase()); // Lọc theo tên
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    // Khởi tạo và tải dữ liệu
    $scope.initialize = function () {
        // Gọi API và kiểm tra dữ liệu
        $http.get("/rest/danhmuc").then(resp => {
            console.log("Dữ liệu từ API: ", resp.data); // Kiểm tra dữ liệu từ API
            // Kiểm tra xem resp.data.data có phải là mảng không
            if (Array.isArray(resp.data.data)) {
                $scope.items = resp.data.data.map(item => ({
                    ...item,
                    ngayTao: new Date(item.ngayTao), // Chuyển đổi ngày
                    ngayCapNhat: new Date(item.ngayCapNhat) // Chuyển đổi ngày
                }));
                $scope.pager.updateItems(); // Cập nhật các mục cho pager
            } else {
                console.error("API không trả về một mảng. Kiểm tra cấu trúc dữ liệu.");
            }
        }).catch(error => {
            console.error("Lỗi khi tải danh mục: ", error);
        });
    };

    // Theo dõi thay đổi trong ô tìm kiếm
    $scope.$watch('searchText', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager.updateItems();
        }
    });

    // Khởi tạo dữ liệu khi controller được tải
    $scope.initialize();

    $scope.reset = function () {
        // Giữ nguyên giá trị của id nếu có
        const currentId = $scope.form.id; // Lưu trữ giá trị ID hiện tại
        const ngayTao = $scope.form.ngayTao; // Lưu trữ giá trị ID hiện tại

        // Thiết lập lại các trường khác
        $scope.form = {
            nguoiTao: 1, // Mặc định người tạo là 'Admin'
            nguoiCapNhat: 1, // Mặc định người cập nhật là 'Admin'
            ngayTao: ngayTao, // Ngày tạo sẽ là thời gian hiện tại
            ngayCapNhat: new Date(), // Ngày cập nhật sẽ là thời gian hiện tại
            ten: '', // Đặt mặc định cho tên
            moTa: '', // Đặt mặc định cho mô tả
            trangThai: 1, // Đặt mặc định cho trạng thái là true
            id: currentId, // Giữ nguyên giá trị ID
            idCha: 1, // Giữ nguyên giá trị ID
        };
    };

    $scope.resetAdd = function () {
        $scope.formAdd = {};
    };

    $scope.edit = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form = angular.copy(item);
    };

    $scope.update = function () {
        $scope.error = {
            ten: false,
            moTa: false,
            idCha: false,
            trangThai: false
        };

        let isValid = true;

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 100) {
            $scope.error.ten = true;
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 100) {
            $scope.error.moTa = true;
            isValid = false;
        }

        if (!$scope.form.idCha) {
            $scope.error.idCha = true;
            isValid = false;
        }

        if (!$scope.form.trangThai) {
            $scope.error.trangThai = true;
            isValid = false;
        }


        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật danh mục này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                var item = angular.copy($scope.form);
                item.ngayCapNhat = new Date(); // Chỉ cập nhật ngày sửa
                item.nguoiCapNhat = 2;

                $http.put(`/rest/danhmuc/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật danh mục đã bị hủy", "error");
            }
        });
    };

// Xóa thương hiệu
    $scope.delete = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa danh mục này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $http.delete(`/rest/danhmuc/${item.id}`).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.reset();
                    swal("Success!", "Xóa thành công", "success");
                }).catch(error => {
                    swal("Error!", "Xóa thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy xóa", "Xóa danh mục đã bị hủy", "error");
            }
        });
    };
    // Thêm thương hiệu
    $scope.create = function () {
        $scope.error1 = {
            ten: false,
            moTa: false,
            idCha: false,
            trangThai: false
        };

        let isValid = true;

        if (!$scope.formAdd.ten || $scope.formAdd.ten.length < 1 || $scope.formAdd.ten.length > 100) {
            $scope.error1.ten = true;
            isValid = false;
        }

        if (!$scope.formAdd.moTa || $scope.formAdd.moTa.length < 1 || $scope.formAdd.moTa.length > 100) {
            $scope.error1.moTa = true;
            isValid = false;
        }

        if (!$scope.formAdd.idCha) {
            $scope.error1.idCha = true;
            isValid = false;
        }


        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn thêm danh mục này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAdd) => {
            if (willAdd) {
                var item = angular.copy($scope.formAdd);
                item.nguoiTao = 1;
                item.trangThai = 1;
                item.ngayTao = new Date(); // Ngày tạo là thời gian hiện tại
                item.ngayCapNhat = new Date(); // Ngày cập nhật là thời gian hiện tại
                $http.post(`/rest/danhmuc`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.resetAdd();
                    swal("Success!", "Thêm mới thành công", "success");
                }).catch(error => {
                    swal("Error!", "Thêm mới thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy thêm danh mục", "Thêm danh mục đã bị hủy", "error");
            }
        });
    };
});
