package org.example.datn.model.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.sql.rowset.serial.SerialArray;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommomRequest {
    Date ngayTao;
    Date ngayCapNhat;
    Long nguoiTao;
    Long nguoiCapNhat;
}
