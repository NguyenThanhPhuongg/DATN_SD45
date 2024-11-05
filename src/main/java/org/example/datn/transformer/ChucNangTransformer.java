package org.example.datn.transformer;

import org.example.datn.entity.ChucNang;
import org.example.datn.model.response.FunctionModel;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ChucNangTransformer {
    FunctionModel toModel(ChucNang chucNang);
}
