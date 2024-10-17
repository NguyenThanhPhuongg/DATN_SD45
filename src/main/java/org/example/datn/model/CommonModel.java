package org.example.datn.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author hoangKhong
 */
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommonModel implements Serializable {
    LocalDateTime ngayTao;
    LocalDateTime ngayCapNhat;
    Integer nguoiTao;
    Integer nguoiCapNhat;
}
