

--- data sql db.datn -----

INSERT INTO [phuong_thuc_thanh_toan] ([ten], [loai], [mo_ta], [trang_thai], [ngay_tao], [ngay_cap_nhat], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
(N'Tiền mặt', N'CASH', N'Thanh toán bằng tiền mặt', 1, GETDATE(), GETDATE(), 1, 1),
(N'VNPAY', N'VNPAY', N'Thanh toán qua cổng VNPAY', 1, GETDATE(), GETDATE(), 1, 1);
GO


INSERT INTO [phuong_thuc_van_chuyen] ([ten], [mo_ta], [phi_van_chuyen], [loai], [ghi_chu], [thoi_gian_giao_hang], [trang_thai], [ngay_tao], [ngay_cap_nhat], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
(N'Vận chuyển qua bưu điện', N'Dịch vụ vận chuyển qua bưu điện, giao hàng nhanh chóng và tiện lợi.', 30000, 1, N'Phí vận chuyển tùy theo địa chỉ giao hàng', N'2-3 ngày', 1, GETDATE(), GETDATE(), 1, 1)
GO

SET IDENTITY_INSERT [nguoi_dung] ON;
INSERT INTO [nguoi_dung] 
([id], [ten_dang_nhap], [mat_khau], [vaitro], [loai], [xac_thuc], [trang_thai], [ngay_tao], [ngay_cap_nhat])
VALUES 
(0, N'ZiazaStore',CONVERT(VARCHAR(MAX), HASHBYTES('SHA2_256', N'ziazavn@store.gmail.com'), 2), N'ADMIN', N'NORMAL', 1, N'ACTIVE', GETDATE(), GETDATE());
GO
SET IDENTITY_INSERT [nguoi_dung] OFF;
--------------------------------------
SET IDENTITY_INSERT [dia_chi_giao_hang] ON;
INSERT INTO [dia_chi_giao_hang] ([id], [id_nguoi_dung], [ho_va_ten], [sdt], [dia_chi], [thanh_pho], [quoc_gia], [trang_thai], [ngay_tao], [ngay_cap_nhat])
VALUES 
(0, 0, N'ZiazaStore', N'0123456789', N'Số 1, Đường ABC, Quận 1', N'Hà Nội', N'Việt Nam', 1, GETDATE(), GETDATE())
GO
SET IDENTITY_INSERT [dia_chi_giao_hang] OFF;
--------------------------------------------
SET IDENTITY_INSERT [phuong_thuc_van_chuyen] ON;
INSERT INTO [phuong_thuc_van_chuyen] ([id], [ten], [mo_ta], [phi_van_chuyen], [loai], [ghi_chu], [thoi_gian_giao_hang], [trang_thai], [ngay_tao], [ngay_cap_nhat])
VALUES 
(0, N'Bán hàng tại quầy', N'Bán hàng tại quầy.', 0, 1, N'Bán hàng tại quầy.', N'Bán hàng tại quầy.', 1, GETDATE(), GETDATE())
GO
SET IDENTITY_INSERT [phuong_thuc_van_chuyen] OFF;
--------------------------------------------
SET IDENTITY_INSERT [thong_tin_ca_nhan] ON;
INSERT INTO [thong_tin_ca_nhan] ([id], [id_nguoi_dung], [ho_va_ten], [sdt], [avatar], [dia_chi], [gioi_tinh], [ngay_sinh], [cccd], [email], [ngay_tao], [ngay_cap_nhat])
VALUES 
(0,0, N'ZiazaStore', N'0123456789', N'avatar1.jpg', N'Số 1, Đường ABC, Quận 1', N'NAM', '1990-01-01', N'123456789', N'nguyenvana@example.com', GETDATE(), GETDATE())
SET IDENTITY_INSERT [thong_tin_ca_nhan] OFF;




select * from yeu_cau_doi_tra_chi_tiet
select * from yeu_cau_doi_tra
select * from chi_tiet_hoa_don 
select * from hoa_don                   



select * from san_pham_doi_tra
select * from thong_tin_ca_nhan
select * from gio_hang
--select * from danh_muc 
select * from size where id =1 
select * from mau_sac 
select * from chat_lieu 
--select * from chuc_nang 
--select * from nhom 
--select * from nhom_chuc_nang 
--select * from chi_tiet_san_pham 
--select * from hinh_anh 
select * from khuyen_mai 
select * from ap_dung_khuyen_mai 
select * from chi_tiet_hoa_don 
select * from hoa_don 
select * from nguoi_dung 
select * from phuong_thuc_van_chuyen
select * from chi_tiet_gio_hang
INSERT INTO [chi_tiet_hoa_don] ([id_hoa_don], [id_san_pham_chi_tiet], [so_luong], [gia], [trang_thai], [ngay_tao], [ngay_cap_nhat], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
(7, 1, 2, 200000, 1, GETDATE(), GETDATE(), 1, 1),
(7, 2, 5, 200000, 1, GETDATE(), GETDATE(), 1, 1),
(7, 1, 1, 200000, 1, GETDATE(), GETDATE(), 1, 1),
(7, 2, 3, 150000, 1, GETDATE(), GETDATE(), 1, 1),
(7, 1, 4, 200000, 1, GETDATE(), GETDATE(), 1, 1);
GO


SELECT * FROM [san_pham];
SELECT * FROM [chi_tiet_san_pham];
SELECT * FROM [thuong_hieu];
SELECT * FROM [danh_muc];
SELECT * FROM [san_pham_yeu_thich];
SELECT * FROM [danh_gia];
SELECT * FROM [khuyen_mai];
SELECT * FROM [ap_dung_khuyen_mai];
SELECT * FROM [hinh_anh];
SELECT * FROM [yeu_cau_doi_tra];
SELECT * FROM [yeu_cau_doi_tra_chi_tiet];
SELECT * FROM [blog];
SELECT * FROM [binh_luan];
SELECT * FROM [rep_binh_luan];
select * from nhom
select * from chi_tiet_hoa_don 
select * from hoa_don 
update  danh_muc set ngay_tao = GETDATE() where id =1
update  nguoi_dung set vaitro = 'ADMIN' where id =2
update  hoa_don  set id_phuong_thuc_van_chuyen = 1 where id = 12

DELETE FROM chi_tiet_hoa_don WHERE id = 29;

SELECT * FROM chi_tiet_hoa_don  WHERE id_hoa_don=1

drop database [DB.DATN]
SELECT * FROM danh_muc WHERE id = 1; -- hoặc điều kiện khác
SELECT * FROM hinh_anh
INSERT INTO hinh_anh (id_san_pham, anh, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES 
(3,'meme.png',1, '2024-10-20', '2024-10-20', 1, 1),
(3,'mangto.png',1, '2024-10-20', '2024-10-20', 1, 1),
(3,'avatar.png',1, '2024-10-20', '2024-10-20', 1, 1)

ALTER TABLE mau_sac
DROP COLUMN id_danh_muc_cha;

ALTER TABLE thuong_hieu
ALTER COLUMN ten NVARCHAR(250);



select * from danh_muc 
select * from phuong_thuc_van_chuyen
update phuong_thuc_van_chuyen set trang_thai = 0 where id = 0