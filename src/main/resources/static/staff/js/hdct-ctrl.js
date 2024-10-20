app.controller("hdct-ctrl", function ($scope, $http, $rootScope) {
    $scope.items = [];
    $scope.hoadon = [];
    $scope.spct = [];
    $scope.form = {};
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
        },
        updateItems: function () {
            const filteredItems = $scope.items.filter(item => {
                return item.idHoaDon.id === $scope.selectedHoaDonId;
            });
            this.count = Math.ceil(filteredItems.length / this.size);
            this.items = filteredItems.slice(this.page * this.size, (this.page + 1) * this.size);
        }
    };

    $scope.initialize = function () {
        $http.get("/rest/hdct").then(resp => {
            console.log("Data from API: ", resp.data);
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.ngayTao = new Date(item.ngayTao);
                item.ngayCapNhat = new Date(item.ngayCapNhat);
            });
            $scope.pager.updateItems();
        }).catch(error => {
            console.log("Error loading data: ", error);
        });

        $http.get("/rest/hoadon").then(resp => {
            $scope.hoadon = resp.data;
        });

        $http.get("/rest/spct").then(resp => {
            $scope.spct = resp.data;
        });
    };

    $scope.selectedHoaDonId = $rootScope.selectedInvoiceId; // Lấy ID từ rootScope

    // Khởi tạo
    $scope.initialize();


    // $scope.form.idHoaDon = {id: $scope.selectedHoaDonId}; // Khởi tạo form với ID đã chọn
    //
    // $scope.updateProductDetails = function () {
    //     const selectedProductId = $scope.form.idHoaDon.id;
    //     $scope.selectedHoaDonId = selectedProductId;
    //     $scope.pager.updateItems();
    // };
    //
    // $scope.$watch('form.idHoaDon.id', function (newValue, oldValue) {
    //     if (newValue !== oldValue) {
    //         $scope.updateProductDetails();
    //     }
    // });
});
