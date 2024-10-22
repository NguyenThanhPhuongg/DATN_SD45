package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "chi_tiet_hoa_don")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_hoa_don")
    private HoaDon idHoaDon;
    @ManyToOne
    @JoinColumn(name = "id_san_pham_chi_tiet")
    private SanPhamChiTiet idSanPhamChiTiet;
    @Column(name = "so_luong")
    private Integer soLuong;
    @Column(name = "gia")
    private Double gia;
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