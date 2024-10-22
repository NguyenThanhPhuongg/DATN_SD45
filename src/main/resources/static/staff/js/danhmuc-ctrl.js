app.controller("danhmuc-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};
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
            // Lọc các mục theo tìm kiếm
            const filteredItems = $scope.items.filter(item => {
                return item.id.toString().includes($scope.searchText) || // Lọc theo ID
                    item.ten.includes($scope.searchText); // Lọc theo tên
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    // Hàm khởi tạo
    $scope.initialize = function () {
        // Tải danh sách danh mục
        $http.get("/rest/danhmuc").then(resp => {
            console.log("Data from API: ", resp.data); // Kiểm tra dữ liệu từ API
            $scope.items = resp.data.map(item => ({
                ...item,
                ngayTao: new Date(item.ngayTao), // Chuyển đổi ngày
                ngayCapNhat: new Date(item.ngayCapNhat) // Chuyển đổi ngày
            }));
            $scope.pager.updateItems(); // Cập nhật các mục cho pager
        }).catch(error => {
            console.error("Error loading danh muc: ", error);
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

    // Reset form
    $scope.reset = function () {
        const currentId = $scope.form.id; // Lưu trữ giá trị ID hiện tại
        const ngayTao = $scope.form.ngayTao; // Lưu trữ giá trị ngày tạo hiện tại

        // Thiết lập lại các trường khác
        $scope.form = {
            nguoiTao: 1, // Mặc định người tạo là 'Admin'
            nguoiCapNhat: 1, // Mặc định người cập nhật là 'Admin'
            ngayTao: ngayTao || new Date(), // Ngày tạo sẽ là thời gian hiện tại
            ngayCapNhat: new Date(), // Ngày cập nhật sẽ là thời gian hiện tại
            idDanhMucCha: null, // Đặt mặc định cho idCha
            ten: '', // Đặt mặc định cho tên
            moTa: '', // Đặt mặc định cho mô tả
            trangThai: 1, // Đặt mặc định cho trạng thái là true
            id: currentId // Giữ nguyên giá trị ID
        };
    };

    // Sửa đổi một danh mục
    $scope.edit = function (item) {
        item.ngayTao = new Date(item.ngayTao);
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        $scope.form = angular.copy(item);
    };

    // Cập nhật danh mục
    $scope.update = function () {
        $scope.error = {idCha: false, ten: false, moTa: false, trangThai: false};

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        if (!$scope.form.idCha) {
            $scope.error.idCha = true;
            isValid = false;
        }

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 100) {
            $scope.error.ten = true;
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 100) {
            $scope.error.moTa = true;
            isValid = false;
        }

        if (!$scope.form.trangThai) {
            $scope.error.trangThai = true;
            isValid = false;
        }

        // Nếu dữ liệu không hợp lệ, hiển thị thông báo và không thực hiện cập nhật
        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return;
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
                item.nguoiCapNhat = 1; // Cập nhật người cập nhật
                $http.put(`/rest/danhmuc/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.error("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật danh mục đã bị hủy", "error");
            }
        });
    };

    // Xóa danh mục
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
                    console.error("Error: ", error);
                });
            } else {
                swal("Hủy xóa", "Xóa danh mục đã bị hủy", "error");
            }
        });
    };

    // Thêm danh mục
    $scope.create = function () {
        $scope.error = {idCha: false, ten: false, moTa: false, trangThai: false};

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        if (!$scope.form.idCha) {
            $scope.error.idCha = true;
            isValid = false;
        }

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 100) {
            $scope.error.ten = true;
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 100) {
            $scope.error.moTa = true;
            isValid = false;
        }

        if (!$scope.form.trangThai) {
            $scope.error.trangThai = true;
            isValid = false;
        }

        // Nếu dữ liệu không hợp lệ, hiển thị thông báo và không thực hiện thêm
        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return;
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn thêm danh mục này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAdd) => {
            if (willAdd) {
                var item = angular.copy($scope.form);
                item.nguoiTao = 1; // Đặt người tạo mặc định là 'Admin'
                item.ngayTao = new Date(); // Ngày tạo là thời gian hiện tại
                item.ngayCapNhat = new Date(); // Ngày cập nhật là thời gian hiện tại

                $http.post(`/rest/danhmuc`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.reset();
                    swal("Success!", "Thêm mới thành công", "success");
                }).catch(error => {
                    swal("Error!", "Thêm mới thất bại", "error");
                    console.error("Error: ", error);
                });
            } else {
                swal("Hủy thêm danh mục", "Thêm danh mục đã bị hủy", "error");
            }
        });
    };
});
