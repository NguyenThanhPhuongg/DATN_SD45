app.controller('taikhoan-ctrl', function ($scope, $http) {
    // Biến để lưu danh sách nhân viên
    $scope.employees = [];

    // Biến cho phân trang
    $scope.pager = {
        page: 0,
        count: 0,
        itemsPerPage: 10, // Số lượng nhân viên trên mỗi trang
        first: function () {
            this.page = 0;
            fetchEmployees();
        },
        prev: function () {
            if (this.page > 0) {
                this.page--;
                fetchEmployees();
            }
        },
        next: function () {
            if (this.page < this.count - 1) {
                this.page++;
                fetchEmployees();
            }
        },
        last: function () {
            this.page = this.count - 1;
            fetchEmployees();
        }
    };

    // Hàm gọi API để lấy danh sách nhân viên theo vai trò
    function fetchEmployees() {
        const role = 'CLIENT'; // Hoặc vai trò bạn muốn
        $http.get(`user/get-list-by-role?role=${role}`).then(function (response) {
            if (response.data && response.data.data) { // Kiểm tra thuộc tính 'data'
                $scope.employees = response.data.data; // Lưu danh sách nhân viên
                $scope.pager.count = Math.ceil($scope.employees.length / $scope.pager.itemsPerPage); // Tính tổng số trang
                updateEmployeesForCurrentPage(); // Cập nhật nhân viên cho trang hiện tại
            }
        }).catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });
    }


    // Hàm thêm tài khoản
    $scope.addAccount = function () {
        // Đảm bảo rằng mật khẩu và mật khẩu nhập lại giống nhau
        if ($scope.newAccount.password !== $scope.newAccount.retypePassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        // Gọi API để đăng ký
        $http.post('/register', $scope.newAccount)
            .then(function (response) {
                console.log('API response:', response.data); // Log phản hồi từ API

                // Kiểm tra mã phản hồi và thông điệp từ server
                if (response.data && response.data.code === "200" && response.data.message === "Thành công") {
                    alert('Đăng ký thành công!');
                    fetchEmployees(); // Cập nhật danh sách nhân viên
                    $('#addModal').modal('hide'); // Ẩn modal
                    $scope.newAccount = {}; // Reset lại form
                } else {
                    alert('Có lỗi xảy ra: ' + (response.data.message || 'Vui lòng kiểm tra thông tin nhập vào.'));
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
                alert('Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.');
            });
    };

    // Hàm gọi API để lấy chi tiết người dùng
    $scope.detailUser = function (userId) {
        $http.get(`/user/${userId}`)
            .then(function (response) {
                if (response.data && response.data.code === "200") {
                    $scope.selectedUser = response.data.data; // Lưu dữ liệu người dùng
                    $('#detailModal').modal('show'); // Hiện modal
                } else {
                    alert('Có lỗi xảy ra: ' + response.data.message);
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
                alert('Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.');
            });
    };

    // Hàm xóa người dùng
    $scope.deleteUser = function(userId) {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            $http.delete(`/user/${userId}`)
                .then(function(response) {
                    if (response.data && response.data.code === "200") {
                        alert('Xóa người dùng thành công!');
                        fetchEmployees(); // Cập nhật lại danh sách người dùng
                    } else {
                        alert('Có lỗi xảy ra: ' + response.data.message);
                    }
                })
                .catch(function(error) {
                    console.error('Lỗi khi gọi API:', error);
                    alert('Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.');
                });
        }
    };

    // Cập nhật danh sách nhân viên cho trang hiện tại
    function updateEmployeesForCurrentPage() {
        const startIndex = $scope.pager.page * $scope.pager.itemsPerPage;
        const endIndex = startIndex + $scope.pager.itemsPerPage;
        $scope.currentEmployees = $scope.employees.slice(startIndex, endIndex); // Cắt mảng để hiển thị theo trang
    }

    // Gọi hàm fetchEmployees khi controller khởi tạo
    fetchEmployees();
});
