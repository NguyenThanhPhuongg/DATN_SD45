app.controller("quanlythuonghieu-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};
    $scope.searchText = ''; // Thêm biến tìm kiếm
    $scope.pager = {
        page: 0,
        size: 5,
        items: [],
        count: 0,
        first: function() {
            this.page = 0;
            this.updateItems();
        },
        prev: function() {
            if (this.page > 0) {
                this.page--;
                this.updateItems();
            }
        },
        next: function() {
            if (this.page < this.count - 1) {
                this.page++;
                this.updateItems();
            }
        },
        last: function() {
            this.page = this.count - 1;
            this.updateItems();
        },
        updateItems: function() {
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
        // Tải danh sách thương hiệu
        $http.get("/rest/thuonghieu").then(resp => {
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
    };

    // Theo dõi sự thay đổi trong ô tìm kiếm
    $scope.$watch('searchText', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager.updateItems();
        }
    });
    // Khởi tạo
    $scope.initialize();

    // Xóa form
    $scope.reset = function () {
        $scope.form = {
            nguoiTao: 'Admin', // Mặc định người tạo là 'Admin'
            ngayTao: new Date(), // Ngày tạo sẽ là thời gian hiện tại
            ngayCapNhat: new Date() // Ngày cập nhật sẽ là thời gian hiện tại
        };
    };

    $scope.edit = function(item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        $scope.form = angular.copy(item);
    };

    // Thêm thương hiệu
    $scope.create = function () {
        $scope.error = {
            idCha: false,
            ten: false,
            mo_ta: false,
            trangThai: false
        };

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

        if (!$scope.form.mo_ta || $scope.form.mo_ta.length < 1 || $scope.form.mo_ta.length > 100) {
            $scope.error.mo_ta = true;
            isValid = false;
        }

        if (!$scope.form.trangThai) {
            $scope.error.trangThai = true;
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
                var item = angular.copy($scope.form);
                item.nguoiTao = 'Admin'; // Đặt người tạo mặc định là 'Admin'
                item.ngayTao = new Date(); // Ngày tạo là thời gian hiện tại
                item.ngayCapNhat = new Date(); // Ngày cập nhật là thời gian hiện tại

                $http.post(`/rest/thuonghieu`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.reset();
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

});
