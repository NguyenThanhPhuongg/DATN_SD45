app.controller("hoadon-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.dcgh = [];
    $scope.hdct = [];
    $scope.hdcts = [];
    $scope.ptvc = [];
    $scope.form = {};
    $scope.searchText1 = ''; // Tìm kiếm cho trạng thái 1
    $scope.searchText2 = '';
    $scope.searchText3 = '';
    $scope.searchText4 = '';
    // Thêm searchText cho các trạng thái khác nếu cần

    // Hàm khởi tạo
    $scope.initialize = function () {
        // Tải danh sách hóa đơn
        $http.get("/rest/hoadon").then(resp => {
            console.log("Data from API: ", resp.data);
            $scope.items = resp.data;

            // Chuyển đổi định dạng ngày
            $scope.items.forEach(item => {
                item.ngayTao = new Date(item.ngayTao);
                item.ngayCapNhat = new Date(item.ngayCapNhat);
                if (item.ngayThanhToan) {
                    item.ngayThanhToan = new Date(item.ngayThanhToan); // Chuyển đổi timestamp thành Date
                }
                if (item.ngayDatHang) {
                    item.ngayDatHang = new Date(item.ngayDatHang); // Chuyển đổi timestamp thành Date
                }
            });

            // Cập nhật các mục cho pager
            $scope.pager1.updateItems();
            $scope.pager2.updateItems();
            $scope.pager3.updateItems();
            $scope.pager4.updateItems();
        }).catch(error => {
            console.log("Error loading hoadon: ", error);
        });

        // Tải các dữ liệu khác
        $http.get("/rest/hdct").then(resp => {
            $scope.hdct = resp.data;
        });
        $http.get("/rest/dcgh").then(resp => {
            $scope.dcgh = resp.data;
        });
        $http.get("/rest/ptvc").then(resp => {
            $scope.ptvc = resp.data;
        });
    };

    $scope.pager1 = {
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
                const statusMatches = item.trangThai === 1;
                const idMatches = item.id.toString().includes($scope.searchText1);
                return statusMatches && idMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };
    $scope.pager2 = {
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
                const statusMatches = item.trangThai === 2;
                const idMatches = item.id.toString().includes($scope.searchText2);
                return statusMatches && idMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };
    $scope.pager3 = {
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
                const statusMatches = item.trangThai === 3;
                const idMatches = item.id.toString().includes($scope.searchText3);
                return statusMatches && idMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };
    $scope.pager4 = {
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
                const statusMatches = item.trangThai === 4;
                const idMatches = item.id.toString().includes($scope.searchText4);
                return statusMatches && idMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    // Theo dõi sự thay đổi trong ô tìm kiếm cho từng trạng thái
    $scope.$watch('searchText1', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager1.updateItems();
        }
    });
    $scope.$watch('searchText2', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager2.updateItems();
        }
    });
    $scope.$watch('searchText3', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager3.updateItems();
        }
    });
    $scope.$watch('searchText4', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager4.updateItems();
        }
    });

    // Hàm cập nhật trạng thái hóa đơn
    $scope.update2 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái hóa đơn này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 2; // Cập nhật trạng thái
                $http.put(`/rest/hoadon/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật trạng thái hóa đơn đã bị hủy", "error");
            }
        });
    };
    $scope.update3 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái hóa đơn này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 3; // Cập nhật trạng thái
                $http.put(`/rest/hoadon/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật trạng thái hóa đơn đã bị hủy", "error");
            }
        });
    };
    $scope.update4 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái hóa đơn này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 4; // Cập nhật trạng thái
                $http.put(`/rest/hoadon/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật trạng thái hóa đơn đã bị hủy", "error");
            }
        });
    };
    $scope.update1 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái hóa đơn này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 1; // Cập nhật trạng thái
                $http.put(`/rest/hoadon/${item.id}`, item).then(resp => {
                    $scope.initialize(); // Tải lại dữ liệu
                    swal("Success!", "Cập nhật thành công", "success");
                }).catch(error => {
                    swal("Error!", "Cập nhật thất bại", "error");
                    console.log("Error: ", error);
                });
            } else {
                swal("Hủy cập nhật", "Cập nhật trạng thái hóa đơn đã bị hủy", "error");
            }
        });
    };

    $scope.edit = function (item) {
        // Điền thông tin của hóa đơn vào form
        $scope.form = angular.copy(item); // Sử dụng angular.copy để tránh thay đổi item gốc

        // Gọi API để lấy danh sách chi tiết hóa đơn dựa trên id hóa đơn
        $http.get(`/rest/hdct/hoadon/${item.id}`).then(resp => {
            // Cập nhật danh sách chi tiết hóa đơn vào scope
            $scope.hdcts = resp.data; // Giả sử hdct đã được khai báo ở đầu controller
        }).catch(error => {
            console.log("Error loading hoa don chi tiet: ", error);
        });
    };


    // Khởi tạo
    $scope.initialize();
});
