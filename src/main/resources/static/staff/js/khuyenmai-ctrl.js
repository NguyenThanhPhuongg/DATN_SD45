app.controller("khuyenmai-ctrl", function ($scope, $http) {
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
                const matchesSearch = item.id.toString().toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    item.ten.toLowerCase().includes($scope.searchText.toLowerCase());
                const matchesIdCha = !$scope.selectedIdCha || item.loai === Number($scope.selectedIdCha);
                return matchesSearch && matchesIdCha;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    // Khởi tạo và tải dữ liệu
    $scope.initialize = function () {
        // Gọi API và kiểm tra dữ liệu
        $http.get("/rest/khuyenmai").then(resp => {
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

    $scope.$watch('selectedIdCha', function (newValue, oldValue) {
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
            nguoiCapNhat: 2, // Mặc định người cập nhật là 'Admin'
            ngayTao: ngayTao, // Ngày tạo sẽ là thời gian hiện tại
            ngayCapNhat: new Date(), // Ngày cập nhật sẽ là thời gian hiện tại
            ten: '', // Đặt mặc định cho tên
            moTa: '',
            trangThai: 1, // Đặt mặc định cho trạng thái là true
            id: currentId, // Giữ nguyên giá trị ID
            loai: 1, // Giữ nguyên giá trị ID
            giaTri: 10000, // Giữ nguyên giá trị ID
            ngayBatDau: new Date(), // Ngày tạo sẽ là thời gian hiện tại
            ngayKetThuc: new Date() // Ngày cập nhật sẽ là thời gian hiện tại
        };
    };

    $scope.resetAdd = function () {
        $scope.formAdd = {};
    };

    $scope.edit = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        item.ngayBatDau = new Date(item.ngayBatDau);
        item.ngayKetThuc = new Date(item.ngayKetThuc);
        $scope.form = angular.copy(item);
    };

    $scope.update = function () {
        $scope.error = {
            ten: false,
            moTa: false,
            trangThai: false,
            loai: false,
            giaTri: false,
            ngayBatDau: false,
            ngayKetThuc: false,
        };

        let isValid = true;

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 250) {
            $scope.error.ten = true;
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 250) {
            $scope.error.moTa = true;
            isValid = false;
        }

        if (!$scope.form.giaTri || $scope.form.giaTri < 1000 || $scope.form.giaTri > 200000) {
            $scope.error.giaTri = true;
            isValid = false;
        }

        if (!$scope.form.loai) {
            $scope.error.loai = true;
            isValid = false;
        }

        if (!$scope.form.ngayKetThuc || new Date($scope.form.ngayBatDau) >= new Date($scope.form.ngayKetThuc)) {
            $scope.error.ngayKetThuc = true;
            isValid = false;
        }

        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập khuyến mãi liệu này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                var item = angular.copy($scope.form);
                item.ngayCapNhat = new Date(); // Chỉ cập nhật ngày sửa
                item.nguoiCapNhat = 2;
                $http.put(`/rest/khuyenmai/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật khuyến mãi đã bị hủy", "error");
            }
        });
    };

    // Xóa thương hiệu
    $scope.delete = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa khuyến mãi này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $http.delete(`/rest/khuyenmai/${item.id}`).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.reset();
                    swal("Success!", "Xóa thành công", "success");
                }).catch(error => {
                    swal("Error!", "Xóa thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy xóa", "Xóa khuyến mãi đã bị hủy", "error");
            }
        });
    };

    // Thêm thương hiệu
    $scope.create = function () {
        $scope.error1 = {
            ten: false,
            moTa: false,
            trangThai: false,
            loai: false,
            giaTri: false,
            ngayBatDau: false,
            ngayKetThuc: false,
        };

        let isValid = true;

        if (!$scope.formAdd.ten || $scope.formAdd.ten.length < 1 || $scope.formAdd.ten.length > 250) {
            $scope.error1.ten = true;
            isValid = false;
        }

        if (!$scope.formAdd.moTa || $scope.formAdd.moTa.length < 1 || $scope.formAdd.moTa.length > 250) {
            $scope.error1.moTa = true;
            isValid = false;
        }

        if (!$scope.formAdd.loai) {
            $scope.error1.loai = true;
            isValid = false;
        }

        if (!$scope.formAdd.giaTri || $scope.formAdd.giaTri < 1 || $scope.formAdd.giaTri > 200000) {
            $scope.error1.giaTri = true;
            isValid = false;
        }

        if (!$scope.formAdd.ngayKetThuc || new Date($scope.formAdd.ngayBatDau) >= new Date($scope.formAdd.ngayKetThuc)) {
            $scope.error1.ngayKetThuc = true;
            isValid = false;
        }

        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn thêm khuyến mãi này không?",
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
                $http.post(`/rest/khuyenmai`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.resetAdd();
                    swal("Success!", "Thêm mới thành công", "success");
                }).catch(error => {
                    swal("Error!", "Thêm mới thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy thêm danh mục", "Thêm khuyến mãi đã bị hủy", "error");
            }
        });
    };
});
