app.controller('thongtinthuonghieu-ctrl', function($scope, $routeParams, MyService) {
    var id = $routeParams.id; // Lấy ID từ URL

    // Gọi API để lấy thông tin chi tiết của thương hiệu theo ID
    MyService.getDetailById(id).then(function(response) {
        $scope.form = response.data; // Gán dữ liệu lấy được vào form để hiển thị
    });

});
