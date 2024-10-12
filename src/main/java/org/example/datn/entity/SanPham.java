package org.example.datn.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "san_pham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_danh_muc")
    private DanhMuc idDanhMuc;
    @ManyToOne
    @JoinColumn(name = "id_thuong_hieu")
    private ThuongHieu idThuongHieu;
    @Column(name = "ten")
    private String ten;
    @Column(name = "xuat_xu")
    private String xuatXu;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "gia")
    private Double gia;
    @Column(name = "anh")
    private String anh;
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