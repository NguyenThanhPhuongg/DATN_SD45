package org.example.datn.transformer;

import org.example.datn.entity.HoaDon;
import org.example.datn.model.request.HoaDonRequest;
import org.example.datn.model.response.HoaDonModel;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface HoaDonTransformer {
    HoaDonModel toModel(HoaDon hoaDon);
//    HoaDon toEntity(HoaDonRequest request);

}

