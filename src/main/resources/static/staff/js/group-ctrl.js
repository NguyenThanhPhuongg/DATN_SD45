app.controller('group-ctrl', function ($scope, $http) {
    $scope.pager = {
        page: 1,
        size: 20,
        count: 1,  // Sử dụng giá trị trả về từ API để xác định tổng số trang
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

    $scope.searchText = ''; // Biến để lưu giá trị tìm kiếm

    // Hàm gọi API để tải dữ liệu theo điều kiện tìm kiếm và phân trang
    $scope.loadData = function() {
        const model = {
            page: $scope.pager.page,
            size: $scope.pager.size,
            keyword: $scope.searchText // Thêm tham số tìm kiếm vào request
        };

        $http.post('/groups/list_page', model).then(function(response) {
            // Giả sử response chứa dữ liệu nhóm quyền và số trang
            $scope.groups = response.data.data;  // Danh sách nhóm quyền
            $scope.pager.count = response.data.totalPage;  // Tổng số trang
            $scope.pager.totalRecord = response.data.totalRecord;  // Tổng số bản ghi
        }, function(error) {
            console.error("Error fetching data:", error);
        });
    };

    // Gọi hàm loadData khi người dùng nhập tìm kiếm
    $scope.search = function() {
        $scope.pager.page = 1;  // Reset về trang đầu khi tìm kiếm
        $scope.loadData();
    };

    // Load dữ liệu ban đầu
    $scope.loadData();

    $scope.newGroupName = '';  // Tên nhóm quyền mới
    $scope.newGroupDesc = '';  // Mô tả nhóm quyền
    $scope.functions = [];  // Danh sách chức năng
    $scope.allUsers = [];  // Danh sách tất cả người dùng
    $scope.selectedUsers = [];  // Danh sách người dùng trong nhóm

    // Lấy danh sách chức năng từ API
    $scope.loadFunctions = function() {
        $http.get('/function/list').then(function(response) {
            if (response.data.code === '200') {
                $scope.functions = response.data.data;  // Lưu vào biến functions
            }
        }, function(error) {
            console.error('Error fetching functions:', error);
        });
    };

    // Lấy danh sách người dùng từ API
    $scope.loadUsers = function() {
        // Giả sử có một API để lấy tất cả người dùng
        $http.get('/user/list').then(function(response) {
            if (response.data.code === '200') {
                $scope.allUsers = response.data.data;  // Lưu vào biến allUsers
            }
        }, function(error) {
            console.error('Error fetching users:', error);
        });
    };

    // Hàm di chuyển người dùng từ "Danh sách người dùng" sang "Người dùng trong nhóm"
    $scope.moveUserToGroup = function(user) {
        if (user.selected) {
            // Di chuyển người dùng vào danh sách "Người dùng trong nhóm"
            $scope.selectedUsers.push(user);
            // Xóa khỏi danh sách "Danh sách người dùng"
            const index = $scope.allUsers.indexOf(user);
            if (index > -1) {
                $scope.allUsers.splice(index, 1);
            }
        }
    };

    // Hàm di chuyển người dùng từ "Người dùng trong nhóm" về lại "Danh sách người dùng"
    $scope.moveUserBackToList = function(user) {
        if (!user.selected) {
            // Di chuyển người dùng về lại danh sách "Danh sách người dùng"
            $scope.allUsers.push(user);
            // Xóa khỏi danh sách "Người dùng trong nhóm"
            const index = $scope.selectedUsers.indexOf(user);
            if (index > -1) {
                $scope.selectedUsers.splice(index, 1);
            }
        }
    };

    $scope.moveAllUsersToGroup = function() {
        console.log("Di chuyển tất cả người dùng sang nhóm");  // Log để kiểm tra
        angular.forEach($scope.allUsers, function(user) {
            $scope.selectedUsers.push(user);  // Thêm người dùng vào "Người dùng trong nhóm"
        });
        $scope.allUsers = [];  // Xóa tất cả người dùng khỏi "Danh sách người dùng"
    };

    $scope.moveAllUsersBackToList = function() {
        console.log("Di chuyển tất cả người dùng về lại danh sách người dùng");  // Log để kiểm tra
        angular.forEach($scope.selectedUsers, function(user) {
            $scope.allUsers.push(user);  // Thêm người dùng vào "Danh sách người dùng"
        });
        $scope.selectedUsers = [];  // Xóa tất cả người dùng khỏi "Người dùng trong nhóm"
    };


    // Hàm lưu nhóm quyền mới
    $scope.saveGroup = function() {
        // Tạo đối tượng dữ liệu để gửi tới backend
        const groupData = {
            ten: $scope.newGroupName,  // Tên nhóm quyền
            moTa: $scope.newGroupDesc,  // Mô tả nhóm quyền
            chucNangId: $scope.functions.filter(function(f) { return f.selected; }).map(function(f) { return f.id; }),  // Lọc các chức năng đã chọn và lấy ID
            userId: $scope.selectedUsers.map(function(user) { return user.id; })  // Lấy ID người dùng trong nhóm
        };

        // Gọi API POST để lưu nhóm quyền mới
        $http.post('/groups', groupData).then(function(response) {
            if (response.data.code === '200') {
                alert('Nhóm quyền đã được tạo thành công!');
                // Đóng modal
                $('#addModal').modal('hide');
                //Load lại danh sach nhóm
                $scope.loadData();

                // Reset form
                $scope.newGroupName = '';
                $scope.newGroupDesc = '';
                $scope.selectedUsers = [];
                angular.forEach($scope.functions, function(func) {
                    func.selected = false;  // Reset các checkbox chức năng
                });
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        }, function(error) {
            console.error('Error saving group:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        });
    };
    // Gọi ngay khi controller được khởi tạo
    $scope.loadFunctions();
    $scope.loadUsers();

    // Hàm xác nhận trước khi khóa
    $scope.confirmLock = function(itemId) {
        // Hiển thị hộp thoại xác nhận
        var confirmAction = confirm('Bạn có chắc chắn muốn khóa nhóm này?');

        if (confirmAction) {
            // Nếu người dùng xác nhận, gọi API để khóa
            $scope.lockItem(itemId);
        }
    };

    // Hàm gọi API để khóa
    $scope.lockItem = function(itemId) {
        $http.put('/groups/change-status/' + itemId).then(function(response) {
            if (response.data.code === '200') {
                alert('Nhóm đã được khóa thành công!');
                // Cập nhật lại danh sách sau khi khóa
                $scope.loadData();
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        }, function(error) {
            console.error('Lỗi khi gọi API khóa:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        });
    };


});


