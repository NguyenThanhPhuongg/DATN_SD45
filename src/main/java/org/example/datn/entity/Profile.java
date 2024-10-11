package org.example.datn.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.enums.GioiTinh;
/**
 * @author hoangKhong
 */
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "thong_tin_ca_nhan")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "id_nguoi_dung")
    private int idNguoiDung;

    @Column(name = "ho_va_ten")
    private String hoVaTen;

    @Column(name = "sdt")
    private String phone;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "gioi_tinh")
    @Enumerated(EnumType.STRING)
    GioiTinh gioiTinh;

    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;

    @Column(name = "cccd")
    private String cccd;

    @Column(name = "email")
    private String email;

    @Column(name = "trang_thai")
    private int trangThai;
}
