app.controller("mausac-ctrl", function ($scope, $http) {
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
                const matchesIdCha = !$scope.selectedIdCha || item.idCha === Number($scope.selectedIdCha);
                return matchesSearch && matchesIdCha;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    // Khởi tạo và tải dữ liệu
    $scope.initialize = function () {
        // Gọi API và kiểm tra dữ liệu
        $http.get("/mau-sac/get-list").then(resp => {
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

    $scope.validateForm = function (form, errorContainer) {
        errorContainer.ten = !form.ten || form.ten.length < 1 || form.ten.length > 100;
        errorContainer.idCha = !form.idCha;

        return !Object.values(errorContainer).includes(true);
    };

    $scope.update = function () {
        $scope.error = {};
        if (!$scope.validateForm($scope.form, $scope.error)) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return;
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật chất liệu này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                var item = angular.copy($scope.form);
                var token = localStorage.getItem('token');
                $http.put(`/mau-sac/update/${item.id}`, item,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật chất liệu đã bị hủy", "error");
            }
        });
    };

    $scope.create = function () {
        $scope.error1 = {};
        if (!$scope.validateForm($scope.formAdd, $scope.error1)) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return;
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn thêm chất liệu này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAdd) => {
            if (willAdd) {
                var item = angular.copy($scope.formAdd);
                item.trangThai = 1;
                var token = localStorage.getItem('token');

                $http.post(`/mau-sac/add`, item,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                ).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    $scope.resetAdd();
                    swal("Success!", "Thêm mới thành công", "success");
                }).catch(error => {
                    swal("Error!", "Thêm mới thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy thêm danh mục", "Thêm chất liệu đã bị hủy", "error");
            }
        });
    };

    $scope.updateTrangThaiTo2 = function (item) {
        let updatedItem = angular.copy(item);
        updatedItem.trangThai = 2;
        var token = localStorage.getItem('token');
        $http.put(`/mau-sac/update/${updatedItem.id}`, updatedItem, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            $scope.initialize();
            swal("Success!", "Đã cập nhật trạng thái thành 2", "success");
        }).catch(error => {
            swal("Error!", "Cập nhật trạng thái thất bại", "error");
            console.log("Error: ", error);
        });
    };

    $scope.updateTrangThaiTo1 = function (item) {
        let updatedItem = angular.copy(item);
        updatedItem.trangThai = 1;
        var token = localStorage.getItem('token');
        $http.put(`/mau-sac/update/${updatedItem.id}`, updatedItem, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            $scope.initialize();
            swal("Success!", "Đã cập nhật trạng thái thành 1", "success");
        }).catch(error => {
            swal("Error!", "Cập nhật trạng thái thất bại", "error");
            console.log("Error: ", error);
        });
    };
});
