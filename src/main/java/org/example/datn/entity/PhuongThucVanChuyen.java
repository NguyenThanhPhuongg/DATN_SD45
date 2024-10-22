package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "phuong_thuc_van_chuyen")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PhuongThucVanChuyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "ten")
    private String ten;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "phi_van_chuyen")
    private String diaChi;
    @Column(name = "loai")
    private Integer loai;
    @Column(name = "ghi_chu")
    private String ghiChu;
    @Column(name = "thoi_gian_giao_hang")
    private String thoiGianDuKien;
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