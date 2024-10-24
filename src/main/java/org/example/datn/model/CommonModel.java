package org.example.datn.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * @author hoangKhong
 */
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommonModel implements Serializable {
    Date ngayTao;
    Date ngayCapNhat;
    Long nguoiTao;
    Long nguoiCapNhat;
}
