app.controller("sanpham-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.form = {};
    $scope.error = {};
    $scope.size = [];
    $scope.mausac = [];
    $scope.danhmuc = [];
    $scope.thuonghieu = [];
    $scope.chatlieu = [];
    $scope.filteredChatLieu = [];
    $scope.filteredDanhMuc = [];
    $scope.filteredSizes = [];
    $scope.filteredColors = [];
    $scope.productDetails = [];

    // Initialize to load lists and set default selections
    $scope.initialize = function () {

        $http.get("/rest/danhmuc").then(resp => {
            $scope.danhmuc = resp.data.data;
            $scope.filterDanhMuc();
        });

        $http.get("/rest/thuonghieu").then(resp => {
            $scope.thuonghieu = resp.data.data;
        });

        $http.get("/chat-lieu/get-list").then(resp => {
            $scope.chatlieu = resp.data.data;
            $scope.filterChatLieu();
        });

        $http.get("/size/get-list").then(resp => {
            $scope.size = resp.data.data;
            $scope.filterSizesByIdCha();
        });

        $http.get("/mau-sac/get-list").then(resp => {
            $scope.mausac = resp.data.data;
            $scope.filterColorsByIdCha();
        });
        $scope.productDetails = []; // Khởi tạo mảng sản phẩm chi tiết

    };

    // Filter functions
    $scope.filterChatLieu = function () {
        if ($scope.selectedIdChaCL) {
            $scope.filteredChatLieu = $scope.chatlieu.filter(c => c.idCha == $scope.selectedIdChaCL);
        } else {
            $scope.filteredChatLieu = $scope.chatlieu;
        }
    };

    $scope.filterDanhMuc = function () {
        if ($scope.selectedIdChaDM) {
            $scope.filteredDanhMuc = $scope.danhmuc.filter(c => c.idCha == $scope.selectedIdChaDM);
        } else {
            $scope.filteredDanhMuc = $scope.danhmuc;
        }
    };

    $scope.filterSizesByIdCha = function () {
        if ($scope.selectedSizeIdCha) {
            $scope.filteredSizes = $scope.size.filter(size => size.idCha == $scope.selectedSizeIdCha);
        } else {
            $scope.filteredSizes = $scope.size;
        }
    };

    $scope.filterColorsByIdCha = function () {
        if ($scope.selectedColorIdCha) {
            $scope.filteredColors = $scope.mausac.filter(mausac => mausac.idCha == $scope.selectedColorIdCha);
        } else {
            $scope.filteredColors = $scope.mausac;
        }
    };

    $scope.filterColorsAndSizes = function () {
        $scope.productDetails = [];
        const selectedColors = $scope.filteredColors.filter(color => color.selected);
        const selectedSizes = $scope.filteredSizes.filter(size => size.selected);

        selectedColors.forEach(function (color) {
            selectedSizes.forEach(function (size) {
                $scope.productDetails.push({
                    idSize: size.id,
                    idMauSac: color.id,
                    soLuong: 100,
                    gia: 100000,
                    ghiChu: '',
                    size: size,
                    mauSac: color
                });
            });
        });
    };

    $scope.reset = function () {
        $scope.form = {
            ten: '', // Đặt mặc định cho tên
            moTa: '', // Đặt mặc định cho mô tả
            gia: 100000, // Đặt mặc định cho giá
            idDanhMuc: 1,
            idThuongHieu: 1,
            idChatLieu: 1,
            xuatXu: '',
            anh: ''
        };

    };

    $scope.addProductWithDetails = function () {
        // validate
        $scope.error = {
            ten: false,
            gia: false,
            moTa: false,
            idDanhMuc: false,
            idThuongHieu: false,
            idChatLieu: false,
            xuatXu: false,
            anh: false
        };
        let isValid = true;

        if (!$scope.form.ten || $scope.form.ten.length < 1 || $scope.form.ten.length > 250) {
            $scope.error.ten = true;
            isValid = false;
        }
        if (!$scope.form.moTa || $scope.form.moTa.length < 1 || $scope.form.moTa.length > 100) {
            $scope.error.moTa = true;
            isValid = false;
        }
        if (!$scope.form.gia || $scope.form.gia < 100000 || $scope.form.gia > 100000000) {
            $scope.error.gia = true;
            isValid = false;
        }
        if (!$scope.form.idDanhMuc) {
            $scope.error.idDanhMuc = true;
            isValid = false;
        }
        if (!$scope.form.idThuongHieu) {
            $scope.error.idThuongHieu = true;
            isValid = false;
        }
        if (!$scope.form.idChatLieu) {
            $scope.error.idChatLieu = true;
            isValid = false;
        }
        if (!$scope.form.xuatXu) {
            $scope.error.xuatXu = true;
            isValid = false;
        }
        if (!$scope.form.anh) {
            $scope.error.anh = true;
            isValid = false;
        }
        if (!isValid) {
            swal("Lỗi!", "Vui lòng kiểm tra các trường dữ liệu và đảm bảo chúng hợp lệ.", "error");
            return; // Ngừng thực hiện nếu không hợp lệ
        }

        // Tạo sản phẩm chính
        const sanPham = {
            ten: $scope.form.ten,
            gia: $scope.form.gia,
            moTa: $scope.form.moTa,
            idDanhMuc: $scope.form.idDanhMuc,
            idThuongHieu: $scope.form.idThuongHieu,
            idChatLieu: $scope.form.idChatLieu,
            xuatXu: $scope.form.xuatXu,
            ma: Math.random().toString(36).substring(2, 12),
            trangThai: 1,
            ngayTao: new Date().toISOString(),
            ngayCapNhat: new Date().toISOString(),
            nguoiTao: 1,
            nguoiCapNhat: 1,
            anh: $scope.form.anh
        };
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn sản phẩm này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                $http.post("/san-pham", sanPham).then(() => {
                    // Sau khi thêm sản phẩm thành công, lấy sản phẩm mới nhất
                    $scope.upLoadImage();  // Upload ảnh sau khi thêm sản phẩm xong
                    $http.get("/san-pham").then(resp => {
                        const dataArray = resp.data.data;
                        if (Array.isArray(dataArray) && dataArray.length > 0) {
                            const createdSanPham = dataArray[dataArray.length - 1];
                            const sanPhamChiTietList = $scope.productDetails.map(detail => ({
                                idSanPham: createdSanPham.id,
                                idSize: detail.size.id,
                                idMauSac: detail.mauSac.id,
                                soLuong: detail.soLuong,
                                gia: detail.gia,
                                ghiChu: detail.ghiChu,
                                trangThai: 1,
                                ngayTao: new Date().toISOString(),
                                ngayCapNhat: new Date().toISOString(),
                                nguoiTao: 1,
                                nguoiCapNhat: 1
                            }));

                            // Gửi từng sản phẩm chi tiết một
                            const addDetailsPromises = sanPhamChiTietList.map(detail => $http.post("/spct", detail));
                            addDetailsPromises.push($scope.uploadImages(createdSanPham.id));

                            Promise.all(addDetailsPromises).then(() => {
                                $scope.initialize();
                                $scope.reset();
                                swal("Success!", "Thêm thành công", "success");
                            }).catch(error => {
                                console.error("Lỗi khi thêm chi tiết sản phẩm:", error);
                                swal("Error!", "Lỗi khi thêm chi tiết sản phẩm:", "error");
                            });
                        } else {
                            console("Không thể tìm thấy sản phẩm vừa tạo.");
                            swal("Error!", "Không thể tìm thấy sản phẩm vừa tạo", "error");
                        }
                    }).catch(error => {
                        console.error("Lỗi khi lấy sản phẩm mới nhất:", error);
                        swal("Error!", "Lỗi khi lấy sản phẩm mới nhất", "error");
                    });
                }).catch(error => {
                    console.error("Lỗi khi thêm sản phẩm:", error);
                    swal("Error!", "Lỗi khi thêm sản phẩm", "error");
                });
            } else {
                swal("Hủy cập nhật", "Thêm sản phẩm đã bị hủy", "error");
            }
        });
    };

    $scope.uploadImages = function (idSanPham) {
        const input = document.getElementById('profileImage3');
        const files = input.files;
        if (files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append("images", file);
            });
            formData.append("idSanPham", idSanPham);

            return $http.post("/hinh-anh", formData, {
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                console.log("Ảnh đã được tải lên thành công");
                // Cập nhật thông tin đường dẫn hình ảnh cho sản phẩm
                document.getElementById("imagePath3").value = resp.data.filePath;  // hiển thị đường dẫn ở input
            }).catch(error => {
                console.error("Lỗi khi tải lên ảnh:", error);
                alert("Có lỗi khi tải lên ảnh. Vui lòng kiểm tra lại.");
            });
        } else {
            swal("Lỗi!", "Vui lòng chọn ảnh sản phẩm.", "error");
        }
    };

    $scope.upLoadImage = function () {
        const input = document.getElementById('profileImage2');
        if (input.files && input.files[0]) {
            const formData = new FormData();
            formData.append("file", input.files[0]);

            $http.post("/file/upload", formData, {
                headers: {'Content-Type': undefined}
            }).then(resp => {
                $scope.form.anh = resp.data.filePath;  // lưu đường dẫn vào form
                document.getElementById("imagePath2").value = resp.data.filePath;  // hiển thị đường dẫn ở input
            }).catch(error => {
                console.error("Lỗi khi tải lên ảnh:", error);
                alert("Có lỗi khi tải lên ảnh. Vui lòng kiểm tra lại.");
            });
        }
    };

    document.getElementById('profileImage2').addEventListener('change', function (event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById('previewImage2');
                preview.src = e.target.result;
                preview.style.display = 'block'; // Hiển thị ảnh xem trước
            };
            reader.readAsDataURL(file);
        }
    });

    $scope.removeProductDetail = function(detail) {
        // Xóa sản phẩm chi tiết khỏi danh sách
        const index = $scope.productDetails.indexOf(detail);
        if (index > -1) {
            $scope.productDetails.splice(index, 1); // Xóa sản phẩm chi tiết
        }
    };

    $scope.updateImagePreview3 = function(event) {
        // Xóa tất cả ảnh đã hiển thị trước đó
        var previewContainer = document.getElementById('previewContainer');
        previewContainer.innerHTML = '';

        // Lấy danh sách file được chọn
        var files = event.target.files;

        // Kiểm tra nếu có file nào được chọn
        if (files.length > 0) {
            // Duyệt qua danh sách file và tạo preview cho từng file
            $scope.image.anh = []; // Đảm bảo danh sách ảnh được reset
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();

                // Khi đọc file xong, tạo preview và cập nhật vào model
                reader.onload = (function(theFile) {
                    return function(e) {
                        // Tạo phần tử img để hiển thị ảnh
                        var img = document.createElement('img');
                        img.classList.add('preview-image');
                        img.src = e.target.result;
                        img.style.maxWidth = '100px'; // Đặt kích thước hiển thị
                        img.style.margin = '5px';

                        // Thêm ảnh vào container
                        previewContainer.appendChild(img);

                        // Cập nhật danh sách ảnh vào mô hình Angular
                        $scope.$apply(function() {
                            $scope.image.anh.push({
                                file: theFile,
                                url: e.target.result
                            });
                        });
                    };
                })(file);

                reader.readAsDataURL(file); // Đọc file ảnh
            }
        }
    };

    $scope.initialize();
});
