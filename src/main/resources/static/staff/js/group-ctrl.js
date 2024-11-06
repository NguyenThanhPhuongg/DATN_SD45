app.controller('group-ctrl', function ($scope, $http) {

    // Khai báo pager cho phân trang
    $scope.pager = {
        page: 1,
        size: 20,
        count: 1,  // Tổng số trang
        totalRecord: 0,  // Tổng số bản ghi
        first: function() {
            $scope.pager.page = 1;
            $scope.loadData();
        },
        prev: function() {
            if ($scope.pager.page > 1) {
                $scope.pager.page--;
                $scope.loadData();
            }
        },
        next: function() {
            if ($scope.pager.page < $scope.pager.count) {
                $scope.pager.page++;
                $scope.loadData();
            }
        },
        last: function() {
            $scope.pager.page = $scope.pager.count;
            $scope.loadData();
        }
    };

    // Biến lưu trữ giá trị tìm kiếm
    $scope.searchText = '';

    // Hàm tải dữ liệu nhóm quyền và phân trang
    $scope.loadData = function() {
        const model = {
            page: $scope.pager.page,
            size: $scope.pager.size,
            keyword: $scope.searchText  // Tìm kiếm theo từ khóa
        };

        // Gọi API tải dữ liệu nhóm quyền
        $http.post('/groups/list_page', model).then(function(response) {
            if (response.data.code === '200') {
                $scope.groups = response.data.data;  // Danh sách nhóm quyền
                $scope.pager.count = response.data.totalPage;  // Tổng số trang
                $scope.pager.totalRecord = response.data.totalRecord;  // Tổng số bản ghi
            } else {
                console.error("Lỗi khi tải dữ liệu nhóm quyền");
            }
        }, function(error) {
            console.error("Lỗi khi gọi API:", error);
        });
    };

    // Hàm tìm kiếm và tải lại dữ liệu
    $scope.search = function() {
        $scope.pager.page = 1;  // Reset về trang đầu khi tìm kiếm
        $scope.loadData();
    };

    // Gọi loadData khi trang được tải
    $scope.loadData();

    // Biến để lưu trữ thông tin nhóm quyền
    $scope.newGroupName = '';  // Tên nhóm quyền mới
    $scope.newGroupDesc = '';  // Mô tả nhóm quyền
    $scope.functions = [];  // Danh sách chức năng
    $scope.allUsers = [];  // Danh sách tất cả người dùng
    $scope.selectedUsers = [];  // Danh sách người dùng đã chọn trong nhóm

    // Lấy danh sách chức năng từ API
    $scope.loadFunctions = function() {
        $http.get('/function/list').then(function(response) {
            if (response.data.code === '200') {
                $scope.functions = response.data.data;  // Lưu vào biến functions
            } else {
                console.error("Lỗi khi tải danh sách chức năng");
            }
        }, function(error) {
            console.error("Lỗi khi gọi API chức năng:", error);
        });
    };

    // Lấy danh sách người dùng từ API
    $scope.loadUsers = function() {
        $http.get('/user/list').then(function(response) {
            if (response.data.code === '200') {
                $scope.allUsers = response.data.data;  // Lưu vào biến allUsers
            } else {
                console.error("Lỗi khi tải danh sách người dùng");
            }
        }, function(error) {
            console.error("Lỗi khi gọi API người dùng:", error);
        });
    };

    // Di chuyển người dùng từ "Danh sách người dùng" sang "Người dùng trong nhóm"
    $scope.moveUserToGroup = function(user) {
        if (user.selected) {
            $scope.selectedUsers.push(user);
            const index = $scope.allUsers.indexOf(user);
            if (index > -1) {
                $scope.allUsers.splice(index, 1);
            }
        }
    };

    // Di chuyển người dùng từ "Người dùng trong nhóm" về lại "Danh sách người dùng"
    $scope.moveUserBackToList = function(user) {
        if (!user.selected) {
            $scope.allUsers.push(user);
            const index = $scope.selectedUsers.indexOf(user);
            if (index > -1) {
                $scope.selectedUsers.splice(index, 1);
            }
        }
    };

    // Di chuyển tất cả người dùng vào nhóm
    $scope.moveAllUsersToGroup = function() {
        angular.forEach($scope.allUsers, function(user) {
            $scope.selectedUsers.push(user);
        });
        $scope.allUsers = [];
    };

    // Di chuyển tất cả người dùng ra khỏi nhóm
    $scope.moveAllUsersBackToList = function() {
        angular.forEach($scope.selectedUsers, function(user) {
            $scope.allUsers.push(user);
        });
        $scope.selectedUsers = [];
    };

    // Lưu nhóm quyền mới (thêm hoặc chỉnh sửa)
    $scope.saveGroup = function() {
        const groupData = {
            ten: $scope.newGroupName,  // Tên nhóm quyền
            moTa: $scope.newGroupDesc,  // Mô tả nhóm quyền
            chucNangId: $scope.functions.filter(function(f) { return f.selected; }).map(function(f) { return f.id; }),  // Lọc các chức năng đã chọn
            userId: $scope.selectedUsers.map(function(user) { return user.id; })  // Lấy ID của người dùng trong nhóm
        };

        // Kiểm tra xem đây là hành động thêm mới hay chỉnh sửa
        let apiUrl = '/groups'; // API thêm mới nhóm quyền
        let method = 'POST'; // Mặc định là POST (thêm mới)

        // Nếu đang chỉnh sửa, thay đổi API URL và phương thức
        if ($scope.isEdit) {
            apiUrl = '/groups/' + $scope.selectedGroup.id;
            method = 'PUT'; // Phương thức PUT để cập nhật
        }

        // Gửi yêu cầu API
        $http({
            method: method,
            url: apiUrl,
            data: groupData
        }).then(function(response) {
            if (response.data.code === '200') {
                alert($scope.isEdit ? 'Nhóm quyền đã được cập nhật thành công!' : 'Nhóm quyền đã được tạo thành công!');
                $('#addModal').modal('hide');
                $scope.loadData();
                // Reset form
                $scope.resetForm();
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        }, function(error) {
            console.error('Lỗi khi lưu nhóm quyền:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        });
    };

    // Hàm reset form
    $scope.resetForm = function() {
        $scope.newGroupName = '';
        $scope.newGroupDesc = '';
        $scope.selectedUsers = [];
        angular.forEach($scope.functions, function(func) {
            func.selected = false;
        });
        $scope.isEdit = false;  // Đặt trạng thái không phải chỉnh sửa
        $scope.groupId = null;   // Reset ID nhóm
    };

    $scope.editGroup = function(group) {
        console.log("group: ", group);  // Kiểm tra đối tượng nhóm quyền

        // Đánh dấu là chế độ chỉnh sửa
        $scope.isEdit = true;
        $scope.selectedGroup = angular.copy(group);  // Sao chép dữ liệu nhóm quyền cần chỉnh sửa vào scope
        console.log("selectedGroup after copy: ", $scope.selectedGroup);

        // Cập nhật tên nhóm và mô tả vào các trường trong modal
        $scope.newGroupName = $scope.selectedGroup.ten;
        $scope.newGroupDesc = $scope.selectedGroup.moTa;

        // Reset danh sách người dùng đã chọn và người dùng chưa có trong nhóm
        $scope.selectedUsers = [];
        $scope.allUsers.forEach(function(user) {
            user.selected = false;  // Đánh dấu lại tất cả người dùng chưa chọn
        });

        // Cập nhật danh sách người dùng đã chọn
        $scope.selectedGroup.listNguoiDungModel.forEach(function(user) {
            // Thêm người dùng vào danh sách selectedUsers
            $scope.selectedUsers.push(user);

            // Tìm người dùng trong danh sách allUsers
            const index = $scope.allUsers.findIndex(function(u) {
                return u.id === user.id;
            });

            if (index > -1) {
                // Loại bỏ người dùng khỏi allUsers
                $scope.allUsers.splice(index, 1);
            }
        });

        console.log("selectedUsers after update: ", $scope.selectedUsers);
        console.log("allUsers after update: ", $scope.allUsers);

        // Cập nhật lại các chức năng đã chọn (checkbox)
        $scope.functions.forEach(function(func) {
            // Kiểm tra xem chức năng có trong selectedGroup.idChucNang không
            func.selected = $scope.selectedGroup.idChucNang.includes(func.id); // Kiểm tra xem chức năng có trong nhóm không
        });

        console.log("functions after update (checkbox state): ", $scope.functions);

        // Mở modal
        $('#addModal').modal('show');
    };



    // Xác nhận trước khi khóa nhóm quyền
    $scope.confirmLock = function(itemId) {
        var confirmAction = confirm('Bạn có chắc chắn muốn khóa nhóm này?');
        if (confirmAction) {
            $scope.lockItem(itemId);
        }
    };

    // Khóa nhóm quyền
    $scope.lockItem = function(itemId) {
        $http.put('/groups/change-status/' + itemId).then(function(response) {
            if (response.data.code === '200') {
                alert('Nhóm đã được khóa thành công!');
                $scope.loadData();
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        }, function(error) {
            console.error('Lỗi khi khóa nhóm:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        });
    };

    // Tải danh sách chức năng và người dùng khi controller được khởi tạo
    $scope.loadFunctions();
    $scope.loadUsers();
});
