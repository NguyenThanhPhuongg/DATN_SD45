package org.example.datn.transformer;

import org.example.datn.model.enums.UserStatus;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * @author hoangKhong
 */
@Service
@Mapper(componentModel = "spring", imports = {UserStatus.class, DateTimeUtils.class})
public interface UserTransformer {

}
