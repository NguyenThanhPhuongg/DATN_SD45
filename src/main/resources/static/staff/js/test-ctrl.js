app.controller('test-ctrl', function ($scope, $http) {
    $scope.items = []; // Danh sách danh mục
    $scope.formAdd = {}; // Biến lưu thông tin khi thêm danh mục
    $scope.formEdit = {}; // Biến lưu thông tin khi chỉnh sửa danh mục
    $scope.danhMucRoot = []; // Danh mục gốc (danh mục cha cấp 1)
    $scope.danhMucChildren = []; // Danh mục con của danh mục cha đang chọn
    $scope.danhMucConCon = []; // Danh mục con của danh mục con
    $scope.danhMucConConCon = []; // Danh mục con của danh mục con của danh mục con

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    const headers = {
        headers: {Authorization: `Bearer ${token}`}
    };

    // Load danh sách danh mục từ server
    $scope.load = function () {
        $http.get('/rest/danhmuc', headers).then((resp) => {
            $scope.items = resp.data.data;
            $scope.danhMucRoot = $scope.items.filter(dm => !dm.idCha); // Lọc danh mục cha cấp 1
            $scope.danhMucChildren = []; // Reset danh mục con
            $scope.danhMucConCon = []; // Reset danh mục con con
            $scope.danhMucConConCon = []; // Reset danh mục con con con
        }).catch((err) => {
            console.error(err);
            alert('Lỗi khi tải danh mục!');
        });
    };

    // Lấy các danh mục con của một danh mục
    $scope.loadDanhMucCon = function (idCha, level) {
        const danhMucCha = $scope.items.filter(dm => dm.idCha === Number(idCha));

        if (level === 1) {
            $scope.danhMucChildren = danhMucCha;
            $scope.danhMucConCon = []; // Reset cấp 3
            $scope.danhMucConConCon = []; // Reset cấp 4
        } else if (level === 2) {
            $scope.danhMucConCon = danhMucCha;
            $scope.danhMucConConCon = []; // Reset cấp 4
        } else if (level === 3) {
            $scope.danhMucConConCon = danhMucCha;
        }
    };

    // Thêm danh mục mới
    $scope.create = function () {
        const item = angular.copy($scope.formAdd);
        item.idCha = $scope.selectedDanhMucConConCon || $scope.selectedDanhMucCon || $scope.selectedDanhMucCha; // Gán idCha tương ứng
        item.trangThai = 1; // Mặc định trạng thái là hoạt động

        $http.post('/rest/danhmuc', item, headers).then((resp) => {
            $scope.items.push(resp.data.data); // Thêm vào danh sách
            $scope.resetFormAdd(); // Reset form
            $scope.load(); // Reload danh sách
            alert('Thêm mới thành công!');
        }).catch((err) => {
            console.error(err);
            alert('Thêm mới thất bại!');
        });
    };

    // $scope.edit = function (id) {
    //     const danhMuc = $scope.items.find(item => item.id === id);
    //     $scope.formEdit = angular.copy(danhMuc);
    // };
    //
    // // Cập nhật danh mục
    // $scope.update = function () {
    //     const updatedDanhMuc = angular.copy($scope.formEdit);
    //     updatedDanhMuc.idCha = $scope.selectedDanhMucConConCon || $scope.selectedDanhMucCon || $scope.selectedDanhMucCha; // Gán idCha tương ứng
    //
    //     $http.put('/rest/danhmuc/' + updatedDanhMuc.id, updatedDanhMuc, headers).then((resp) => {
    //         alert('Cập nhật danh mục thành công');
    //         $scope.load(); // Reload lại danh sách danh mục
    //         $('#editModal').modal('hide'); // Đóng modal
    //     }).catch((err) => {
    //         console.error(err);
    //         alert('Lỗi khi cập nhật danh mục!');
    //     });
    // };
    //
    // // Reset form edit
    // $scope.resetFormEdit = function () {
    //     $scope.formEdit = {};
    //     $scope.selectedDanhMucCha = '';
    //     $scope.selectedDanhMucCon = '';
    //     $scope.selectedDanhMucConCon = '';
    //     $scope.selectedDanhMucConConCon = '';
    // };

    // Reset form thêm danh mục
    $scope.resetFormAdd = function () {
        $scope.formAdd = {
            ten: '',
            moTa: '',
            idCha: '',
        };
    };

    $scope.getTenDanhMuc = function (idCha) {
        const danhMucCha = $scope.items.find(item => item.id === idCha);
        return danhMucCha ? danhMucCha.ten : 'Không có danh mục cha'; // Trả về tên danh mục hoặc 'Không có danh mục cha' nếu không tìm thấy
    };

    // Chỉnh sửa danh mục
    // Phương thức edit
    $scope.edit = function (id) {
        const item = $scope.items.find(item => item.id === id);
        if (item) {
            $scope.formEdit = angular.copy(item);

            // Gán selectedDanhMucCha là idCha của danh mục con
            $scope.selectedDanhMucCha = item.idCha;

            // Load danh mục con dựa trên selectedDanhMucCha
            if ($scope.selectedDanhMucCha) {
                $scope.loadDanhMucCon($scope.selectedDanhMucCha, 1);  // Tải danh mục con cấp 1
            }

            // Nếu có danh mục con, gán selectedDanhMucCon là id của danh mục con hiện tại
            if ($scope.formEdit.idCha) {
                $scope.selectedDanhMucCon = item.idCha;  // Chọn đúng danh mục con
            }
        }
    };

    // Cập nhật danh mục
    $scope.update = function () {
        const item = angular.copy($scope.formEdit);
        item.idCha = $scope.selectedDanhMucConConCon || $scope.selectedDanhMucCon || $scope.selectedDanhMucCha; // Gán idCha tương ứng

        $http.put('/rest/danhmuc/' + item.id, item, headers).then((resp) => {
            // Cập nhật vào danh sách sau khi update thành công
            const index = $scope.items.findIndex(dm => dm.id === item.id);
            if (index !== -1) {
                $scope.items[index] = resp.data.data; // Cập nhật danh mục mới
            }
            alert('Cập nhật thành công!');
            $scope.load(); // Reload danh sách
            $scope.resetFormEdit(); // Reset form chỉnh sửa
        }).catch((err) => {
            console.error(err);
            alert('Cập nhật thất bại!');
        });
    };

    // Reset form chỉnh sửa
    $scope.resetFormEdit = function () {
        $scope.formEdit = {
            ten: '',
            moTa: '',
            idCha: '',
        };
    };


    // Khởi chạy
    $scope.load();
});
