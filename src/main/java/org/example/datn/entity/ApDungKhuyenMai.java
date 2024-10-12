package org.example.datn.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "ap_dung_khuyen_mai")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApDungKhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_khuyen_mai")
    private KhuyenMai idKhuyenMai;
    @ManyToOne
    @JoinColumn(name = "id_gio_hang")
    private GioHang idGioHang;
    @ManyToOne
    @JoinColumn(name = "id_hoa_don")
    private HoaDon idHoaDon;
    @Column(name = "gia_tri_giam")
    private Double giaTriGiam;
    @Column(name = "ngay_ap_dung")
    private Date ngayApDung;

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
