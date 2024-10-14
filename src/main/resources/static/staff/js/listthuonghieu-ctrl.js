app.controller("listthuonghieu-ctrl", function ($scope, $http, $timeout) {
    $scope.items = [];
    $scope.form = {};

    // Hàm khởi tạo
    $scope.initialize = function () {
        // Tải danh sách thương hiệu
        $http.get("/rest/thuonghieu").then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.ngayTao = new Date(item.ngayTao); // Đổi tên trường nếu cần
            });
            // Khởi tạo DataTable sau khi tải dữ liệu
            initializeDataTable();
        }).catch(error => {
            console.log("Error loading thuong hieu: ", error);
        });
    };

    // Khởi tạo DataTable
    function initializeDataTable() {
        // Sử dụng $timeout để đảm bảo DOM đã được cập nhật
        $timeout(() => {
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        });
    }

    // Khởi tạo
    $scope.initialize();

    // Xóa form
    $scope.reset = function () {
        $scope.form = {
            ngayTao: new Date(),
            trangThai: 1, // Mặc định trạng thái
            nguoiTao: 'Admin' // Giả sử người tạo là 'Admin', có thể thay đổi nếu cần
        };
    };

    // Hiển thị lên form
    $scope.edit = function (item) {
        $scope.form = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show');
    };

    // Thêm thương hiệu
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post(`/rest/thuonghieu`, item).then(resp => {
            resp.data.ngayTao = new Date(resp.data.ngayTao);
            $scope.items.push(resp.data);
            $scope.reset();
            initializeDataTable(); // Khởi tạo lại DataTable
            swal("Success!", "Thêm mới thành công", "success");
        }).catch(error => {
            swal("Error!", "Thêm mới thất bại", "error");
            console.log("Error: ", error);
        });
    };

    // Cập nhật thương hiệu
    $scope.update = function () {
        var item = angular.copy($scope.form);
        $http.put(`/rest/thuonghieu/${item.id}`, item).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items[index] = item;
            initializeDataTable(); // Khởi tạo lại DataTable
            swal("Success!", "Cập nhật thành công", "success");
        }).catch(error => {
            swal("Error!", "Cập nhật thất bại", "error");
            console.log("Error: ", error);
        });
    };

    // Xóa thương hiệu
    $scope.delete = function (item) {
        $http.delete(`/rest/thuonghieu/${item.id}`).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items.splice(index, 1);
            $scope.reset();
            initializeDataTable(); // Khởi tạo lại DataTable
            swal("Success!", "Xóa thành công", "success");
        }).catch(error => {
            swal("Error!", "Xóa thất bại", "error");
            console.log("Error: ", error);
        });
    };

    // Khởi tạo form
    $scope.reset();
});
