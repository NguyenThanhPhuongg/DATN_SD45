package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
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
    @Column(name = "id")
    private Long id;
//    @Column(name = "id_nguoi_dung")
//    private String idUser;
    @ManyToOne
    @JoinColumn(name = "id_nguoi_dung")
    private NguoiDung idUser;
    @ManyToOne
    @JoinColumn(name = "id_dia_chi_giao_hang")
    private DiaChiGiaHang idDiaChiGiaHang;
    @ManyToOne
    @JoinColumn(name = "id_phuong_thuc_van_chuyen")
    private PhuongThucVanChuyen idPhuongThucVanChuyen;
    @Column(name = "ngay_dat_hang")
    private Date ngayDatHang;
    @Column(name = "ngay_thanh_toan")
    private Date ngayThanhToan;
    @Column(name = "tong_tien")
    private Double tongTien;
    @Column(name = "diem_su_dung")
    private Integer diemSuDung;
    @Column(name = "trang_thai")
    private Integer trangThai;
    @Column(name = "nguoi_tao")
    private String nguoiTao;
    @Column(name = "nguoi_cap_nhat")
    private String nguoiCapNhat;
    @Column(name = "ngay_tao")
    private Date ngayTao;
    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;
}