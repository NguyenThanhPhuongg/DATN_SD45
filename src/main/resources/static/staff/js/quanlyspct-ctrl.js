app.controller("quanlyspct-ctrl", function ($scope, $http, $rootScope, $location) {
    $scope.items = [];
    $scope.form = {};
    $scope.selectedProduct = {}; // Đối tượng lưu thông tin sản phẩm đã chọn
    $scope.filters = {};
    $scope.error = {};
    $scope.size = [];
    $scope.mausac = [];
    $scope.searchText = '';

    $scope.pager = {
        page: 0, size: 5, items: [], count: 0, first: function () {
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
                const matchesSearch = item.id.toString().toLowerCase().includes($scope.searchText.toLowerCase()) || item.ten.toLowerCase().includes($scope.searchText.toLowerCase());
                return matchesSearch;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    $scope.initialize = function () {
        $http.get("/spct").then(resp => {
            $scope.items = resp.data.data.map(item => ({
                ...item, ngayTao: new Date(item.ngayTao), ngayCapNhat: new Date(item.ngayCapNhat)
            }));
            $scope.pager.updateItems();
        }).catch(error => console.error("Lỗi khi tải danh mục: ", error));

        $http.get("/size/get-list").then(resp => {
            $scope.size = resp.data.data;
        });
        $http.get("/mau-sac/get-list").then(resp => {
            $scope.mausac = resp.data.data;
        });
    };


    $scope.edit = function (item) {
        item.ngayCapNhat = new Date(item.ngayCapNhat);
        $scope.form = angular.copy(item);
    };

    // Gọi hàm initialize khi controller được khởi tạo
    $scope.initialize();
});
