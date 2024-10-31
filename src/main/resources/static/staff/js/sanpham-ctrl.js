app.controller("sanpham-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.form = {};
    $scope.error = {};
    $scope.size = [];
    $scope.mausac = [];
    $scope.danhmuc = [];
    $scope.thuonghieu = [];
    $scope.chatlieu = [];
    $scope.filteredChatLieu = []; // Mảng chứa danh sách chất liệu được lọc theo idCha
    $scope.filteredDanhMuc = [];
    $scope.filteredSize = [];
    $scope.filteredMauSac = [];
    $scope.filteredSizes = [];
    $scope.filteredColors = [];

    $scope.initialize = function () {
        // Tải danh sách danh mục, thương hiệu, chất liệu
        $http.get("/rest/danhmuc").then(resp => {
            $scope.danhmuc = resp.data.data;
            console.log("Danh mục đã tải: ", $scope.danhmuc);
        });

        $http.get("/rest/thuonghieu").then(resp => {
            $scope.thuonghieu = resp.data.data;
            console.log("Danh mục đã tải: ", $scope.thuonghieu);
        });

        $http.get("/chat-lieu/get-list").then(resp => {
            $scope.chatlieu = resp.data.data;
            console.log("Danh mục đã tải: ", $scope.chatlieu);
        });

        $http.get("/size/get-list").then(resp => {
            $scope.size = resp.data.data;
            console.log("Danh mục đã tải: ", $scope.size);
        });

        $http.get("/mau-sac/get-list").then(resp => {
            $scope.mausac = resp.data.data;
            console.log("Danh mục đã tải: ", $scope.mausac);
        });
    };

    $scope.filterChatLieu = function () {
        if ($scope.selectedIdChaCL) {
            // Lọc danh sách chatlieu có idCha trùng với selectedIdCha
            $scope.filteredChatLieu = $scope.chatlieu.filter(c => c.idCha == $scope.selectedIdChaCL);
        } else {
            // Nếu chưa chọn idCha thì làm rỗng filteredChatLieu
            $scope.filteredChatLieu = [];
        }
    };

    $scope.filterMauSac = function () {
        if ($scope.selectedIdChaMS) {
            // Lọc danh sách chatlieu có idCha trùng với selectedIdCha
            $scope.filteredMauSac = $scope.mausac.filter(c => c.idCha == $scope.selectedIdChaMS);
        } else {
            // Nếu chưa chọn idCha thì làm rỗng filteredChatLieu
            $scope.filteredMauSac = [];
        }
    };
    $scope.filterSize = function () {
        if ($scope.selectedIdChaS) {
            // Lọc danh sách chatlieu có idCha trùng với selectedIdCha
            $scope.filteredSize = $scope.size.filter(c => c.idCha == $scope.selectedIdChaS);
        } else {
            // Nếu chưa chọn idCha thì làm rỗng filteredChatLieu
            $scope.filteredSize = [];
        }
    };
    $scope.filterDanhMuc = function () {
        if ($scope.selectedIdChaDM) {
            // Lọc danh sách chatlieu có idCha trùng với selectedIdCha
            $scope.filteredDanhMuc = $scope.danhmuc.filter(c => c.idCha == $scope.selectedIdChaDM);
        } else {
            // Nếu chưa chọn idCha thì làm rỗng filteredChatLieu
            $scope.filteredDanhMuc = [];
        }
    };

    // Lọc sizes dựa vào idCha
    $scope.filterSizesByIdCha = function () {
        $scope.filteredSizes = $scope.size.filter(function (size) {
            return size.idCha == $scope.selectedSizeIdCha;
        });
    };

    // Lọc colors dựa vào idCha
    $scope.filterColorsByIdCha = function () {
        $scope.filteredColors = $scope.mausac.filter(function (mausac) {
            return mausac.idCha == $scope.selectedColorIdCha;
        });
    };

    $scope.initialize();


    // Hàm để thêm sản phẩm
    $scope.addProduct = function () {
        // Thêm sản phẩm
        $http.post("/san-pham", $scope.form).then(function (response) {
            if (response.data.status === "success") {
                // Nếu thêm sản phẩm thành công, bạn có thể thêm SPCT ở đây
                const sanPhamId = response.data.data.id; // Giả sử API trả về ID sản phẩm mới tạo
                $scope.addProductDetails(sanPhamId);
            } else {
                // Nếu không thành công, hiển thị lỗi
                swal("Thất bại!", response.data.message || "Không thể thêm sản phẩm.", "error");
            }
        }, function (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding product: ", error);
            swal("Thất bại!", "Đã có lỗi xảy ra. Vui lòng thử lại.", "error");
        });
    };

    // Hàm để thêm sản phẩm chi tiết
    $scope.addProductDetails = function (sanPhamId) {
        const spct = {
            idSanPham: sanPhamId,
            idSize: $scope.form.idSize.id,
            idMauSac: $scope.form.idMauSac.id,
            soLuong: $scope.form.soLuong, // Bạn có thể cần thêm trường này vào form
            gia: $scope.form.gia, // Giá từ form
            ghiChu: $scope.form.ghiChu // Ghi chú từ form
        };

        // Gọi API để thêm sản phẩm chi tiết
        $http.post("/spct", spct).then(function (response) {
            if (response.data.status === "success") {
                // Thông báo thành công
                swal("Thành công!", "Sản phẩm chi tiết đã được thêm thành công!", "success");
                $scope.resetForm(); // Đặt lại form
            } else {
                swal("Thất bại!", response.data.message || "Không thể thêm sản phẩm chi tiết.", "error");
            }
        }, function (error) {
            console.error("Error adding product detail: ", error);
            swal("Thất bại!", "Đã có lỗi xảy ra. Vui lòng thử lại.", "error");
        });
    };

    // Hàm đặt lại form
    $scope.resetForm = function () {
        $scope.form = {}; // Đặt lại form về giá trị mặc định
    };
});
