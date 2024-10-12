package org.example.datn.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "hoa_don")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_nguoi_dung")
    private User idNguoiDung;
    @ManyToOne
    @JoinColumn(name = "id_dia_chi_gia_hang")
    private DiaChiGiaoHang diaChiGiaoHang;
    @ManyToOne
    @JoinColumn(name = "id_phuong_thuc_van_chuyen")
    private PhuongThucVanChuyen phuongThucVanChuyen;
    @Column(name = "ngay_dat_hang")
    private Date ngayDatHang;
    @Column(name = "ngay_thanh_toan")
    private Date ngayThanhToan;
    @Column(name = "diem_su_dung")
    private Double diemSuDung;
    @Column(name = "nhan_xet")
    private String nhanXet;

    @Column(name = "diem")
    private Integer diem;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_cap_nhat")
    private String nguoiCapNhat;
}
