package org.example.datn.entity;

<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

=======
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

/**
 * @author hoangKhong
 */
@Entity
@Table(name = "san_pham")
>>>>>>> ed8b9726fd62aaec701e33c3fcf229779dfeab88
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
<<<<<<< HEAD
@Entity
@Table(name = "san_pham")
public class SanPham extends CommonEntity {
=======
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPham {
>>>>>>> ed8b9726fd62aaec701e33c3fcf229779dfeab88
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
<<<<<<< HEAD
    @Column(name = "id_danh_muc")
    private Integer danhMuc;

    @Column(name = "id_thuong_hieu")
    private Integer thuongHieu;

    @Column(name = "ten")
    private String ten;

    @Column(name = "xuat_xu")
    private String xuatXu;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "gia")
    private BigDecimal gia;

    @Column(name = "anh")
    private String anh;

    @Column(name = "trang_thai")
    private Integer trangThai;
=======
    @ManyToOne
    @JoinColumn(name = "id_danh_muc")
    private DanhMuc idDanhMuc;
    @ManyToOne
    @JoinColumn(name = "id_thuong_hieu")
    private Thuonghieu idThuongHieu;
    @Column(name = "ten")
    private String ten;
    @Column(name = "xuat_xu")
    private String xuatXu;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "anh")
    private String anh;
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
>>>>>>> ed8b9726fd62aaec701e33c3fcf229779dfeab88
}
