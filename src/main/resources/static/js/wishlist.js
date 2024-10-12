document.querySelectorAll('.page-num').forEach(page => {
    page.addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Xóa lớp active từ tất cả các liên kết
        document.querySelectorAll('.page-num').forEach(link => {
            link.classList.remove('active');
        });

        // Thêm lớp active vào liên kết được nhấn
        this.classList.add('active');
    });
});
