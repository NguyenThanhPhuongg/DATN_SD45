CREATE DATABASE [DB.DATN]
GO
USE [DB.DATN]
GO

-- DROP DATABASE DB.DATN
--- Chuc nang
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [chuc_nang]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(100),
    [ma] NVARCHAR(255),
    [id_cha] BIGINT,
    [loai] INT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Nhom Chuc nang
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [nhom_chuc_nang]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nhom] BIGINT,
    [id_chuc_nang] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Nhom
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [nhom]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(200),
    [mo_ta] NVARCHAR(MAX),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Nguoi dung
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [nguoi_dung]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten_dang_nhap] NVARCHAR(200),
    [mat_khau] NVARCHAR(200) ,
    [id_nhom] BIGINT,
    [vaitro] NVARCHAR(50),
    [xac_thuc] INT DEFAULT 1,
    [trang_thai] NVARCHAR(50),
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Thong tin nguoi dung
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [thong_tin_ca_nhan]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [ho_va_ten] NVARCHAR(200),
    [sdt] NVARCHAR(20),
    [avatar] NVARCHAR(255),
    [dia_chi] NVARCHAR(255),
    [gioi_tinh] INT DEFAULT 1,
    [ngay_sinh] DATETIME,
    [cccd] NVARCHAR(20),
    [email] NVARCHAR(200),
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Dia chi giao hang
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dia_chi_giao_hang]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [ho_va_ten] NVARCHAR(200),
    [sdt] NVARCHAR(20),
    [dia_chi] NVARCHAR(MAX),
    [thanh_pho] NVARCHAR(200),
    [quoc_gia] NVARCHAR(100),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Phan hoi khach hang
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [phan_hoi]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_ho_tro] BIGINT,
    [nhan_xet] NVARCHAR(250),
    [diem] INT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Ho tro
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ho_tro]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [yeu_cau] NVARCHAR(250) ,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- lich su Ho tro
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [lich_su_ho_tro]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_ho_tro] BIGINT,
    [id_nguoi_dung] BIGINT,
    [noi_dung] NVARCHAR(250),
    [ngay_phan_hoi] DATETIME DEFAULT GETDATE(),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Diem tich luy
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [diem_tich_luy]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [diem] INT,
    [ly_do] NVARCHAR(250),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- phuong thuc thanh toan
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [phuong_thuc_thanh_toan]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(100),
    [mo_ta] NVARCHAR(MAX),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- thanh toan
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [thanh_toan]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_hoa_don] BIGINT,
    [id_phuong_thuc_thanh_toan] BIGINT,
    [ma_giao_dich] NVARCHAR(100),
    [so_tien] DECIMAL(10,2),
    [ngay_thanh_toan] DATETIME DEFAULT GETDATE(),
    [ghi_chu] NVARCHAR(MAX),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- phuong thuc van chuyen
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [phuong_thuc_van_chuyen]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(200),
    [mo_ta] NVARCHAR(500),
    [phi_van_chuyen] DECIMAL(10,2),
    [loai] INT,
    [ghi_chu] NVARCHAR(250),
    [thoi_gian_giao_hang] NVARCHAR(100),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Hoa don
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [hoa_don]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [id_dia_chi_giao_hang] BIGINT,
    [id_phuong_thuc_van_chuyen] BIGINT,
    [ngay_dat_hang] DATETIME DEFAULT GETDATE(),
    [ngay_thanh_toan] DATETIME DEFAULT GETDATE(),
    [tong_tien] DECIMAL(10,2),
    [diem_su_dung] INT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- chi tiet hoa don
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [chi_tiet_hoa_don]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_hoa_don] BIGINT,
    [id_san_pham_chi_tiet] BIGINT,
    [so_luong] INT,
    [gia] DECIMAL(10,2),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Gio hang
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [gio_hang]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- chi tiet gio hang
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [chi_tiet_gio_hang]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_gio_hang] BIGINT,
    [id_san_pham_chi_tiet] BIGINT,
    [so_luong] INT,
    [gia] DECIMAL(10,2),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Size
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [size]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(100),
    [id_danh_muc_cha] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Mau sac
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [mau_sac]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(100),
    [id_danh_muc_cha] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- chat lieu
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [chat_lieu]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(100),
    [id_danh_muc_cha] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- San pham
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [san_pham]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_danh_muc] BIGINT,
    [id_thuong_hieu] BIGINT,
    [ten] NVARCHAR(200),
    [xuat_xu] NVARCHAR(200),
    [mo_ta] NVARCHAR(MAX),
    [anh] NVARCHAR(MAX),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Chi tiet San pham
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [chi_tiet_san_pham]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_san_pham] BIGINT,
    [id_size] BIGINT,
    [id_mau_sac] BIGINT,
    [id_chat_lieu] BIGINT,
    [so_luong] INT,
    [gia] DECIMAL(10,2),
    [ghi_chu] NVARCHAR(MAX),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Thuong hieu
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [thuong_hieu]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(100),
    [mo_ta] NVARCHAR(250),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- danh muc
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [danh_muc]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_danh_muc_cha] BIGINT,
    [ten] NVARCHAR(200),
    [mo_ta] NVARCHAR(1000),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- san pham yeu thich
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [san_pham_yeu_thich]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_san_pham] BIGINT,
    [id_nguoi_dung] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- danh gia san pham
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [danh_gia]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_san_pham_chi_tiet] BIGINT,
    [id_nguoi_dung] BIGINT,
    [id_hoa_don] BIGINT,
    [danh_gia] INT,
    [nhan_xet] NVARCHAR(1000),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- khuyen mai
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [khuyen_mai]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [ten] NVARCHAR(200),
    [mo_ta] NVARCHAR(1000),
    [loai] INT,
    [gia_tri] DECIMAL(10,2),
    [ngay_bat_dau] DATETIME,
    [ngay_ket_thuc] DATETIME,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- ap dung khuyen mai
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ap_dung_khuyen_mai]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_khuyen_mai] BIGINT,
    [id_gio_hang] BIGINT,
    [id_hoa_don] BIGINT,
    [gia_tri_giam] DECIMAL(10,2),
    [ngay_ap_dung] DATETIME,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- hinh anh
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [hinh_anh]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_san_pham_chi_tiet] BIGINT,
    [duong_dan] NVARCHAR(255),
    [mo_ta] NVARCHAR(500),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Yeu cau doi tra
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [yeu_cau_doi_tra]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_hoa_don] BIGINT,
    [id_nguoi_dung] BIGINT,
    [id_san_pham_chi_tiet] BIGINT,
    [loai_yeu_cau] NVARCHAR(50),
    [ly_do] NVARCHAR(1000),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Chi tiet Yeu cau doi tra
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [yeu_cau_doi_tra_chi_tiet]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_yeu_cau_doi_tra] BIGINT,
    [id_san_pham_chi_tiet] BIGINT,
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Blog
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [blog]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_nguoi_dung] BIGINT,
    [title] NVARCHAR(255),       
    [content] NVARCHAR(MAX),
    [hinh_anh] NVARCHAR(MAX),
    [content_2] NVARCHAR(MAX),
    [hinh_anh_2] NVARCHAR(MAX),
    [content_3] NVARCHAR(MAX),
    [hinh_anh_3] NVARCHAR(MAX),
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- Bình luận
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [binh_luan]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_blog] BIGINT, 
    [id_nguoi_dung] BIGINT , 
    [content] NVARCHAR(MAX), 
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

--- phan hoi Bình luận
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [rep_binh_luan]
(
    [id] BIGINT IDENTITY(1,1) PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    [id_comment] BIGINT , 
    [id_nguoi_dung] BIGINT , 
    [content] NVARCHAR(MAX), 
    [trang_thai] INT DEFAULT 1,
    [ngay_tao] DATETIME DEFAULT GETDATE(),
    [ngay_cap_nhat] DATETIME DEFAULT GETDATE(),
    [nguoi_tao] VARCHAR(20),
    [nguoi_cap_nhat] VARCHAR(20)
) ON [PRIMARY];
GO

INSERT INTO chuc_nang (ten, ma, id_cha, loai, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Chức năng 1', 'CN001', NULL, 1, 1, 'admin', 'admin'),
('Chức năng 2', 'CN002', NULL, 1, 1, 'admin', 'admin'),
('Chức năng 3', 'CN003', 1, 2, 1, 'admin', 'admin'),
('Chức năng 4', 'CN004', 1, 2, 1, 'admin', 'admin'),
('Chức năng 5', 'CN005', 2, 1, 1, 'admin', 'admin'),
('Chức năng 6', 'CN006', 2, 2, 1, 'admin', 'admin'),
('Chức năng 7', 'CN007', 3, 1, 1, 'admin', 'admin'),
('Chức năng 8', 'CN008', 3, 2, 1, 'admin', 'admin'),
('Chức năng 9', 'CN009', 4, 1, 1, 'admin', 'admin'),
('Chức năng 10', 'CN010', 4, 2, 1, 'admin', 'admin');

INSERT INTO nhom_chuc_nang (id_nhom, id_chuc_nang, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
(1, 1, 1, 'admin', 'admin'),
(1, 2, 1, 'admin', 'admin'),
(2, 3, 1, 'admin', 'admin'),
(2, 4, 1, 'admin', 'admin'),
(3, 5, 1, 'admin', 'admin'),
(3, 6, 1, 'admin', 'admin'),
(4, 7, 1, 'admin', 'admin'),
(4, 8, 1, 'admin', 'admin'),
(5, 9, 1, 'admin', 'admin'),
(5, 10, 1, 'admin', 'admin');

INSERT INTO nhom (ten, mo_ta, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Nhóm 1', 'Mô tả nhóm 1', 1, 'admin', 'admin'),
('Nhóm 2', 'Mô tả nhóm 2', 1, 'admin', 'admin'),
('Nhóm 3', 'Mô tả nhóm 3', 1, 'admin', 'admin'),
('Nhóm 4', 'Mô tả nhóm 4', 1, 'admin', 'admin'),
('Nhóm 5', 'Mô tả nhóm 5', 1, 'admin', 'admin'),
('Nhóm 6', 'Mô tả nhóm 6', 1, 'admin', 'admin'),
('Nhóm 7', 'Mô tả nhóm 7', 1, 'admin', 'admin'),
('Nhóm 8', 'Mô tả nhóm 8', 1, 'admin', 'admin'),
('Nhóm 9', 'Mô tả nhóm 9', 1, 'admin', 'admin'),
('Nhóm 10', 'Mô tả nhóm 10', 1, 'admin', 'admin');

INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, id_nhom, vaitro, xac_thuc, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('user1', 'password1', 1, 'Admin', 1, 1, 'admin', 'admin'),
('user2', 'password2', 2, 'Admin', 1, 1, 'admin', 'admin'),
('user3', 'password3', 3, 'Admin', 1, 1, 'admin', 'admin'),
('user4', 'password4', 4, 'Admin', 1, 1, 'admin', 'admin'),
('user5', 'password5', 5, 'Admin', 1, 1, 'admin', 'admin'),
('user6', 'password6', 6, 'Staff', 1, 1, 'admin', 'admin'),
('user7', 'password7', 7, 'Staff', 1, 1, 'admin', 'admin'),
('user8', 'password8', 8, 'Staff', 1, 1, 'admin', 'admin'),
('user9', 'password9', 9, 'Customer', 1, 1, 'admin', 'admin'),
('user10', 'password10', 10, 'Customer', 1, 1, 'admin', 'admin');

INSERT INTO thong_tin_ca_nhan (id_nguoi_dung, ho_va_ten, sdt, avatar, dia_chi, gioi_tinh, ngay_sinh, cccd, email, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
(1, 'Nguyen Van A', '0912345678', 'avatar1.png', 'Hanoi', 1, '1990-01-01', '0123456789', 'a@example.com', 1, 'admin', 'admin'),
(2, 'Nguyen Van B', '0912345679', 'avatar2.png', 'Hanoi', 1, '1991-02-01', '0123456790', 'b@example.com', 1, 'admin', 'admin'),
(3, 'Nguyen Van C', '0912345680', 'avatar3.png', 'Hanoi', 1, '1992-03-01', '0123456801', 'c@example.com', 1, 'admin', 'admin'),
(4, 'Nguyen Van D', '0912345681', 'avatar4.png', 'Hanoi', 1, '1993-04-01', '0123456812', 'd@example.com', 1, 'admin', 'admin'),
(5, 'Nguyen Van E', '0912345682', 'avatar5.png', 'Hanoi', 1, '1994-05-01', '0123456823', 'e@example.com', 1, 'admin', 'admin'),
(6, 'Nguyen Van F', '0912345683', 'avatar6.png', 'Hanoi', 1, '1995-06-01', '0123456834', 'f@example.com', 1, 'admin', 'admin'),
(7, 'Nguyen Van G', '0912345684', 'avatar7.png', 'Hanoi', 1, '1996-07-01', '0123456845', 'g@example.com', 1, 'admin', 'admin'),
(8, 'Nguyen Van H', '0912345685', 'avatar8.png', 'Hanoi', 1, '1997-08-01', '0123456856', 'h@example.com', 1, 'admin', 'admin'),
(9, 'Nguyen Van I', '0912345686', 'avatar9.png', 'Hanoi', 1, '1998-09-01', '0123456867', 'i@example.com', 1, 'admin', 'admin'),
(10, 'Nguyen Van J', '0912345687', 'avatar10.png', 'Hanoi', 1, '1999-10-01', '0123456878', 'j@example.com', 1, 'admin', 'admin');

INSERT INTO danh_muc (id_danh_muc_cha, ten, mo_ta, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
(1,'Danh mục 1', 'Mô tả danh mục 1', 1, 'admin', 'admin'),
(1,'Danh mục 2', 'Mô tả danh mục 2', 1, 'admin', 'admin'),
(1,'Danh mục 3', 'Mô tả danh mục 3', 1, 'admin', 'admin'),
(1,'Danh mục 4', 'Mô tả danh mục 4', 1, 'admin', 'admin'),
(1,'Danh mục 5', 'Mô tả danh mục 5', 1, 'admin', 'admin'),
(2,'Danh mục 6', 'Mô tả danh mục 6', 1, 'admin', 'admin'),
(2,'Danh mục 7', 'Mô tả danh mục 7', 1, 'admin', 'admin'),
(2,'Danh mục 8', 'Mô tả danh mục 8', 1, 'admin', 'admin'),
(2,'Danh mục 9', 'Mô tả danh mục 9', 1, 'admin', 'admin'),
(2,'Danh mục 10', 'Mô tả danh mục 10', 1, 'admin', 'admin');

INSERT INTO thuong_hieu (ten, mo_ta, trang_thai, nguoi_tao, nguoi_cap_nhat)
VALUES 
('Thương hiệu 1', 'Mô tả thương hiệu 1', 1, 'admin', 'admin'),
('Thương hiệu 2', 'Mô tả thương hiệu 2', 1, 'admin', 'admin'),
('Thương hiệu 3', 'Mô tả thương hiệu 3', 1, 'admin', 'admin'),
('Thương hiệu 4', 'Mô tả thương hiệu 4', 1, 'admin', 'admin'),
('Thương hiệu 5', 'Mô tả thương hiệu 5', 1, 'admin', 'admin'),
('Thương hiệu 6', 'Mô tả thương hiệu 6', 1, 'admin', 'admin'),
('Thương hiệu 7', 'Mô tả thương hiệu 7', 1, 'admin', 'admin'),
('Thương hiệu 8', 'Mô tả thương hiệu 8', 1, 'admin', 'admin'),
('Thương hiệu 9', 'Mô tả thương hiệu 9', 1, 'admin', 'admin'),
('Thương hiệu 10', 'Mô tả thương hiệu 10', 1, 'admin', 'admin');

INSERT INTO [chat_lieu] ([ten], [id_danh_muc_cha], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
('Cotton', 1, 1, 'admin', 'admin'),
('Nilong', 1, 1, 'admin', 'admin'),
('Lụa', 1, 1, 'admin', 'admin'),
('Kaki', 1, 1, 'admin', 'admin'),
('Denim', 1, 1, 'admin', 'admin'),
('Bông', 1, 1, 'admin', 'admin'),
('Polyester', 1, 1, 'admin', 'admin'),
('Vải thun', 1, 1, 'admin', 'admin'),
('Vải lanh', 1, 1, 'admin', 'admin'),
('Vải nhung', 1, 1, 'admin', 'admin');

INSERT INTO [mau_sac] ([ten], [id_danh_muc_cha], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
('Đỏ', 1, 1, 'admin', 'admin'),
('Xanh', 1, 1, 'admin', 'admin'),
('Vàng', 1, 1, 'admin', 'admin'),
('Đen', 1, 1, 'admin', 'admin'),
('Trắng', 1, 1, 'admin', 'admin'),
('Xám', 1, 1, 'admin', 'admin'),
('Nâu', 1, 1, 'admin', 'admin'),
('Hồng', 1, 1, 'admin', 'admin'),
('Xanh lá', 1, 1, 'admin', 'admin'),
('Tím', 1, 1, 'admin', 'admin');

INSERT INTO [size] ([ten], [id_danh_muc_cha], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
('S', 1, 1, 'admin', 'admin'),
('M', 1, 1, 'admin', 'admin'),
('L', 1, 1, 'admin', 'admin'),
('XL', 1, 1, 'admin', 'admin'),
('XXL', 1, 1, 'admin', 'admin'),
('XS', 1, 1, 'admin', 'admin'),
('34', 1, 1, 'admin', 'admin'),
('36', 1, 1, 'admin', 'admin'),
('38', 1, 1, 'admin', 'admin'),
('40', 1, 1, 'admin', 'admin');

INSERT INTO [san_pham] ([id_danh_muc], [id_thuong_hieu], [ten], [xuat_xu], [mo_ta], [anh], [trang_thai], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
(1, 1, 'Áo sơ mi nam', 'Việt Nam', 'Áo sơ mi nam chất cotton, thoáng mát', 'mangto.png', 1, 'admin', 'admin'),
(1, 1, 'Áo thun nam', 'Việt Nam', 'Áo thun nam đơn giản, dễ phối đồ', 'mangto.png', 1, 'admin', 'admin'),
(1, 2, 'Áo khoác nam', 'Việt Nam', 'Áo khoác nam thời trang, giữ ấm tốt', 'mangto.png', 1, 'admin', 'admin'),
(1, 2, 'Áo len nam', 'Việt Nam', 'Áo len nam mềm mại, phù hợp mùa đông', 'mangto.png', 1, 'admin', 'admin'),
(1, 3, 'Áo jacket nam', 'Việt Nam', 'Áo jacket nam cá tính, chất liệu da', 'mangto.png', 1, 'admin', 'admin'),
(1, 3, 'Áo hoodie nam', 'Việt Nam', 'Áo hoodie nam năng động, tiện lợi', 'mangto.png', 1, 'admin', 'admin'),
(1, 4, 'Áo polo nam', 'Việt Nam', 'Áo polo nam thanh lịch, dễ mặc', 'mangto.png', 1, 'admin', 'admin'),
(1, 4, 'Áo tank top nam', 'Việt Nam', 'Áo tank top nam mát mẻ, thích hợp mùa hè', 'mangto.png', 1, 'admin', 'admin'),
(1, 5, 'Áo thun cổ tròn nam', 'Việt Nam', 'Áo thun cổ tròn nam chất lượng', 'mangto.png', 1, 'admin', 'admin'),
(1, 5, 'Áo sơ mi kẻ nam', 'Việt Nam', 'Áo sơ mi kẻ nam thời trang', 'mangto.png', 1, 'admin', 'admin'),
(1, 1, 'Áo khoác denim nam', 'Việt Nam', 'Áo khoác denim nam bền bỉ', 'mangto.png', 1, 'admin', 'admin'),
(1, 2, 'Áo sơ mi trắng nam', 'Việt Nam', 'Áo sơ mi trắng nam thanh lịch', 'mangto.png', 1, 'admin', 'admin'),
(1, 3, 'Áo thun ôm nam', 'Việt Nam', 'Áo thun ôm nam thời trang', 'mangto.png', 1, 'admin', 'admin'),
(1, 4, 'Áo khoác dạ nam', 'Việt Nam', 'Áo khoác dạ nam ấm áp', 'mangto.png', 1, 'admin', 'admin'),
(1, 5, 'Áo phao nam', 'Việt Nam', 'Áo phao nam chống lạnh', 'mangto.png', 1, 'admin', 'admin');

INSERT INTO [chi_tiet_san_pham] ([id_san_pham], [id_size], [id_mau_sac], [id_chat_lieu], [so_luong], [gia], [ghi_chu], [trang_thai], [ngay_tao], [ngay_cap_nhat], [nguoi_tao], [nguoi_cap_nhat])
VALUES 
(1, 1, 1, 1, 50, 250000.00, 'Áo sơ mi nam màu đỏ, size S', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(1, 2, 2, 1, 30, 260000.00, 'Áo sơ mi nam màu xanh, size M', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(2, 1, 3, 2, 25, 200000.00, 'Áo thun nam màu vàng, size S', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(2, 2, 4, 2, 20, 220000.00, 'Áo thun nam màu đen, size M', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(3, 3, 5, 3, 15, 450000.00, 'Áo khoác nam màu trắng, size L', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(3, 4, 6, 3, 10, 480000.00, 'Áo khoác nam màu xám, size XL', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(4, 1, 7, 4, 50, 300000.00, 'Áo len nam màu nâu, size S', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(4, 2, 8, 4, 45, 320000.00, 'Áo len nam màu hồng, size M', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(5, 3, 9, 5, 40, 500000.00, 'Áo jacket nam màu xanh lá, size L', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(5, 4, 10, 5, 35, 520000.00, 'Áo jacket nam màu tím, size XL', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(6, 1, 1, 1, 50, 180000.00, 'Áo hoodie nam màu đỏ, size S', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(6, 2, 2, 1, 30, 190000.00, 'Áo hoodie nam màu xanh, size M', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(7, 3, 3, 2, 25, 150000.00, 'Áo polo nam màu vàng, size L', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(7, 4, 4, 2, 20, 160000.00, 'Áo polo nam màu đen, size XL', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(8, 1, 5, 3, 15, 200000.00, 'Áo tank top nam màu trắng, size S', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(8, 2, 6, 3, 10, 220000.00, 'Áo tank top nam màu xám, size M', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 3, 7, 4, 50, 210000.00, 'Áo thun cổ tròn nam màu nâu, size L', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 4, 8, 4, 45, 230000.00, 'Áo thun cổ tròn nam màu hồng, size XL', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(10, 1, 9, 5, 40, 240000.00, 'Áo khoác denim nam màu xanh lá, size S', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(10, 2, 10, 5, 35, 260000.00, 'Áo khoác denim nam màu tím, size M', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(11, 3, 1, 1, 30, 280000.00, 'Áo sơ mi trắng nam, size L', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(11, 4, 2, 1, 25, 300000.00, 'Áo sơ mi kẻ nam, size XL', 1, GETDATE(), GETDATE(), 'admin', 'admin');

INSERT INTO phuong_thuc_van_chuyen (ten, mo_ta, phi_van_chuyen, loai, ghi_chu, thoi_gian_giao_hang, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES 
(N'Giao hàng nhanh', N'Giao hàng trong 1-2 ngày làm việc', 30000, 1, N'Ưu tiên hàng đầu', N'1-2 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng tiết kiệm', N'Giao hàng trong 3-5 ngày làm việc', 15000, 2, N'Giá rẻ', N'3-5 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng siêu tốc', N'Giao hàng trong 24 giờ', 50000, 3, N'Rất nhanh', N'24 giờ', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng COD', N'Thanh toán khi nhận hàng', 25000, 4, N'An toàn', N'2-4 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng quốc tế', N'Giao hàng ngoài Việt Nam', 100000, 5, N'Trên 10 ngày', N'10-15 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng qua bưu điện', N'Thông qua hệ thống bưu điện', 20000, 6, N'Chính xác', N'5-7 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng hỏa tốc', N'Giao hàng trong 12 giờ', 60000, 3, N'Cực nhanh', N'12 giờ', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng đường biển', N'Dành cho hàng hóa lớn', 120000, 7, N'Hàng cồng kềnh', N'15-20 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng đường bộ', N'Qua xe tải', 50000, 6, N'An toàn cho hàng hóa nặng', N'7-10 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(N'Giao hàng bằng máy bay', N'Dịch vụ nhanh qua hàng không', 80000, 1, N'Nhanh và an toàn', N'2-3 ngày', 1, GETDATE(), GETDATE(), 'admin', 'admin');


INSERT INTO dia_chi_giao_hang (id_nguoi_dung, ho_va_ten, sdt, dia_chi, thanh_pho, quoc_gia, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat) 
VALUES 
(1, N'Nguyễn Văn A', '0901234567', N'123 Lê Lợi, Quận 1', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(2, N'Trần Thị B', '0987654321', N'456 Hai Bà Trưng, Quận 3', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(3, N'Phạm Văn C', '0912345678', N'789 Lý Tự Trọng, Quận 1', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(4, N'Lê Thị D', '0934567890', N'101 Điện Biên Phủ, Quận Bình Thạnh', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(5, N'Vũ Văn E', '0923456789', N'202 CMT8, Quận 10', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(6, N'Nguyễn Thị F', '0945678901', N'303 Nguyễn Thị Minh Khai, Quận 3', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(7, N'Đặng Văn G', '0902345678', N'404 Hoàng Diệu, Quận 4', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(8, N'Hoàng Thị H', '0937894561', N'505 Trường Sa, Quận Phú Nhuận', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, N'Bùi Văn I', '0919876543', N'606 Phạm Ngũ Lão, Quận 1', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(10, N'Phan Thị K', '0956789012', N'707 Nam Kỳ Khởi Nghĩa, Quận 3', N'TP.HCM', N'Việt Nam', 1, GETDATE(), GETDATE(), 'admin', 'admin');

INSERT INTO hoa_don (id_nguoi_dung, id_dia_chi_giao_hang, id_phuong_thuc_van_chuyen, ngay_dat_hang, ngay_thanh_toan, tong_tien, diem_su_dung, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES
(9, 1, 1, GETDATE(), GETDATE(), 1000000.00, 5000, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 2, 2, GETDATE(), GETDATE(), 2000000.00, 10000, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 3, 3, GETDATE(), GETDATE(), 3000000.00, 15000, 2, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 4, 4, GETDATE(), GETDATE(), 4000000.00, 20000, 2, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 1, 5, GETDATE(), GETDATE(), 5000000.00, 25000, 3, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 2, 6, GETDATE(), GETDATE(), 6000000.00, 30000, 3, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 3, 7, GETDATE(), GETDATE(), 7000000.00, 35000, 4, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 4, 8, GETDATE(), GETDATE(), 8000000.00, 40000, 4, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 5, 9, GETDATE(), GETDATE(), 9000000.00, 45000, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 6, 2, GETDATE(), GETDATE(), 10000000.00, 50000, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 1, 4, GETDATE(), GETDATE(), 11000000.00, 55000, 2, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 2, 2, GETDATE(), GETDATE(), 12000000.00, 60000, 2, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 3, 3, GETDATE(), GETDATE(), 13000000.00, 65000, 3, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 4, 4, GETDATE(), GETDATE(), 14000000.00, 70000, 3, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 5, 5, GETDATE(), GETDATE(), 15000000.00, 75000, 4, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 6, 6, GETDATE(), GETDATE(), 16000000.00, 80000, 4, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 1, 7, GETDATE(), GETDATE(), 17000000.00, 85000, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 2, 8, GETDATE(), GETDATE(), 18000000.00, 90000, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 3, 9, GETDATE(), GETDATE(), 19000000.00, 95000, 2, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 4, 3, GETDATE(), GETDATE(), 20000000.00, 100000, 2, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 5, 1, GETDATE(), GETDATE(), 21000000.00, 105000, 3, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 6, 2, GETDATE(), GETDATE(), 22000000.00, 110000, 3, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 2, 3, GETDATE(), GETDATE(), 23000000.00, 115000, 4, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 4, 4, GETDATE(), GETDATE(), 24000000.00, 120000, 4, GETDATE(), GETDATE(), 'admin', 'admin');

INSERT INTO chi_tiet_hoa_don (id_hoa_don, id_san_pham_chi_tiet, so_luong, gia, trang_thai, ngay_tao, ngay_cap_nhat, nguoi_tao, nguoi_cap_nhat)
VALUES
(1, 2, 2, 500000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(2, 2, 1, 2000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(3, 3, 3, 1000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(4, 4, 2, 2000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(5, 5, 4, 1250000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(6, 6, 1, 3000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(7, 7, 5, 1500000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(8, 8, 6, 1000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(9, 9, 2, 2500000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(10, 10, 1, 10000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(11, 1, 3, 4000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(12, 2, 2, 5000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(13, 3, 4, 3000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(14, 4, 1, 14000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(15, 5, 5, 1250000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(16, 6, 6, 1600000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(17, 7, 2, 8500000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(18, 8, 4, 9000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(19, 9, 1, 19000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(20, 10, 3, 1500000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(21, 1, 1, 10000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(22, 2, 5, 6000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(23, 3, 6, 23000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin'),
(24, 4, 2, 24000000.00, 1, GETDATE(), GETDATE(), 'admin', 'admin');

select * from thuong_hieu
select * from danh_muc 
select * from size 
select * from mau_sac 
select * from chat_lieu 
select * from nguoi_dung 
select * from chuc_nang 
select * from nhom 
select * from nhom_chuc_nang 
select * from san_pham 
select * from chi_tiet_san_pham 
select * from hoa_don 
select * from chi_tiet_hoa_don 
select * from phuong_thuc_van_chuyen 
select * from dia_chi_giao_hang 


update  san_pham set id_danh_muc = 1 where id =1
SELECT * FROM chi_tiet_hoa_don  WHERE id_hoa_don=1
