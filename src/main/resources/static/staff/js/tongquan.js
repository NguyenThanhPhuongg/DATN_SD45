app.controller("tongquan-ctrl", function ($scope, $http, $rootScope, $location) {
        $scope.todayRevenue = 0;

        $scope.getTodayRevenue = function () {
            $http.get("/rest/hoadon/doanhthu").then(response => {
                $scope.todayRevenue = response.data.data;
            }).catch(error => {
                console.error("Lỗi khi lấy doanh thu hôm nay:", error);
            });
        };

        // Gọi hàm khi trang được tải
        $scope.getTodayRevenue();

});
