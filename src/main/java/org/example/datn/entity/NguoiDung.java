package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "nguoi_dung")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    //    @Column(name = "id_nguoi_dung")
//    private String idUser;
    @Column(name = "ten_dang_nhap")
    private String userName;

    @Column(name = "mat_khau")
    private String password;

    @ManyToOne
    @JoinColumn(name = "id_nhom")
    private Nhom idNhom;

    @Column(name = "vaitro")
    private String role;

    @Column(name = "xac_thuc")
    private boolean xacThuc;

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