// File: asset/js/thuonghieuService.js

app.service('MyService', function($http) {
    this.getDetailById = function(id) {
        return $http.get('/rest/thuonghieu/' + id);  // Gọi API để lấy chi tiết thương hiệu theo ID
    };
});
