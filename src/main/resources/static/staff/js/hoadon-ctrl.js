app.controller("hoadon-ctrl", function ($scope, $http, $location) {
    $scope.hoaDons = [];
    $scope.trangThai = 0; // Giá trị mặc định, cập nhật từ URL nếu có
    $scope.form = {};
    $scope.hoaDonChiTiets = []; // Mảng chứa danh sách hóa đơn chi tiết

    $scope.pager = {
        page: 0,
        size: 5, // Giá trị mặc định
        hoaDons: [],
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


    $scope.edit0 = function (item) {
        // Chuyển timestamp thành Date object
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        item.ngayTao = new Date(item.ngayTao);
        $scope.form = angular.copy(item);
    };

    $scope.getHoaDonChiTietById = function (idHoaDon) {
        $http.get('/hoa-don-chi-tiet/get-id-hoa-don', { params: { idHoaDon: idHoaDon } })
            .then(response => {
                $scope.hoaDonChiTiets = response.data.data; // Gán danh sách hóa đơn chi tiết
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách hóa đơn chi tiết:", error);
            });
    };

    $scope.getTotalQuantity = function() {
        return $scope.hoaDonChiTiets.reduce(function(total, detail) {
            return total + detail.soLuong; // Cộng dồn số lượng
        }, 0);
    };


    $scope.getTitleByTrangThai = function (trangThai) {
        switch (trangThai) {
            case 0: return "chờ xác nhận";
            case 2: return "chờ giao hàng";
            case 3: return "đang vận chuyển";
            case 4: return "hoàn thành";
            case 5: return "đã hủy";
            default: return "không xác định";
        }
    };

    $scope.loadHoaDonsFromUrl = function () {
        const queryParams = $location.search();
        $scope.trangThai = parseInt(queryParams.trangThai) || 0; // Trạng thái mặc định là 0
        $scope.getHoaDonsByTrangThai($scope.trangThai);
    };

    $scope.getHoaDonsByTrangThai = function (trangThai) {
        $http.get('/rest/hoadon/get-by-status', { params: { trangThai: trangThai } })
            .then(response => {
                $scope.hoaDons = response.data.data;
                $scope.pager.updateItems();
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách hóa đơn:", error);
            });
    };

    $scope.updateHoaDonStatus = function (hoaDonId) {
        $http.put('/rest/hoadon/update-status/' + hoaDonId, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                swal("Thành công!", "Trạng thái hóa đơn đã được cập nhật.", "success");
                $scope.getHoaDonsByTrangThai($scope.trangThai); // Refresh danh sách
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật trạng thái:", error);
                swal("Lỗi!", "Không thể cập nhật trạng thái hóa đơn.", "error");
            });
    };

    $scope.updateHuyTraHoaDon = function (hoaDonId) {
        $http.put('/rest/hoadon/update-huy-tra/' + hoaDonId, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                swal("Thành công!", "Trạng thái hóa đơn đã được cập nhật.", "success");
                $scope.getHoaDonsByTrangThai($scope.trangThai); // Refresh danh sách
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật trạng thái:", error);
                swal("Lỗi!", "Không thể cập nhật trạng thái hóa đơn.", "error");
            });
    };

    // Gọi khi trang được tải
    $scope.loadHoaDonsFromUrl();


});
