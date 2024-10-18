app.controller("spct-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.sanpham = [];
    $scope.size = [];
    $scope.mausac = [];
    $scope.chatlieu = [];
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
        }


    };

    $scope.selectedProductId = null; // Biến để lưu ID sản phẩm được chọn

    // Hàm cập nhật sản phẩm chi tiết
    $scope.updateProductDetails = function () {
        const selectedProductId = $scope.form.idSanPham.id;
        $scope.selectedProductId = selectedProductId;

        // Cập nhật formAdd.idSanPham.id khi chọn sản phẩm
        $scope.formAdd.idSanPham = {id: selectedProductId};

        // Cập nhật các mục cho pager
        $scope.pager.updateItems(); // Cập nhật lại items để phân trang
    };


    // Cập nhật lại hàm updateItems trong pager để chỉ tìm theo ID sản phẩm
    $scope.pager.updateItems = function () {
        const filteredItems = $scope.items.filter(item => {
            // Chỉ lọc sản phẩm chi tiết có idSanPham trùng với selectedProductId
            return item.idSanPham.id === $scope.selectedProductId;
        });

        this.count = Math.ceil(filteredItems.length / this.size);
        this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
    };

    // Theo dõi sự thay đổi trong select sản phẩm
    $scope.$watch('form.idSanPham.id', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.updateProductDetails(); // Gọi hàm cập nhật khi ID sản phẩm thay đổi
        }
    });

    // Hàm khởi tạo
    $scope.initialize = function () {
        // Tải danh sách thương hiệu
        $http.get("/rest/spct").then(resp => {
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
        $http.get("/rest/size").then(resp => {
            $scope.size = resp.data;
        });
        $http.get("/rest/mausac").then(resp => {
            $scope.mausac = resp.data;
        });
        $http.get("/rest/chatlieu").then(resp => {
            $scope.chatlieu = resp.data;
        });
        $http.get("/rest/sanpham").then(resp => {
            $scope.sanpham = resp.data;
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
        const currentIdSP = $scope.form.idSanPham; // Lưu trữ giá trị ID hiện tại
        const ngayTao = $scope.form.ngayTao; // Lưu trữ giá trị ID hiện tại
        // Thiết lập lại các trường khác
        $scope.form = {
            nguoiTao: 'Admin', // Mặc định người tạo là 'Admin'
            nguoiCapNhat: 'Admin', // Mặc định người cập nhật là 'Admin'
            ngayCapNhat: new Date(), // Ngày cập nhật sẽ là thời gian hiện tại
            ngayTao: ngayTao,
            trangThai: 1, // Đặt mặc định cho trạng thái là true
            id: currentId, // Giữ nguyên giá trị ID
            idSanPham: currentIdSP, // Giữ nguyên giá trị ID
            soLuong: 0,
            gia: 0,
            ghiChu: ''
        };
    };

    $scope.resetAdd = function () {
        const currentIdSP = $scope.formAdd.idSanPham; // Lưu trữ giá trị ID sản phẩm hiện tại

        // Thiết lập lại các trường khác nhưng giữ nguyên idSanPham
        $scope.formAdd = {
            idSanPham: currentIdSP, // Giữ nguyên giá trị ID sản phẩm
            soLuong: 0,
            gia: 0,
            ghiChu: '',
            trangThai: 1, // Đặt mặc định trạng thái
            nguoiTao: 'Admin', // Đặt mặc định người tạo là 'Admin'
            nguoiCapNhat: 'Admin', // Đặt mặc định người cập nhật là 'Admin'
            ngayCapNhat: new Date() // Ngày cập nhật là thời gian hiện tại
        };
    };


    $scope.edit = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        $scope.form = angular.copy(item);
    };

    $scope.update = function () {
        $scope.error1 = {
            soLuong: false,
            ghiChu: false,
            gia: false,
            trangThai: false,
            idSize: false,
            idChatLieu: false,
            idMauSac: false
        };

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        // Kiểm tra trường 'gia' phải từ 100,000 đến 100,000,000
        if (!$scope.form.gia || $scope.form.gia < 100000 || $scope.form.gia > 100000000) {
            $scope.error1.gia = true;
            isValid = false;
        }

        // Kiểm tra trường 'soLuong' phải từ 100 đến 10,000
        if (!$scope.form.soLuong || $scope.form.soLuong < 100 || $scope.form.soLuong > 10000) {
            $scope.error1.soLuong = true;
            isValid = false;
        }

        // Kiểm tra trường 'ghiChu' phải từ 1 đến 300 ký tự
        if (!$scope.form.ghiChu || $scope.form.ghiChu.length < 1 || $scope.form.ghiChu.length > 300) {
            $scope.error1.ghiChu = true;
            isValid = false;
        }

        if (!$scope.form.idSize || !$scope.form.idSize.id) {
            $scope.error1.idSize = true;
            isValid = false;
        }

        if (!$scope.form.idChatLieu || !$scope.form.idChatLieu.id) {
            $scope.error1.idChatLieu = true;
            isValid = false;
        }

        if (!$scope.form.idMauSac || !$scope.form.idMauSac.id) {
            $scope.error1.idMauSac = true;
            isValid = false;
        }

        if (!$scope.form.trangThai) {
            $scope.error1.trangThai = true;
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

                $http.put(`/rest/spct/${item.id}`, item).then(resp => {
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

    // Thêm thương hiệu
    $scope.create = function () {
        $scope.error = {
            soLuong: false,
            ghiChu: false,
            gia: false,
            trangThai: false,
            idSize: false,
            idChatLieu: false,
            idMauSac: false
        };

        // Kiểm tra các trường dữ liệu
        let isValid = true;

        // Kiểm tra trường 'gia' phải từ 100,000 đến 100,000,000
        if (!$scope.formAdd.gia || $scope.formAdd.gia < 100000 || $scope.formAdd.gia > 100000000) {
            $scope.error.gia = true;
            isValid = false;
        }

        // Kiểm tra trường 'soLuong' phải từ 100 đến 10,000
        if (!$scope.formAdd.soLuong || $scope.formAdd.soLuong < 100 || $scope.formAdd.soLuong > 10000) {
            $scope.error.soLuong = true;
            isValid = false;
        }

        // Kiểm tra trường 'ghiChu' phải từ 1 đến 300 ký tự
        if (!$scope.formAdd.ghiChu || $scope.formAdd.ghiChu.length < 1 || $scope.formAdd.ghiChu.length > 300) {
            $scope.error.ghiChu = true;
            isValid = false;
        }

        if (!$scope.formAdd.idSize || !$scope.formAdd.idSize.id) {
            $scope.error.idSize = true;
            isValid = false;
        }

        if (!$scope.formAdd.idChatLieu || !$scope.formAdd.idChatLieu.id) {
            $scope.error.idChatLieu = true;
            isValid = false;
        }

        if (!$scope.formAdd.idMauSac || !$scope.formAdd.idMauSac.id) {
            $scope.error.idMauSac = true;
            isValid = false;
        }

        if (!$scope.formAdd.trangThai) {
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
                var item = angular.copy($scope.formAdd);
                item.nguoiTao = 'Admin'; // Đặt người tạo mặc định là 'Admin'
                item.ngayTao = new Date(); // Ngày tạo là thời gian hiện tại
                item.ngayCapNhat = new Date(); // Ngày cập nhật là thời gian hiện tại

                $http.post(`/rest/spct`, item).then(resp => {
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
                $http.delete(`/rest/spct/${item.id}`).then(resp => {
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

});
