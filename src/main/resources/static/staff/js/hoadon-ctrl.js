app.controller("hoadon-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.items = [];
    $scope.dcgh = [];
    $scope.hdct = [];
    $scope.hdcts = [];
    $scope.ptvc = [];
    $scope.form = {};
    $scope.form2 = {};
    $scope.form3 = {};
    $scope.form4 = {};
    $scope.form5 = {};
    $scope.form6 = {};

    $scope.selectedInvoiceId = null;
    $scope.selectedInvoiceMa = null;
    $scope.searchText1 = ''; // Tìm kiếm cho trạng thái 1
    $scope.searchText2 = '';
    $scope.searchText3 = '';
    $scope.searchText4 = '';
    // Thêm searchText cho các trạng thái khác nếu cần

    // Hàm khởi tạo
    // $scope.initialize = function () {
    //     // Tải danh sách hóa đơn
    //     $http.get("/rest/hoadon").then(resp => {
    //         console.log("Data from API: ", resp.data);
    //         $scope.items = resp.data;
    //
    //         // Chuyển đổi định dạng ngày
    //         $scope.items.forEach(item => {
    //             item.ngayTao = new Date(item.ngayTao);
    //             item.ngayCapNhat = new Date(item.ngayCapNhat);
    //             if (item.ngayThanhToan) {
    //                 item.ngayThanhToan = new Date(item.ngayThanhToan); // Chuyển đổi timestamp thành Date
    //             }
    //             if (item.ngayDatHang) {
    //                 item.ngayDatHang = new Date(item.ngayDatHang); // Chuyển đổi timestamp thành Date
    //             }
    //         });
    //
    //         // Cập nhật các mục cho pager
    //         $scope.pager1.updateItems();
    //         $scope.pager2.updateItems();
    //         $scope.pager3.updateItems();
    //         $scope.pager4.updateItems();
    //     }).catch(error => {
    //         console.log("Error loading hoadon: ", error);
    //     });
    //
    //     // Tải các dữ liệu khác
    //     $http.get("/rest/hdct").then(resp => {
    //         $scope.hdct = resp.data;
    //     });
    //     $http.get("/rest/dcgh").then(resp => {
    //         $scope.dcgh = resp.data;
    //     });
    //     $http.get("/rest/ptvc").then(resp => {
    //         $scope.ptvc = resp.data;
    //     });
    // };
    $scope.initialize = function () {
        // Gọi API và kiểm tra dữ liệu
        $http.get("/rest/hoadon").then(resp => {
            console.log("Dữ liệu từ API: ", resp.data); // Kiểm tra dữ liệu từ API
            // Kiểm tra xem resp.data.data có phải là mảng không
            if (Array.isArray(resp.data.data)) {
                $scope.items = resp.data.data.map(item => ({
                    ...item,
                    ngayTao: new Date(item.ngayTao), // Chuyển đổi ngày
                    ngayCapNhat: new Date(item.ngayCapNhat) // Chuyển đổi ngày
                }));
                $scope.pager0.updateItems();
                $scope.pager2.updateItems();
                $scope.pager3.updateItems();
                $scope.pager4.updateItems();
                $scope.pager5.updateItems();
                $scope.pager6.updateItems();
            } else {
                console.error("API không trả về một mảng. Kiểm tra cấu trúc dữ liệu.");
            }
        }).catch(error => {
            console.error("Lỗi khi tải danh mục: ", error);
        });
    };

    $scope.pager0 = {
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
                const statusMatches = item.trangThai === 0;
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
    $scope.pager5 = {
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
                const statusMatches = item.trangThai === 5;
                const idMatches = item.id.toString().includes($scope.searchText4);
                return statusMatches && idMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };
    $scope.pager6 = {
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
                const statusMatches = item.trangThai === 6;
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
            $scope.pager0.updateItems();
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
    $scope.$watch('searchText5', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pager4.updateItems();
        }
    });
    $scope.$watch('searchText6', function (newValue, oldValue) {
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
    $scope.update5 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái hóa đơn này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 5; // Cập nhật trạng thái
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
    $scope.update6 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái hóa đơn này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                item.trangThai = 6; // Cập nhật trạng thái
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

    $scope.edit0 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form = angular.copy(item);
    };
    $scope.edit2 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form2 = angular.copy(item);
    };
    $scope.edit3 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form3 = angular.copy(item);
    };
    $scope.edit4 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form4 = angular.copy(item);
    };
    $scope.edit5 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form5 = angular.copy(item);
    };
    $scope.edit6 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form6 = angular.copy(item);
    };

    $scope.selectInvoice = function (item) {
        console.log("Selected Invoice ID: ", item.id); // Thêm log này
        $rootScope.selectedInvoiceId = item.id; // Lưu ID hóa đơn vào rootScope
        $rootScope.selectedInvoiceMa = item.ma; // Lưu ID hóa đơn vào rootScope
        $location.path('/hdct'); // Chuyển hướng đến trang hdct
    };

    // Khởi tạo
    $scope.initialize();
});
