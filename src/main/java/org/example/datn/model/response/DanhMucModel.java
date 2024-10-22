package org.example.datn.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DanhMucModel implements Serializable {
    private Long id;
    private Long idCha;
    private String ten;
    private String moTa;
    private Integer trangThai;
    private Date ngayTao;
    private Date ngayCapNhat;
    private Long nguoiTao;
    private Long nguoiCapNhat;
}
