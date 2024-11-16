app.controller("danhmuc-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};
    $scope.formAdd = {};
    $scope.searchText = ''; // Biến tìm kiếm
    $scope.selectedIdCha = null;

    $scope.pager = {
        page: 0,
        size: 5, // Giá trị mặc định
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
        $http.get("/rest/danhmuc").then(resp => {
            if (Array.isArray(resp.data.data)) {
                $scope.items = resp.data.data.map(item => ({
                    ...item,
                    ngayTao: new Date(item.ngayTao),
                    ngayCapNhat: new Date(item.ngayCapNhat)
                }));
                $scope.pager.updateItems();
            } else {
                console.error("API không trả về một mảng. Kiểm tra cấu trúc dữ liệu.");
            }
        }).catch(error => {
            console.error("Lỗi khi tải danh mục: ", error);
        });
    };

    // Theo dõi thay đổi trong ô tìm kiếm và idCha được chọn
    $scope.$watchGroup(['searchText', 'selectedIdCha'], function () {
        $scope.pager.updateItems();
    });

    // Khởi tạo dữ liệu khi controller được tải
    $scope.initialize();

    $scope.reset = function () {
        const currentId = $scope.form.id;
        $scope.form = {
            ten: '',
            moTa: '',
            trangThai: 1,
            id: currentId,
            idCha: 1
        };
    };

    $scope.resetAdd = function () {
        $scope.formAdd = {};
    };

    $scope.edit = function (item) {
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form = angular.copy(item);
    };

    $scope.validateForm = function (form, errorContainer) {
        errorContainer.ten = !form.ten || form.ten.length < 1 || form.ten.length > 100;
        errorContainer.moTa = !form.moTa || form.moTa.length < 1 || form.moTa.length > 100;
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
            text: "Bạn có chắc muốn cập nhật danh mục này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                let item = angular.copy($scope.form);
                var token = localStorage.getItem('token');
                $http.put(`/rest/danhmuc/${item.id}`, item, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(resp => {
                    $scope.initialize();
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            }
        });
    };

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
                    $scope.initialize();
                    $scope.reset();
                    swal("Success!", "Xóa thành công", "success");
                }).catch(error => {
                    swal("Error!", "Xóa thất bại", "error");
                    console.log("Error: ", error);
                });
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
            text: "Bạn có chắc muốn thêm danh mục này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAdd) => {
            if (willAdd) {
                let item = angular.copy($scope.formAdd);
                var token = localStorage.getItem('token');
                item.trangThai = 1;  // Thiết lập mặc định giá trị trangThai là 1
                $http.post(`/rest/danhmuc`, item, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(resp => {
                    $scope.initialize();
                    $scope.resetAdd();
                    swal("Success!", "Thêm mới thành công", "success");
                }).catch(error => {
                    swal("Error!", "Thêm mới thất bại", "error");
                    console.log("Error: ", error);
                });
            }
        });
    };

    // Phương thức cập nhật trangThai thành 2
    $scope.updateTrangThaiTo2 = function (item) {
        let updatedItem = angular.copy(item);
        updatedItem.trangThai = 2;
        var token = localStorage.getItem('token');
        $http.put(`/rest/danhmuc/${updatedItem.id}`, updatedItem, {
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

    // Phương thức cập nhật trangThai thành 1
    $scope.updateTrangThaiTo1 = function (item) {
        let updatedItem = angular.copy(item);
        updatedItem.trangThai = 1;
        var token = localStorage.getItem('token');
        $http.put(`/rest/danhmuc/${updatedItem.id}`, updatedItem, {
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
