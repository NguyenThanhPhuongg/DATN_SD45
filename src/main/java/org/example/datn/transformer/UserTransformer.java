package org.example.datn.transformer;

import org.example.datn.entity.User;
import org.example.datn.model.enums.UserStatus;
import org.example.datn.model.request.RegisterModel;
import org.example.datn.model.response.UserModel;
import org.example.datn.utils.CalendarUtil;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author hoangKhong
 */
@Component
@Mapper(componentModel = "spring", imports = {UserStatus.class, CalendarUtil.DateTimeUtils.class})
public interface UserTransformer {
    UserModel toModel(User user);

    User toUser(RegisterModel model, String hashedPassword);
}
