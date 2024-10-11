package org.example.datn.transformer;

import org.example.datn.entity.Profile;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(imports = {DateTimeUtils.class})
public interface ProfileTransformer {

    @Mapping(target = "id", source = "userId")
    @Mapping(target = "ngayTao", expression = "java(DateTimeUtils.now())")
    Profile toEntity(Long userId, String name, String phone, String email);
    Profile toEntity(Long userId, String name);
}
