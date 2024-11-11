app.controller("sanpham-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};
    $scope.danhmuc = [];
    $scope.thuonghieu = [];
    $scope.chatlieu = [];
    $scope.mausac = [];
    $scope.size = [];
    $scope.errorMessage = "";
    $scope.filteredSizes = [];
    $scope.filteredColors = [];
    $scope.productDetails = [];

    // Khởi tạo dữ liệu
    $scope.initialize = function () {
        $http.get("/rest/danhmuc").then(resp => {
            $scope.danhmuc = resp.data.data;
        });

        $http.get("/rest/thuonghieu").then(resp => {
            $scope.thuonghieu = resp.data.data;
        });

        $http.get("/chat-lieu/get-list").then(resp => {
            $scope.chatlieu = resp.data.data;
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
        $scope.form.anh = ""; // Đặt lại ảnh mặc định hoặc rỗng
    };

    $scope.initialize();

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

    $scope.removeProductDetail = function(detail) {
        // Xóa sản phẩm chi tiết khỏi danh sách
        const index = $scope.productDetails.indexOf(detail);
        if (index > -1) {
            $scope.productDetails.splice(index, 1); // Xóa sản phẩm chi tiết
        }
    };
    // Reset form
    $scope.reset = function () {
        $scope.form = {}; // Đặt lại form về trạng thái ban đầu
        $scope.form.anh = ""; // Đặt lại ảnh về mặc định
        $scope.errorMessage = ""; // Xóa bỏ thông báo lỗi
        $scope.clearImagePreview();
    };

    $scope.generateRandomCode = function (minLength, maxLength) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#';
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    };

    // Xử lý khi file ảnh thay đổi
    $scope.onFileChange = function (event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                $scope.errorMessage = "Kích thước file phải nhỏ hơn 5MB.";
                return;
            }
            if (!file.type.startsWith("image/")) {
                $scope.errorMessage = "Vui lòng chọn một file ảnh.";
                return;
            }

            // Lưu ảnh vào form và hiển thị ảnh đã chọn
            $scope.form.anh = file;
            const reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(() => {
                    $scope.form.anh.preview = e.target.result;
                    $scope.errorMessage = ""; // Xóa lỗi nếu file hợp lệ
                });
            };
            reader.readAsDataURL(file); // Đọc file ảnh và lưu vào form
        } else {
            $scope.errorMessage = "Không có ảnh được chọn.";
        }
    };

    // Thêm sản phẩm
    $scope.create = function () {
        if (!$scope.validateFields()) {
            return; // Stop if validation fails
        }

        // Display confirmation prompt before creating product
        swal({
            title: "Xác nhận thêm sản phẩm",
            text: "Bạn có chắc chắn muốn thêm sản phẩm này không?",
            icon: "warning",
            buttons: ["Hủy", "Đồng ý"],
            dangerMode: true,
        }).then((willCreate) => {
            if (willCreate) {
                // Proceed with adding product if confirmed
                const now = new Date().toISOString().split('.')[0];
                let ma = $scope.generateRandomCode(5, 12);

                let formData = new FormData();
                formData.append("ten", $scope.form.ten);
                formData.append("ma", ma);
                formData.append("xuatXu", $scope.form.xuatXu);
                formData.append("moTa", $scope.form.moTa);
                formData.append("gia", $scope.form.gia);
                formData.append("idDanhMuc", $scope.form.idDanhMuc);
                formData.append("idThuongHieu", $scope.form.idThuongHieu);
                formData.append("idChatLieu", $scope.form.idChatLieu);
                formData.append("trangThai", 1);
                formData.append("ngayTao", now);
                formData.append("ngayCapNhat", now);
                formData.append("nguoiTao", 1);
                formData.append("nguoiCapNhat", 1);

                if ($scope.form.anh) {
                    formData.append("file", $scope.form.anh);
                }

                $http.post("/san-pham", formData, {
                    headers: { 'Content-Type': undefined }
                }).then(response => {
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

                            const addDetailsPromises = sanPhamChiTietList.map(detail => $http.post("/spct", detail));
                            addDetailsPromises.push($scope.uploadImages(createdSanPham.id));

                            Promise.all(addDetailsPromises).then(() => {
                                $scope.initialize();
                                $scope.reset();
                            }).catch(error => {
                                console.error("Lỗi khi thêm chi tiết sản phẩm:", error);
                            });
                        } else {
                            console.error("Không thể tìm thấy sản phẩm vừa tạo.");
                        }
                    }).catch(error => {
                        console.error("Lỗi khi lấy sản phẩm mới nhất:", error);
                    });

                    swal("Thành công!", "Sản phẩm và chi tiết sản phẩm đã được thêm thành công", "success");
                }).catch(error => {
                    console.error("Có lỗi khi thêm sản phẩm", error);
                    $scope.errorMessage = "Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.";
                    swal("Lỗi!", "Lỗi khi thêm chi tiết sản phẩm hoặc hình ảnh", "error");
                });
            } else {
                // Operation canceled by user
                swal("Hủy bỏ", "Sản phẩm chưa được thêm.", "info");
            }
        });
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

    $scope.clearImagePreview = function () {
        // Reset file input by setting its value to null
        const input = document.getElementById('profileImage3');
        if (input) {
            input.value = null;
        }
        const input2 = document.getElementById('anh');
        if (input2) {
            input2.value = null;
        }
        // Clear the preview container
        const previewContainer = document.getElementById('previewContainer');
        if (previewContainer) {
            previewContainer.innerHTML = '';
        }

        // Clear any image data in the AngularJS model
        $scope.form.anh = null;
        $scope.errorMessage = "";
    };

    $scope.validateFields = function () {
        let isValid = true;
        $scope.errorMessages = {};

        if (!$scope.form.ten || $scope.form.ten.length < 5 || $scope.form.ten.length > 300) {
            $scope.errorMessages.ten = "Tên sản phẩm phải có từ 5 đến 300 ký tự.";
            isValid = false;
        }

        if (!$scope.form.moTa || $scope.form.moTa.length < 5 || $scope.form.moTa.length > 300) {
            $scope.errorMessages.moTa = "Mô tả phải có từ 5 đến 300 ký tự.";
            isValid = false;
        }

        if (!$scope.form.gia || $scope.form.gia < 100000 || $scope.form.gia > 100000000) {
            $scope.errorMessages.gia = "Giá phải lớn hơn 100,000 và nhỏ hơn 100,000,000.";
            isValid = false;
        }

        if (!$scope.form.idDanhMuc) {
            $scope.errorMessages.idDanhMuc = "Vui lòng chọn danh mục.";
            isValid = false;
        }

        if (!$scope.form.idThuongHieu) {
            $scope.errorMessages.idThuongHieu = "Vui lòng chọn thương hiệu.";
            isValid = false;
        }

        if (!$scope.form.idChatLieu) {
            $scope.errorMessages.idChatLieu = "Vui lòng chọn chất liệu.";
            isValid = false;
        }

        if (!$scope.form.anh) {
            $scope.errorMessages.anh = "Vui lòng chọn một file ảnh.";
            isValid = false;
        }

        return isValid;
    };
});
