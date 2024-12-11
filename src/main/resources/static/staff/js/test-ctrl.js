app.controller('test-ctrl', function ($scope, $http) {
    $scope.danhMucList = [];

    // Gọi API để lấy danh mục
    $scope.loadDanhMuc = function () {
        $http.get("/rest/danhmuc/get-children")
            .then(function (response) {
                $scope.danhMucList = response.data.data; // Dữ liệu trả về
            })
            .catch(function (error) {
                console.error("Lỗi khi gọi API:", error);
            });
    };

    // Gọi hàm để tải danh mục
    $scope.loadDanhMuc();
});
