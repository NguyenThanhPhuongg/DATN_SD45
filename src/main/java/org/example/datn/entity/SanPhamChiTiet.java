package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author hoangKhong
 */
@Entity
@Table(name = "chi_tiet_san_pham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPhamChiTiet extends CommonEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_san_pham")
    private SanPham idSanPham;
    @ManyToOne
    @JoinColumn(name = "id_mau_sac")
    private MauSac idMauSac;
    @ManyToOne
    @JoinColumn(name = "id_size")
    private Size idSize;
    @ManyToOne
    @JoinColumn(name = "id_chat_lieu")
    private ChatLieu idChatLieu;
    @Column(name = "so_luong")
    private Integer soLuong;
    @Column(name = "gia")
    private BigDecimal gia;
    @Column(name = "ghi_chu")
    private String ghiChu;
    @Column(name = "trang_thai")
    private Integer trangThai;
}
