app.controller("hinhanh-ctrl", function ($scope, $rootScope, $http) {
    $scope.items = [];
    $scope.form = {};

    $scope.selectedImagesId = null; // Lấy ID sản phẩm từ rootScope
    $scope.selectedImagesTen = null;
    $scope.selectedImagesId = $rootScope.selectedImagesId; // Lấy ID sản phẩm từ rootScope
    $scope.selectedImagesTen = $rootScope.selectedImagesTen;

    $scope.pager = {
        page: 0, size: 10, items: [], count: 0, first: function () {
            this.page = 0;
            this.updateItems();
        }, prev: function () {
            if (this.page > 0) {
                this.page--;
                this.updateItems();
            }
        }, next: function () {
            if (this.page < this.count - 1) {
                this.page++;
                this.updateItems();
            }
        }, last: function () {
            this.page = this.count - 1;
            this.updateItems();
        }, updateItems: function () {
            const filteredItems = $scope.items.filter(item => {
                const statusMatches = item.idSanPham === $scope.selectedImagesId;
                return statusMatches;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };


    $scope.initialize = function () {
        $http.get("/hinh-anh").then(resp => {
            $scope.items = resp.data.map(item => ({
                ...item,
            }));
            $scope.pager.updateItems();
        }).catch(error => console.error("Lỗi khi tải danh mục: ", error));
    };


    $scope.showImageModal = function (item) {
        $scope.selectedImage = item;  // Lưu ảnh đã chọn
        $scope.isImageModalVisible = true; // Hiển thị modal
    };

    // Hàm để đóng modal khi nhấn ra ngoài ảnh
    $scope.closeImageModal = function () {
        $scope.isImageModalVisible = false;
    };

    $scope.updateStatus2 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn khóa hình ảnh này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                // Gửi PUT request với status = 2 để khóa hình ảnh
                $http.put('/hinh-anh/' + item.id + '/status?status=2')
                    .then(function (response) {
                        // Tải lại dữ liệu sau khi cập nhật thành công
                        $scope.initialize();
                        swal("Success!", "Khóa hình ảnh thành công", "success");
                    }).catch(function (error) {
                    console.error("Cập nhật thất bại", error);
                    swal("Error!", "Khóa hình ảnh thất bại", "error");
                });
            } else {
                swal("Hủy cập nhật", "Khóa hình ảnh đã bị hủy", "error");
            }
        });
    };

    $scope.updateStatus1 = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn khóa hình ảnh này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                $http.put('/hinh-anh/' + item.id + '/status?status=1')
                    .then(function (response) {
                        // Tải lại dữ liệu sau khi cập nhật thành công
                        $scope.initialize();
                        swal("Success!", "Khóa hình ảnh thành công", "success");
                    }).catch(function (error) {
                    console.error("Cập nhật thất bại", error);
                    swal("Error!", "Khóa hình ảnh thất bại", "error");
                });
            } else {
                swal("Hủy cập nhật", "Khóa hình ảnh đã bị hủy", "error");
            }
        });
    };

    $scope.deleteImage = function (item) {
        swal({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa hình ảnh này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // Gửi DELETE request để xóa hình ảnh
                $http.delete('/hinh-anh/' + item.id)
                    .then(function (response) {
                        // Tải lại danh sách sau khi xóa thành công
                        $scope.initialize();
                        swal("Success!", "Xóa hình ảnh thành công", "success");
                    }).catch(function (error) {
                    console.error("Xóa hình ảnh thất bại", error);
                    swal("Error!", "Xóa hình ảnh thất bại", "error");
                });
            } else {
                swal("Hủy xóa", "Xóa hình ảnh đã bị hủy", "error");
            }
        });
    };

    $scope.uploadImages = function () {
        const input = document.getElementById('profileImage3');
        const files = input.files;

        if (files.length > 0) {
            // Hiển thị thông báo xác nhận trước khi tải ảnh lên
            swal({
                title: "Xác nhận",
                text: "Bạn có chắc muốn tải lên ảnh sản phẩm này?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willUpload) => {
                if (willUpload) {
                    const formData = new FormData();

                    // Thêm idSanPham vào formData
                    formData.append("idSanPham", $scope.selectedImagesId); // Thêm idSanPham vào formData

                    Array.from(files).forEach(file => {
                        formData.append("images", file); // Thêm từng file vào formData
                    });

                    // Gửi POST request để tải ảnh lên
                    return $http.post("/hinh-anh", formData, {
                        headers: { 'Content-Type': undefined }
                    }).then(resp => {
                        $scope.initialize();
                        $scope.clearImagePreview();  // Xóa hết các file trong input sau khi upload thành công
                        // Cập nhật thông tin đường dẫn hình ảnh cho sản phẩm
                        document.getElementById("imagePath3").value = resp.data.filePath;  // Hiển thị đường dẫn ở input
                        $('#addModal').modal('hide');

                        // Hiển thị thông báo thành công
                        swal("Thành công!", "Ảnh đã được tải lên thành công.", "success");
                    }).catch(error => {
                        console.error("Lỗi khi tải lên ảnh:", error);
                        swal("Lỗi!", "Có lỗi khi tải ảnh lên. Vui lòng thử lại.", "error");
                    });
                } else {
                    // Nếu người dùng hủy, thông báo đã hủy
                    swal("Hủy tải ảnh", "Tải ảnh đã bị hủy.", "error");
                }
            });
        } else {
            // Nếu không có file nào được chọn
            swal("Lỗi!", "Vui lòng chọn ảnh sản phẩm.", "error");
        }
    };

    $scope.clearImagePreview = function () {
        selectedFiles = [];  // Xóa danh sách các file đã chọn

        // Reset file input bằng cách đặt giá trị của nó thành null
        const input = document.getElementById('profileImage3');
        if (input) {
            input.value = null;  // Xóa tệp đã chọn
        }

        // Làm sạch preview container nếu có
        const previewContainer = document.getElementById('previewContainer');
        if (previewContainer) {
            previewContainer.innerHTML = '';  // Xóa preview ảnh
        }

        // Reset các dữ liệu trong AngularJS model
        $scope.form.anh = null;  // Xóa dữ liệu ảnh trong model
        $scope.form = {};  // Đặt lại form về trạng thái ban đầu
    };


    $scope.initialize();
});
