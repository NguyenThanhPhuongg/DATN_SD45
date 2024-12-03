app.controller("danhmuc-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};
    $scope.formAdd = {};
    $scope.searchText = ''; // Biến tìm kiếm
    $scope.selectedIdCha = null;
    $scope.danhMucChildren = []; // Danh mục con của danh mục cha được chọn
    $scope.selectedDanhMuc = null; // Danh mục hiện tại
    $scope.pager = {
        page: 0,
        size: 10, // Giá trị mặc định
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
            console.log("Dữ liệu từ API:", resp.data);  // Kiểm tra dữ liệu trả về từ API
            if (Array.isArray(resp.data.data)) {
                $scope.items = resp.data.data.map(item => ({
                    ...item,
                    ngayTao: new Date(item.ngayTao),
                    ngayCapNhat: new Date(item.ngayCapNhat)
                }));
                $scope.danhMucRoot = $scope.items.filter(function (dm) {
                    return dm.idCha === null;
                });

                $scope.pager.updateItems();
            } else {
                console.error("API không trả về một mảng. Kiểm tra cấu trúc dữ liệu.");
            }
        }).catch(error => {
            console.error("Lỗi khi tải danh mục: ", error);
        });

    };

    $scope.loadDanhMucCon = function(idCha) {
        console.log("ID Cha đã chọn:", idCha);

        if (idCha) {
            // Nếu chọn một danh mục cha, gửi yêu cầu lấy tất cả danh mục từ API
            $http.get('/rest/danhmuc').then(function(response) {
                // Sau khi lấy danh mục, lọc danh mục con tương ứng với idCha
                $scope.danhMucChildren = response.data.data.filter(function(dm) {
                    return dm.idCha === Number(idCha);  // Lọc theo idCha
                });
                console.log("Danh mục con:", $scope.danhMucChildren);  // Hiển thị danh sách danh mục con
            }).catch(function(error) {
                console.error("Lỗi khi tải danh mục con:", error);
                toastr.error("Lỗi khi tải danh mục con.", "Lỗi!");
            });
        } else {
            // Nếu không chọn danh mục cha (tạo danh mục gốc), danh mục con sẽ rỗng
            $scope.danhMucChildren = [];
        }
    };


    // Theo dõi thay đổi trong ô tìm kiếm và idCha được chọn
    $scope.$watchGroup(['searchText', 'selectedIdCha'], function () {
        $scope.pager.updateItems();
    });

    // Khởi tạo dữ liệu khi controller được tải
    $scope.initialize();

    $scope.reset = function () {
        $scope.form.ten = '';
    };

    $scope.resetAdd = function () {
        $scope.formAdd = {};
    };

    $scope.edit = function (item) {
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form = angular.copy(item);
    };

    $scope.validateForm = function (form, errorContainer, isUpdate = false) {
        // Kiểm tra tên
        if (!form.ten) {
            errorContainer.ten = true;
            toastr.error("Tên danh mục không được để trống.", "Lỗi!");
        } else if (form.ten.length > 200) {
            errorContainer.ten = true;
            toastr.error("Tên danh mục không quá 200 ký tự", "Lỗi!");
        } else if (/[!@#$%^&*()~|]/.test(form.ten)) {  // Kiểm tra ký tự đặc biệt @$%#
            errorContainer.ten = true;
            toastr.error("Tên danh mục không được chứa ký tự đặc biệt.", "Lỗi!");
        } else if (
            $scope.items.some(item =>
                item.ten.trim().toLowerCase() === form.ten.trim().toLowerCase() &&
                (!isUpdate || item.id !== form.id) // Kiểm tra trùng tên với ID khác (trường hợp update)
            )
        ) {
            errorContainer.ten = true;
            toastr.error("Tên danh mục đã tồn tại. Vui lòng chọn tên khác.", "Lỗi!");
        } else {
            errorContainer.ten = false;
        }

        // Kiểm tra mô tả
        if (!form.moTa) {
            errorContainer.moTa = true;
            toastr.error("Mô tả danh mục không được để trống.", "Lỗi!");
        } else if (form.moTa.length > 1000) {
            errorContainer.moTa = true;
            toastr.error("Mô tả danh mục không quá 1000 ký tự", "Lỗi!");
        } else {
            errorContainer.moTa = false;
        }


        return !Object.values(errorContainer).includes(true);
    };


    $scope.create = function () {
        $scope.error1 = {};
        if (!$scope.validateForm($scope.formAdd, $scope.error1, false)) { // false: Không phải cập nhật
            return;
        }

        // Kiểm tra và gán giá trị idCha và idCon
        if (!$scope.formAdd.idCon) {
            // Nếu không chọn danh mục con, gán idCha làm idCon
            $scope.formAdd.idCon = $scope.formAdd.idCha;
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn thêm danh mục này?",
            icon: "warning",
            buttons: ["Hủy", "Xác nhận"],
            dangerMode: true,
        }).then((willAdd) => {
            if (willAdd) {
                let item = angular.copy($scope.formAdd);
                var token = localStorage.getItem('token');
                item.trangThai = 1; // Thiết lập mặc định giá trị trangThai là 1

                // Gửi yêu cầu POST lên server để thêm danh mục
                $http.post(`/rest/danhmuc`, item, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(resp => {
                    $scope.initialize();
                    $scope.resetAdd();
                    $('#addModal').modal('hide');
                    toastr.success("Thêm mới thành công", "Thành công!");
                }).catch(error => {
                    toastr.error("Thêm mới thất bại", "Lỗi!");
                    console.error("Error: ", error);
                });
            }
        });
    };

    $scope.update = function () {
        $scope.error = {};
        if (!$scope.validateForm($scope.form, $scope.error, true)) { // true: Đang cập nhật
            return;
        }

        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật danh mục này không?",
            icon: "warning",
            buttons: ["Hủy", "Xác nhận"],
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
                    $('#exampleModal').modal('hide');
                    toastr.success("Cập nhật thành công", "Thành công!");
                }).catch(error => {
                    toastr.error("Cập nhật thất bại", "Lỗi!");
                    console.error("Error: ", error);
                });
            }
        });
    };

    $scope.updateTrangThaiTo1 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái thành 1?",
            icon: "warning",
            buttons: ["Hủy", "Xác nhận"],
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                let updatedItem = angular.copy(item);
                updatedItem.trangThai = 1;
                var token = localStorage.getItem('token');
                $http.put(`/rest/danhmuc/${updatedItem.id}`, updatedItem, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(resp => {
                    $scope.initialize();
                    toastr.success("Đã cập nhật trạng thái thành 1", "Thành công!");
                }).catch(error => {
                    toastr.error("Cập nhật trạng thái thất bại", "Lỗi!");
                    console.error("Error: ", error);
                });
            }
        });
    };

    $scope.updateTrangThaiTo2 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn cập nhật trạng thái thành 2?",
            icon: "warning",
            buttons: ["Hủy", "Xác nhận"],
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                let updatedItem = angular.copy(item);
                updatedItem.trangThai = 2;
                var token = localStorage.getItem('token');
                $http.put(`/rest/danhmuc/${updatedItem.id}`, updatedItem, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(resp => {
                    $scope.initialize();
                    toastr.success("Đã cập nhật trạng thái thành 2", "Thành công!");
                }).catch(error => {
                    toastr.error("Cập nhật trạng thái thất bại", "Lỗi!");
                    console.error("Error: ", error);
                });
            }
        });
    };


    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right", // Hiển thị ở góc trên bên phải
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000", // Thời gian thông báo tồn tại (ms)
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Hàm để xử lý từ chối yêu cầu chi tiết
    $scope.getTenDanhMuc = function (idCha) {
        if (!$scope.items) return "Không xác định"; // Tránh lỗi nếu danh sách chưa tải xong
        const danhMucCha = $scope.items.find(danhMuc => danhMuc.id === idCha);
        return danhMucCha ? danhMucCha.ten : "Không xác định";
    };


});
