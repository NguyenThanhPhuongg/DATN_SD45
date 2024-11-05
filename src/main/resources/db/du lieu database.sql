--- data sql db.datn -----
INSERT INTO chuc_nang (ten, ma, id_cha, loai, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Chức năng 1', 'CN001', 1, 1, 1, 1, 1),
('Chức năng 2', 'CN002', 1, 1, 1, 1, 1),
('Chức năng 3', 'CN003', 1, 2, 1, 1,1 ),
('Chức năng 4', 'CN004', 1, 2, 1, 1,1 ),
('Chức năng 5', 'CN005', 2, 1, 1, 1,1 ),
('Chức năng 6', 'CN006', 2, 2, 1, 1,1 ),
('Chức năng 7', 'CN007', 3, 1, 1, 1,1 ),
('Chức năng 8', 'CN008', 3, 2, 1, 1,1 ),
('Chức năng 9', 'CN009', 4, 1, 1, 1,1 ),
('Chức năng 10', 'CN010', 4, 2, 1, 1,1 );
GO

INSERT INTO nhom_chuc_nang (id_nhom, id_chuc_nang, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
(1, 1, 1, 1, 1),
(1, 2, 1, 1, 1),
(2, 3, 1, 1, 1),
(2, 4, 1, 1,1),
(3, 5, 1, 1, 1),
(3, 6, 1, 1, 1),
(4, 7, 1, 1, 1),
(4, 8, 1,1, 1),
(5, 9, 1, 1, 1),
(5, 10, 1, 1, 1);
GO

INSERT INTO nhom (ten, mo_ta, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Nhóm 1', 'Mô tả nhóm 1', 1, 1, 1),
('Nhóm 2', 'Mô tả nhóm 2', 1, 1, 1),
('Nhóm 3', 'Mô tả nhóm 3', 1, 1, 1),
('Nhóm 4', 'Mô tả nhóm 4', 1, 1, 1),
('Nhóm 5', 'Mô tả nhóm 5', 1, 1, 1),
('Nhóm 6', 'Mô tả nhóm 6', 1, 1, 1),
('Nhóm 7', 'Mô tả nhóm 7', 1, 1, 1),
('Nhóm 8', 'Mô tả nhóm 8', 1, 1, 1),
('Nhóm 9', 'Mô tả nhóm 9', 1, 1, 1),
('Nhóm 10', 'Mô tả nhóm 10', 1, 1, 1);
GO

INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, id_nhom, loai, vaitro, trang_thai, xac_thuc, nguoi_tao, nguoi_cap_nhat)
VALUES 
('user1', 'password1', 1, 'NORMAL', 'ADMIN', 'ACTIVE', 1, 1, 1),
('user2', 'password2', 2, 'NORMAL', 'ADMIN', 'ACTIVE', 1, 1, 1),
('user3', 'password3', 3, 'NORMAL', 'ADMIN', 'ACTIVE', 1, 1, 1),
('user4', 'password4', 4, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1),
('user5', 'password5', 5, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1),
('user6', 'password6', 6, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1),
('user7', 'password7', 7, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1),
('user8', 'password8', 8, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1),
('user9', 'password9', 9, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1),
('user10', 'password10', 10, 'NORMAL', 'CLIENT', 'ACTIVE', 1, 1, 1);
GO

INSERT INTO thong_tin_ca_nhan (id_nguoi_dung, ho_va_ten, sdt, avatar, dia_chi, gioi_tinh, ngay_sinh, cccd, email, nguoi_tao, nguoi_cap_nhat)
VALUES 
(1, 'Nguyen Van A', '0912345678', 'avatar1.png', 'Hanoi', 'NAM', '1990-01-01', '0123456789', 'a@example.com', 1, 1),
(2, 'Nguyen Van B', '0912345679', 'avatar2.png', 'Hanoi', 'NAM', '1991-02-01', '0123456790', 'b@example.com', 1, 1),
(3, 'Nguyen Van C', '0912345680', 'avatar3.png', 'Hanoi', 'NU', '1992-03-01', '0123456801', 'c@example.com', 1, 1),
(4, 'Nguyen Van D', '0912345681', 'avatar4.png', 'Hanoi', 'NAM', '1993-04-01', '0123456812', 'd@example.com', 1, 1),
(5, 'Nguyen Van E', '0912345682', 'avatar5.png', 'Hanoi', 'NU', '1994-05-01', '0123456823', 'e@example.com', 1, 1),
(6, 'Nguyen Van F', '0912345683', 'avatar6.png', 'Hanoi', 'NAM', '1995-06-01', '0123456834', 'f@example.com', 1, 1),
(7, 'Nguyen Van G', '0912345684', 'avatar7.png', 'Hanoi', 'NAM', '1996-07-01', '0123456845', 'g@example.com', 1, 1),
(8, 'Nguyen Van H', '0912345685', 'avatar8.png', 'Hanoi', 'NAM', '1997-08-01', '0123456856', 'h@example.com', 1, 1),
(9, 'Nguyen Van I', '0912345686', 'avatar9.png', 'Hanoi', 'NAM' ,'1998-09-01', '0123456867', 'i@example.com', 1, 1),
(10, 'Nguyen Van J', '0912345687', 'avatar10.png', 'Hanoi', 'NU', '1999-10-01', '0123456878', 'j@example.com', 1, 1);
GO

INSERT INTO danh_muc (id_danh_muc_cha, ten, mo_ta, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
(1,'Danh mục 1', 'Mô tả danh mục 1', 1, 1, 1),
(1,'Danh mục 2', 'Mô tả danh mục 2', 1, 1, 1),
(1,'Danh mục 3', 'Mô tả danh mục 3', 1, 1, 1),
(1,'Danh mục 4', 'Mô tả danh mục 4', 1, 1, 1),
(1,'Danh mục 5', 'Mô tả danh mục 5', 1, 1, 1),
(2,'Danh mục 6', 'Mô tả danh mục 6', 1, 1, 1),
(2,'Danh mục 7', 'Mô tả danh mục 7', 1, 1, 1),
(2,'Danh mục 8', 'Mô tả danh mục 8', 1, 1, 1),
(2,'Danh mục 9', 'Mô tả danh mục 9', 1, 1, 1),
(2,'Danh mục 10', 'Mô tả danh mục 10', 1, 1, 1);
GO

INSERT INTO thuong_hieu (ten, mo_ta, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Thương hiệu 1', 'Mô tả thương hiệu 1', 1, 1, 1),
('Thương hiệu 2', 'Mô tả thương hiệu 2', 1, 1, 1),
('Thương hiệu 3', 'Mô tả thương hiệu 3', 1, 1, 1),
('Thương hiệu 4', 'Mô tả thương hiệu 4', 1, 1, 1),
('Thương hiệu 5', 'Mô tả thương hiệu 5', 1, 1, 1),
('Thương hiệu 6', 'Mô tả thương hiệu 6', 1, 1, 1),
('Thương hiệu 7', 'Mô tả thương hiệu 7', 1, 1, 1),
('Thương hiệu 8', 'Mô tả thương hiệu 8', 1, 1, 1),
('Thương hiệu 9', 'Mô tả thương hiệu 9', 1, 1, 1),
('Thương hiệu 10', 'Mô tả thương hiệu 10', 1, 1, 1);
GO

INSERT INTO [chat_lieu] ([ten], [id_danh_muc_cha], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
('Cotton', 1, 1, 1, 1),
('Nilong', 1, 1, 1, 1),
('Lụa', 1, 1, 1, 1),
('Kaki', 1, 1, 1, 1),
('Denim', 1, 1, 1, 1),
('Bông', 1, 1, 1, 1),
('Polyester', 1, 1, 1, 1),
('Vải thun', 1, 1, 1, 1),
('Vải lanh', 1, 1, 1, 1),
('Vải nhung', 1, 1, 1, 1);
GO

INSERT INTO [mau_sac] ([ten], [id_danh_muc_cha], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
('Đỏ', 1, 1, 1, 1),
('Xanh', 1, 1, 1, 1),
('Vàng', 1, 1, 1,1 ),
('Đen', 1, 1, 1, 1),
('Trắng', 1, 1, 1, 1),
('Xám', 1, 1, 1, 1),
('Nâu', 1, 1, 1, 1),
('Hồng', 1, 1, 1, 1),
('Xanh lá', 1, 1, 1, 1),
('Tím', 1, 1, 1, 1);
GO

INSERT INTO [size] ([ten], [id_danh_muc_cha], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
('S', 1, 1, 1, 1),
('M', 1, 1, 1, 1),
('L', 1, 1, 1, 1),
('XL', 1, 1, 1, 1),
('XXL', 1, 1, 1, 1),
('XS', 1, 1, 1, 1),
('34', 1, 1, 1, 1),
('36', 1, 1, 1, 1),
('38', 1, 1, 1, 1),
('40', 1, 1, 1, 1);
GO

INSERT INTO [san_pham] ([id_danh_muc],[ma],[id_chat_lieu],[id_thuong_hieu], [ten], [xuat_xu], [mo_ta], [anh], [trang_thai], [nguoi_tao], [nguoi_cap_nhat],[gia])
VALUES 
(1, 'adfr2d456s',1,1, 'Áo sơ mi nam', 'Việt Nam', 'Áo sơ mi nam chất cotton, thoáng mát', 'mangto.png', 1, 1, 1,1),
(1, 'adfr3d456s',1,1 ,'Áo thun nam', 'Việt Nam', 'Áo thun nam đơn giản, dễ phối đồ', 'mangto.png', 1, 1, 1,1),
(1, 'adfr4d456s',2, 1,'Áo khoác nam', 'Việt Nam', 'Áo khoác nam thời trang, giữ ấm tốt', 'mangto.png', 1, 1, 1,1),
(1, 'adfrjd476s',2,1, 'Áo len nam', 'Việt Nam', 'Áo len nam mềm mại, phù hợp mùa đông', 'mangto.png', 1, 1, 1,2),
(1, 'adfrjd456s',3,1, 'Áo jacket nam', 'Việt Nam', 'Áo jacket nam cá tính, chất liệu da', 'mangto.png', 1, 1, 1,1),
(1, 'adfsjd456s',3,1, 'Áo hoodie nam', 'Việt Nam', 'Áo hoodie nam năng động, tiện lợi', 'mangto.png', 1, 1, 1,1),
(1, 'a5frjd456s',4, 1,'Áo polo nam', 'Việt Nam', 'Áo polo nam thanh lịch, dễ mặc', 'mangto.png', 1, 1, 1,1),
(1, 'adfrj8456s',4,1, 'Áo tank top nam', 'Việt Nam', 'Áo tank top nam mát mẻ, thích hợp mùa hè', 'mangto.png', 1, 1,1, 1),
(1, '3dfrjd456s',5,1, 'Áo thun cổ tròn nam', 'Việt Nam', 'Áo thun cổ tròn nam chất lượng', 'mangto.png', 1, 1,1, 1),
(1, 'adfrj2456s',5,1, 'Áo sơ mi kẻ nam', 'Việt Nam', 'Áo sơ mi kẻ nam thời trang', 'mangto.png', 1, 1,1, 1),
(1, 'ad4rjd456s',1,1, 'Áo khoác denim nam', 'Việt Nam', 'Áo khoác denim nam bền bỉ', 'mangto.png', 1, 1, 1,1),
(1, 'adfrjdf56s',2,1, 'Áo sơ mi trắng nam', 'Việt Nam', 'Áo sơ mi trắng nam thanh lịch', 'mangto.png', 1, 1, 1,1),
(1, 'adfrjde56s',3,1, 'Áo thun ôm nam', 'Việt Nam', 'Áo thun ôm nam thời trang', 'mangto.png', 1, 1,1, 1),
(1, 'cdfrjd456s',4, 1,'Áo khoác dạ nam', 'Việt Nam', 'Áo khoác dạ nam ấm áp', 'mangto.png', 1, 1,1, 1),
(1, 'adfrj2456s',5,1, 'Áo phao nam', 'Việt Nam', 'Áo phao nam chống lạnh', 'mangto.png', 1, 1,1, 1);
GO

INSERT INTO [chi_tiet_san_pham] ([id_san_pham], [id_size], [id_mau_sac], [so_luong], [gia], [ghi_chu], [trang_thai], [ngay_tao], [ngay_cap_nhat], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
(1, 1, 1, 50, 250000.00, 'Áo sơ mi nam màu đỏ, size S', 1, GETDATE(), GETDATE(), 1, 1),
(1, 2, 1, 30, 260000.00, 'Áo sơ mi nam màu xanh, size M', 1, GETDATE(), GETDATE(), 1, 1),
(2, 1, 2, 25, 200000.00, 'Áo thun nam màu vàng, size S', 1, GETDATE(), GETDATE(), 1, 1),
(2, 2, 2, 20, 220000.00, 'Áo thun nam màu đen, size M', 1, GETDATE(), GETDATE(), 1, 1),
(3, 3, 3, 15, 450000.00, 'Áo khoác nam màu trắng, size L', 1, GETDATE(), GETDATE(), 1, 1),
(3, 4, 3, 10, 480000.00, 'Áo khoác nam màu xám, size XL', 1, GETDATE(), GETDATE(), 1, 1),
(4, 1, 4, 50, 300000.00, 'Áo len nam màu nâu, size S', 1, GETDATE(), GETDATE(), 1, 1),
(4, 2, 4, 45, 320000.00, 'Áo len nam màu hồng, size M', 1, GETDATE(), GETDATE(), 1, 1),
(5, 3, 5, 40, 500000.00, 'Áo jacket nam màu xanh lá, size L', 1, GETDATE(), GETDATE(), 1, 1),
(5, 4, 5, 35, 520000.00, 'Áo jacket nam màu tím, size XL', 1, GETDATE(), GETDATE(), 1, 1),
(6, 1, 1, 50, 180000.00, 'Áo hoodie nam màu đỏ, size S', 1, GETDATE(), GETDATE(), 1, 1),
(6, 2, 1, 30, 190000.00, 'Áo hoodie nam màu xanh, size M', 1, GETDATE(), GETDATE(), 1, 1),
(7, 3, 2, 25, 150000.00, 'Áo polo nam màu vàng, size L', 1, GETDATE(), GETDATE(), 1, 1),
(7, 4, 2, 20, 160000.00, 'Áo polo nam màu đen, size XL', 1, GETDATE(), GETDATE(), 1, 1),
(8, 1, 3, 15, 200000.00, 'Áo tank top nam màu trắng, size S', 1, GETDATE(), GETDATE(), 1, 1),
(8, 2, 3, 10, 220000.00, 'Áo tank top nam màu xám, size M', 1, GETDATE(), GETDATE(), 1, 1),
(9, 3, 4, 50, 210000.00, 'Áo thun cổ tròn nam màu nâu, size L', 1, GETDATE(), GETDATE(), 1, 1),
(9, 4, 4, 45, 230000.00, 'Áo thun cổ tròn nam màu hồng, size XL', 1, GETDATE(), GETDATE(), 1, 1),
(10, 1, 5, 40, 240000.00, 'Áo khoác denim nam màu xanh lá, size S', 1, GETDATE(), GETDATE(), 1, 1),
(10, 2, 5, 35, 260000.00, 'Áo khoác denim nam màu tím, size M', 1, GETDATE(), GETDATE(), 1, 1),
(11, 3, 1, 30, 280000.00, 'Áo sơ mi trắng nam, size L', 1, GETDATE(), GETDATE(), 1, 1),
(11, 4, 1, 25, 300000.00, 'Áo sơ mi kẻ nam, size XL', 1, GETDATE(), GETDATE(), 1, 1);
GO

INSERT INTO phuong_thuc_van_chuyen (ten, mo_ta, phi_van_chuyen, loai, ghi_chu, thoi_gian_giao_hang, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES 
(N'Giao hàng nhanh', N'Giao hàng trong 1-2 ngày làm việc', 30000, 1, N'Ưu tiên hàng đầu', N'1-2 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng tiết kiệm', N'Giao hàng trong 3-5 ngày làm việc', 15000, 2, N'Giá rẻ', N'3-5 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng siêu tốc', N'Giao hàng trong 24 giờ', 50000, 3, N'Rất nhanh', N'24 giờ', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng COD', N'Thanh toán khi nhận hàng', 25000, 4, N'An toàn', N'2-4 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng quốc tế', N'Giao hàng ngoài Việt Nam', 100000, 5, N'Trên 10 ngày', N'10-15 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng qua bưu điện', N'Thông qua hệ thống bưu điện', 20000, 6, N'Chính xác', N'5-7 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng hỏa tốc', N'Giao hàng trong 12 giờ', 60000, 3, N'Cực nhanh', N'12 giờ', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng đường biển', N'Dành cho hàng hóa lớn', 120000, 7, N'Hàng cồng kềnh', N'15-20 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng đường bộ', N'Qua xe tải', 50000, 6, N'An toàn cho hàng hóa nặng', N'7-10 ngày', 1, GETDATE(), GETDATE(), 1, 1),
(N'Giao hàng bằng máy bay', N'Dịch vụ nhanh qua hàng không', 80000, 1, N'Nhanh và an toàn', N'2-3 ngày', 1, GETDATE(), GETDATE(), 1, 1);
GO

INSERT INTO dia_chi_giao_hang (id_nguoi_dung, ho_va_ten, sdt, dia_chi, thanh_pho, quoc_gia, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat) 
VALUES 
(1, N'Nguyễn Văn A', '0901234567', N'123 Lê Lợi, Quận 1', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(2, N'Trần Thị B', '0987654321', N'456 Hai Bà Trưng, Quận 3', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(3, N'Phạm Văn C', '0912345678', N'789 Lý Tự Trọng, Quận 1', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(4, N'Lê Thị D', '0934567890', N'101 Điện Biên Phủ, Quận Bình Thạnh', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1 ,1),
(5, N'Vũ Văn E', '0923456789', N'202 CMT8, Quận 10', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(6, N'Nguyễn Thị F', '0945678901', N'303 Nguyễn Thị Minh Khai, Quận 3', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(7, N'Đặng Văn G', '0902345678', N'404 Hoàng Diệu, Quận 4', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(8, N'Hoàng Thị H', '0937894561', N'505 Trường Sa, Quận Phú Nhuận', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(9, N'Bùi Văn I', '0919876543', N'606 Phạm Ngũ Lão, Quận 1', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1),
(10, N'Phan Thị K', '0956789012', N'707 Nam Kỳ Khởi Nghĩa, Quận 3', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 1, 1);
GO

INSERT INTO hoa_don (id_nguoi_dung, ma, id_dia_chi_giao_hang, id_phuong_thuc_van_chuyen, ngay_dat_hang, ngay_thanh_toan, tong_tien, diem_su_dung, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES
(9,'asqw1', 1, 1, GETDATE(), GETDATE(), 1000000.00, 5000, 1, GETDATE(), GETDATE(), 1, 1),
(9,'asqw9', 2, 2, GETDATE(), GETDATE(), 2000000.00, 10000, 1, GETDATE(), GETDATE(), 1, 1),
(9,'asqw8', 3, 3, GETDATE(), GETDATE(), 3000000.00, 15000, 2, GETDATE(), GETDATE(), 1, 1),
(9,'asqw7', 4, 4, GETDATE(), GETDATE(), 4000000.00, 20000, 2, GETDATE(), GETDATE(), 1, 1),
(9,'asqw6', 1, 5, GETDATE(), GETDATE(), 5000000.00, 25000, 3, GETDATE(), GETDATE(), 1, 1),
(9,'asqw4', 2, 6, GETDATE(), GETDATE(), 6000000.00, 30000, 3, GETDATE(), GETDATE(), 1, 1),
(9,'asqw2', 3, 7, GETDATE(), GETDATE(), 7000000.00, 35000, 4, GETDATE(), GETDATE(), 1, 1)

INSERT INTO chi_tiet_hoa_don (id_hoa_don, id_san_pham_chi_tiet, so_luong, gia, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES
(1, 2, 2, 500000.00, 1, GETDATE(), GETDATE(), 1, 1),
(2, 2, 1, 2000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(3, 3, 3, 1000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(4, 4, 2, 2000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(5, 5, 4, 1250000.00, 1, GETDATE(), GETDATE(), 1, 1),
(6, 6, 1, 3000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(7, 7, 5, 1500000.00, 1, GETDATE(), GETDATE(), 1, 1),
(8, 8, 6, 1000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(9, 9, 2, 2500000.00, 1, GETDATE(), GETDATE(), 1, 1),
(10, 10, 1, 10000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(11, 1, 3, 4000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(12, 2, 2, 5000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(13, 3, 4, 3000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(14, 4, 1, 14000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(15, 5, 5, 1250000.00, 1, GETDATE(), GETDATE(), 1, 1),
(16, 6, 6, 1600000.00, 1, GETDATE(), GETDATE(), 1, 1),
(17, 7, 2, 8500000.00, 1, GETDATE(), GETDATE(), 1, 1),
(18, 8, 4, 9000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(19, 9, 1, 19000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(20, 10, 3, 1500000.00, 1, GETDATE(), GETDATE(), 1, 1),
(21, 1, 1, 10000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(22, 2, 5, 6000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(23, 3, 6, 23000000.00, 1, GETDATE(), GETDATE(), 1, 1),
(24, 4, 2, 24000000.00, 1, GETDATE(), GETDATE(), 1, 1);
GO

INSERT INTO khuyen_mai (ten, mo_ta, loai, gia_tri, ngay_bat_dau, ngay_ket_thuc, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Khuyến mãi 1', 'Mô tả khuyến mãi 1', 1, 19.45, '2024-10-03', '2024-11-03', 0, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 2', 'Mô tả khuyến mãi 2', 1, 34.47, '2024-10-19', '2024-11-12', 1, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 3', 'Mô tả khuyến mãi 3', 1, 42.74, '2024-10-17', '2024-11-16', 0, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 4', 'Mô tả khuyến mãi 4', 1, 46.95, '2024-10-11', '2024-11-17', 0, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 5', 'Mô tả khuyến mãi 5', 1, 44.66, '2024-09-24', '2024-11-11', 1, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 6', 'Mô tả khuyến mãi 6', 2, 15.89, '2024-09-30', '2024-11-10', 1, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 7', 'Mô tả khuyến mãi 7', 3, 10.51, '2024-09-21', '2024-11-04', 0, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 8', 'Mô tả khuyến mãi 8', 3, 41.00, '2024-09-24', '2024-10-29', 0, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 9', 'Mô tả khuyến mãi 9', 2, 42.12, '2024-10-05', '2024-10-21', 0, '2024-10-20', '2024-10-20', 1, 1),
('Khuyến mãi 10', 'Mô tả khuyến mãi 10', 2, 16.13, '2024-10-10', '2024-11-13', 0, '2024-10-20', '2024-10-20', 1, 1);
GO

INSERT INTO blog (tac_gia, title, content, hinh_anh, content_2, hinh_anh_2, content_3, hinh_anh_3, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
(N'Chủ', 'Tiêu đề bài viết 1', 'Nội dung bài viết 1', 'mangto.png', 'Nội dung phụ 1 cho bài viết 1', 'mangto.png', 'Nội dung phụ 2 cho bài viết 1', 'mangto.png', 1, 1, 1),
(N'Chủ','Tiêu đề bài viết 2', 'Nội dung bài viết 2', 'mangto.png', 'Nội dung phụ 1 cho bài viết 2', 'mangto.png', 'Nội dung phụ 2 cho bài viết 2', 'mangto.png', 1, 1, 1),
(N'Chủ', 'Tiêu đề bài viết 3', 'Nội dung bài viết 3', 'mangto.png', 'Nội dung phụ 1 cho bài viết 3', 'mangto.png', 'Nội dung phụ 2 cho bài viết 3', 'mangto.png', 1, 1, 1),
(N'Chủ', 'Tiêu đề bài viết 4', 'Nội dung bài viết 4', 'mangto.png', 'Nội dung phụ 1 cho bài viết 4', 'mangto.png', 'Nội dung phụ 2 cho bài viết 4', 'mangto.png', 1, 1, 1),
(N'Chủ', 'Tiêu đề bài viết 5', 'Nội dung bài viết 5', 'mangto.png', 'Nội dung phụ 1 cho bài viết 5', 'mangto.png', 'Nội dung phụ 2 cho bài viết 5', 'mangto.png', 1, 1, 1);
GO
select * from thong_tin_ca_nhan

select * from thuong_hieu
select * from danh_muc 
select * from size 
select * from mau_sac 
select * from chat_lieu 
select * from chuc_nang 
select * from nhom 
select * from nhom_chuc_nang 
select * from san_pham 
select * from chi_tiet_san_pham 
select * from khuyen_mai 
select * from ap_dung_khuyen_mai 
select * from blog
select * from ap_dung_khuyen_mai 

select * from thanh_toan
select * from phuong_thuc_thanh_toan
select * from chi_tiet_hoa_don 
select * from gio_hang 
select * from chi_tiet_gio_hang 
select * from hoa_don 
select * from phuong_thuc_van_chuyen 
select * from dia_chi_giao_hang 
select * from nguoi_dung 
select * from hinh_anh 

update  danh_muc set ngay_tao = GETDATE() where id =1
update  nguoi_dung set vaitro = 'CLIENT' where id =1

DELETE FROM san_pham WHERE id = 20;

SELECT * FROM chi_tiet_hoa_don  WHERE id_hoa_don=1

drop database [DB.DATN]
SELECT * FROM danh_muc WHERE id = 1; -- hoặc điều kiện khác

