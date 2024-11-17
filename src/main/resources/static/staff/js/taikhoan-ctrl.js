app.controller('taikhoan-ctrl', function ($scope, $http) {
    // Biến để lưu danh sách người dùng
    $scope.employees = [];

    // Biến cho phân trang
    $scope.pager = {
        page: 0,
        count: 0,
        itemsPerPage: 10, // Số lượng người dùng trên mỗi trang
        first: function () {
            this.page = 0;
            fetchUsers();
        },
        prev: function () {
            if (this.page > 0) {
                this.page--;
                fetchUsers();
            }
        },
        next: function () {
            if (this.page < this.count - 1) {
                this.page++;
                fetchUsers();
            }
        },
        last: function () {
            this.page = this.count - 1;
            fetchUsers();
        }
    };

    // Biến cho vai trò (khởi tạo không có giá trị)
    $scope.selectedRole = null; // Mặc định không có giá trị role

    // Hàm gọi API để lấy danh sách người dùng với vai trò và phân trang
    function fetchUsers() {
        const userQuery = {
            page: $scope.pager.page + 1,  // API mong muốn page bắt đầu từ 1
            size: $scope.pager.itemsPerPage,
            keyword: $scope.searchText || ""  // Tìm kiếm theo họ và tên
        };

        // Chỉ thêm role vào request nếu role có giá trị
        if ($scope.selectedRole) {
            userQuery.role = $scope.selectedRole;
        }

        $http.post('user/get-list', userQuery)
            .then(function (response) {
                if (response.data && response.data.data) {
                    $scope.employees = response.data.data;
                    $scope.employees.currentPage = response.data.currentPage;
                    $scope.employees.totalPage = response.data.totalPage;
                    $scope.pager.count = Math.ceil(response.data.totalCount / $scope.pager.itemsPerPage);
                    updateUsersForCurrentPage();
                }
            }).catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });
    }

    // Cập nhật danh sách người dùng cho trang hiện tại
    function updateUsersForCurrentPage() {
        const startIndex = $scope.pager.page * $scope.pager.itemsPerPage;
        const endIndex = startIndex + $scope.pager.itemsPerPage;
        $scope.currentEmployees = $scope.employees.slice(startIndex, endIndex);
    }

    // Gọi hàm fetchUsers khi controller khởi tạo
    fetchUsers();

    // Khi thay đổi vai trò, gọi lại API để lấy dữ liệu mới
    $scope.$watch('selectedRole', function() {
        $scope.pager.page = 0; // Reset về trang đầu tiên
        fetchUsers();
    });

    // Khi thay đổi từ khóa tìm kiếm, gọi lại API để lọc theo từ khóa
    $scope.$watch('searchText', function() {
        $scope.pager.page = 0; // Reset về trang đầu tiên
        fetchUsers();
    });
    $scope.newAccount = {
        role: 'USER'
    };
    // Hàm thêm tài khoản
    $scope.addAccount = function () {
        if ($scope.newAccount.password !== $scope.newAccount.retypePassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        $http.post('/register', $scope.newAccount)
            .then(function (response) {
                if (response.data && response.data.code === "200" && response.data.message === "Thành công") {
                    alert('Đăng ký thành công!');
                    fetchUsers(); // Cập nhật danh sách người dùng
                    $('#addModal').modal('hide');
                    $scope.newAccount = {}; // Reset form
                } else {
                    alert('Có lỗi xảy ra: ' + (response.data.message || 'Vui lòng kiểm tra thông tin nhập vào.'));
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
                alert('Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.');
            });
    };

    // Các hàm chi tiết, xóa người dùng
    $scope.detailUser = function (userId) {
        $http.get(`/user/${userId}`)
            .then(function (response) {
                if (response.data && response.data.code === "200") {
                    $scope.selectedUser = response.data.data;
                    $('#detailModal').modal('show');
                } else {
                    alert('Có lỗi xảy ra: ' + response.data.message);
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
                alert('Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.');
            });
    };

    // Hàm chuẩn bị modal để khóa người dùng
    $scope.prepareLockUser = function (user) {
        $scope.selectedUser = user; // Lưu thông tin người dùng cần khóa
        $scope.modalTitle = 'Xác nhận khóa người dùng';
        $scope.modalMessage = 'Bạn có chắc chắn muốn khóa người dùng này không?';
        $scope.modalConfirmButton = 'Khóa';  // Tên nút là "Khóa"
        $scope.modalAction = 'LOCKED';  // Lưu hành động sẽ thực hiện
        $('#confirmModal').modal('show'); // Mở modal xác nhận
    };

// Hàm chuẩn bị modal để mở khóa người dùng
    $scope.prepareUnlockUser = function (user) {
        $scope.selectedUser = user; // Lưu thông tin người dùng cần mở khóa
        $scope.modalTitle = 'Xác nhận mở khóa người dùng';
        $scope.modalMessage = 'Bạn có chắc chắn muốn mở khóa người dùng này không?';
        $scope.modalConfirmButton = 'Mở khóa';  // Tên nút là "Mở khóa"
        $scope.modalAction = 'ACTIVE'; // Lưu hành động sẽ thực hiện
        $('#confirmModal').modal('show'); // Mở modal xác nhận
    };


    // Hàm xác nhận hành động khóa/mở khóa
    $scope.confirmAction = function () {
        if ($scope.selectedUser && $scope.modalAction) {
            const status = $scope.modalAction;
            $http.put(`/user/change-status/${$scope.selectedUser.id}?status=${status}`).then(function (response) {
                if (response.data && response.data.code === "200") {
                    const action = (status === 'LOCKED') ? 'Khóa' : 'Mở khóa';
                    alert(`${action} người dùng thành công!`);
                    fetchUsers(); // Cập nhật lại danh sách người dùng
                    $('#confirmModal').modal('hide'); // Đóng modal
                } else {
                    alert('Có lỗi xảy ra: ' + (response.data.message || 'Vui lòng kiểm tra lại.'));
                }
            }).catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
                alert('Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.');
            });
        }
    };

});
